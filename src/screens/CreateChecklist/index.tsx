import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import { DatePicker } from '../../components/DatePicker';
import { RadioInputGroup, RadioOption } from '../../components/RadioInputGroup';
import { useObject, useRealm } from '../../databases/realm';
import {
  Checklist,
  ChecklistSchema,
  OptionCommonAnswer,
} from '../../databases/schemas';
import { HomeStackParamList } from '../../routes/stack';
import { update, useChecklistStore } from './reducer';
import { Container } from './styles';
import { createChecklistRepository } from './create-checklist.repository';
import { useNetinfo, useSnackbar } from '../../providers';
import { MultiSelectBreakdowns } from '../../components/MultiSelectBreakdowns';

import topImg from '../../assets/top.png';
import rightImg from '../../assets/right.png';
import leftImg from '../../assets/left.png';
import backImg from '../../assets/back.png';
import frontImg from '../../assets/front.png';

export const CreateChecklist: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'CreateChecklist'>
> = ({ route, navigation }) => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { checklistId } = route.params;
  const checklist = useObject(ChecklistSchema.name, checklistId);

  const realm = useRealm();
  const { dispatch, state } = useChecklistStore(
    checklist?.toJSON() as Checklist,
  );
  const { isOnline } = useNetinfo();

  const removeClosedChecklist = (data: Realm.Object) => {
    realm.write(() => {
      realm.delete(data);
    });
  };

  const closeChecklist = (id: string) => {
    realm.write(() => {
      const data = realm.objectForPrimaryKey<Checklist>(
        ChecklistSchema.name,
        id,
      );
      if (!data) return;
      data.isClosed = true;
    });
  };

  const updateChecklist = useCallback(() => {
    realm.write(() => {
      realm.create<Checklist>(
        ChecklistSchema.name,
        state,
        Realm.UpdateMode.Modified,
      );
    });
  }, [state, realm]);

  const handleSaveChecklist = async (data: Realm.Object | null) => {
    setLoading(true);
    if (!data) return;

    if (!isOnline) {
      closeChecklist(checklistId);
      snackbar.show(
        'Sem conexão com internet, o checklist será enviado quando houver uma conexão estável',
        'error',
      );
      navigation.replace('Checklists');
      return;
    }

    try {
      await createChecklistRepository.create(data);
      removeClosedChecklist(data);
      navigation.replace('Checklists');
      snackbar.show('Checklist enviado!', 'success');
    } catch (err) {
      const error = err as any;
      console.log(error.response.data);
      snackbar.show('Não foi possível salvar o checklist', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateChecklist();
  }, [updateChecklist]);

  const commonOptions: RadioOption<OptionCommonAnswer>[] = [
    { type: 'success', value: 'C' },
    { type: 'error', value: 'N' },
    { type: 'default', value: 'NA' },
  ];

  return (
    <Container>
      <DatePicker
        label="Data"
        value={state.date}
        onChange={date => dispatch(update({ date }))}
      />

      <TextInput
        label="Odômetro inicial"
        style={{ marginTop: 16 }}
        value={state.startOdometer}
        onChangeText={value => dispatch(update({ startOdometer: value }))}
      />

      <TextInput
        label="Odômetro final"
        style={{ marginTop: 16 }}
        value={state.endOdometer}
        onChangeText={value => dispatch(update({ endOdometer: value }))}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.brakes ?? 'NA'}
        label="Freios (serviços e mão)"
        onChange={value => dispatch(update({ brakes: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.fireExtinguisher ?? 'NA'}
        label="Extintor de Incêndio"
        onChange={value => dispatch(update({ fireExtinguisher: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.headlightFlashlight ?? 'NA'}
        label="Faróis e Lanternas"
        onChange={value => dispatch(update({ headlightFlashlight: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.securityBelt ?? 'NA'}
        label="Cinto de Segurança"
        onChange={value => dispatch(update({ securityBelt: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.totalyOperation ?? 'NA'}
        label="Funcionamento do Totaly"
        onChange={value => dispatch(update({ totalyOperation: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.windshieldCrack ?? 'NA'}
        label="Trinca no Parabrisa"
        onChange={value => dispatch(update({ windshieldCrack: value }))}
        options={commonOptions}
      />

      {/* Itens  de verificação geral */}
      <RadioInputGroup<OptionCommonAnswer>
        selected={state.preventiveMaintenanceTerm ?? 'NA'}
        label="Prazo de Manutenção Preventiva"
        onChange={value =>
          dispatch(update({ preventiveMaintenanceTerm: value }))
        }
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.waterLevel ?? 'NA'}
        label="Nível de Água"
        onChange={value => dispatch(update({ waterLevel: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.oilLevel ?? 'NA'}
        label="Nível de Óleo"
        onChange={value => dispatch(update({ oilLevel: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.fixedPlates ?? 'NA'}
        label="Placas Fixadas - DETRAN"
        onChange={value => dispatch(update({ fixedPlates: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.logoFixation ?? 'NA'}
        label="Fixação - Logomarca/Adesivos"
        onChange={value => dispatch(update({ logoFixation: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.horn ?? 'NA'}
        label="Buzina"
        onChange={value => dispatch(update({ horn: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.communicationRadio ?? 'NA'}
        label="Rádio de Comunicação"
        onChange={value => dispatch(update({ communicationRadio: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.tireTools ?? 'NA'}
        label="Triângulo de Segurança, Macaco e Chave de Rodas"
        onChange={value => dispatch(update({ tireTools: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.spareTire ?? 'NA'}
        label="Pneu Reserva"
        onChange={value => dispatch(update({ spareTire: value }))}
        options={commonOptions}
      />

      {/* Itens que impedem a circulação do veículo em área de lavra */}

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.carFlag ?? 'NA'}
        label="Bandeirola"
        onChange={value => dispatch(update({ carFlag: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.carFlagLights ?? 'NA'}
        label="Luz de Haste da Bandeirola"
        onChange={value => dispatch(update({ carFlagLights: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.wheelChocks ?? 'NA'}
        label="Calços para Rodas"
        onChange={value => dispatch(update({ wheelChocks: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.trafficLights ?? 'NA'}
        label="Sinaleira (Giroflex)"
        onChange={value => dispatch(update({ trafficLights: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.reverseAlarm ?? 'NA'}
        label="Alarme de Ré"
        onChange={value => dispatch(update({ reverseAlarm: value }))}
        options={commonOptions}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.communicationRadio ?? 'NA'}
        label="Rádio de Comunicação"
        onChange={value => dispatch(update({ communicationRadio: value }))}
        options={commonOptions}
      />

      <TextInput
        label="Quantidade de Estouros"
        value={state.blowouts}
        style={{ marginTop: 16 }}
        onChangeText={value => dispatch(update({ blowouts: value }))}
      />

      <TextInput
        label="Velocidade Máxima Atingida"
        value={state.maximumSpeed}
        style={{ marginTop: 16 }}
        onChangeText={value => dispatch(update({ maximumSpeed: value }))}
      />

      <RadioInputGroup<'on' | 'off'>
        selected={state.tireChange ? 'on' : 'off'}
        label="Houve troca de Pneu"
        onChange={value =>
          dispatch(update({ tireChange: value === 'on' ? true : false }))
        }
        options={[
          { type: 'success', label: 'Sim', value: 'on' },
          { type: 'error', label: 'Não', value: 'off' },
        ]}
      />

      <TextInput
        label="Observações"
        style={{ marginTop: 16 }}
        value={state.observations}
        onChangeText={value => dispatch(update({ observations: value }))}
        multiline
        numberOfLines={3}
      />

      <Title style={{ marginTop: 16 }}>Avarias</Title>

      <MultiSelectBreakdowns
        source={leftImg}
        onChange={selecteds => {
          dispatch(update({ leftBreakdowns: selecteds }));
        }}
        selected={state.leftBreakdowns ?? []}
      />

      <MultiSelectBreakdowns
        source={rightImg}
        onChange={selecteds => {
          dispatch(update({ rightBreakdowns: selecteds }));
        }}
        selected={state.rightBreakdowns ?? []}
      />

      <MultiSelectBreakdowns
        source={topImg}
        onChange={selecteds => {
          dispatch(update({ topBreakdowns: selecteds }));
        }}
        selected={state.topBreakdowns ?? []}
      />

      <MultiSelectBreakdowns
        source={frontImg}
        onChange={selecteds => {
          dispatch(update({ frontBreakdowns: selecteds }));
        }}
        selected={state.frontBreakdowns ?? []}
      />

      <MultiSelectBreakdowns
        source={backImg}
        onChange={selecteds => {
          dispatch(update({ backBreakdowns: selecteds }));
        }}
        selected={state.backBreakdowns ?? []}
      />

      <Button
        mode="contained"
        onPress={() => handleSaveChecklist(checklist)}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 16, marginBottom: 32 }}>
        Salvar
      </Button>
    </Container>
  );
};

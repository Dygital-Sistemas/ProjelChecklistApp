import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { DatePicker } from '../../components/DatePicker';
import { RadioInputGroup, RadioOption } from '../../components/RadioInputGroup';
import { useObject, useRealm } from '../../databases/realm';
import {
  Checklist,
  ChecklistSchema,
  fuelLevelAnswer,
  OptionCommonAnswer,
} from '../../databases/schemas';
import { HomeStackParamList } from '../../routes/stack';
import { update, useChecklistStore } from './reducer';
import { Container, Header, ItemsLabel, SectionTitle } from './styles';
import { createChecklistRepository } from './create-checklist.repository';
import { useNetinfo, useSnackbar } from '../../providers';
import { MultiSelectBreakdowns } from '../../components/MultiSelectBreakdowns';
import { SelectInput } from '../../components/SelectInput';

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

  const validateVehicle = !!state.vehicleId;

  const handleSaveChecklist = async (data: Realm.Object | null) => {
    if (!validateVehicle) {
      snackbar.show('Obrigatório selecionar um veículo', 'error');
      return;
    }

    if (state.startOdometer === '0') {
      snackbar.show('Odômetro é um campo obrigatório', 'error');
      return;
    }

    if (!data) return;

    setLoading(true);

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
      snackbar.show('Checklist enviado', 'success');
    } catch (err) {
      const error = err as any;
      const responseErrors = error.response.data?.errors;
      const responseError =
        error.response.data?.message || 'Não foi possível salvar o checklist';

      if (responseErrors.length) {
        responseErrors.map((error: Record<string, any>) => {
          snackbar.show(error.message, 'error');
        });
      } else {
        snackbar.show(responseError, 'error');
      }
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

  const fuelLevelOptions: RadioOption<fuelLevelAnswer>[] = [
    { type: 'error', value: 'e' },
    { type: 'default', value: '1/4' },
    { type: 'default', value: '1/2' },
    { type: 'default', value: '3/4' },
    { type: 'success', value: 'f' },
  ];

  return (
    <Container>
      <Header>
        <Title style={{ fontSize: 26, marginBottom: 10 }}>
          Checklist Diário
        </Title>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            color: 'rgba(68, 68, 68, .6)',
          }}>
          Para veículos leves e utilitários
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'rgba(68, 68, 68, .6)',
          }}>
          Preenchimento obrigatório somente na primeira utilização do dia
        </Text>
      </Header>
      <SelectInput
        onChange={vehicleId => {
          dispatch(update({ vehicleId }));
        }}
        selected={state.vehicleId || ''}
      />
      <DatePicker
        label="Data"
        value={state.date}
        onChange={date => dispatch(update({ date }))}
      />

      <TextInput
        label="Odômetro (km)"
        style={{ marginTop: 16 }}
        value={state.startOdometer}
        onChangeText={value => dispatch(update({ startOdometer: value }))}
      />

      <RadioInputGroup<fuelLevelAnswer>
        selected={state.fuelLevel ?? 'f'}
        label="Nível de Combustível"
        onChange={value => dispatch(update({ fuelLevel: value }))}
        options={fuelLevelOptions}
      />

      <Title style={{ marginTop: 16, fontSize: 22 }}>Itens a verificar</Title>

      <ItemsLabel>
        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          C - conforme
        </Text>
        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          N - não conforme
        </Text>
        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          NA - não aplicável
        </Text>
      </ItemsLabel>

      <SectionTitle>
        Itens que impedem a circulação do veículo (segurança)
      </SectionTitle>

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
      <SectionTitle>Itens de verificação geral</SectionTitle>

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

      <SectionTitle>
        Itens que impedem a circulação do veículo em área de lavra
      </SectionTitle>

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

      <SectionTitle>
        Itens que impedem a circulação do veículo em área de lavra e de
        verificação geral
      </SectionTitle>

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

      <SectionTitle>Verificação do Totaly</SectionTitle>

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

      <Title style={{ marginTop: 16, fontSize: 22 }}>Avarias</Title>

      <ItemsLabel>
        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          A - amassado
        </Text>
        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          R - riscado
        </Text>
        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          T - trincado
        </Text>

        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          X - Quebrado
        </Text>

        <Text
          style={{ color: 'rgba(68, 68, 68, .6)', textTransform: 'uppercase' }}>
          F - Faltante
        </Text>
      </ItemsLabel>

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

      <TextInput
        label="Observações"
        style={{ marginTop: 16 }}
        value={state.comments}
        onChangeText={value => dispatch(update({ comments: value }))}
        multiline
        numberOfLines={3}
      />

      <Button
        mode="contained"
        onPress={() => handleSaveChecklist(checklist)}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 16, marginBottom: 32 }}>
        Fechar checklist
      </Button>
    </Container>
  );
};

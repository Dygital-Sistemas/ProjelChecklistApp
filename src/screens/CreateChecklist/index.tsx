import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Title } from 'react-native-paper';
import { DatePicker } from '../../components/DatePicker';
import { RadioInputGroup } from '../../components/RadioInputGroup';
import { useObject, useRealm } from '../../databases/realm';
import {
  Checklist,
  ChecklistSchema,
  OptionCommonAnswer,
} from '../../databases/schemas';
import { HomeStackParamList } from '../../routes/stack';
import { changeBrakes, changeDate, useChecklistStore } from './reducer';
import { Container } from './styles';

export const CreateChecklist: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'CreateChecklist'>
> = ({ route }) => {
  const checklist = useObject(ChecklistSchema.name, route.params.checklistId);
  const realm = useRealm();
  const { dispatch, state } = useChecklistStore(
    checklist?.toJSON() as Checklist,
  );

  const updateChecklist = useCallback(() => {
    realm.write(() => {
      realm.create<Checklist>(
        ChecklistSchema.name,
        state,
        Realm.UpdateMode.Modified,
      );
    });
  }, [state, realm]);

  useEffect(() => {
    updateChecklist();
  }, [updateChecklist]);

  return (
    <Container>
      <Title style={{ marginBottom: 8 }}>Novo checklist</Title>

      <DatePicker
        label="Data"
        value={state.date}
        onChange={date => dispatch(changeDate(date))}
      />

      <RadioInputGroup<OptionCommonAnswer>
        selected={state.brakes ?? 'NA'}
        label="Freios (serviços e mão)"
        onChange={value => dispatch(changeBrakes(value))}
        options={[
          { type: 'success', value: 'C' },
          { type: 'error', value: 'N' },
          { type: 'default', value: 'NA' },
        ]}
      />
    </Container>
  );
};

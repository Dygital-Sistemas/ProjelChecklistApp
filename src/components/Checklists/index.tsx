import React from 'react';
import { StyleSheet } from 'react-native';
import { useQuery } from '../../databases/realm';
import {
  Checklist as IChecklist,
  ChecklistSchema,
} from '../../databases/schemas';
import Checklist from '../Checklist';
import { Container } from './styles';

const Checklists: React.FC = ({}) => {
  const checklists: IChecklist[] = useQuery<IChecklist>(ChecklistSchema.name)
    .sorted('date', true)
    .filtered('closed = false')
    .toJSON();

  return (
    <Container
      data={checklists}
      renderItem={({ item }) => <Checklist item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={style.itemSpacing}
    />
  );
};

const style = StyleSheet.create({
  itemSpacing: { paddingBottom: 16 },
});

export default Checklists;

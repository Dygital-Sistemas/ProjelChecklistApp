import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { v4 as uuid } from 'uuid';
import Checklists from '../../components/Checklists';
import { useRealm } from '../../databases/realm';
import { Checklist, ChecklistSchema } from '../../databases/schemas/checklist';
import { HomeStackParamList } from '../../routes/stack';
import { Container, Fab } from './styles';

export const HomeScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'Home'>
> = ({ navigation }) => {
  const realm = useRealm();

  const handleCreateChecklist = () => {
    realm.write(() => {
      const checklist = realm.create<Checklist>(ChecklistSchema.name, {
        date: new Date(),
        id: uuid(),
      });
      if (checklist.id) {
        navigation.navigate('CreateChecklist', {
          checklistId: checklist.id,
        });
      }
    });
  };

  return (
    <Container>
      <Checklists />

      <Fab icon="plus" onPress={handleCreateChecklist} />
    </Container>
  );
};

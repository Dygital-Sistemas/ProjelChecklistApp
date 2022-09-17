import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { v4 as uuid } from 'uuid';
import Checklists from '../../components/Checklists';
import { useQuery, useRealm } from '../../databases/realm';
import { Checklist, ChecklistSchema } from '../../databases/schemas/checklist';
import { HomeStackParamList } from '../../routes/stack';
import { Container, Fab } from './styles';
import { sendChecklists } from './checklists.repository';
import NetInfo from '@react-native-community/netinfo';

export const HomeScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'Checklists'>
> = ({ navigation }) => {
  const realm = useRealm();
  const openChecklist = useQuery<Checklist>(ChecklistSchema.name).filtered(
    'isClosed = false',
  )[0];

  const sendClosedChecklists = async () => {
    const { isInternetReachable: isOnline } = await NetInfo.fetch();
    const data = realm
      .objects<Checklist>(ChecklistSchema.name)
      .filtered('isClosed = true');

    try {
      if (isOnline) {
        const resp = await sendChecklists(data.toJSON());

        if (resp.status === 200) {
          realm.write(() => {
            realm.delete(data);
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    sendClosedChecklists();
  }, []);

  const navigateToChecklist = useCallback(
    (checklist: Checklist & Realm.Object) => {
      if (checklist.id) {
        navigation.replace('CreateChecklist', {
          checklistId: checklist.id,
        });
      }
    },
    [navigation],
  );

  useEffect(() => {
    if (openChecklist) {
      navigateToChecklist(openChecklist);
    }
  }, [navigateToChecklist, openChecklist]);

  const handleCreateChecklist = () => {
    realm.write(() => {
      const checklist = realm.create<Checklist>(ChecklistSchema.name, {
        date: new Date(),
        id: uuid(),
      });
      navigateToChecklist(checklist);
    });
  };

  return (
    <Container>
      <Checklists />
      <Fab icon="plus" onPress={handleCreateChecklist} />
    </Container>
  );
};

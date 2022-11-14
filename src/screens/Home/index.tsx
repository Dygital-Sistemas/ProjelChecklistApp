import React, { useCallback, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { v4 as uuid } from 'uuid';
import Checklists from '../../components/Checklists';
import { useQuery, useRealm } from '../../databases/realm';
import { Checklist, ChecklistSchema } from '../../databases/schemas/checklist';
import { HomeStackParamList } from '../../routes/stack';
import { Container, Fab } from './styles';
import { sendChecklists } from './checklists.repository';
import { getVehicles } from './vehicles.repository';
import { Vehicle, VehicleSchema } from '../../databases/schemas/vehicle';

export const HomeScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'Checklists'>
> = ({ navigation }) => {
  const realm = useRealm();
  const openChecklist = useQuery<Checklist>(ChecklistSchema.name).filtered(
    'isClosed = false',
  )[0];
  const storedVehicles = realm
    .objects<Vehicle>(VehicleSchema.name)
    .sorted('updated_at', true);

  const sendClosedChecklists = async () => {
    const { isInternetReachable: isOnline } = await NetInfo.fetch();
    const data = realm
      .objects<Checklist>(ChecklistSchema.name)
      .filtered('isClosed = true');
    if (!data.length) return;
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

  const storeVehicles = (vehicles: Vehicle[]) => {
    realm.write(() => {
      realm.delete(storedVehicles);
      for (const vehicle of vehicles) {
        realm.create(VehicleSchema.name, vehicle);
      }
    });
  };

  const getApiVehicles = useCallback(async () => {
    try {
      const {
        data: { vehicles },
      } = await getVehicles({
        lastUpdatedAt: storedVehicles[0]?.updated_at,
        vehiclesCount: storedVehicles.length,
      });
      console.log(vehicles);
      if (vehicles.length) {
        storeVehicles(vehicles);
      }
    } catch (error) {
      console.error(error);
    }
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

  const handleCreateChecklist = () => {
    realm.write(() => {
      const checklist = realm.create<Checklist>(ChecklistSchema.name, {
        date: new Date(),
        id: uuid(),
      });
      navigateToChecklist(checklist);
    });
  };

  useEffect(() => {
    if (openChecklist) {
      navigateToChecklist(openChecklist);
    }

    sendClosedChecklists();
    getApiVehicles();
  }, [getApiVehicles, navigateToChecklist, openChecklist]);

  return (
    <Container>
      <Checklists />
      <Fab icon="plus" onPress={handleCreateChecklist} />
    </Container>
  );
};

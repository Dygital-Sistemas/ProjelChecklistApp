import NetInfo from '@react-native-community/netinfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Checklists from '../../components/Checklists';
import { useQuery, useRealm } from '../../databases/realm';
import { Checklist, ChecklistSchema } from '../../databases/schemas/checklist';
import { Vehicle, VehicleSchema } from '../../databases/schemas/vehicle';
import { HomeStackParamList } from '../../routes/stack';
import { createChecklistRepository } from '../CreateChecklist/create-checklist.repository';
import { Container, Fab } from './styles';
import { getVehicles } from './vehicles.repository';

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

  const markAsSent = (checklist: Checklist & Realm.Object) => {
    realm.write(() => {
      checklist.sent = true;
    });
  };

  const markRetry = (checklist: Checklist & Realm.Object) => {
    realm.write(() => {
      checklist.retriesCount += 1;
    });
  };

  const sendClosedChecklists = async () => {
    const { isInternetReachable: isOnline } = await NetInfo.fetch();
    const data = realm
      .objects<Checklist>(ChecklistSchema.name)
      .filtered('isClosed = true && sent = false && retriesCount <= 3');

    const data2 = realm.objects<Checklist>(ChecklistSchema.name);

    console.log(data2[0]);

    if (!isOnline || !data.length) return;

    for (const checklist of data) {
      try {
        const resp = await createChecklistRepository.create(checklist);

        if (resp.status === 200) {
          markAsSent(checklist);
        }
      } catch (err) {
        markRetry(checklist);
      }
    }
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
        startOdometer: 0,
        retriesCount: 0,
      });
      navigateToChecklist(checklist);
    });
  };

  useEffect(() => {
    if (openChecklist) {
      navigateToChecklist(openChecklist);
    }

    // realm.write(() => {
    //   realm.deleteAll();
    // });

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

import { endOfToday, startOfToday } from 'date-fns';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useQuery } from '../../databases/realm';
import {
  ChecklistSchema,
  Checklist as IChecklist,
} from '../../databases/schemas';
import { Vehicle, VehicleSchema } from '../../databases/schemas/vehicle';
import Checklist from '../Checklist';
import { Container } from './styles';

const Checklists: React.FC = ({}) => {
  const startDate = startOfToday();
  const endDate = endOfToday();

  const checklists: IChecklist[] = useQuery<IChecklist>(ChecklistSchema.name)
    .sorted('date', true)
    .filtered('date > $0 && date < $1', startDate, endDate)
    .toJSON();

  const vehicles: Vehicle[] = useQuery<Vehicle>(VehicleSchema.name).toJSON();

  return (
    <Container
      data={checklists}
      renderItem={({ item }) => {
        const vehicle = vehicles.find(v => String(v.id) === item.vehicleId);
        return <Checklist item={item} vehicle={vehicle!} />;
      }}
      keyExtractor={item => item.id}
      contentContainerStyle={style.itemSpacing}
    />
  );
};

const style = StyleSheet.create({
  itemSpacing: { paddingBottom: 16 },
});

export default Checklists;

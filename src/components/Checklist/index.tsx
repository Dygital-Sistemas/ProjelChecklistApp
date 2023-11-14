import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Checklist as IChecklist } from '../../databases/schemas';

import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Vehicle } from '../../databases/schemas/vehicle';
import { HomeScreenNavigationProp } from '../../routes/stack';
import { Container } from './styles';

interface ChecklistProps {
  item: IChecklist;
  vehicle: Vehicle;
}

const Checklist: React.FC<ChecklistProps> = ({ item, vehicle }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const formattedDate = format(item.date, 'dd/MM/yyyy');

  const showChecklistDetail = () => {
    navigation.navigate('ShowChecklist', { item, vehicle });
  };

  return (
    <Container>
      <Card onPress={showChecklistDetail}>
        <Card.Title title={vehicle.tag} subtitle={formattedDate} />
        <Card.Content>
          <Text>{item.sent ? 'Enviado' : 'Aguardando envio'}</Text>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Checklist;

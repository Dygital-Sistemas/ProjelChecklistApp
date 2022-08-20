import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { useObject, useRealm } from '../../databases/realm';
import {
  Checklist as IChecklist,
  ChecklistSchema,
} from '../../databases/schemas';
import { HomeScreenNavigationProp } from '../../routes/stack';

import { Container } from './styles';

interface ChecklistProps {
  item: IChecklist;
}

const Checklist: React.FC<ChecklistProps> = ({ item }) => {
  const checklist = useObject<IChecklist>(ChecklistSchema.name, item.id);
  const realm = useRealm();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const doneChecklist = () => {
    realm.write(() => {
      if (checklist) {
        checklist.closed = !checklist.closed;
      }
    });
  };

  const openChecklistForm = () => {
    if (checklist) {
      navigation.navigate('CreateChecklist', {
        checklistId: checklist.id,
      });
    }
  };

  return (
    <Container>
      <Card onPress={openChecklistForm}>
        <Card.Title
          title={item.id}
          subtitle={item.closed ? 'fechado' : 'aberto'}
        />
        <Card.Actions>
          <Button onPress={doneChecklist}>Fechar</Button>
        </Card.Actions>
      </Card>
    </Container>
  );
};

export default Checklist;

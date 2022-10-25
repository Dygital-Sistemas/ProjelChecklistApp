import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';
import { colors } from '../../commons/styles';
import { useRealm } from '../../databases/realm';
import { ChecklistSchema } from '../../databases/schemas';
import { VehicleSchema } from '../../databases/schemas/vehicle';
import { useAuth } from '../../providers';

export const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const realm = useRealm();

  const deleteVehicles = () => {
    const vehicles = realm.objects(VehicleSchema.name);
    const checklists = realm.objects(ChecklistSchema.name);

    console.log({ vehicles, checklists });

    realm.write(() => {
      realm.delete(vehicles);
      realm.delete(checklists);
    });
  };

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Title
          title="Minha conta"
          left={props => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Actions>
          <Button
            style={{ marginTop: 16 }}
            icon="logout"
            mode="contained"
            onPress={logout}
            color={colors.error}>
            Sair
          </Button>

          <Button
            style={{ marginTop: 16 }}
            icon="logout"
            mode="contained"
            onPress={deleteVehicles}
            color={colors.error}>
            apagar veiculos
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

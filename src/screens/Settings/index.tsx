import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';
import { colors } from '../../commons/styles';
import { useAuth } from '../../providers';

export const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();

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
        </Card.Actions>
      </Card>
    </View>
  );
};

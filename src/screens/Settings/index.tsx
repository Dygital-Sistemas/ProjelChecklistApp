import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import { colors } from '../../commons/styles';
import { useAuth } from '../../providers';

export const SettingsScreen: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <View style={{ padding: 16 }}>
      <Card style={{ padding: 10 }}>
        <Card.Title
          title="Minha conta"
          left={props => <Avatar.Icon {...props} icon="account" />}
        />

        <Card.Content>
          <Title
            style={{
              fontSize: 16,
              textTransform: 'uppercase',
              color: colors.primary,
            }}>
            Nome
          </Title>
          <Paragraph
            style={{
              fontSize: 16,
              color: colors.gray,
            }}>
            {user.name}
          </Paragraph>
          <Title
            style={{
              fontSize: 16,
              textTransform: 'uppercase',
              color: colors.primary,
            }}>
            Email
          </Title>
          <Paragraph
            style={{
              fontSize: 16,
              color: colors.gray,
            }}>
            {user.email}
          </Paragraph>
        </Card.Content>

        <Card.Actions
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <Button
            style={{
              marginTop: 16,
            }}
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

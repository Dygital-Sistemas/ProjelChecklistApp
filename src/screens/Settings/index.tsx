import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colors } from '../../commons/styles';
import { useAuth } from '../../providers';

export const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const [netInfoState, setNetInfoState] = useState<NetInfoState>();

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      setNetInfoState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text>Minha conta</Text>

      <Text>connectado: {netInfoState?.isConnected ? 'sim' : 'não'}</Text>
      <Text>
        status: {netInfoState?.isInternetReachable ? 'online' : 'offline'}
      </Text>
      <Text>tipo conexão: {netInfoState?.type}</Text>
      <Text>detalhes {JSON.stringify(netInfoState?.details, null, 2)}</Text>

      <Button
        style={{ marginTop: 16 }}
        mode="contained"
        onPress={logout}
        color={colors.error}>
        Logout
      </Button>
    </View>
  );
};

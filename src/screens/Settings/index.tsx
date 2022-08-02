import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {colors} from '../../commons/styles';
import {useAuth} from '../../contexts/auth.context';

export const SettingsScreen: React.FC = () => {
  const {logout} = useAuth();

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{padding: 16}}>
      <Text>Minha conta</Text>

      <Button
        style={{marginTop: 16}}
        mode="contained"
        onPress={logout}
        color={colors.error}>
        Logout
      </Button>
    </View>
  );
};

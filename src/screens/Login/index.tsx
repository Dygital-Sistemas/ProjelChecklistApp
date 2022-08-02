import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {buttonStyles, typographyStyles} from '../../commons/styles';
import {useAuth} from '../../contexts/auth.context';

import {styles} from './styles';

export const LoginScreen: React.FC = () => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Headline style={typographyStyles.bold}>Login</Headline>

      <TextInput mode="outlined" label="Email" placeholder="email" />
      <TextInput
        mode="outlined"
        secureTextEntry={!showPassword}
        label="Senha"
        placeholder="senha"
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? 'eye-off' : 'eye'}
          />
        }
      />
      <Button
        onPress={auth.login}
        style={buttonStyles.default}
        mode="contained">
        entrar
      </Button>
    </View>
  );
};

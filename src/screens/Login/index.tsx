import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';
import { buttonStyles, typographyStyles } from '../../commons/styles';
import { useAuth, useSnackbar } from '../../providers';
import { submitLogin } from './login.repository';

import { styles } from './styles';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const snackbar = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = !email || !password;

  const handleLogin = async () => {
    setLoading(true);
    return submitLogin(email, password)
      .then(({ data }) => {
        login(data);
      })
      .catch(error => {
        if (error.response?.data.message) {
          snackbar.show(error.response.data.message, 'error');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Headline style={typographyStyles.bold}>Login</Headline>

      <TextInput
        mode="outlined"
        label="Email"
        onChangeText={setEmail}
        value={email}
        placeholder="email"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        spellCheck={false}
        keyboardType="email-address"
      />
      <TextInput
        mode="outlined"
        secureTextEntry={!showPassword}
        label="Senha"
        placeholder="senha"
        onChangeText={setPassword}
        value={password}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        spellCheck={false}
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? 'eye-off' : 'eye'}
          />
        }
      />
      <Button
        onPress={handleLogin}
        style={buttonStyles.default}
        disabled={validateForm}
        loading={loading}
        mode="contained">
        entrar
      </Button>
    </View>
  );
};

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {LoginStore} from '../Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN_STORAGE_KEY} from '../constants';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const store = new LoginStore();

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    if (
      store.loginState ||
      JSON.parse(await AsyncStorage.getItem(LOGIN_STORAGE_KEY))
    ) {
      navigation.navigate('Dashboard');
    }
  };

  const onPressSubmit = async () => {
    store.updateLoginState(username, password);
    const loginState = JSON.stringify(store.getLoginState());
    await AsyncStorage.setItem(LOGIN_STORAGE_KEY, loginState);
    if (store.loginState) {
      setUsername('');
      setPassword('');
      setShowError(false);
      navigation.navigate('Dashboard');
    } else setShowError(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Username: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setUsername}
          autoCapitalize={'none'}
          value={username}
        />
      </View>
      <View style={styles.passwordContainer}>
        <Text>Password: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          autoCapitalize={'none'}
          value={password}
        />
      </View>

      <TouchableOpacity
        onPress={onPressSubmit}
        style={styles.submitContainer}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {showError && <Text>Password incorrect!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '30%',
  },
  passwordContainer: {
    flexDirection: 'row', paddingTop: 10
  },
  submitContainer: {
    padding: 10, backgroundColor: 'green', marginTop: 30
  }
});

export default Login;

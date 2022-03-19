import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Asyn} from 'react-native';
import {LoginStore} from '../Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN_STORAGE_KEY} from '../constants';

const CORRECT_USERNAME = 'remark';
const CORRECT_PASSWORD = 'testtest';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const store = new LoginStore();

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    if ( store.loginState || JSON.parse(await AsyncStorage.getItem(LOGIN_STORAGE_KEY))) {
      navigation.navigate('Dashboard');
    }
  };

  const onPressSubmit = async () => {
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setShowError(false);
      setUsername('');
      setPassword('');
      store.updateLoginState(true);
      const loginState = JSON.stringify(store.loginState);
      await AsyncStorage.setItem(LOGIN_STORAGE_KEY, loginState);
      navigation.navigate('Dashboard');
    } else setShowError(true);
  };

  return (
    <View
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Text>Username: </Text>
        <TextInput
          style={{borderColor: 'grey', borderWidth: 1, width: '30%'}}
          onChangeText={setUsername}
          autoCapitalize={'none'}
          value={username}
        />
      </View>
      <View style={{flexDirection: 'row', paddingTop: 10}}>
        <Text>Password: </Text>
        <TextInput
          style={{borderColor: 'grey', borderWidth: 1, width: '30%'}}
          onChangeText={setPassword}
          autoCapitalize={'none'}
          value={password}
        />
      </View>

      <TouchableOpacity
        onPress={onPressSubmit}
        style={{padding: 10, backgroundColor: 'green', marginTop: 30}}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {showError && <Text>Password incorrect!</Text>}
    </View>
  );
};

export default Login;

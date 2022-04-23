import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LOGIN_STORAGE_KEY} from '../constants';
import {LoginStore} from '../Store';

const MOVIES_ENDPOINT = 'https://www.omdbapi.com/?apikey=';
const API_KEY = '741fd8d3';
const KEYWORD = 'car';

const DisplayLabel = ({title, label}) => {
  return (
    <Text style={styles.titleContainer}>
      <Text style={styles.title}>{title}: </Text>
      {label}
    </Text>
  );
};

const store = new LoginStore();

const Dashboard = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          MOVIES_ENDPOINT + API_KEY + '&t=' + KEYWORD,
        );
        const data = await response.json();
        setData([data]);
      } catch (err) {
        console.warn(err);
      }
    }

    fetchData();
  }, []);

  const renderItem = ({item, _}) => {
    return (
      <View>
        <Image
          source={{uri: item?.Poster}}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={{paddingLeft: 15}}>
          <DisplayLabel title={'Title'} label={item?.Title} />
          <DisplayLabel title={'Summary'} label={item?.Plot} />
          <DisplayLabel title={'Year'} label={item?.Year} />
          <DisplayLabel title={'Rated'} label={item?.Rated} />
          <DisplayLabel title={'Released'} label={item?.Released} />
          <DisplayLabel title={'Duration'} label={item?.Runtime} />
          <DisplayLabel title={'Genre'} label={item?.Genre} />
          <DisplayLabel title={'Director'} label={item?.Director} />
          <DisplayLabel title={'Casting'} label={item?.Actors} />
          <DisplayLabel title={'Country'} label={item?.Country} />
          <DisplayLabel title={'Awards'} label={item?.Awards} />
          <DisplayLabel title={'Ratings'} />
          {renderRating(item?.Ratings)}
        </View>
      </View>
    );
  };

  const renderRating = item => {
    return item.map((element, _) => {
      return <Text>{`${element?.Source}   (${element.Value})`}</Text>;
    });
  };

  const onPressLogout = async () => {
    store.logout();
    const loginState = JSON.stringify(store.getLoginState());
    await AsyncStorage.setItem(LOGIN_STORAGE_KEY, loginState);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
          <View />
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={onPressLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 'bold', paddingLeft: 55,
  },
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  titleContainer: {
    paddingVertical: 5,
  },
  logout: {
    alignItems: 'flex-end',
    paddingRight: 5,
  }
});

export default Dashboard;

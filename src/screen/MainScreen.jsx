// import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import {mapApiKey} from '../utils/apiKeys';
import React, {useEffect, useState} from 'react';
import AppWrapper from '../components/AppWrapper';
import Header from '../reuseComponents/Header';
// import axios from 'axios';

const MainScreen = () => {
  // const [userLocation, setUserLocation] = useState([]);

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'New APPP for',
  //         message: 'need acces to gps' + 'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     async position => {
  //       if (position) {
  //         setUserLocation({
  //           latitude: position.coords?.latitude,
  //           longitude: position.coords?.longitude,
  //         });
  //         const request = await axios.get(
  //           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyD4Jkl9a4wFGDhn3cDFCkW5iIfvRYKJws0`,
  //         );

  //         console.log(request.data);
  //       }
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  //   );
  // };
  return (
    <AppWrapper>
      <Header />
      <MainBody />
      <MainFooter />
    </AppWrapper>
  );
};

export default MainScreen;

const MainBody = () => {
  return (
    <View>
      <Text>sjbjvn</Text>
    </View>
  );
};
const MainFooter = () => {
  return <View></View>;
};

const styles = StyleSheet.create({});

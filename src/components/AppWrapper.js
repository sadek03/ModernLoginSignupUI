import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppWrapper = ({children}) => {
  return <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>;
};

export default AppWrapper;

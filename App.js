import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { useState } from 'react';
import Navigator from './routes/homeStack';

export default function App() {

  return (
    <Navigator />
  );
}




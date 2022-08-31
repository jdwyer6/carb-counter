import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { useState } from 'react';

const Home = ({ navigation }) => {

    const [ carbCount, setCarbCount ] = useState(25);

    const pressHandler = () => {
        navigation.navigate('Add', {carbCount})
    }

    

    return ( 
        <View style={styles.container}>
            <Text style={{ fontSize: 120}}>{carbCount}</Text>
            <Text style={{ fontSize: 42, marginTop: 2}}>Carbs remaining</Text>
            <Icon
              name='add-circle'
              color='#1BAC4B'
              size={200}
              style={{marginTop: 150}}
              onPress={pressHandler}/>
            <StatusBar style="auto" />
        </View>

     );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
 
export default Home;



import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { useState, useEffect } from 'react';

const green = '#00FF00'
const blue = '#0000FF'
let bgColor = '#fff';

const Home = ({ navigation }) => {

    const [ carbCount, setCarbCount ] = useState(25);

    const pressHandler = () => {
        navigation.navigate('Add', {carbCount, setCarbCount})
    }

    // useEffect(() => {
    // carbCount > 10 ? bgColor = green : bgColor = blue;
    // console.log(bgColor)
    // }, [])



    return ( 
        <View style={styles.container}>
            <Text style={{ fontSize: 120}}>{carbCount}</Text>
            <Text style={{ fontSize: 42, marginTop: 2}}>Carbs remaining</Text>
            <Icon
              name='add-circle'
              color='#1BAC4B'
              size={200}
              style={{marginTop: 50}}
              onPress={pressHandler}/>
            <StatusBar style="auto" />
        </View>

     );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: bgColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

 
export default Home;



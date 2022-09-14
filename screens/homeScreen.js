import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { useState, useEffect, useRef } from 'react';
import AnimateNumber from 'react-native-countup'

const Home = ({ navigation }) => {

    const [ carbCount, setCarbCount ] = useState(25);
    const prevCarbRef = useRef(0);
    const [ textColor, setTextColor ] = useState("black")

    useEffect(()=> {
        prevCarbRef.current = carbCount;
        if(carbCount < 0 ){
            setTextColor('#CF4B44')
        }else if(carbCount >= 0 && carbCount < 8 ){
            setTextColor('#F58F56')
        }else{
            setTextColor('black')
        }
    }, [carbCount])

    const pressHandler = () => {
        navigation.navigate('Add', {carbCount, setCarbCount})
    }

    console.log('carbCount: ' + carbCount + 'prevCarb: ' + prevCarbRef)


    return ( 
        <View style={styles.container}>
            <Text >
                <AnimateNumber style={{ fontSize: 120, color: textColor}} initial={Math.trunc(prevCarbRef.current)} value={Math.trunc(carbCount)} timing="easeOut" countBy={1}/>
            </Text>
            
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

 
export default Home;



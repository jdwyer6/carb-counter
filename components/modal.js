import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { useState } from 'react';

const Popup = ({setModalVisible, modalVisible, setCarbCount, carbCount, navigation}) => {
    const [text, onChangeText] = useState("");
    function handlePress(){
        setCarbCount(carbCount-text)
        setModalVisible(!modalVisible)
        navigation.goBack();
    }

    return ( 
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Input carb amount:</Text>
              <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='# of carbs'
                />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handlePress}
              >
                <Text style={styles.textStyle}>Done!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>+ Quick Add</Text>
        </Pressable>
      </View>
     );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      height: 50,
      textAlign: 'center'
    },
    buttonOpen: {
      backgroundColor: "#B0E0E6",
    },
    buttonClose: {
      backgroundColor: "#B0E0E6",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {
        height: 40,
        margin: 6,
        borderWidth: 1,
        padding: 10,
      },
  });
 
export default Popup;
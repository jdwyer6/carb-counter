import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from "react-native";
import { useState } from "react";

const Add = ({ navigation }) => {
    const [text, onChangeText] = useState("");
    console.log(text);
    const pressHandler = () => {
        navigation.goBack();
    };

    const getData = async () => {
        const response = await fetch(
            "https://world.openfoodfacts.org/api/v0/product/737628064502.json"
        );
        if (response.status !== 200) {
            throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        console.log(data.product);
        return data;
    };

    getData().then((data) => console.log("resolved: ", data));
    // .catch(err => console.log("rejected: ", err.message));

    const search = OpenFoodAPIClient.searchProducts(all);
    console.log(search);

    return (
        <View>
            <Text style={styles.titleText}>Add food or drink</Text>
            <Text>{navigation.getParam("carbCount")}</Text>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Button title="Submit" onPress={pressHandler} />
            </SafeAreaView>
            {/* <FlatList 
                data={reviews}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={()=> navigation.navigate('ReviewDetails', {})}>
                        <Text>{item.title}</Text> 
                    </TouchableOpacity>
                )}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Add;

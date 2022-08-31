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
import { useState, useEffect } from "react";
import { ListItem, Avatar } from "react-native-elements";


const Add = ({ navigation }) => {
    const [text, onChangeText] = useState("");
    const [ searchText, setSearchText ] = useState();
    const [ filtered, setFiltered ] = useState([])
    console.log(text)
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        filter();
    }, [text]);

    useEffect(() => {
        getData();
    }, []);


    const filter = () => {
       if(text){
        const upperCaseText = text.toUpperCase();
        const filtro = items.filter((item) => item.product_name.toUpperCase().includes(upperCaseText));
        setFiltered(filtro);
       }
    }

    const pressHandler = () => {
        navigation.goBack();
    };

    const link1 = "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=spaghetti";
    const link2 = "https://world.openfoodfacts.org/api/v0/product/737628064502.json";
    const link3 = "https://world.openfoodfacts.org/category/pizzas.json";
    const link4 = "https://world.openpetfoodfacts.org/api/v0/product/20106836.json?fields=generic_name";

    

    const getData = async () => {
        const response = await fetch(link3);
        if (response.status !== 200) {
            throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        // console.log(data.products);
        setItems(data.products);
        setFiltered(data.products);
        // console.log(items)
        console.log(data.products)
        return data

    };

    


    // getData().then((data) => console.log("resolved: ", data));
    // // .catch(err => console.log("rejected: ", err.message));

    const renderItem = ({ item }) => {
        return (
            <ListItem>
                <Avatar source={item.image_url} rounded/>
                <ListItem.Content>
                    <ListItem.Title>{item.product_name}</ListItem.Title>
                    <ListItem.Subtitle>{item.nutriments.carbohydrates} Carbs</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }


    return (
        <View>
            <SafeAreaView>
                <Text style={styles.titleText}>Add food or drink</Text>
                <Text>{navigation.getParam("carbCount")}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Search by name'
                />
                <Button title="Submit" onPress={pressHandler} />
                {/* {items.map((item) => {
                    return (
                        <View key={item.id}>
                            <Text>{item.product_name}</Text>
                            <Text>{item.nutriments.carbohydrates}</Text>
                        </View>

                    )
                })} */}

                <FlatList 
                    data={filtered}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>

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

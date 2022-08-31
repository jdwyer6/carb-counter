import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ActivityIndicator
} from "react-native";
import { useState, useEffect } from "react";
import { ListItem, Avatar } from "react-native-elements";


const Add = ({ navigation }) => {
    const [text, onChangeText] = useState("");
    const [ filtered, setFiltered ] = useState([])
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true)
    const carbCount = navigation.getParam('carbCount')
    const setCarbCount = navigation.getParam('setCarbCount')

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
    const link4 = "https://world.openfoodfacts.org?json=true";

    

    const getData = async () => {
        const response = await fetch(link4);
        if (response.status !== 200) {
            throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        setItems(data.products);
        setFiltered(data.products);
        console.log(data.products)
        setLoading(false)
        return data

    };




    // getData().then((data) => console.log("resolved: ", data));
    // // .catch(err => console.log("rejected: ", err.message));

    const renderItem = ({ item }) => {
        return (
            <ListItem onPress={() => {
                setCarbCount(carbCount - item.nutriments.carbohydrates)
                pressHandler();
            }}>
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
                <Text>{Math.trunc(carbCount)}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Search by name'
                />
                <Button title="Submit" onPress={pressHandler} />

                {loading ? (
                  <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#2196F3" />
                </View>
            ) : (
                <FlatList 
                data={filtered}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            )}



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

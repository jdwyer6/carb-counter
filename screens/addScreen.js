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
import { FlashList } from "@shopify/flash-list";
import Popup from "../components/modal";


const Add = ({ navigation }) => {
    const [text, onChangeText] = useState("");
    const [ filtered, setFiltered ] = useState([])
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const carbCount = navigation.getParam('carbCount')
    const setCarbCount = navigation.getParam('setCarbCount')

    useEffect(() => {
        filter();
    }, []);

    useEffect(() => {
        getData();
    }, [text]);


    const filter = () => {
       if(text){
        const upperCaseText = text.toUpperCase();
        const filteredItems = items.filter((item) => item.product_name.toUpperCase().includes(upperCaseText));
        setFiltered(filteredItems);
       }
    //    return filteredItems;
    }

    const pressHandler = () => {
        navigation.goBack();
    };

    const quickAdd = () =>{
        setModalVisible(true)
    }

    // const link1 = "https://world.openfoodfacts.org/api/v0/search.pl?json=true&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=cereals";
    // const link2 = "https://world.openfoodfacts.org/api/v0/product/737628064502.json";
    // const link3 = "https://world.openfoodfacts.org/cgi/search.pl?json=true&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=breakfast_cereals&product_name=corn";
    // const link4 = "https://world.openfoodfacts.org?json=true";
    const link5 = `https://us.openfoodfacts.org/cgi/search.pl?json=true&action=process&search_terms=${text}`;

    

    const getData = async () => {
        const response = await fetch(link5);
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
            <View>
                <ListItem onPress={() => {
                    setCarbCount(carbCount - item.nutriments.carbohydrates)
                    pressHandler();
                }}>
                    <Avatar source={{ uri: item.image_url }} rounded/>
                    <ListItem.Content>
                        <ListItem.Title>{item.product_name}</ListItem.Title>
                        <ListItem.Subtitle><Text>{item.nutriments.carbohydrates} Carbs</Text></ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem> 
            </View>

        )
    }


    return (
        <View>
            <SafeAreaView>
                <View style={{flexDirection: 'row', margin: 20}}>
                    <View>
                        <Text style={styles.titleText}>Add food or drink</Text>
                        <Text style={{textAlign: 'center'}}>Remaining daily carbs: {Math.trunc(carbCount)}</Text>
                    </View>
                    <View>
                        <Popup setModalVisible={setModalVisible} modalVisible={modalVisible} setCarbCount={setCarbCount} carbCount={carbCount} navigation={navigation}/>
                    </View>

                </View>
                {/* <Button title="+ Quick add" onPress={quickAdd} /> */}
                
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Search by name'
                />

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
                // <FlashList
                // renderItem={renderItem}
                // estimatedItemSize={100}
                // data={filtered}
                // />
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
        padding: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
});

export default Add;

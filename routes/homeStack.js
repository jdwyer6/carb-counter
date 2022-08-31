import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/homeScreen';
import Add from '../screens/addScreen';

const screens = {
    Home: {
        screen: Home
    },
    Add: {
        screen: Add
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)
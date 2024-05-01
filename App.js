import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home/Home";
import PaymentSummaryScreen from "./components/PaymentSummary/PaymentSummary";
import OrderPlacedScreen from "./components/OrderPlaced/OrderPlaced";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Ice Bucket" component={Home} />
                <Stack.Screen
                    name="PaymentSummary"
                    component={PaymentSummaryScreen}
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="OrderPlaced"
                    component={OrderPlacedScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

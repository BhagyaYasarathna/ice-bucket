import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Home from "./components/Home/Home";
import PaymentSummaryScreen from "./components/PaymentSummary/PaymentSummary";
import OrderPlacedScreen from "./components/OrderPlaced/OrderPlaced";
import UserDetailsScreen from "./components/Authentication/UserDetails";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            {/* <InsideStack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={{ headerShown: false }}
            /> */}
            <InsideStack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <InsideStack.Screen
                name="PaymentSummary"
                component={PaymentSummaryScreen}
                options={{ headerShown: false }}
            />
            <InsideStack.Screen
                name="OrderPlaced"
                component={OrderPlacedScreen}
                options={{ headerShown: false }}
            />
        </InsideStack.Navigator>
    );
}

export default function App() {
    // const [user, setUser] = useState<User | null>(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            // console.log("user", user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        {/* <Stack.Screen
                            name="UserDetails"
                            component={UserDetailsScreen}
                            options={{ headerShown: false }}
                        /> */}
                        <Stack.Screen
                            name="Inside"
                            component={InsideLayout}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="UserDetails"
                            component={UserDetailsScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

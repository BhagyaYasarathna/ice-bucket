import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, BackHandler } from "react-native";
import Header from "../Parts/Header";
import { Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const OrderPlacedScreen = ({ navigation }) => {
    const handleGoBack = () => {
        // Navigate back to the home screen
        navigation.navigate("Home");
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                // Navigate back to the home screen
                navigation.navigate("Home");
                // Return true to prevent default behavior (exit the app)
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Ice Bucket"} />
            <Text style={styles.details}>Your order is placed. Thank you!</Text>
            <View style={styles.bar}>
                <Button title="Go Back to Home" onPress={handleGoBack} />
                <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
            </View>
        </SafeAreaView>
    );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    details: {
        fontSize: 20,
        marginTop: 100,
        marginBottom: 100,
        textAlign: "center",
    },
    bar: {
        marginVertical: 20,
        alignItems: "center",
    },
});

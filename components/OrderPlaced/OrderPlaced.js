// OrderPlacedScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Header from "../Parts/Header";
import { Center } from "native-base";
import { useNavigation } from "@react-navigation/native";

const OrderPlacedScreen = ({ navigation }) => {
    const handleGoBack = () => {
        // Navigate back to the home screen
        navigation.navigate("Home");
    };

   

    return (
        <View>
            <Header title={"Ice Bucket"} />
            <Text style={styles.details}>Your order is placed. Thank you!</Text>
            <View style={styles.bar}>
                <Button title="Go Back to Home" onPress={handleGoBack} />
            </View>
        </View>
    );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
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

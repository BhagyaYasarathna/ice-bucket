import React, { useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    BackHandler,
    TouchableOpacity,
} from "react-native";
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
                <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>Go Back to Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => FIREBASE_AUTH.signOut()}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
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
        fontSize: 25,
        marginTop: 100,
        marginBottom: 100,
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
    },
    bar: {
        marginVertical: 20,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#0080ff",
        width: "50%",
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

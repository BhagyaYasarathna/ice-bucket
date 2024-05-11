import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "../../FirebaseConfig";
import { set, ref } from "firebase/database";

const UserDetailsScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const saveDetails = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            // Save user details to Firebase
            const userDetails = {
                Name: name,
                Address: address,
                PhoneNumber: phoneNumber,
                EmailAddress: email,
            };

            set(ref(db, "users/" + user.uid), {
                Name: name,
                Address: address,
                PhoneNumber: phoneNumber,
                EmailAddress: email,
            }) // Use user's UID as the key
                .then(() => {
                    alert("User details saved successfully");
                    // console.log("Done");
                    navigation.navigate("Home");

                    // navigation.navigate("Home");
                })
                .catch((error) => {
                    console.error("Error saving user details: ", error);
                    // Handle error
                });
            // console.log(userDetails);
            // navigation.navigate("Home");
        } else {
            console.error("User not logged in");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Your Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={saveDetails}>
                <Text style={styles.buttonText}>Save Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0080ff",
        width: "80%",
        height: 50,
        borderRadius: 5,
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

export default UserDetailsScreen;

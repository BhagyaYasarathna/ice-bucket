// PaymentSummaryScreen.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../Parts/Header";

const PaymentSummaryScreen = ({ route, navigation }) => {
    const { selectedItems, totalAmount } = route.params;


    const handlePay = () => {
        //Navigate to the OrderPlaceScreen
        navigation.navigate("OrderPlaced");
    };

    return (
        <View style={styles.container}>
            <Header title={"Ice-Bucket"} />
            <Text style={styles.header}>Selected Items</Text>
            {Object.keys(selectedItems).map((itemName, index) => (
                <Text key={index}>{`${selectedItems[itemName]}`}</Text>
            ))}
            <Text style={styles.header}>Total Amount</Text>
            <Text>$ {totalAmount}</Text>
            <View style={{ marginVertical: 20 }}>
                <Button title="Pay" onPress={handlePay} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#F0E68C",
        padding: 5,
        marginTop: 10,
        marginBottom: 5,
    },
});

export default PaymentSummaryScreen;

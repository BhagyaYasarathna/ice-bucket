import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../Parts/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentSummaryScreen = ({ route, navigation }) => {
    const { selectedItems, totalAmount, setQuantities, setTotalAmount } =
        route.params;

    const handlePay = () => {
        setQuantities({});
        setTotalAmount(0);
        navigation.navigate("OrderPlaced");
    };

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

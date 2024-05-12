// TotalAmount.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalAmount = ({ totalAmount }) => (
    <View>
        <Text style={styles.totalAmountText}>Total Amount: {totalAmount}</Text>
    </View>
);

export default TotalAmount;

const styles = StyleSheet.create({
    totalAmountText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});

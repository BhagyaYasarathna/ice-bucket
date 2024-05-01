import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FoodItem = ({ item, onAdd, onRemove, selectedQuantity }) => {
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onAdd} style={styles.plusButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRemove} style={styles.minusButton}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.quantity}>Qty : {selectedQuantity}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    plusButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
    },
    minusButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
    quantity: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
    },
});

export default FoodItem;

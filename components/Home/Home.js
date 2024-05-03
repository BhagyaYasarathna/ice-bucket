import React, { useState } from "react";
import { View, Button, FlatList, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MenuData } from "../Parts/MenuData";
import Header from "../Parts/Header";
import SectionHeader from "../Parts/SectionHeader";
import FoodItem from "../Parts/FoodItem";
import TotalAmount from "../Parts/TotalAMount";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [quantities, setQuantities] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);

    const handleAdd = (itemName, price) => {
        const newQuantities = { ...quantities };
        newQuantities[itemName] = (newQuantities[itemName] || 0) + 1;
        setQuantities(newQuantities);
        setTotalAmount(totalAmount + price);
    };

    const handleRemove = (itemName, price) => {
        const newQuantities = { ...quantities };
        if (newQuantities[itemName] && newQuantities[itemName] > 0) {
            newQuantities[itemName] -= 1;
            setQuantities(newQuantities);
            setTotalAmount(totalAmount - price);
        }
    };

    const hasSelectedItems = Object.values(quantities).some(
        (quantity) => quantity > 0
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Ice-Bucket"} />
            <ScrollView>
                <View>
                    <FlatList
                        data={Object.keys(MenuData)}
                        renderItem={({ item }) => (
                            <View>
                                <SectionHeader title={item} />
                                <FlatList
                                    data={MenuData[item]}
                                    renderItem={({ item: menuItem }) => (
                                        <FoodItem
                                            item={menuItem}
                                            selectedQuantity={
                                                quantities[menuItem.name] || 0
                                            } // Display 0 if not selected
                                            onAdd={() =>
                                                handleAdd(
                                                    menuItem.name,
                                                    menuItem.price
                                                )
                                            }
                                            onRemove={() =>
                                                handleRemove(
                                                    menuItem.name,
                                                    menuItem.price
                                                )
                                            }
                                        />
                                    )}
                                    keyExtractor={(menuItem) => menuItem.id}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item}
                    />
                    <TotalAmount totalAmount={totalAmount} />
                </View>
            </ScrollView>
            {hasSelectedItems && (
                <Button
                    title="Proceed to Pay"
                    onPress={() =>
                        navigation.navigate("PaymentSummary", {
                            selectedItems: Object.entries(quantities),
                            totalAmount: totalAmount,
                            quantities: quantities,
                            setQuantities: setQuantities,
                            setTotalAmount: setTotalAmount,
                        })
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;

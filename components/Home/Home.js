import React, { useState } from "react";
import {
    View,
    Button,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    Linking,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuData } from "../Parts/MenuData";
import Header from "../Parts/Header";
import SectionHeader from "../Parts/SectionHeader";
import FoodItem from "../Parts/FoodItem";
import TotalAmount from "../Parts/TotalAMount";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Drawer = createDrawerNavigator();

const Home = () => {
    const navigation = useNavigation();
    const [quantities, setQuantities] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [showContactInfo, setShowContactInfo] = useState(false);

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
        <Drawer.Navigator
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Edit Profile"
                        onPress={() => navigation.navigate("UserDetails")}
                    />
                    <DrawerItem
                        label="Contact Info"
                        onPress={() => {
                            setShowContactInfo(true);
                        }}
                    />
                    <DrawerItem
                        label="Logout"
                        onPress={() => FIREBASE_AUTH.signOut()}
                    />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen name="Ice Bucket">
                {() => (
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
                                                renderItem={({
                                                    item: menuItem,
                                                }) => (
                                                    <FoodItem
                                                        item={menuItem}
                                                        selectedQuantity={
                                                            quantities[
                                                                menuItem.name
                                                            ] || 0
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
                                                keyExtractor={(menuItem) =>
                                                    menuItem.id
                                                }
                                            />
                                        </View>
                                    )}
                                    keyExtractor={(item) => item}
                                />
                            </View>
                        </ScrollView>
                        <View style={styles.totalAmountContainer}>
                            <TotalAmount totalAmount={totalAmount} />
                        </View>
                        {hasSelectedItems && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>
                                    navigation.navigate("PaymentSummary", {
                                        selectedItems:
                                            Object.entries(quantities),
                                        totalAmount: totalAmount,
                                        quantities: quantities,
                                        setQuantities: setQuantities,
                                        setTotalAmount: setTotalAmount,
                                    })
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Proceed to Pay
                                </Text>
                            </TouchableOpacity>
                        )}
                        <Modal
                            visible={showContactInfo}
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => setShowContactInfo(false)}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.detailsText}>
                                    Shop Owner: Bhagya Yasarathna
                                </Text>
                                <Text style={styles.detailsText}>
                                    Address: No. 177/3, Kopiwatta Road,
                                    Yagodamulla, Kotugoda
                                </Text>
                                <Text
                                    onPress={() =>
                                        Linking.openURL("tel:0775230841")
                                    }
                                    style={styles.click}
                                >
                                    Phone Number: 0775230841
                                </Text>
                                <Text
                                    onPress={() =>
                                        Linking.openURL(
                                            "mailto:bhagyayasarathna@gmail.com"
                                        )
                                    }
                                    style={styles.click}
                                >
                                    Email Address: bhagyayasarathna@gmail.com
                                </Text>

                                <Text style={styles.detailsText}>
                                    Facebook: Bhagya Yasarathna
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowContactInfo(false)}
                                >
                                    <Text style={styles.closeButton}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </SafeAreaView>
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    totalAmountContainer: {
        backgroundColor: "pink",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#0080ff",
        width: "100%",
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0.1,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    detailsText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        padding: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    closeButton: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    click: {
        color: "blue",
        fontSize: 20,
        fontWeight: "bold",
        padding: 15,
    },
});

export default Home;

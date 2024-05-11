// import React from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import Header from "../Parts/Header";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { getAuth } from "firebase/auth";
// import { db } from "../../FirebaseConfig";
// import { set, ref } from "firebase/database";

// const PaymentSummaryScreen = ({ route, navigation }) => {
//     const { selectedItems, totalAmount, setQuantities, setTotalAmount } =
//         route.params;

//     const handlePay = () => {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//             set(ref(db, "orders/" + user.uid), {
//                 Items: selectedItems,
//             }) // Use user's UID as the key
//                 .then(() => {
//                     setQuantities({});
//                     setTotalAmount(0);
//                     navigation.navigate("OrderPlaced");

//                     // navigation.navigate("Home");
//                 })
//                 .catch((error) => {
//                     console.error("Error saving user details: ", error);
//                     // Handle error
//                 });
//         } else {
//             console.error("User not logged in");
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <Header title={"Ice-Bucket"} />
//             <Text style={styles.header}>Selected Items</Text>
//             {Object.keys(selectedItems).map((itemName, index) => (
//                 <Text key={index}>{`${selectedItems[itemName]}`}</Text>
//             ))}
//             <Text style={styles.header}>Total Amount</Text>
//             <Text>$ {totalAmount}</Text>
//             <View style={{ marginVertical: 20 }}>
//                 <Button title="Pay" onPress={handlePay} />
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: "bold",
//         backgroundColor: "#F0E68C",
//         padding: 5,
//         marginTop: 10,
//         marginBottom: 5,
//     },
// });

// export default PaymentSummaryScreen;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../Parts/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";
import { db } from "../../FirebaseConfig";
import { set, ref, get } from "firebase/database";

const PaymentSummaryScreen = ({ route, navigation }) => {
    const { selectedItems, totalAmount, setQuantities, setTotalAmount } =
        route.params;
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            // Read user details from 'users' database
            get(ref(db, "users/" + user.uid))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserDetails(snapshot.val());
                    }
                })
                .catch((error) => {
                    console.error("Error reading user details: ", error);
                });
        }
    }, []);

    const handlePay = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const curremtTime = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            const currentDate = new Date().toISOString().slice(0, 10);
            // Combine user details and selected items
            const orderDetails = {
                userDetails: userDetails,
                items: selectedItems,
                totalAmount: totalAmount,
            };

            // Write order details to the 'orders' database
            set(
                ref(db, `${currentDate}/${user.uid}/${curremtTime}`),
                orderDetails
            )
                .then(() => {
                    setQuantities({});
                    setTotalAmount(0);
                    navigation.navigate("OrderPlaced");
                })
                .catch((error) => {
                    console.error("Error saving order details: ", error);
                });
        } else {
            console.error("User not logged in");
        }
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
            {/* {userDetails && (
                <View>
                    <Text style={styles.header}>User Details</Text>
                    <Text>Name: {userDetails.name}</Text>
                    <Text>Address: {userDetails.address}</Text>
                    <Text>Phone Number: {userDetails.phoneNumber}</Text>
                </View>
            )} */}
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

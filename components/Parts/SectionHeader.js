// SectionHeader.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SectionHeader = ({ title }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F0E68C", // your desired color
        padding: 10,
        marginBottom: 10,
        marginTop: 2.5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SectionHeader;

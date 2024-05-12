import { View, Text, StyleSheet, Image } from "react-native";

const Header = ({ logo }) => {
    return (
        <View style={styles.header}>
            {/* <Image source={logo} style={styles.logo} /> */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ice Bucket</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        padding: 10,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 25,
    },
    titleContainer: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        color: "lightyellow",
    },
});

export default Header;

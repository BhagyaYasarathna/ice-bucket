import { View, Text, StyleSheet } from "react-native";
import { Button, NativeBaseProvider, Center } from "native-base";
import { useState } from "react";
import MyButton from "./MyButton";

const Home = () => {
    const [visible, setvisible] = useState(false);

    const onPress = () => {
        console.log("Hello");
        setvisible(!visible);
    };

    return (
        <View style={styles.container}>
            <NativeBaseProvider>
                <Center>
                    <MyButton title={"Home"}/>
                    <MyButton title={"Profile"}/>
                </Center>
            </NativeBaseProvider>
            {visible && <Text>Hello</Text>}
            <Text>Hello</Text>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});

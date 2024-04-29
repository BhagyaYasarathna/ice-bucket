import { Button } from "native-base";
import { StyleSheet } from "react-native";

export default function MyButton({title}) {
    return <Button style={styles.button}>{title}</Button>;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        width: 100,
        margin: 5,
    },
});

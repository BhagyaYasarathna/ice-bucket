import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";

export default function MyButton({
    title,
    width,
    color,
    borderRadius,
    textAlign,
}) {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: color,
            width: width,
            marginBottom: 2.5,
            marginTop: 5,
            borderRadius: borderRadius,
            justifyContent: textAlign === "center" ? "center" : "flex-start",
            paddingLeft: textAlign === "center" ? 0 : 10,
        },
        buttonText: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
        },
    });

    return (
        <Button style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </Button>
    );
}

import { Text, View, StyleSheet, Dimensions } from "react-native";

const SIZE = 100;
const screen = Dimensions.get("screen");

export default function Avatar({ color = "#000", label, size = SIZE }) {
  const styles = createStyles({ color });
  return (
    <View style={styles.container}>
      <Text style={styles.initials}>{label}</Text>
    </View>
  );
}

const createStyles = ({ color }) =>
  StyleSheet.create({
    container: {
      flex: 0,
      width: SIZE,
      height: SIZE,
      borderRadius: 15,
      borderWidth: 8,
      borderStyle: "solid",
      borderColor: color,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: screen.height / 5.5,
    },
    initials: {
      fontSize: SIZE / 2.5,
      textTransform: "uppercase",
      color: color,
      fontWeight: "bold",
    },
  });

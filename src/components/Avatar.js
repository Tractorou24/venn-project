import { Text, View, StyleSheet } from "react-native";

const SIZE = 100;

export default function Avatar({
  color = "#000",
  label,
  size = SIZE,
  marginTop = 0,
  position,
}) {
  const styles = createStyles({ color, marginTop, position });
  return (
    <View style={styles.container}>
      <Text style={styles.initials}>{label}</Text>
    </View>
  );
}

const createStyles = ({ color, marginTop, position }) =>
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
      alignSelf: position,
      marginTop: marginTop,
    },
    initials: {
      fontSize: SIZE / 2.5,
      textTransform: "uppercase",
      color: color,
      fontWeight: "bold",
    },
  });

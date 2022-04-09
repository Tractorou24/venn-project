import { Text, View } from "react-native";

const SIZE = 48;

export default function Avatar({ color = "#000", label, size = SIZE }) {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
}

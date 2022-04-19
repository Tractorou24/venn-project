import {
  Pressable,
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";

import Avatar from "../components/Avatar";
import ColorContext from "../utils/ColorContext";
import useGetAll from "../hooks/useGetAll";

export default function Members() {
  const { data, loading } = useGetAll({ collection: "members" });
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    screen,
  });

  const onPress = () => {};

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data.length > 0) {
    return (
      <View>
        <Text>No members found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.separator}>
      <ScrollView style={styles.global}>
        {data.map((member) => (
          <View key={`${member.firstName}${member.lastName}`}>
            <Avatar
              label={
                member.firstName[0].toLocaleUpperCase() +
                " " +
                member.lastName[0].toLocaleUpperCase()
              }
              color={member.color}
              marginTop={screen.height / 90}
              position="center"
            />
          </View>
        ))}
        <View>
          <Pressable style={styles.Button} onPress={onPress}>
            <Text style={styles.buttonText}>Inviter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = ({ screen }) =>
  StyleSheet.create({
    separator: {
      padding: 10,
    },
    global: {
      flex: 0,
      backgroundColor: "#a7a8a7",
      flexDirection: "column",
      padding: 10,
      borderRadius: 10,
      height: screen.height / 5,
    },
    Button: {
      flex: 0,
      marginHorizontal: 50,
      backgroundColor: "black",
      color: "white",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      height: 35,
      marginTop: 10,
    },
    buttonText: {
      color: "white",
    },
  });

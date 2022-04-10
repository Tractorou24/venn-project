import { useContext, useState } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

import app from "../../app.json";
import Avatar from "../components/Avatar";
import ColorContext from "../utils/ColorContext";
import useGetAll from "../hooks/useGetAll";

export default function Identification({ navigation }) {
  const [, setColor] = useContext(ColorContext);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [member, setMember] = useState(null);
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    screen,
  });

  const { data, loading, dbError } = useGetAll({ collection: "members" });

  const onChange = (text) => {
    setError(false);
    setMember(null);
    setValue(text);
  };

  const onPress = () => {
    if (value.length > 0) {
      const userFound = data.find(({ lastName, firstName }) =>
        value.match(
          new RegExp(
            `(${firstName} ${lastName})|(${lastName} ${firstName})`,
            "i"
          )
        )
      );
      setMember(userFound);
      setError(!userFound);
      if (userFound) setColor(userFound.color);
    }
  };

  const onNavigateHomePressed = () => {
    navigation.navigate("Home");
  };
  /**/
  const header = (
    <View style={styles.header}>
      <Text style={styles.text}>{app.expo.name}</Text>
      <Image style={styles.image} source={require("../../assets/icon.png")} />
    </View>
  );

  if (member) {
    return (
      <View style={styles.global}>
        <View>{header}</View>
        <Avatar
          label={member.firstName?.[0] + " " + member.lastName?.[0]}
          color={member.color}
        />
        <Text style={styles.welcomeText}>
          Bienvenu(e) {member.firstName} {member.lastName} !
        </Text>
        <Pressable style={styles.button} onPress={onNavigateHomePressed}>
          <Text style={styles.buttonText}>Aller à l'accueil</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.global}>
      <View>{header}</View>
      <TextInput
        placeholder="Identifiant"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      {error ? <Text>Désolé, tu n'es pas enregistré(e).</Text> : null}
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>S'identifier</Text>
      </Pressable>
    </View>
  );
}

const createStyles = ({ screen }) =>
  StyleSheet.create({
    global: {
      flex: 0,
      justifyContent: "center",
    },
    input: {
      marginTop: screen.height / 2.8,
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
      marginHorizontal: 20,
      borderRadius: 5,
      marginBottom: 20,
    },
    header: {
      flex: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "black",
      borderBottomColor: "gray",
      height: 70,
    },
    image: {
      width: 50,
      height: 50,
      marginTop: 10,
    },
    text: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 18,
      marginRight: 100,
    },
    button: {
      flex: 0,
      marginHorizontal: 50,
      backgroundColor: "black",
      color: "white",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      height: 35,
    },
    buttonText: {
      color: "white",
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: screen.width / 4,
      marginTop: screen.height / 8,
      marginBottom: 20,
    },
  });

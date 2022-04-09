import { useContext, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";

import app from "../../app.json";
import Avatar from "../components/Avatar";
import ColorContext from "../utils/ColorContext";
import useGetAll from "../hooks/useGetAll";
import { toto } from "../Firebase";

export default function Identification() {
  const [, setColor] = useContext(ColorContext);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [member, setMember] = useState(null);

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

  const header = (
    <View>
      <Text>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} />
    </View>
  );

  if (member) {
    return (
      <View>
        {header}
        <Avatar label={member.firstName?.[0]} color={member.color} />
        <Text>
          Bienvenu(e) {member.firstName} {member.lastName} !
        </Text>
        <Button title="Aller à l'accueil" />
      </View>
    );
  }

  return (
    <View>
      <View>{header}</View>
      <TextInput
        placeholder="Identifiant"
        value={value}
        onChangeText={onChange}
      />
      {error ? <Text>Désolé, tu n'es pas enregistré(e).</Text> : null}
      <Button title="S'Identifier" onPress={onPress} />
    </View>
  );
}

import { Button, Text, View, ScrollView } from "react-native";

import Avatar from "../components/Avatar";
import ColorContext from "../utils/ColorContext";
import useGetAll from "../hooks/useGetAll";

export default function Members() {
  const { data, loading } = useGetAll({ collection: "members" });

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
    <View>
      <ScrollView>
        {data.map((member) => (
          <View key={`${member.firstName}${member.lastName}`}>
            <Avatar
              label={member.firstName[0].toLocaleUpperCase()}
              color={member.color}
            />
          </View>
        ))}
        <View>
          <Button title="Inviter" onPress={onPress} />
        </View>
      </ScrollView>
    </View>
  );
}

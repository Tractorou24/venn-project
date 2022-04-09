import { Text, View } from "react-native";

import Avatar from "./Avatar";
import useGetAll from "../hooks/useGetAll";

export default function Project({ project }) {
  const { data } = useGetAll({ collection: "members" });

  const avatars = project.participants
    .map((id) => {
      const participant = data.find((member) => member.id === id);
      if (!participant) return null;
      return {
        id,
        label: participant.firstName[0],
        color: participant.color,
      };
    })
    .filter(Boolean);

  return (
    <View key={project.id}>
      <Text>{project.title}</Text>
      <Text>{project.description}</Text>
      {avatars?.length > 0 && (
        <View>
          {avatars.map(({ id, label, color }) => (
            <View key={id}>
              <Avatar color={color} label={label} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

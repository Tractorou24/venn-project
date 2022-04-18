import { Text, View, Dimensions, StyleSheet } from "react-native";

import Avatar from "./Avatar";
import useGetAll from "../hooks/useGetAll";

export default function Project({ project }) {
  const { data } = useGetAll({ collection: "members" });
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    screen,
  });

  const avatars = project.participants
    .map((id) => {
      const participant = data.find((member) => member.id === id);
      if (!participant) return null;
      return {
        id,
        label: participant.firstName[0] + " " + participant.lastName[0],
        color: participant.color,
      };
    })
    .filter(Boolean);

  return (
    <View style={styles.separator}>
      <View key={project.id} style={styles.global}>
        <View style={styles.text}>
          <Text>{project.title}</Text>
          <Text>{project.description}</Text>
        </View>
        {avatars?.length > 0 && (
          <View>
            {avatars.map(({ id, label, color }) => (
              <View key={id}>
                <Avatar
                  color={color}
                  label={label}
                  marginTop={-(screen.height / 12)}
                />
              </View>
            ))}
          </View>
        )}
      </View>
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
    text: {
      fontSize: 14,
      alignSelf: "flex-end",
      marginHorizontal: 10,
      marginTop: screen.height / 15,
    },
  });

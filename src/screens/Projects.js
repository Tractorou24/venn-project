import { Text, View, ScrollView, Button, Pressable } from "react-native";

import ColorContext from "../utils/ColorContext";
import useGetAll from "../hooks/useGetAll";
import Project from "../components/Project";

export default function Projects({ navigation }) {
  const { data, loading } = useGetAll({ collection: "projects" });

  const onNewPressed = () => {
    navigation.navigate("NewProject");
  };
  const onProjectPressed = (id) => {
    navigation.navigate("ProjectDetails", { itemId: id });
  };

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
        <Text>No projects found.</Text>
        <Button onPress={onNewPressed} title="Create new"></Button>
      </View>
    );
  }

  return (
    <View>
      <Button onPress={onNewPressed} title="Create new"></Button>
      <ScrollView>
        {data.map((project) => (
          <Pressable
            key={project.id}
            onPress={() => onProjectPressed(project.id)}
            title=""
          >
            <Project key={project.id} project={project} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

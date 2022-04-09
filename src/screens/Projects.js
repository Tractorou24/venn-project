import { Text, View, ScrollView } from "react-native";

import ColorContext from "../utils/ColorContext";
import useGetAll from "../hooks/useGetAll";
import Project from "../components/Project";

export default function Projects() {
  const { data, loading } = useGetAll({ collection: "projects" });

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
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        {data.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </ScrollView>
    </View>
  );
}

import { Text, View, Button } from "react-native";
import Avatar from "../components/Avatar";

import useGetAll from "../hooks/useGetAll";

export default function ProjectDetails({ navigation, route }) {
  const itemId = route.params?.itemId;
  const { data, loading, error } = useGetAll({ collection: "projects" });
  const users = useGetAll({ collection: "members" });

  if (loading || users.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || users.error) {
    return (
      <View>
        <Text>Error...</Text>
      </View>
    );
  }

  const project = data.find(function (project) {
    return project.id == itemId;
  });

  const onEditPressed = () => {
    navigation.navigate("EditProject", { id: project.id });
  };

  var usersFind = [];
  for (var i = 0; i < users.data.length; i++) {
    if (project.participants.includes(users.data[i].id)) {
      usersFind.push(users.data[i]);
    }
  }

  return (
    <View>
      <Text>Name : {project.title}</Text>
      <Text>Description : {project.description}</Text>
      <Text>Users : </Text>
      {usersFind.map((user) => (
        <View key={user.id}>
          <Avatar
            color={user.color}
            label={user.firstName[0] + " " + user.lastName[0]}
            position="center"
          />
        </View>
      ))}
      <Button title="Edit" onPress={onEditPressed}></Button>
    </View>
  );
}

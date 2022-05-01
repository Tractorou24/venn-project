import { Text, View, ScrollView, Button } from "react-native";
import { useState } from "react";
import useGetAll from "../hooks/useGetAll";
export default function ProjectDetails({ route, navigation }) {
  const itemId = route.params?.itemId;
  const { data, loading, error } = useGetAll({ collection: "projects" });
  const users = useGetAll({ collection: "members" });
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (users.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  var project = data.find(function (project) {
    return project.id == itemId;
  });
  var usersFind = [];
  for (var i = 0; i < users.data.length; i++) {
    if (project.participants.includes(users.data[i].id)) {
      usersFind.push(users.data[i]);
    }
  }

  return (
    <View>
      <Text>{project.name}</Text>
      <Text>Description : {project.description}</Text>
      <Text>Users : </Text>
      {usersFind.map((user) => (
        <View key={`${user.firstName}${user.lastName}`}>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </View>
      ))}
    </View>
  );
}

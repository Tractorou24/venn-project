import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import Avatar from "../components/Avatar";

import useGetAll from "../hooks/useGetAll";

export default function ProjectDetails({ navigation, route }) {
  const itemId = route.params?.itemId;
  const { data, loading, error } = useGetAll({ collection: "projects" });
  const users = useGetAll({ collection: "members" });
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    screen,
  });

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
    <View style={styles.global}>
      <View style={styles.projectRender}>
        <Text style={styles.Text}>Name : {project.title}</Text>
        <Text style={styles.Text}>Description : {project.description}</Text>
        <Text>Users : </Text>
        {usersFind.map((user) => (
          <View key={user.id}>
            <Avatar
              color={user.color}
              label={user.firstName[0] + " " + user.lastName[0]}
              position="flex-start"
              size={90}
            />
          </View>
        ))}
      </View>
      <Pressable onPress={onEditPressed} style={styles.Button}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>
    </View>
  );
}

const createStyles = ({ screen }) =>
  StyleSheet.create({
    global: {
      flex: 1,
      justifyContent: "center",
    },
    projectRender: {
      backgroundColor: "#a7a8a7",
      marginBottom: 30,
      marginHorizontal: 20,
      borderRadius: 5,
      padding: 10,
    },
    Text: {
      fontSize: 20,
      alignSelf: "center",
      marginVertical: 5,
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

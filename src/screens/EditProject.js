import { useState, useRef } from "react";
import { View, Text, Button, TextInput } from "react-native";
import MultiSelect from "react-native-multiple-select";

import Avatar from "../components/Avatar";
import useGetAll from "../hooks/useGetAll";
import { editOne } from "../Firebase";

export default function EditProject({ route, navigation }) {
  const { data, loading, error } = useGetAll({ collection: "projects" });
  const users = useGetAll({ collection: "members" });
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const firstRender = useRef(true);

  if (loading || users.loading) return <Text>Loading...</Text>;
  if (error || users.error) return <Text>Error!</Text>;

  const project = data.find(function (element) {
    return element.id == route.params.id;
  });

  if (firstRender.current) {
    firstRender.current = false;
    setProjectName(project.title);
    setProjectDescription(project.description);
    setProjectMembers(project.participants);
  }

  const savePressed = () => {
    project.title = projectName;
    project.description = projectDescription;
    project.participants = projectMembers;
    editOne("projects", project);
    navigation.navigate("Home", { screen: "Projects" });
  };

  const cancelPressed = () => {
    navigation.navigate("Home", { screen: "Projects" });
  };

  const onSelectedItemsChange = (selectedItems) => {
    setProjectMembers(selectedItems);
  };

  const onTitleChange = (text) => {
    setProjectName(text);
  };

  const onDescriptionChange = (text) => {
    setProjectDescription(text);
  };

  return (
    <View>
      <Text>Edit Project</Text>
      <Text>Project Name</Text>
      <TextInput value={projectName} onChangeText={onTitleChange}></TextInput>
      <Text>Project Description</Text>
      <TextInput
        value={projectDescription}
        onChangeText={onDescriptionChange}
      ></TextInput>
      <MultiSelect
        hideTags
        items={users.data}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={projectMembers}
        selectText="Select Users"
        searchInputPlaceholderText="Search Users..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="firstName"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#2f79d4"
        submitButtonText="Submit"
      />
      {projectMembers.map((id) => (
        <View key={id}>
          <Avatar
            color={users.data.find((member) => member.id === id).color}
            label={
              users.data.find((member) => member.id === id).firstName[0] +
              " " +
              users.data.find((member) => member.id === id).lastName[0]
            }
            position="center"
          />
        </View>
      ))}
      <Button title="Save" onPress={savePressed}></Button>
      <Button title="Cancel" onPress={cancelPressed}></Button>
    </View>
  );
}

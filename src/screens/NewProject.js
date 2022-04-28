import { useState } from "react";

import { View, Button, TextInput, Text } from "react-native";
import MultiSelect from "react-native-multiple-select";
import Avatar from "../components/Avatar";

import useGetAll from "../hooks/useGetAll";
import setOne from "../Firebase";

export default function NewProject({ navigation }) {
  const { data, loading, error } = useGetAll({ collection: "members" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const returnToProjects = () => {
    navigation.navigate("Projects");
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedUsers(selectedItems);
  };

  const onTitleChange = (text) => {
    setProjectName(text);
  };

  const onDescriptionChange = (text) => {
    setProjectDescription(text);
  };

  const sendAndRedirect = () => {
    const data = {
      name: projectName,
      participants: selectedUsers,
      description: projectDescription,
    };
    setOne("projects", data);
    returnToProjects();
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Button onPress={returnToProjects} title="Cancel"></Button>
      <TextInput
        placeHolder="Project Name"
        onChangeText={onTitleChange}
      ></TextInput>
      <TextInput
        placeHolder="Project Description"
        onChangeText={onDescriptionChange}
      ></TextInput>
      <MultiSelect
        hideTags
        items={data}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedUsers}
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
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
      {selectedUsers.map((id) => (
        <View key={id}>
          <Avatar
            color={data.find((member) => member.id === id).color}
            label={data.find((member) => member.id === id).firstName[0]}
          />
        </View>
      ))}
      <Button title="Start Project" onPress={sendAndRedirect}></Button>
    </View>
  );
}

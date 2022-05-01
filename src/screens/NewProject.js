import { useState } from "react";

import {
  View,
  Button,
  TextInput,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import Avatar from "../components/Avatar";

import useGetAll from "../hooks/useGetAll";
import setOne from "../Firebase";

export default function NewProject({ navigation }) {
  const { data, loading, error } = useGetAll({ collection: "members" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const screen = Dimensions.get("screen");
  const styles = createStyles({
    screen,
  });

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
      <Pressable style={styles.exitButton} onPress={returnToProjects}>
        <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
      <Text style={styles.descInput}>Project Name</Text>
      <TextInput
        placeHolder="Project Name"
        onChangeText={onTitleChange}
        style={styles.textInput}
      ></TextInput>
      <Text style={styles.descInput}>Project Description</Text>
      <TextInput
        placeHolder="Project Description"
        onChangeText={onDescriptionChange}
        style={styles.textInput}
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
        submitButtonColor="#2f79d4"
        submitButtonText="Submit"
        styleDropdownMenuSubsection={styles.multiSelect}
        styleSelectorContainer={styles.multiSelect}
        styleTextDropdown={styles.multiSelectText}
        styleInputGroup={styles.inputGroup}
      />
      {selectedUsers.map((id) => (
        <View key={id}>
          <Avatar
            color={data.find((member) => member.id === id).color}
            label={
              data.find((member) => member.id === id).firstName[0] +
              " " +
              data.find((member) => member.id === id).lastName[0]
            }
            position="center"
          />
        </View>
      ))}
      <Pressable style={styles.Button} onPress={sendAndRedirect}>
        <Text style={styles.buttonText}>Start Project</Text>
      </Pressable>
    </View>
  );
}

const createStyles = ({ screen }) =>
  StyleSheet.create({
    Button: {
      flex: 0,
      marginHorizontal: 50,
      backgroundColor: "#1ec924",
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
    multiSelect: {
      marginHorizontal: 20,
      borderRadius: 5,
      //marginTop: 10,
    },
    exitButton: {
      flex: 0,
      backgroundColor: "#cf3325",
      color: "white",
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      marginTop: 29,
    },
    inputGroup: {
      borderTopEndRadius: 5,
      borderTopStartRadius: 5,
    },
    multiSelectText: {
      marginHorizontal: 20,
      borderRadius: 5,
    },
    textInput: {
      marginVertical: 20,
      marginHorizontal: 20,
      backgroundColor: "white",
      color: "black",
      borderRadius: 5,
      height: 35,
    },
    descInput: {
      marginHorizontal: 20,
      marginTop: 5,
    },
  });

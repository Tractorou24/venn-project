import { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
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
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    screen,
  });

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
    <View style={styles.global}>
      <Text style={styles.Text}>Edit Project</Text>
      <Text style={styles.Text}>Project Name</Text>
      <TextInput
        style={styles.edit}
        value={projectName}
        onChangeText={onTitleChange}
      ></TextInput>
      <Text style={styles.Text}>Project Description</Text>
      <TextInput
        value={projectDescription}
        onChangeText={onDescriptionChange}
        style={styles.edit}
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
        styleDropdownMenuSubsection={styles.multiSelect}
        styleSelectorContainer={styles.multiSelect}
        styleTextDropdown={styles.multiSelectText}
        styleInputGroup={styles.inputGroup}
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
      <Pressable style={styles.ButtonSave} onPress={savePressed}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={styles.ButtonCancel} onPress={cancelPressed}>
        <Text style={styles.buttonText}>Cancel</Text>
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
    ButtonSave: {
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
    ButtonCancel: {
      flex: 0,
      marginHorizontal: 50,
      backgroundColor: "#cf3325",
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
    Text: {
      fontSize: 20,
      alignSelf: "center",
      marginVertical: 5,
    },
    edit: {
      backgroundColor: "white",
      borderRadius: 5,
      marginHorizontal: 20,
      height: 50,
      marginVertical: 5,
    },
    multiSelectText: {
      marginHorizontal: 20,
      borderRadius: 5,
    },
    inputGroup: {
      borderTopEndRadius: 5,
      borderTopStartRadius: 5,
    },
    multiSelect: {
      marginHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      height: 50,
    },
  });

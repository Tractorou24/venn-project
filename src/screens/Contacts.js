/* eslint-disable prettier/prettier */

import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
} from "react-native";

import app from "../../app.json";
import * as Contacts from "expo-contacts";
import React, { useEffect } from "react";

export default function Contact() {
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [letterFilter, setLetterFilter] = useState("");
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    color: member?.favoriteColor,
    error,
    member: Boolean(member),
    screen,
  });

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
    </View>
  );
  const onNewPressed = (le) => {
    setLetterFilter(le);
  };

  var alphabet = new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(97 + i));
  function getContacts() {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data: dataContact } = await Contacts.getContactsAsync();
        if (dataContact.length > 0) {
          if (letterFilter == "") {
            setContacts(dataContact);
          } else {
            var result = dataContact.filter((item) => {
              if (item.firstName != null) {
                return item.firstName.toLowerCase().startsWith(letterFilter);
              }
            });
            setContacts(result);
          }
        }
      }
    })();
  }
  useEffect(() => {
    getContacts();
  }, [letterFilter]);

  return (
    <ScrollView style={styles.root}>
      {header}
      <View>
        {alphabet.map((letter, index) => (
          <View key={index}>
            <Pressable
              title={letter}
              onPress={() => onNewPressed(letter)}
              style={styles.Button}
            >
              <Text style={styles.buttonText}>{letter}</Text>
            </Pressable>
          </View>
        ))}
        <Pressable
          style={styles.Button}
          title="All"
          onPress={() => onNewPressed("")}
        >
          <Text style={styles.buttonText}>All</Text>
        </Pressable>
      </View>
      <View style={styles.separator}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.global}>
            <Text style={styles.contactName}>{contact.firstName}</Text>
            <Image
              source={
                contact.imageAvailable
                  ? contact.image
                  : require("../../assets/icon.png")
              }
              style={styles.logo}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const createStyles = ({ color, error, member, screen }) =>
  StyleSheet.create({
    root: {},
    header: {
      flex: 0,
      flexDirection: error || member ? "row" : "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: error || member ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: error || member ? 12 : 32,
      fontWeight: "700",
    },
    logo: {
      height: error || member ? 32 : 192,
      width: error || member ? 32 : 192,
      marginLeft: error || member ? 8 : 0,
      alignSelf: "center",
      marginVertical: 15,
    },
    greetings: {
      color: color,
      fontSize: 32,
      fontWeight: "700",
      paddingHorizontal: 32,
      textAlign: "center",
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
    actions: {
      marginVertical: 16,
    },
    contactName: {
      fontSize: 20,
      fontWeight: "700",
      alignSelf: "center",
      marginVertical: 5,
    },
    global: {
      flex: 0,
      backgroundColor: "#a7a8a7",
      flexDirection: "column",
      padding: 10,
      borderRadius: 10,
      height: screen.height / 3,
      margin: 10,
    },
    separator: {
      padding: 10,
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

/* eslint-disable prettier/prettier */

import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
} from "react-native";

import app from "../../app.json";
import * as Contacts from "expo-contacts";
import React, { useEffect } from "react";

export default function Contact() {
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [letterFilter, setLetterFilter] = useState("");
  const styles = createStyles({
    color: member?.favoriteColor,
    error,
    member: Boolean(member),
  });

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
    </View>
  );
  const onNewPressed = (le) => {
    setLetterFilter(le);
    console.log("onNewPressed");
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
          <View Key={index}>
            <Button
              title={letter}
              onPress={() => onNewPressed(letter)}
            ></Button>
          </View>
        ))}
      </View>
      <View>
        {contacts.map((contact) => (
          <View Key={contact.id}>
            <Text>{contact.firstName}</Text>
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

const createStyles = ({ color, error, member }) =>
  StyleSheet.create({
    root: {},
    header: {
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
  });

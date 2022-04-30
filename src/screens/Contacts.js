/* eslint-disable prettier/prettier */

import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";

import app from "../../app.json";
import * as Contacts from "expo-contacts";
import React, { useEffect } from "react";

export default function Contact() {
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const screen = Dimensions.get("screen");
  const styles = createStyles({
    color: member?.favoriteColor,
    error,
    member: Boolean(member),
    screen,
  });

  const filterItem = (curcat) => {
    const newItem = allContacts.filter((newVal) => {
      return newVal.category === curcat;
      // comparing category for displaying data
    });
    setContacts(newItem);
  };
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
    </View>
  );
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data: dataContact } = await Contacts.getContactsAsync();

        if (dataContact.length > 0) {
          setAllContacts(dataContact);
          setContacts(dataContact);
        }
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.root}>
      {header}
      <View style={styles.separator}>
        {contacts.map((contact) => (
          <View Key={contact.id} style={styles.global}>
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
  });

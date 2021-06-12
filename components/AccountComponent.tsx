import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AccountComponent(props: {
  edit: boolean;
  name: string;
  width: number;
  height: number;
}) {
  return (
    <View style={{...styles.accountContainer,  width: props.width, height: props.height}}>
      <View style={styles.accountImage} />
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountName}>Account {props.name}</Text>
        <Text style={styles.accountName}>Balance {props.name}</Text>
      </View>
      {props.edit && <FontAwesome name={"reorder"} size={25} style={styles.reorderIcon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1000
  },
  accountImage: {
    backgroundColor: "gray",
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  accountTextContainer: {
    justifyContent: "center",
  },
  accountName: {
    padding: 2,
  },
  reorderIcon: {
    position: "absolute",
    right: 10,
    color: "gray"
  },
});

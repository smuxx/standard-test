import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSharedValue } from "react-native-reanimated";

import AccountComponent from "../components/AccountComponent";
import SortableItemComponent from "../components/SortableItemComponent";

const windowWidth = Dimensions.get("window").width;
const childrenHeight = 60;
const accountContainerHeight = 50;

export default function TabThreeScreen() {
  const [editingHome, setEditingHome] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState([
    { id: "A" },
    { id: "B" },
    { id: "C" },
    { id: "D" },
    { id: "E" },
  ]);

  const toggleAndSaveEditing = () => {
    setEditingHome(!editingHome);
  };

  const offsets = dataEdit.map((_, index) => ({
    y: useSharedValue(index * childrenHeight),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Accounts</Text>
        <FontAwesome name={"angle-right"} size={30} color={"#e4e4e4"} />
      </View>

      <FlatList
        contentContainerStyle={{ height: childrenHeight * dataEdit.length }}
        scrollEnabled={editingHome}
        data={dataEdit}
        renderItem={({ item, index }) => {
          return (
            <SortableItemComponent
              key={index}
              offsets={offsets}
              index={index}
              item={{ height: childrenHeight, width: windowWidth }}
              deleteItem={() => {
                const newData = [...dataEdit];
                newData.splice(newData.indexOf(item), 1);
                setDataEdit(newData);
              }}
              editingHome={editingHome}
            >
              <AccountComponent
                name={item.id}
                edit={editingHome}
                width={windowWidth}
                height={childrenHeight}
              />
            </SortableItemComponent>
          );
        }}
      />

      {editingHome && (
        <View
          style={{
            ...styles.deleteContainer,
            top: childrenHeight * dataEdit.length + accountContainerHeight,
          }}
        >
          <Text style={styles.deleteText}>Release here to delete</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.editContainer}
        onPress={toggleAndSaveEditing}
      >
        {editingHome ? <Text>Save changes</Text> : <Text>Edit Home</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  account: {
    height: childrenHeight,
    width: "100%",
    alignItems: "center",
  },
  accountContainer: {
    height: accountContainerHeight,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountText: {
    fontSize: 18,
  },
  editContainer: {
    height: 50,
    backgroundColor: "#f2f2f2",
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 15,
  },
  deleteContainer: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe7e3",
    opacity: 0.3,
    position: "absolute",
  },
});

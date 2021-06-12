import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import AccountComponent from "../components/AccountComponent";
import { DragSortableView } from "react-native-drag-sort";

const { width, height } = Dimensions.get("window");

const parentWidth = width;
const childrenWidth = width;
const childrenHeight = 60;
const accountContainerHeight = 50;
const deleteContainerHeight = 100;

export default function TabOneScreen() {
  const headerHeight = useHeaderHeight();
  const [editingHome, setEditingHome] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState([
    { id: "A" },
    { id: "B" },
    { id: "C" },
    { id: "D" },
    { id: "E" },
  ]);
  const [deleteStatus, setDeleteStatus] = React.useState(0); // 0: common 1: wait 2: delete
  const [deleteIndex, setDeleteIndex] = React.useState(-1)

  const onDragStart = () => {
    setDeleteStatus(1);
  };

  const onDragEnd = (fromIndex: number, toIndex: number) => {
    if (deleteStatus === 2) {
      if (fromIndex === toIndex) {
        const newData = [...dataEdit];
        newData.splice(fromIndex, 1);
        setDataEdit(newData);
        setDeleteStatus(0);
      } else {
        setDeleteIndex(toIndex);
        setDeleteStatus(0);
      }
    } else {
      setDeleteStatus(0);
    }
  };

  const onDragging = (gestureState: any) => {
    if (
      gestureState.moveY - accountContainerHeight + headerHeight >=
        dataEdit.length * childrenHeight +
          accountContainerHeight +
          headerHeight + childrenHeight / 2 &&
      gestureState.moveY - accountContainerHeight + headerHeight <=
        dataEdit.length * childrenHeight +
          accountContainerHeight +
          headerHeight +
          deleteContainerHeight + childrenHeight / 2
    ) {
      setDeleteStatus(2);
    } else if (deleteStatus !== 1) {
      setDeleteStatus(1);
    }
  };

  const toggleAndSaveEditing = () => {
    setEditingHome(!editingHome);
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Accounts</Text>
        <FontAwesome name={"angle-right"} size={30} color={"#e4e4e4"} />
      </View>
      <View style={styles.listContainer}>
        <DragSortableView
          dataSource={dataEdit}
          parentWidth={parentWidth}
          isDragFreely={true}
          sortable={editingHome}
          childrenWidth={childrenWidth}
          childrenHeight={childrenHeight}
          onDragging={onDragging}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDataChange={(data: Array<{ id: string }>) => {
            if (deleteIndex !== -1) {
              const deleteID = deleteIndex;
              setDeleteIndex(-1);
              const newData = [...data];
              newData.splice(deleteID, 1);
              setDataEdit(newData);
            } else if (data.length != data.length) {
              setDataEdit(data);
            }
          }}
          keyExtractor={(item, _) => item.id}
          renderItem={(item: any, index: number) => (
            <AccountComponent
              name={item.id}
              edit={editingHome}
              width={childrenWidth}
              height={childrenHeight}
            />
          )}
        />
        {editingHome && (
          <View style={styles.deleteContainer}>
            <Text style={styles.deleteText}>
              {deleteStatus === 2 ? "Release here to delete" : "Deleting zone"}
            </Text>
          </View>
        )}
      </View>
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
  listContainer: {
    flex: 1,
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
  deleteText: {
    fontSize: 15,
  },
  deleteContainer: {
    height: deleteContainerHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe7e3",
    opacity: 0.3,
  },
});

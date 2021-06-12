import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  LayoutRectangle,
} from "react-native";

import PanGestureBox from "../components/PanGestureBox";
import love from "../assets/images/love.gif";
import ufo from "../assets/images/ufo.gif";
import muscle from "../assets/images/muscle.gif";

export default function TabTwoScreen() {
  const [container, setContainer] =
    React.useState<null | LayoutRectangle>(null);
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
    >
      <View style={styles.snapBox}>
        <Text>Snap images here</Text>
      </View>

      {container && (
        <PanGestureBox
          containerWidth={container.width}
          containerHeight={container.height}
          componentWidth={140}
          componentHeight={140}
          positionX={container.width - 140 - 20}
          positionY={330}
          snap={true}
          renderComponent={
            <View
              style={{
                backgroundColor: "transparent",
                width: 140,
                height: 140,
                position: "absolute",
              }}
            >
              <Image source={love} style={{ width: 140, height: 140 }} />
            </View>
          }
        />
      )}
      {container && (
        <PanGestureBox
          containerWidth={container.width}
          containerHeight={container.height}
          componentWidth={150}
          componentHeight={150}
          positionX={container.width - 150 - 60}
          positionY={180}
          snap={true}
          renderComponent={
            <View
              style={{
                backgroundColor: "transparent",
                width: 150,
                height: 150,
                position: "absolute",
              }}
            >
              <Image source={ufo} style={{ width: 150, height: 150 }} />
            </View>
          }
        />
      )}
      {container && (
        <PanGestureBox
          containerWidth={container.width}
          containerHeight={container.height}
          componentWidth={150}
          componentHeight={150}
          positionX={20}
          positionY={300}
          snap={true}
          renderComponent={
            <View
              style={{
                backgroundColor: "transparent",
                width: 150,
                height: 150,
                position: "absolute",
              }}
            >
              <Image source={muscle} style={{ width: 150, height: 150 }} />
            </View>
          }
        />
      )}
      {container && (
        <PanGestureBox
          containerWidth={container.width}
          containerHeight={container.height}
          componentWidth={250}
          componentHeight={30}
          positionX={(container.width - 250) / 2}
          positionY={container.height - 70}
          snap={false}
          renderComponent={
            <View
              style={{
                backgroundColor: "transparent",
                width: 250,
                height: 30,
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 14 }}>
                Try throwing texts and images around!
              </Text>
            </View>
          }
        />
      )}
      {container && (
        <PanGestureBox
          containerWidth={container.width}
          containerHeight={container.height}
          componentWidth={250}
          componentHeight={40}
          positionX={(container.width - 250) / 2}
          positionY={container.height - 50}
          snap={false}
          renderComponent={
            <View
              style={{
                backgroundColor: "transparent",
                width: 250,
                height: 50,
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 14, textAlign: "center" }}
                numberOfLines={2}
              >
                ©2021 Standard Protocol. All Rights Reserved. Privacy Policy.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  snapBox: {
    position: "absolute",
    height: 150, 
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderStyle: "dashed",
    borderWidth: 3,
    borderRadius: 15,
    opacity: 0.3,
    zIndex: 0,
    top: 30,
    left: 30
  }
});

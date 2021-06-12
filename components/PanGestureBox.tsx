import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { clamp, withBouncing, snapPoint } from "react-native-redash";

const GestureBox = (props: {
  containerWidth: number;
  containerHeight: number;
  renderComponent: any;
  componentWidth: number;
  componentHeight: number;
  positionX: number;
  positionY: number;
  snap: boolean;
}) => {
  const boundX = props.containerWidth - props.componentWidth;
  const boundY = props.containerHeight - props.componentHeight;

  const translateX = useSharedValue(props.positionX);
  const translateY = useSharedValue(props.positionY);

  const snapPointsX = [30];
  const snapPointsY = [30];

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: ({ translationY, translationX, velocityX, velocityY }) => {
      if (
        props.snap &&
        translateX.value < 170 - props.componentWidth / 2 &&
        translateY.value < 170 - props.componentHeight / 2
      ) {
        const snapPointX = snapPoint(translationX, velocityX, snapPointsX);
        const snapPointY = snapPoint(translationY, velocityY, snapPointsY);

        translateX.value = withSpring(snapPointX, { velocity: velocityX });
        translateY.value = withSpring(snapPointY, { velocity: velocityY });
      } else {
        translateX.value = withBouncing(
          withDecay({
            velocity: velocityX,
          }),
          0,
          boundX
        );
        translateY.value = withBouncing(
          withDecay({
            velocity: velocityY,
          }),
          0,
          boundY
        );
      }
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View {...{ style }}>{props.renderComponent}</Animated.View>
    </PanGestureHandler>
  );
};

export default GestureBox;

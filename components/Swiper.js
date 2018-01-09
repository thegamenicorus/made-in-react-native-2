import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Fonts, Colors } from "../themes";

const { width, height } = Dimensions.get("window");

export default class Swiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionAnimation: new Animated.ValueXY(0),
      acceptAnimation: new Animated.Value(0),
      animating: false,
      accepted: false
    };
    this.initPanResponder();
  }

  initPanResponder = () => {
    const {
      positionAnimation,
      acceptAnimation,
      animating,
      accepted
    } = this.state;
    const { acceptX, onAccept } = this.props;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        //this.state.animation.extractOffset();
        //this.state.animation.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        if (!animating) {
          const { dx, dy } = gestureState;
          if (dx > 0 && dx <= acceptX + 20) {
            positionAnimation.setValue({
              x: gestureState.dx,
              y: 0
            });

            if (dx >= acceptX - 20) {
              if (!animating) {
                this.setState({ animating: true, accepted: true });
                //onAccept();
                Animated.timing(acceptAnimation, {
                  toValue: 1,
                  duration: 400,
                  useNativeDriver: true
                }).start(({ finished }) => {
                  this.setState({ animating: false });
                  onAccept(finished);
                });
              }
            }
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (!animating && !accepted) {
          this.setState({ animating: true });
          Animated.timing(positionAnimation.x, {
            duration: 400,
            toValue: 0,
            useNativeDriver: true
          }).start(({ finished }) => {
            if (finished) {
              this.setState({ animating: false });
            }
          });
        }
      }
    });
  };

  render() {
    const {
      positionAnimation,
      acceptAnimation,
      accepted,
      animating
    } = this.state;
    const { text, acceptX } = this.props;
    const opacityInterpolate = positionAnimation.x.interpolate({
      inputRange: [0, acceptX],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const markerOpacityInterpolate = acceptAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const markerScaleInterpolate = acceptAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 20],
      extrapolate: "clamp"
    });
    const animatedStyle = {
      opacity: markerOpacityInterpolate,
      transform: positionAnimation.getTranslateTransform()
    };
    animatedStyle.transform.push({ scale: markerScaleInterpolate });
    const textOpacityAnimatedStyle = {
      opacity: accepted ? 0 : opacityInterpolate
    };
    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.marker, animatedStyle]}
        >
          <FontAwesome
            name="hand-pointer-o"
            size={36}
            color={Colors.snow}
            style={styles.icon}
          />
        </Animated.View>

        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Animated.Text style={[styles.text, textOpacityAnimatedStyle]}>
            {text}
          </Animated.Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: "100%",
    backgroundColor: Colors.app
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    zIndex: 2
  },
  icon: { opacity: 0.85, transform: [{ rotate: "90deg" }] },
  text: { ...Fonts.style.description, color: "white" }
});

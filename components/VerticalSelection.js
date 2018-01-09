import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from "react-native";

import { Fonts, Colors } from "../themes";

const HEIGHT = 50;
const WIDTH = 110;
const BORDER_WIDTH = 16;
const HIGHLIGHT_COLOR = "#57a8ef";
const ANIMATED_TIMING_DURATION = 100;

export default class VerticalSelection extends Component {
  constructor(props) {
    super(props);

    const selectedIndex = props.selectedIndex || -1;
    const data = props.data || [];
    const highlightColors = props.highlightColors || [HIGHLIGHT_COLOR];
    this.state = {
      selectedIndex: selectedIndex,
      data,
      highlightColors,
      highlightTranslateYAnimation: new Animated.Value(selectedIndex * HEIGHT)
    };
  }

  select = selectedIndex => {
    this.setState({ selectedIndex }, this.highlightAnimate);
  };

  highlightAnimate = () => {
    const { highlightTranslateYAnimation, selectedIndex } = this.state;
    Animated.timing(highlightTranslateYAnimation, {
      toValue: selectedIndex * HEIGHT,
      duration: ANIMATED_TIMING_DURATION
    }).start();
  };

  gethighlightAnimatedStyle = () => {
    const { selectedIndex, highlightTranslateYAnimation, data } = this.state;
    const lastIndex = data.length - 1;
    const inputRange = data.map((value, index) => index * HEIGHT);

    const topRadiusinterpolate = highlightTranslateYAnimation.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [BORDER_WIDTH, 0],
      extrapolate: "clamp"
    });

    const bottomRadiusinterpolate = highlightTranslateYAnimation.interpolate({
      inputRange: [(lastIndex - 1) * HEIGHT, lastIndex * HEIGHT],
      outputRange: [0, BORDER_WIDTH],
      extrapolate: "clamp"
    });

    return {
      borderTopLeftRadius: topRadiusinterpolate,
      borderTopRightRadius: topRadiusinterpolate,
      borderBottomLeftRadius: bottomRadiusinterpolate,
      borderBottomRightRadius: bottomRadiusinterpolate
    };
  };

  getHighlightColor = () => {
    const { selectedIndex, highlightColors } = this.state;
    return highlightColors[selectedIndex % highlightColors.length];
  };

  render() {
    const { highlightTranslateYAnimation, selectedIndex, data } = this.state;
    const { style } = this.props;
    return (
      <View style={style}>
        <View style={[StyleSheet.absoluteFill]}>
          <Animated.View
            style={[
              styles.highlight,
              {
                transform: [{ translateY: highlightTranslateYAnimation }],
                backgroundColor: this.getHighlightColor(),
                ...this.gethighlightAnimatedStyle()
              }
            ]}
          />
        </View>

        {data.map((menu, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => this.select(index)}
          >
            <View
              style={
                index === 0
                  ? styles.firstMenu
                  : index === data.length - 1
                    ? styles.lastMenu
                    : styles.generalMenu
              }
            >
              <Text
                style={[
                  styles.text,
                  { color: selectedIndex === index ? "white" : Colors.text }
                ]}
              >
                {menu}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  firstMenu: {
    borderWidth: 1,
    borderBottomWidth: 0,
    width: WIDTH,
    height: HEIGHT,
    padding: 10,
    borderTopLeftRadius: BORDER_WIDTH,
    borderTopRightRadius: BORDER_WIDTH,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  lastMenu: {
    borderWidth: 1,
    borderTopWidth: 0,
    width: WIDTH,
    height: HEIGHT,
    padding: 10,
    borderBottomLeftRadius: BORDER_WIDTH,
    borderBottomRightRadius: BORDER_WIDTH,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  generalMenu: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: WIDTH,
    height: HEIGHT,
    padding: 10,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  highlight: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: HIGHLIGHT_COLOR
  },
  text: {
    ...Fonts.style.description,
    backgroundColor: "transparent",
    color: Colors.text
  }
});

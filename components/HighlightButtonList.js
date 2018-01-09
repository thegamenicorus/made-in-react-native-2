import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from "react-native";
import PropTypes from "prop-types";

import { Colors, Metrics } from "../themes";

const HIGHLIGHT_COLOR = "#57a8ef";
const ANIMATED_TIMING_DURATION = 400;
const ANIMATED_STAGGER_DURATION = 100;

const HighlightButton = ({
  label,
  textStyle,
  textSelectedStyle,
  isSelected,
  onSelect
}) => (
  <TouchableWithoutFeedback onPress={onSelect}>
    <View style={[styles.center, styles.button]}>
      <Text style={isSelected ? textSelectedStyle : textStyle}>{label}</Text>
    </View>
  </TouchableWithoutFeedback>
);

export default class HighlightButtonList extends Component {
  constructor(props) {
    super(props);

    const data = props.data;
    const enterAnimations = data.map(
      () => new Animated.Value(Metrics.screenWidth)
    );
    const highlightAnimations = data.map(() => new Animated.Value(0));

    this.state = {
      selectedIndex: props.selectedIndex || -1,
      data,
      enterAnimations,
      highlightAnimations,
      highlighting: false
    };
  }

  componentDidMount() {
    this.enterAnimation();
  }

  createTimingAnimation = (
    controlVar,
    duration,
    toValue = 0,
    useNativeDriver = true
  ) => {
    return Animated.timing(controlVar, {
      toValue,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver
    });
  };

  createSelectHighlightAnimation = controlVar => {
    return this.createTimingAnimation(
      controlVar,
      ANIMATED_TIMING_DURATION,
      1,
      false
    );
  };

  createUnselectHighlightAnimation = controlVar => {
    return this.createTimingAnimation(
      controlVar,
      ANIMATED_TIMING_DURATION,
      0,
      false
    );
  };

  enterAnimation = () => {
    const { enterAnimations } = this.state;
    Animated.stagger(
      ANIMATED_STAGGER_DURATION,
      enterAnimations.map(animation =>
        this.createTimingAnimation(animation, ANIMATED_TIMING_DURATION)
      )
    ).start();
  };

  select = index => {
    const { selectedIndex, highlightAnimations, highlighting } = this.state;
    if (selectedIndex === index || highlighting) {
      return;
    }
    let animationSet = [
      this.createSelectHighlightAnimation(highlightAnimations[index])
    ];
    if (selectedIndex !== -1) {
      animationSet.push(
        this.createUnselectHighlightAnimation(
          highlightAnimations[selectedIndex]
        )
      );
    }
    this.setState({ selectedIndex: index, highlighting: true });
    Animated.parallel(animationSet).start(({ finished }) => {
      if (finished) {
        this.setState({ highlighting: false });
      }
    });
  };

  render() {
    const {
      selectedIndex,
      data,
      enterAnimations,
      highlightAnimations
    } = this.state;
    const { textStyle, textSelectedStyle, highlightColor } = this.props;
    return (
      <View style={styles.container}>
        {data.map((label, index) => {
          const highlightInterpolate = highlightAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp"
          });
          const highlightOpacityInterpolate = highlightAnimations[
            index
          ].interpolate({
            inputRange: [0, 0.1, 1],
            outputRange: [0, 0, 1],
            extrapolate: "clamp"
          });

          const highlightStyle = {
            width: highlightInterpolate,
            backgroundColor: highlightColor,
            opacity: highlightOpacityInterpolate
          };
          return (
            <Animated.View
              key={index}
              style={[
                styles.buttonContainer,
                { transform: [{ translateX: enterAnimations[index] }] },
                index > 0 ? styles.divider : null
              ]}
            >
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  styles.highlight,
                  //{ width: "100%", backgroundColor: "red" }
                  highlightStyle
                ]}
              />

              <HighlightButton
                onSelect={() => this.select(index)}
                label={label}
                textStyle={textStyle}
                textSelectedStyle={textSelectedStyle}
                isSelected={selectedIndex === index}
              />
            </Animated.View>
          );
        })}
      </View>
    );
  }
}

HighlightButtonList.propTypes = {
  highlightColor: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  textSelectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
};

HighlightButtonList.defaultProps = {
  highlightColor: HIGHLIGHT_COLOR
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  buttonContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border
  },
  highlight: {
    borderRadius: 50
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  divider: {
    marginTop: 15
  },
  button: { paddingVertical: 20 }
});

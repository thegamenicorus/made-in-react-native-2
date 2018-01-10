import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
  PanResponder,
  Animated
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import { Fonts, Colors, Metrics } from "../themes";

import ClockPNG from "../img/clock.png";
const HOUR_COLOR = "#1684e4";
const MINUTE_COLOR = "#78b9f2";
const CLOCK_SIZE = 270;
const CLOCK_BORDER = CLOCK_SIZE / 2;
const DEGREE_COEF = 180.0 / Math.PI;
const CIRCLE_ANGLE = 360;
const CLOCK_NUMBER_ANGLE = CIRCLE_ANGLE / 12;
const MINUTE_COEF = 5;

const Marker = ({ color }) => (
  <View
    style={[StyleSheet.absoluteFill, styles.markerContainer]}
    pointerEvents="none"
  >
    <View
      style={[
        styles.marker,
        {
          backgroundColor: color
        }
      ]}
    />
  </View>
);

const Hand = ({
  style,
  containerStyle,
  color,
  panResponder,
  animation,
  width
}) => {
  const degreeInterpolate = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"]
  });
  return (
    <Animated.View
      style={[
        styles.handContainer,
        { width, left: CLOCK_SIZE / 2 - width / 2 },
        containerStyle,
        {
          transform: [{ rotate: degreeInterpolate }]
        }
      ]}
    >
      <View
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        {...panResponder.panHandlers}
        style={[
          styles.hand,
          {
            borderLeftWidth: width / 2,
            borderRightWidth: width / 2
          },
          style,
          {
            borderBottomColor: color
          }
        ]}
      />
    </Animated.View>
  );
};

export default class TimePicker extends Component {
  constructor(props) {
    super(props);

    const current = moment();
    const hour = parseInt(current.format("h"));
    const min = Math.floor(parseInt(current.format("mm")) / MINUTE_COEF);
    const period = current.format("a");

    this.state = {
      period,
      hour,
      min,
      hourHandAnimation: new Animated.Value(hour * CLOCK_NUMBER_ANGLE),
      minuteHandAnimation: new Animated.Value(min * CLOCK_NUMBER_ANGLE)
    };
    this.createPanResponder();
  }

  componentDidMount() {
    //setTimout prevent zero result of .measure
    setTimeout(() => {
      this.refs.clock.measure((x, y, width, height, pageX, pageY) => {
        this.clockX = pageX + CLOCK_BORDER;
        this.clockY = pageY + CLOCK_BORDER;
      });
    }, 0);
  }

  createPanResponder = () => {
    const { hourHandAnimation, minuteHandAnimation } = this.state;

    this.minuteHandResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) =>
        this.onPanResponderMove(e, gestureState, minuteHandAnimation, "min"),
      onPanResponderRelease: (e, gestureState, animation) =>
        this.onPanResponderRelease(e, gestureState, minuteHandAnimation, "min")
    });

    this.hourHandResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) =>
        this.onPanResponderMove(e, gestureState, hourHandAnimation, "hour"),
      onPanResponderRelease: (e, gestureState, animation) =>
        this.onPanResponderRelease(e, gestureState, hourHandAnimation, "hour")
    });
  };

  onPanResponderMove = (e, gestureState, animation, stateName) => {
    const { pageX, pageY } = e.nativeEvent;

    let degree =
      Math.atan2(pageX - this.clockX, this.clockY - pageY) * DEGREE_COEF;
    if (degree < 0) {
      degree = CIRCLE_ANGLE + degree;
    }
    animation.setValue(degree);
    const clockNumber = Math.floor(degree / CLOCK_NUMBER_ANGLE);
    this.setState({ [stateName]: clockNumber }, this.onDrag);
  };

  onPanResponderRelease = (e, gestureState, animation, stateName) => {
    const clockNumber = this.state[stateName];
    Animated.spring(animation, {
      toValue: clockNumber * CLOCK_NUMBER_ANGLE,
      friction: 5
    }).start();
    this.onEndDrag();
  };

  padDigits(number, digits) {
    return (
      Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
    );
  }

  selectPeriod = period => {
    this.setState({ period });
  };

  getPeriodStyle = target => {
    const { period } = this.state;
    const { highlightColor } = this.props;
    return [
      styles.text,
      period === target
        ? {
            color: highlightColor
          }
        : null
    ];
  };

  onDrag = () => {
    const { onDrag } = this.props;
    if (onDrag) {
      onDrag();
    }
  };

  onEndDrag = () => {
    const { onEndDrag } = this.props;
    if (onEndDrag) {
      onEndDrag();
    }
  };

  render() {
    const {
      period,
      hourHandAnimation,
      minuteHandAnimation,
      hour,
      min
    } = this.state;
    const { markerColor, hourColor, minuteColor } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topMenu}>
          <View style={styles.periodContainer}>
            <TouchableWithoutFeedback
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={() => this.selectPeriod("am")}
            >
              <View>
                <Text style={this.getPeriodStyle("am")}>AM</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={() => this.selectPeriod("pm")}
            >
              <View>
                <Text style={this.getPeriodStyle("pm")}>PM</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.text}>
            {this.padDigits(hour, 2)}:{this.padDigits(min * MINUTE_COEF, 2)}{" "}
            {period.toUpperCase()}
          </Text>
        </View>

        <View style={styles.clockContainer}>
          <View ref="clock" collapsable={false}>
            <ImageBackground source={ClockPNG} style={styles.clock}>
              <Hand
                color={minuteColor}
                width={10}
                panResponder={this.minuteHandResponder}
                animation={minuteHandAnimation}
              />

              <Hand
                color={hourColor}
                width={24}
                panResponder={this.hourHandResponder}
                animation={hourHandAnimation}
                containerStyle={{
                  marginTop: CLOCK_SIZE / 4,
                  height: CLOCK_SIZE / 2
                }}
                style={{
                  borderBottomWidth: CLOCK_SIZE / 4
                }}
              />

              <Marker color={markerColor} />
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

TimePicker.propTypes = {
  hourColor: PropTypes.string.isRequired,
  minuteColor: PropTypes.string.isRequired,
  onDrag: PropTypes.func,
  onEndDrag: PropTypes.func
};

TimePicker.defaultProps = {
  hourColor: HOUR_COLOR,
  minuteColor: MINUTE_COLOR
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  periodContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-between"
  },
  markerContainer: { alignItems: "center", justifyContent: "center" },
  handContainer: {
    position: "absolute",
    height: CLOCK_SIZE,
    left: CLOCK_SIZE / 2,
    alignItems: "center"
  },
  clockContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center"
  },
  clock: {
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    borderRadius: CLOCK_BORDER
  },
  hand: {
    borderBottomWidth: CLOCK_SIZE / 2,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  topMenu: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: HOUR_COLOR
  },
  text: {
    ...Fonts.style.description,
    backgroundColor: "transparent",
    color: Colors.text
  }
});

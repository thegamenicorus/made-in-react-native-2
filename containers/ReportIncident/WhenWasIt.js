import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  ScrollView
} from "react-native";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";

import FooterControlButtons from "../../components/FooterControlButtons";

import { Fonts, Colors, Metrics } from "../../themes";
import { Header, Content, Footer } from "../../components/Structures";

import DatehistoryPicker from "../../components/DateHistoryPicker";
import TimePicker from "../../components/TimePicker";

export default class WhenWasIt extends Component {
  state = {
    datePickerAnimation: new Animated.Value(Metrics.screenWidth),
    timePickerAnimation: new Animated.Value(Metrics.screenWidth)
  };

  componentDidMount() {
    this.enterAnimation();
  }

  createTimingAnimation = (controlVar, duration) => {
    return Animated.timing(controlVar, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    });
  };

  enterAnimation = () => {
    const { datePickerAnimation, timePickerAnimation } = this.state;
    Animated.stagger(100, [
      this.createTimingAnimation(datePickerAnimation, 800),
      this.createTimingAnimation(timePickerAnimation, 800)
    ]).start();
  };

  goBack = () => {
    const { goBack } = this.context;
    const { navigation } = this.props;
    goBack();
    navigation.goBack();
  };

  goNext = () => {
    const { goNext } = this.context;
    const { navigation } = this.props;
    goNext();
    navigation.navigate("WhereItHappened");
  };

  render() {
    const { goBack, goNext } = this.context;
    const { datePickerAnimation, timePickerAnimation } = this.state;
    const timePickerOpacityInterpolate = timePickerAnimation.interpolate({
      inputRange: [0, Metrics.screenWidth / 3],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.textHeader}>When was it?</Text>
        </Header>
        <Content style={[styles.content]}>
          <Animated.View
            style={[
              styles.datePicker,
              { transform: [{ translateX: datePickerAnimation }] }
            ]}
          >
            <DatehistoryPicker historyDay={7} highlightColor={Colors.app} />
          </Animated.View>
          <Animated.View
            style={[
              styles.timeTopic,
              { transform: [{ translateX: timePickerAnimation }] }
            ]}
          >
            <Text style={styles.text}>Select approximate time</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.timePicker,
              { opacity: timePickerOpacityInterpolate }
            ]}
          >
            <TimePicker
              highlightColor={Colors.app}
              markerColor={Colors.primary}
              hourColor={Colors.app}
              minuteColor={Colors.secondary}
            />
          </Animated.View>
        </Content>
        <Footer style={styles.rowSpaceBetween}>
          <FooterControlButtons
            onBackpress={this.goBack}
            onNextPress={this.goNext}
          />
        </Footer>
      </View>
    );
  }
}

WhenWasIt.contextTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  datePicker: { height: 95 },
  timeTopic: {
    width: "100%",
    marginTop: 40,
    alignItems: "flex-start"
  },
  timePicker: {
    flex: 1,
    width: "100%",
    padding: 10,
    marginTop: 20
  },
  content: { alignItems: "center", paddingTop: 20 },
  scrollView: { flex: 1, width: "100%" },
  textHeader: {
    ...Fonts.style.topic,
    fontWeight: "600"
  },
  text: {
    ...Fonts.style.description,
    backgroundColor: "transparent",
    color: Colors.text
  },
  textSelected: {
    ...Fonts.style.description,
    backgroundColor: "transparent",
    color: Colors.snow
  }
});

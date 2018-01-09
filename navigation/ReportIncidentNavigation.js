import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

import Serverity from "../containers/ReportIncident/Serverity";
import WhatHappened from "../containers/ReportIncident/WhatHappened";
import WhereItIs from "../containers/ReportIncident/WhereItIs";
import WhenWasIt from "../containers/ReportIncident/WhenWasIt";
import WhereItHappened from "../containers/ReportIncident/WhereItHappened";

const styles = StyleSheet.create({
  noShadow: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0
    },
    shadowRadius: 0,
    elevation: 0
  }
});

const fade = screenProps => {
  const { position, scene } = screenProps;

  const index = scene.index;

  const translateX = 0;
  const translateY = 0;

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3]
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  };
};

const routes = {
  Serverity: { screen: Serverity },
  WhatHappened: { screen: WhatHappened },
  WhereItIs: { screen: WhereItIs },
  WhenWasIt: { screen: WhenWasIt },
  WhereItHappened: { screen: WhereItHappened }
};

const config = {
  headerMode: "none",
  cardStyle: styles.noShadow,
  navigationOptions: {
    gesturesEnabled: false
  },
  transitionConfig: () => ({
    screenInterpolator: screenProps => {
      return fade(screenProps);
    }
  })
};

export const Router = StackNavigator(routes, config);

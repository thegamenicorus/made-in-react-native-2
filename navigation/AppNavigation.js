import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

import Home from "../containers/Home";
import ReportIncident from "../containers/ReportIncident";

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

const routes = {
  Home: { screen: Home },
  ReportIncident: { screen: ReportIncident }
};

const config = {
  headerMode: "none",
  cardStyle: styles.noShadow,
  navigationOptions: {
    gesturesEnabled: false
  }
};

export const Router = StackNavigator(routes, config);

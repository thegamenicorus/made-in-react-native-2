import React, { Component } from "react";
import { StyleSheet, Platform, StatusBar, View } from "react-native";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";

import Breadcrumb from "../../components/Breadcrumb";
import { Router } from "../../navigation/ReportIncidentNavigation";

const MAX_STEP = 5;

export default class ReportIncident extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  getChildContext() {
    return { goBack: this.goBack, goNext: this.goNext };
  }

  goNext = page => {
    const { index } = this.state;
    if (index === MAX_STEP - 1) {
      this.goHome();
    } else {
      this.setState({
        index: index + 1
      });
    }
  };

  goBack = () => {
    const { index } = this.state;
    if (index === 0) {
      this.goHome();
    } else {
      this.setState({
        index: index - 1
      });
    }
  };

  goHome = () => {
    const { navigation } = this.props;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });
    navigation.dispatch(resetAction);
  };

  render() {
    const { index } = this.state;
    return (
      <View style={styles.container}>
        <Breadcrumb depth={MAX_STEP} currentIndex={index} />
        <Router />
      </View>
    );
  }
}

ReportIncident.childContextTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight
    })
  }
});

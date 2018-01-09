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
  state = {};

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
    const { contentAnimation, options } = this.state;
    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.textHeader}>When was it?</Text>
        </Header>
        <Content style={[styles.content]}>
          <View style={styles.datePicker}>
            <DatehistoryPicker historyDay={7} highlightColor={Colors.app} />
          </View>
          <View style={styles.timeTopic}>
            <Text style={styles.text}>Select approximate time</Text>
          </View>
          <View style={styles.timePicker}>
            <TimePicker
              highlightColor={Colors.app}
              markerColor={Colors.primary}
              hourColor={Colors.app}
              minuteColor={Colors.secondary}
            />
          </View>
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

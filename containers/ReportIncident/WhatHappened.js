import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  ScrollView
} from "react-native";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import FooterControlButtons from "../../components/FooterControlButtons";

import { Fonts, Colors, Metrics } from "../../themes";
import { Header, Content, Footer } from "../../components/Structures";

import HighlightButtonList from "../../components/HighlightButtonList";

export default class WhatHappened extends Component {
  state = {
    options: ["Fire", "Near Miss", "Injuries", "Theft", "Property Damage"]
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
    navigation.navigate("WhereItIs");
  };

  render() {
    const { goBack, goNext } = this.context;
    const { contentAnimation, options } = this.state;
    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.textHeader}>What happened?</Text>
        </Header>
        <Content style={[styles.content]}>
          <ScrollView style={styles.scrollView}>
            <HighlightButtonList
              data={options}
              highlightColor={Colors.app}
              textStyle={styles.text}
              textSelectedStyle={styles.textSelected}
            />
          </ScrollView>
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

WhatHappened.contextTypes = {
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

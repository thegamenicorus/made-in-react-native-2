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

import VerticalSelection from "../../components/VerticalSelection";

const AnimatedContent = Animated.createAnimatedComponent(Content);
export default class Serverity extends Component {
  state = {
    options: ["High", "Medium", "Slight", "Normal"],
    contentAnimation: new Animated.Value(Metrics.screenWidth)
  };

  componentDidMount() {
    this.enterAnimation();
  }

  enterAnimation = () => {
    const { contentAnimation } = this.state;
    Animated.timing(contentAnimation, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  };

  goNext = () => {
    const { goNext } = this.context;
    const { navigation } = this.props;
    goNext();
    navigation.navigate("WhatHappened");
  };

  render() {
    const { goBack, goNext } = this.context;
    const { contentAnimation, options } = this.state;
    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.textHeader}>Serverity?</Text>
        </Header>
        <AnimatedContent
          style={[
            styles.content,
            { transform: [{ translateX: contentAnimation }] }
          ]}
        >
          <ScrollView style={styles.scrollView}>
            <VerticalSelection
              selectedIndex={2}
              data={options}
              highlightColors={["#f5437b", "#FBBD71", "#7658d4", "#57a8ef"]}
            />
          </ScrollView>
        </AnimatedContent>
        <Footer style={styles.rowSpaceBetween}>
          <FooterControlButtons
            onBackpress={goBack}
            onNextPress={this.goNext}
          />
        </Footer>
      </View>
    );
  }
}

Serverity.contextTypes = {
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
  content: { alignItems: "center" },
  scrollView: { paddingTop: 60 },
  textHeader: {
    ...Fonts.style.topic,
    fontWeight: "600"
  }
});

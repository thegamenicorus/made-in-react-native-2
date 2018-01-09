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

import AnatomySelection from "../../components/AnatomySelection";

const AnimatedContent = Animated.createAnimatedComponent(Content);

export default class WhereItIs extends Component {
  state = { contentAnimation: new Animated.Value(Metrics.screenWidth) };

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
    navigation.navigate("WhenWasIt");
  };

  render() {
    const { goBack, goNext } = this.context;
    const { contentAnimation, options } = this.state;
    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.textHeader}>Where it is?</Text>
        </Header>
        <AnimatedContent
          style={[
            styles.content,
            { transform: [{ translateX: contentAnimation }] }
          ]}
        >
          <AnatomySelection />
        </AnimatedContent>
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

WhereItIs.contextTypes = {
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
  textHeader: {
    ...Fonts.style.topic,
    fontWeight: "600"
  }
});

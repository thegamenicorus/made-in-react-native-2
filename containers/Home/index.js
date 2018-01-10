import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  StatusBar
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";

import { Fonts, Colors, Metrics } from "../../themes";
import { Header, Content, Footer } from "../../components/Structures";
import Swiper from "../../components/Swiper";

const AnimatedHeader = Animated.createAnimatedComponent(Header);
const AnimatedContent = Animated.createAnimatedComponent(Content);
const AnimatedFooter = Animated.createAnimatedComponent(Footer);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerAnimation: new Animated.Value(Metrics.screenHeight),
      contentAnimation: new Animated.Value(Metrics.screenHeight),
      footerAnimation: new Animated.Value(Metrics.screenHeight),
      accept: false
    };
  }

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
    const { headerAnimation, contentAnimation, footerAnimation } = this.state;
    Animated.stagger(100, [
      this.createTimingAnimation(headerAnimation, 800),
      this.createTimingAnimation(contentAnimation, 800),
      this.createTimingAnimation(footerAnimation, 800)
    ]).start();
  };

  reportIncident = animationFinished => {
    this.setState({ accept: true });
    if (animationFinished) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "ReportIncident" })]
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  render() {
    const {
      headerAnimation,
      contentAnimation,
      footerAnimation,
      accept
    } = this.state;
    return (
      <View style={styles.container}>
        <AnimatedHeader
          style={[
            { transform: [{ translateY: headerAnimation }] },
            { opacity: accept ? 0 : 1 }
          ]}
        >
          <Text style={styles.textHeader}>Incident</Text>
          <TouchableOpacity onPress={() => alert("Report Incident")}>
            <MaterialCommunityIcons
              name="file-account"
              size={36}
              color={Colors.icon}
            />
          </TouchableOpacity>
        </AnimatedHeader>

        <AnimatedContent
          style={[
            styles.center,
            { transform: [{ translateY: contentAnimation }] }
          ]}
        >
          <Swiper
            text="Swipe to report incident"
            size={80}
            acceptX={Metrics.screenWidth - 120}
            onAccept={this.reportIncident}
          />
        </AnimatedContent>

        <AnimatedFooter
          style={[
            { transform: [{ translateY: footerAnimation }] },
            { opacity: accept ? 0 : 1 }
          ]}
        >
          <Text style={styles.textFooter}>Tips</Text>
          <Text style={styles.textDescription}>
            Take 3 photographs for proof
          </Text>
          <Text style={styles.textDescription}>
            Obtain the identity and personal details
          </Text>
          <Text style={styles.textDescription}>Specify the location</Text>
          <Text style={styles.textDescription}>
            Note down the vehicle number
          </Text>
        </AnimatedFooter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight + 20
    })
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  center: { alignItems: "center", justifyContent: "center" },
  textHeader: {
    ...Fonts.style.header
  },
  textFooter: {
    ...Fonts.style.normal,
    fontWeight: "600"
  },
  textDescription: {
    ...Fonts.style.description,
    marginTop: 5
  }
});

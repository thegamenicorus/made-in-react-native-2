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
import GoogleStaticMap from "react-native-google-static-map";
import FooterControlButtons from "../../components/FooterControlButtons";

import { Fonts, Colors, Metrics } from "../../themes";
import { Header, Content, Footer } from "../../components/Structures";

const MOCK_LOCATION_PROPS = {
  latitude: "18.791882",
  longitude: "98.9752863",
  zoom: 13,
  size: { width: Metrics.screenWidth - 40, height: 110 },
  apiKey: "AIzaSyCIZlerl4ubO2SmJMjVZbVTeTz9beaVyL4"
};

const AnimatedGoogleStaticMap = Animated.createAnimatedComponent(
  GoogleStaticMap
);

export default class WhereItHappened extends Component {
  state = {
    googleStaticMapAnimation: new Animated.Value(Metrics.screenWidth),
    otherLocationButtonAnimation: new Animated.Value(Metrics.screenWidth)
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
    const {
      googleStaticMapAnimation,
      otherLocationButtonAnimation
    } = this.state;
    Animated.stagger(100, [
      this.createTimingAnimation(googleStaticMapAnimation, 800),
      this.createTimingAnimation(otherLocationButtonAnimation, 800)
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
  };

  otherLocation() {
    alert("Other Location");
  }

  render() {
    const { goBack, goNext } = this.context;
    const {
      googleStaticMapAnimation,
      otherLocationButtonAnimation
    } = this.state;

    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.textHeader}>Where it happened?</Text>
        </Header>
        <Content style={[styles.content]}>
          <ScrollView>
            <AnimatedGoogleStaticMap
              style={[
                styles.map,
                { transform: [{ translateX: googleStaticMapAnimation }] }
              ]}
              {...MOCK_LOCATION_PROPS}
            />
            <TouchableWithoutFeedback onPress={this.otherLocation}>
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { transform: [{ translateX: otherLocationButtonAnimation }] }
                ]}
              >
                <Text style={styles.text}>Other Location</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
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

WhereItHappened.contextTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    padding: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border
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
    color: Colors.text
  },
  map: {
    borderRadius: 55
  }
});

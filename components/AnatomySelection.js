import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback
} from "react-native";

import { Metrics, Fonts, Colors } from "../themes";
import AnatomyImage from "../img/anatomy.png";

const Marker = ({ x, y }) => (
  <View
    style={[
      styles.markerOuter,
      {
        top: y - 6,
        left: x - 6
      }
    ]}
  >
    <View style={styles.markerInner} />
  </View>
);

export default class AnatomySelection extends Component {
  state = {
    positions: []
  };

  onPress = event => {
    const { positions } = this.state;
    const { locationX, locationY } = event.nativeEvent;

    positions.push({
      x: locationX,
      y: locationY
    });
    this.setState({ positions });
  };

  render() {
    const { positions } = this.state;

    return (
      <TouchableWithoutFeedback onPress={event => this.onPress(event)}>
        <View style={{ flex: 1, width: "100%" }}>
          <Image
            source={AnatomyImage}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.left}>
            <Text style={styles.text}>Left</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text}>Right</Text>
          </View>
          {positions.map((position, index) => (
            <Marker key={index} x={position.x} y={position.y} />
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.9
  },
  left: {
    position: "absolute",
    top: "30%",
    left: "5%"
  },
  right: {
    position: "absolute",
    top: "30%",
    right: "5%"
  },
  markerOuter: {
    position: "absolute",
    padding: 3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red"
  },
  markerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red"
  },
  text: {
    ...Fonts.style.description,
    color: Colors.text
  }
});

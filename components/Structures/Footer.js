import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class Footer extends Component {
  render() {
    const { style, children } = this.props;
    return <View style={[{ zIndex: 1 }, style]}>{children}</View>;
  }
}

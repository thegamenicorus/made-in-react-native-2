import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class Content extends Component {
  render() {
    const { style, children } = this.props;
    return <View style={[styles.container, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2
  }
});

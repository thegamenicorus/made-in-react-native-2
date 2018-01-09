import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { Fonts, Colors } from "../themes";

const footerControlButton = ({ onBackpress, onNextPress }) => (
  <View style={styles.rowSpaceBetween}>
    <TouchableWithoutFeedback
      onPress={onBackpress}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={20}
          color={Colors.icon}
        />
        <Text style={styles.text}>BACK</Text>
      </View>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback
      onPress={onNextPress}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <View
        style={{ padding: 10, backgroundColor: Colors.icon, borderRadius: 50 }}
      >
        <Feather name="arrow-right" size={20} color={Colors.snow} />
      </View>
    </TouchableWithoutFeedback>
  </View>
);

footerControlButton.propTypes = {
  onBackpress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  rowSpaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    ...Fonts.style.description,
    color: Colors.text,
    fontWeight: "600"
  }
});

export default footerControlButton;

import React, { Component } from "react";
import {
  View,
  ViewPropTypes,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform
} from "react-native";
import PropTypes from "prop-types";

const COLOR = "white";
const ACTIVE_COLOR = "#f5437b";

const Crumb = ({ index, zIndex, isActive, isLast, color, activeColor }) => {
  return (
    <View
      style={[
        styles.crumb,
        {
          zIndex,
          marginLeft: index > 0 ? -5 : 0
        }
      ]}
    >
      <View
        style={[
          styles.crumbSpace,
          {
            backgroundColor: isActive ? activeColor : color
          }
        ]}
      />
      {!isLast && (
        <View
          style={[
            styles.triangle,
            { backgroundColor: isActive ? activeColor : color }
          ]}
        />
      )}
    </View>
  );
};

Crumb.propTypes = {
  index: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired
};

Crumb.defaultProps = {
  zIndex: 1,
  isActive: false
};

const Breadcrumb = ({ currentIndex, height, depth, color, activeColor }) => {
  return (
    <View style={[styles.crumbsContainer, { height }]}>
      {Array(depth)
        .fill()
        .map((_, index) => (
          <Crumb
            index={index}
            key={index}
            zIndex={depth - index}
            color={color}
            activeColor={activeColor}
            isActive={index <= currentIndex}
            isLast={index === depth - 1}
          />
        ))}
    </View>
  );
};

Breadcrumb.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired
};

Breadcrumb.defaultProps = {
  height: 15,
  color: COLOR,
  activeColor: ACTIVE_COLOR
};

const styles = StyleSheet.create({
  crumbsContainer: {
    flexDirection: "row"
  },
  crumb: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  crumbSpace: {
    flex: 1,
    height: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dfe2e8"
  },
  triangle: {
    width: 10,
    height: 10,
    marginLeft: -5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "#dfe2e8",
    transform: [{ rotate: "45deg" }]
  }
});

export default Breadcrumb;

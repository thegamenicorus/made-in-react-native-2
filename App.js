import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

//import Home from "./containers/Home";
import { Router } from "./navigation/AppNavigation";
import Breadcrumb from "./components/Breadcrumb";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Router />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

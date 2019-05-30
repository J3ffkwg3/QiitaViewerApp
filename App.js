import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { SafeAreaView } from "react-navigation";
import { Provider, Subscribe } from "unstated";
import StateContainer from "./unstated/StateContainer";

class AppScreen extends React.Component {
  componentDidMount() {
    this.props.app.init();
  }

  render() {
    const { app } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    );
  }
}

export default (App = () => (
  <Provider>
    <Subscribe to={[StateContainer]}>
      {app => <AppScreen app={app} />}
    </Subscribe>
  </Provider>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6fb536",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import TagScreen from "../screens/TagScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
  //Search: SearchScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "新着",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const SearchStack = createStackNavigator({
  Search: SearchScreen
});

SearchStack.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const TagStack = createStackNavigator({
  Tag: TagScreen
});

TagStack.navigationOptions = {
  tabBarLabel: "Tag",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    TagStack,
    SearchStack
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "grey",
      indicatorStyle: {
        color: "white"
      },

      style: {
        backgroundColor: "#6fb536"
      }
    }
  }
);

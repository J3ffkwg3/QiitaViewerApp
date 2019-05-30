import React from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Linking,
  RefreshControl
} from "react-native";
import { WebBrowser } from "expo";
import axios from "axios";

import { MonoText } from "../components/StyledText";
import PostLink from "./PostLink";
import SearchBox from "./SearchBox";
import { Subscribe } from "unstated";
import StateContainer from "../unstated/StateContainer";
import PostIndex from "../components/PostIndex";

export default class AddScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const id = this.props.id;
    return (
      <Subscribe to={[StateContainer]}>
        {home => (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={home.state.refreshing}
                onRefresh={() => home.onRefreshAddScreen()}
              />
            }
          >
            <View styles={{ flex: 1, alignItems: "center" }}>
              <SearchBox />
              {home.state.posts.map((posts, i) => {
                const title = posts.title;
                const link = posts.url;
                const likes = posts.likes;
                const comments = posts.comments;
                const icon = posts.icon;
                const user = posts.user;
                return (
                  <PostIndex
                    key={id + i}
                    onPress={link}
                    title={title}
                    icon={icon}
                    user={user}
                    likes={likes}
                    comments={comments}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </Subscribe>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    minHeight: 60,
    margin: 10,
    backgroundColor: "#6fb536",
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 10
  },
  details: {
    marginTop: 10,
    marginRight: 10,
    color: "white"
  }
});

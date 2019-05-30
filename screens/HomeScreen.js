import React from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { Subscribe } from "unstated";
import StateContainer from "../unstated/StateContainer";
import PostIndex from "../components/PostIndex";
import { news } from "../components/api";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {home => (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={home.state.refreshing}
                onRefresh={() => home.onRefresh(news, "pages")}
              />
            }
          >
            <View styles={{ flex: 1, alignItems: "center" }}>
              {home.state.pages.map((pages, i) => {
                const title = pages.title;
                const link = pages.url;
                const likes = pages.likes;
                const comments = pages.comments;
                const icon = pages.icon;
                const user = pages.user;
                return (
                  <PostIndex
                    key={i}
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

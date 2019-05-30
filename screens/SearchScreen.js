import React from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import SearchBox from "./SearchBox";
import { Subscribe } from "unstated";
import StateContainer from "../unstated/StateContainer";
import PostIndex from "../components/PostIndex";

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {search => (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={search.state.refreshing}
                onRefresh={() => search.onRefreshSearch()}
              />
            }
          >
            <View styles={{ flex: 1, alignItems: "center" }}>
              <SearchBox />
              {search.state.searchPages.map((searchPages, i) => {
                const title = searchPages.title;
                const link = searchPages.url;
                const likes = searchPages.likes;
                const comments = searchPages.comments;
                const icon = searchPages.icon;
                const user = searchPages.user;
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

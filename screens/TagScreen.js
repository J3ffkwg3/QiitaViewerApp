import React from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import SearchBox from "./SearchBox";
import { Subscribe } from "unstated";
import StateContainer from "../unstated/StateContainer";
import PostIndex from "../components/PostIndex";
import TagPicker from "../components/TagPicker";

export default class TagScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {tag => (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={tag.state.refreshing}
                onRefresh={() => tag.onRefreshTags()}
              />
            }
          >
            <View styles={{ flex: 1, alignItems: "center" }}>
              <TagPicker />
              {tag.state.tagPages.map((tagPages, i) => {
                const title = tagPages.title;
                const link = tagPages.url;
                const likes = tagPages.likes;
                const comments = tagPages.comments;
                const icon = tagPages.icon;
                const user = tagPages.user;
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

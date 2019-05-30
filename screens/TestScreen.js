import React from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import axios from "axios";

import { MonoText } from "../components/StyledText";
import PostLink from "./PostLink";
import SearchBox from "./SearchBox";

export default class TestScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    postCache: [],
    search: "react"
  };

  componentWillMount() {
    this.requestPost();
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View styles={{ flex: 1, alignItems: "center" }}>
          {this.state.postCache.map((postCache, i) => {
            const link = postCache.url;
            return (
              <TouchableOpacity
                key={i}
                style={styles.post}
                onPress={() => Linking.openURL(link)}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  {postCache.title}
                </Text>
                <View
                  style={{
                    height: 30,
                    marginTop: 10,
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={{ uri: postCache.icon }}
                    style={{ height: 30, width: 30, marginRight: 10 }}
                  />
                  <Text
                    style={{ marginTop: 10, marginRight: 10, color: "white" }}
                  >
                    {postCache.user}
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginRight: 10, color: "white" }}
                  >
                    {postCache.likes} Like
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginRight: 10, color: "white" }}
                  >
                    {postCache.comments} Comments
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  testFunc() {}

  requestPost() {
    let cache = this.state.postCache;
    let addCache = [];
    //console.log(cache);
    const url = `https://qiita.com/api/v2/tags/${
      this.state.search
    }/items?page=1&per_page=20`;
    //console.log(url);
    axios
      .get(url)
      .then(res => {
        const items = res.data;
        for (const item of items) {
          const addData = {
            title: item.title,
            user: item.user.id,
            icon: item.user.profile_image_url,
            url: item.url,
            likes: item.likes_count,
            comments: item.comments_count
          };
          addCache.push(addData);
          console.log(addCache);
        }

        this.setState({
          postCache: cache.concat(addCache)
        });
      })
      .catch(error => {
        const { status, statusText } = error.response;
        console.log(`error: ${status} ${statusText}`);
      });
  }

  browse() {
    WebBrowser.openBrowserAsync(this.state.postCache.url);
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
  }
});

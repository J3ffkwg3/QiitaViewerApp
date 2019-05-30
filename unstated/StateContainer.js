import { Container } from "unstated";
import { Linking } from "react-native";
import axios from "axios";
import { news, tags } from "../components/api";

export default class StateContainer extends Container {
  state = {
    searchWord: "",
    pages: [],
    searchPages: [],
    tagPages: [],
    tabPages: [],
    tag: "JavaScript",
    tabArray: [],
    refreshing: false
  };

  init() {
    this.getPages(news, "pages");
  }

  getPages(url, pages) {
    const addCache = [];
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
        }
        const set = { [pages]: addCache };
        this.setState(set);
      })
      .catch(error => {
        const { status, statusText } = error.response;
        console.log(`error: ${status} ${statusText}`);
      });
  }

  browse() {
    Linking.openBrowserAsync(this.state.posts.url);
  }

  search(word, pages) {
    const api = tags + `${word}` + "/items?page=1&per_page=30";
    this.getPages(api, pages);
  }

  onRefresh = async (url, pages) => {
    this.setState({ refreshing: true });
    await this.getPages(url, pages);
    this.setState({ refreshing: false });
  };

  onRefreshSearch = async () => {
    this.setState({ refreshing: true });
    await this.search(this.state.searchWord, "searchPages");
    this.setState({ refreshing: false });
  };

  onRefreshTags = async () => {
    this.setState({ refreshing: true });
    await this.search(this.state.tag, "tagPages");
    this.setState({ refreshing: false });
  };

  onChangeTags(value) {
    this.setState({ tag: value });
    console.log(value);
    this.search(value, "tagPages");
  }
}

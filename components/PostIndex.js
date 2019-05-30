import React from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from "react-native";

export default class PostIndex extends React.Component {
  render() {
    return (
      <TouchableOpacity
        //key={this.props.key}
        style={styles.post}
        onPress={() => Linking.openURL(this.props.onPress)}
      >
        <Text style={{ fontSize: 18, color: "white" }}>{this.props.title}</Text>
        <View
          style={{
            height: 30,
            marginTop: 10,
            flexDirection: "row"
          }}
        >
          <Image
            source={{ uri: this.props.icon }}
            style={{ height: 30, width: 30, marginRight: 10 }}
          />
          <Text style={styles.details}>{this.props.user}</Text>
          <Text style={styles.details}>{this.props.likes} Like</Text>
          <Text style={styles.details}>{this.props.comments} Comments</Text>
        </View>
      </TouchableOpacity>
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

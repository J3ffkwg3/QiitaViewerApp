import React from "react";
import { ScrollView, View, RefreshControl, Picker } from "react-native";
import { Subscribe } from "unstated";
import StateContainer from "../unstated/StateContainer";
import PostIndex from "../components/PostIndex";

export default class TagPicker extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {tag => (
          <Picker
            selectedValue={tag.state.tag}
            style={{ flex: 1, height: 130, marginLeft: 40, marginRight: 40 }}
            onValueChange={value => tag.onChangeTags(value)}
          >
            <Picker.Item label="JavaScript" value="JavaScript" />
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="Rails" value="Rails" />
            <Picker.Item label="React" value="React" />
          </Picker>
        )}
      </Subscribe>
    );
  }
}

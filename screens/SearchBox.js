import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Subscribe } from "unstated";
import StateContainer from "../unstated/StateContainer";

export default class SearchBox extends React.Component {
  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {search => (
          <View>
            <TextInput
              placeholder="Search"
              onChangeText={text => search.setState({ searchWord: text })}
              style={styles.input}
              onSubmitEditing={() =>
                search.search(search.state.searchWord, "searchPages")
              }
            />
          </View>
        )}
      </Subscribe>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 20,
    height: 30,
    fontSize: 20,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5
  }
});

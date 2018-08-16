import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Posts from "../components/Posts";
import RequestApi from "../constants/RequestApi";
import { ColorMode } from "../constants/Colors";

export default class DemoScreen extends React.Component {
  state = {
    posts: [],
    loading: true
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Trending Posts",
      headerRight: (
        <Button
          onPress={() => {
            navigation.navigate("AccessNav");
          }}
          title="Log In / Sign Up"
          color="green"
        />
      )
    };
  };
  fetchPosts = async () => {
    const response = await RequestApi("trendingPolls");
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      alert(response.statusText);
      return undefined;
    }
  };
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.lightbg
      }
    });

    return (
      <View style={styles.container}>
        <Posts
          navigation={this.props.navigation}
          fetchPosts={this.fetchPosts}
          loggedIn={false}
        />
      </View>
    );
  }
}

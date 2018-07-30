import React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import Poll from "../components/Poll";
import ActionButton from "react-native-action-button";
import { Icon } from "expo";
import Posts from "../components/Posts";
export default class HomeScreen extends React.Component {
  state = {
    authUser: null,
    authUserId: null,
    posts: [],
    loading: true
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Trending Posts"
    };
  };
  fetchAuthUser = async () => {
    try {
      const authUser = await AsyncStorage.getItem("authUser");
      const authUserId = await AsyncStorage.getItem("authUserId");
      if (authUser !== null && authUserId != null) {
        // We have data!!
        this.setState({ authUser, authUserId });
      }
    } catch (error) {
      alert(error);
    }
  };
  fetchPosts = async () => {
    const response = await fetch(
      "https://poll-in.herokuapp.com/trending-polls",
      {
        method: "GET"
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      alert(response.statusText);
      return undefined;
    }
  };
  componentDidMount = async () => {
    await this.fetchAuthUser();
  };
  render() {
    return (
      <Posts
        navigation={this.props.navigation}
        fetchPosts={this.fetchPosts}
        authUser={this.state.authUser}
        authUserId={this.state.authUserId}
        loggedIn={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#112"
  },
  heading: {
    fontSize: 30,
    color: "lime",
    marginLeft: 15
  },
  loader: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  }
});

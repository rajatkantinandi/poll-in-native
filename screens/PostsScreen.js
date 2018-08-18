import React from "react";
import { AsyncStorage } from "react-native";
import Posts from "../components/Posts";
import RequestApi from "../constants/RequestApi";

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
    const response = await RequestApi("trendingPolls");
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
        demoMode={false}
        theme={this.props.screenProps.theme}
      />
    );
  }
}

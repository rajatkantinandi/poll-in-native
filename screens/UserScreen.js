import React from "react";
import { StyleSheet, Text, Button, View, AsyncStorage } from "react-native";
import Posts from "../components/Posts";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("authUser") || "Profile",
      headerRight: (
        <Button
          onPress={async () => {
            await navigation.getParam("logout")();
          }}
          title="Log Out"
          color="red"
        />
      )
    };
  };
  state = {
    authUser: null,
    authUserId: null,
    posts: [],
    loading: true
  };
  logout = async () => {
    await AsyncStorage.removeItem("authUser");
    await AsyncStorage.removeItem("authUserId");
    this.props.navigation.navigate("Login");
  };
  fetchPosts = async () => {
    await this.fetchAuthUser();
    const response = await fetch(
      "https://poll-in.herokuapp.com/u/" + this.state.authUserId,
      {
        method: "GET"
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result.polls.reverse();
    } else {
      alert(response.statusText);
      return undefined;
    }
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
  componentDidMount = async () => {
    await this.fetchAuthUser();
    this.props.navigation.setParams({
      authUser: this.state.authUser,
      logout: this.logout
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Recent Posts</Text>
        <Posts
          navigation={this.props.navigation}
          fetchPosts={this.fetchPosts}
          authUser={this.state.authUser}
          authUserId={this.state.authUserId}
          loggedIn={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    padding: 10,
    fontFamily: "sans-serif",
    fontWeight: "bold"
  }
});

import React from "react";
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  ScrollView
} from "react-native";
import Poll from "./Poll";
import ActionButton from "react-native-action-button";
import { Icon } from "expo";

export default class Posts extends React.Component {
  state = {
    posts: [],
    loading: true
  };
  refresh = async () => {
    this.setState({ loading: true });
    const posts = await this.props.fetchPosts();
    if (posts) {
      this.setState({ posts, loading: false });
    }
  };
  _keyExtractor = (item, index) => item["_id"];
  componentDidMount = async () => {
    this.props.navigation.setParams({
      refresh: this.refresh
    });
    const posts = await this.props.fetchPosts();
    if (posts) {
      this.setState({ posts, loading: false });
    }
  };
  addNewPoll = async (question, numOfOptions, optionsObj) => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        question: question,
        numOfOptions: numOfOptions,
        ...optionsObj
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      "https://poll-in.herokuapp.com/create-poll",
      data
    );
    if (response.ok) {
      const posts = await this.props.fetchPosts();
      if (posts) {
        this.setState({ posts, loading: false });
      }
      alert("Posted !!");
    } else alert("Error");
  };
  deletePoll = async pollid => {
    const responseDelete = await fetch(
      "https://poll-in.herokuapp.com/deletepoll?userid=" +
        this.props.authUserId +
        "&id=" +
        pollid
    );
    if (responseDelete.ok) {
      alert("Deleted!");
      this.setState({
        posts: this.state.posts.filter(elem => {
          return elem._id != pollid;
        })
      });
    } else {
      alert("Error: " + responseDelete.statusText);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && (
          <View style={styles.loader}>
            <ActivityIndicator color="lime" size="large" />
            <Text style={styles.heading}>Loading...</Text>
          </View>
        )}
        <ActionButton
          buttonColor="green"
          style={{ zIndex: 10 }}
          renderIcon={active => {
            if (active)
              return <Icon.Ionicons name="md-add" size={35} color="white" />;
            else
              return <Icon.Ionicons name="md-menu" size={35} color="white" />;
          }}
          size={70}
        >
          {this.props.loggedIn && (
            <ActionButton.Item
              buttonColor="green"
              title="New Poll"
              onPress={() =>
                this.props.navigation.navigate("NewPoll", {
                  addNewPoll: this.addNewPoll
                })
              }
            >
              <Icon.Ionicons name="md-create" color="white" size={25} />
            </ActionButton.Item>
          )}
          <ActionButton.Item
            buttonColor="blue"
            title="Refresh"
            onPress={() => this.refresh()}
          >
            <Icon.Ionicons name="md-refresh" color="white" size={25} />
          </ActionButton.Item>
        </ActionButton>
        <ScrollView>
          <FlatList
            data={this.state.posts}
            renderItem={({ item }) => (
              <Poll
                poll={item}
                navigation={this.props.navigation}
                authUser={this.props.authUser}
                authUserId={this.props.authUserId}
                deletePoll={this.deletePoll}
                loggedIn={this.props.loggedIn}
              />
            )}
            keyExtractor={this._keyExtractor}
          />
        </ScrollView>
      </View>
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

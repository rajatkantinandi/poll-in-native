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
import RequestApi from "../constants/RequestApi";
import { ColorMode } from "../constants/Colors";
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
      userid: this.props.authUserId,
      question: question,
      numOfOptions: numOfOptions,
      ...optionsObj
    };
    const response = await RequestApi("newPoll", data);
    if (response.ok) {
      const posts = await this.props.fetchPosts();
      if (posts) {
        this.setState({ posts, loading: false });
      }
      alert("Posted !!");
    } else alert("Error" + response.status);
  };
  deletePoll = async pollid => {
    const responseDelete = await RequestApi("deletePoll", [
      this.props.authUserId,
      pollid
    ]);
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
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.darkbg
      },
      heading: {
        fontSize: 17,
        color: Colors.loadingTxt,
        marginLeft: 5
      },
      loader: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 4
      }
    });
    return (
      <View style={styles.container}>
        {this.state.loading && (
          <View style={styles.loader}>
            <ActivityIndicator color={Colors.loadingTxt} size="small" />
            <Text style={styles.heading}>Loading...</Text>
          </View>
        )}
        <ActionButton
          buttonColor={Colors.greenBtn}
          style={{ zIndex: 10 }}
          renderIcon={active => {
            if (active)
              return (
                <Icon.Ionicons
                  name="md-add"
                  size={30}
                  color={Colors.iconColor2}
                />
              );
            else
              return (
                <Icon.Ionicons
                  name="md-menu"
                  size={30}
                  color={Colors.iconColor2}
                />
              );
          }}
        >
          {this.props.loggedIn && (
            <ActionButton.Item
              buttonColor={Colors.greenBtn}
              title="New Poll"
              onPress={() =>
                this.props.navigation.navigate("NewPoll", {
                  addNewPoll: this.addNewPoll
                })
              }
            >
              <Icon.Ionicons
                name="md-create"
                color={Colors.iconColor2}
                size={20}
              />
            </ActionButton.Item>
          )}
          <ActionButton.Item
            buttonColor={Colors.blueBtn}
            title="Refresh"
            onPress={async () => await this.refresh()}
          >
            <Icon.Ionicons
              name="md-refresh"
              color={Colors.iconColor2}
              size={20}
            />
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

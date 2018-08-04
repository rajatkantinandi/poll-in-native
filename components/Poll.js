import React from "react";
import { View, StyleSheet, Text, Share, Alert } from "react-native";
import { Icon } from "expo";
import Option from "./Option";
import StyledBtn from "./StyledBtn";
import PollTitle from "./PollTitle";
import Prompt from "rn-prompt";
import RequestApi from "../constants/RequestApi";
import { Colors } from "../constants/Colors";
import PropTypes from "prop-types";
export default class Poll extends React.Component {
  state = {
    promptVisible: false,
    voting: "not done",
    checked: -1,
    ...this.props.poll
  };
  vote = async () => {
    if (this.state.checked >= 0) {
      this.setState({ voting: "progress" });
      const response = await RequestApi("vote", {
        id: this.state["_id"],
        poll: this.state.options[this.state.checked].value
      });
      if (response.ok) {
        const options = this.state.options.map((elem, index) => {
          if (index == this.state.checked) {
            return { value: elem.value, votes: elem.votes + 1 };
          } else return elem;
        });
        this.setState({
          voting: "done",
          totalvotes: this.state.totalvotes + 1,
          options: options
        });
      } else alert("Error occured");
    } else alert("No option selected");
  };
  handlePress = index => {
    this.setState({ checked: index });
  };
  deletePoll = async () => {
    Alert.alert(
      "Caution !!!",
      "Are you sure you want to delete the poll ??",
      [
        {
          text: "Yes",
          onPress: () => {
            this.props.deletePoll(this.state._id);
          }
        },
        { text: "Cancel", onPress: null }
      ],
      { cancelable: true }
    );
  };
  addOption = async option => {
    this.setState({
      promptVisible: false
    });
    const response = await RequestApi("addOption", [this.state["_id"], option]);
    if (response.ok) {
      this.setState({
        options: [...this.state.options, { value: option, votes: 1 }],
        totalvotes: this.state.totalvotes + 1
      });
      alert("updated");
    } else alert("Error");
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ ...nextProps.poll });
  };
  render() {
    const { createdBy, totalvotes, question, options, at } = this.state;
    const moreOptions = ["Add Option"];
    const moreActions = [() => this.setState({ promptVisible: true })];
    if (this.props.authUser == createdBy) {
      moreOptions.push("Delete");
      moreActions.push(this.deletePoll);
    }
    const shareMsg = `Poll-in Poll >>
Cast Your vote here:
${question}
https://poll-in.herokuapp.com/poll/${this.state["_id"]}
#poll_in`;
    return (
      <View style={styles.container}>
        <PollTitle
          createdBy={createdBy}
          at={at}
          options={
            this.props.loggedIn && { labels: moreOptions, actions: moreActions }
          }
        />
        <View>
          <Text style={{ fontSize: 16, paddingBottom: 4 }}>{question}</Text>
        </View>
        <View>
          {options.map((option, index) => (
            <Option
              checked={this.state.checked === index}
              key={index}
              idx={index}
              value={option.value}
              handlePress={this.handlePress}
            />
          ))}
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 2
          }}
        >
          {this.state.voting == "not done" ? (
            <StyledBtn
              bgcolor={Colors.voteBtnbg}
              txtColor={Colors.primaryText}
              icon={
                <Icon.Foundation
                  color={Colors.iconColor}
                  size={25}
                  name="like"
                />
              }
              title={`Vote (${totalvotes})`}
              onPress={this.vote}
            />
          ) : this.state.voting == "progress" ? (
            <StyledBtn
              bgcolor={Colors.voteBtnbg}
              txtColor={Colors.primaryText}
              activity={true}
              title={`Voting...`}
              onPress={null}
            />
          ) : (
            <StyledBtn
              bgcolor={Colors.donebg}
              txtColor={Colors.primaryText}
              title={`✅ Done  (${totalvotes})`}
              onPress={null}
            />
          )}
          <StyledBtn
            bgcolor={Colors.resultBtnbg}
            txtColor={Colors.primaryText}
            title={`Result`}
            icon={
              <Icon.Ionicons
                color={Colors.iconColor}
                size={25}
                name="ios-pie"
              />
            }
            onPress={() => {
              this.props.navigation.navigate("Result", { ...this.state });
            }}
          />
          <StyledBtn
            bgcolor={Colors.shareBtnbg}
            txtColor={Colors.primaryText}
            title={`Share`}
            icon={
              <Icon.Ionicons
                color={Colors.iconColor}
                size={25}
                name="ios-share-alt"
              />
            }
            onPress={() => {
              Share.share({ message: shareMsg, title: "Poll-in Poll" });
            }}
          />
        </View>
        <Prompt
          title="Add new Option"
          placeholder="Type a new Option"
          defaultValue=""
          visible={this.state.promptVisible}
          onCancel={() =>
            this.setState({
              promptVisible: false
            })
          }
          onSubmit={async value => {
            await this.addOption(value);
          }}
        />
      </View>
    );
  }
}
Poll.propTypes = {
  poll: PropTypes.object.isRequired,
  authUser: PropTypes.string,
  authUserId: PropTypes.string,
  deletePoll: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
Poll.defaultProps = {
  poll: {},
  loggedIn: false,
  deletePoll: () => alert("Error: Not allowed to delete")
};
const styles = StyleSheet.create({
  container: {
    margin: 4,
    backgroundColor: Colors.lightbg,
    padding: 2,
    borderRadius: 3,
    borderColor: Colors.fancyBorder,
    borderWidth: 1
  },
  txt: {
    paddingLeft: 2
  }
});

import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Icon } from "expo";
import StyledBtn from "../components/StyledBtn";
import StyledInput from "../components/StyledInput";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "New Poll"
  };
  addNewPoll = async () => {
    const optionsObj = {};
    this.state.options.forEach((option, index) => {
      optionsObj["option" + (index + 1)] = option;
    });
    this.setState({ activity: true });
    await this.props.navigation.getParam("addNewPoll")(
      this.state.question,
      this.state.options.length,
      optionsObj
    );
    this.setState({ activity: false });
    this.props.navigation.pop();
  };
  state = {
    question: "",
    options: ["", ""],
    activity: false
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StyledInput
            bgColor="#777"
            placeholder="Question?"
            color="white"
            onChangeText={question => this.setState({ question })}
            icon={
              <Icon.FontAwesome
                name="question-circle"
                size={30}
                color={"white"}
              />
            }
          />
          {this.state.options.map((option, index) => (
            <StyledInput
              bgColor="#777"
              key={index}
              color="white"
              placeholder={`Option ${index + 1}`}
              onChangeText={option =>
                this.setState({
                  options: this.state.options.map((elem, idx) => {
                    if (idx == index) return option;
                    else return elem;
                  })
                })
              }
              icon={<Icon.Entypo name="newsletter" size={30} color={"white"} />}
            />
          ))}
          <View style={styles.buttonsContainer}>
            <StyledBtn
              bgcolor="#292"
              txtColor="#ccc"
              title="Add Option"
              onPress={() => {
                this.setState({ options: [...this.state.options, ""] });
              }}
            />
            <StyledBtn
              bgcolor="#229"
              txtColor="#ccc"
              activity={this.state.activity}
              title={this.state.activity ? "Please wait..." : "Post"}
              onPress={this.addNewPoll}
              width={150}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20,
    padding: 10
  },
  buttonsContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
});

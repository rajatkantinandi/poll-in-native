import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Icon } from "expo";
import StyledBtn from "../components/StyledBtn";
import StyledInput from "../components/StyledInput";
import { ColorMode } from "../constants/Colors";

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
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.lightbg,
        alignItems: "center",
        margin: 10,
        padding: 5
      },
      buttonsContainer: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center"
      }
    });

    return (
      <ScrollView
        style={{
          backgroundColor: Colors.lightbg
        }}
      >
        <View style={styles.container}>
          <StyledInput
            bgColor={Colors.newInput}
            placeholder="Question?"
            color={Colors.primaryText}
            onChangeText={question => this.setState({ question })}
            icon={
              <Icon.FontAwesome
                name="question-circle"
                size={30}
                color={Colors.iconColor}
              />
            }
          />
          {this.state.options.map((option, index) => (
            <StyledInput
              bgColor={Colors.newInput}
              key={index}
              color={Colors.primaryText}
              placeholder={`Option ${index + 1}`}
              onChangeText={option =>
                this.setState({
                  options: this.state.options.map((elem, idx) => {
                    if (idx == index) return option;
                    else return elem;
                  })
                })
              }
              icon={
                <Icon.Entypo
                  name="newsletter"
                  size={30}
                  color={Colors.iconColor}
                />
              }
            />
          ))}
          <View style={styles.buttonsContainer}>
            <StyledBtn
              bgcolor={Colors.greenBtn}
              txtColor={Colors.btnText}
              title="Add Option"
              onPress={() => {
                this.setState({ options: [...this.state.options, ""] });
              }}
            />
            <StyledBtn
              bgcolor={Colors.blueBtn}
              txtColor={Colors.btnText}
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

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "expo";
import TitleBar from "../components/TitleBar";
import StyledBtn from "../components/StyledBtn";
import StyledInput from "../components/StyledInput";
import RequestApi from "../constants/RequestApi";
import { ColorMode } from "../constants/Colors";

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: "Sign Up"
  };
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    activity: false,
    validUserName: false
  };
  signupAction = async () => {
    const { username, password, repeatPassword, validUserName } = this.state;
    if (!username) alert("Username must not be empty");
    else if (username.length < 5)
      alert("username must be atleast 5 characters long");
    else if (!validUserName)
      alert("Username is not available please choose a different one");
    else if (!password) alert("Password must not be empty");
    else if (!password.match(/\w{8}\w*/))
      alert(
        "Password must be 8 characters long & should contain only letters & numbers"
      );
    else if (password !== repeatPassword) {
      alert("Passwords did not match!!");
    } else {
      this.setState({ activity: true });
      const data = {
        username: username,
        password: password
      };
      const response = await RequestApi("signup", data);
      if (response.ok) {
        alert("Successfully Signed up, Now login to continue");
        this.props.navigation.navigate("SignInScreen");
      } else {
        const result = await response.json();
        alert("Error: " + result.err);
        this.setState({ activity: false });
      }
    }
  };
  validateUser = async username => {
    this.setState({ username });
    if (username.length < 5) {
      this.setState({ validUserName: false });
    } else {
      const response = await RequestApi("validateUser", username);
      if (response.ok) this.setState({ validUserName: true });
      else this.setState({ validUserName: false });
    }
  };
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.signInbg,
        alignItems: "center"
      },
      hint: {
        fontSize: 15,
        fontWeight: "bold",
        color: Colors.primaryText,
        textAlign: "center",
        margin: 2,
        padding: 2
      }
    });
    return (
      <View style={styles.container}>
        <TitleBar />
        <StyledInput
          bgColor={Colors.navyInput}
          placeholder="Choose an Username"
          color={Colors.primaryText}
          autoCapitalize="none"
          onChangeText={async username => {
            await this.validateUser(username);
          }}
          icon={
            <Icon.FontAwesome
              name="user-circle"
              size={25}
              color={Colors.primaryText}
            />
          }
        />
        {this.state.validUserName ? (
          <Text
            style={[styles.hint, { color: "green", backgroundColor: "white" }]}
          >
            ✅ Username Available
          </Text>
        ) : (
          <Text
            style={[
              styles.hint,
              { color: Colors.impTxt, backgroundColor: Colors.lightbg }
            ]}
          >
            x Username Unvailable
          </Text>
        )}
        <StyledInput
          bgColor={Colors.navyInput}
          placeholder="Choose a Password"
          color={Colors.primaryText}
          onChangeText={password => this.setState({ password })}
          icon={
            <Icon.MaterialIcons
              name="lock"
              size={25}
              color={Colors.primaryText}
            />
          }
          secureTextEntry={true}
        />
        <Text style={styles.hint}>
          ** Password must be atleast 8 chars long & have only letters & numbers
        </Text>
        <StyledInput
          bgColor={Colors.navyInput}
          placeholder="Repeat Password"
          color={Colors.primaryText}
          onChangeText={repeatPassword => this.setState({ repeatPassword })}
          icon={
            <Icon.MaterialIcons
              name="lock"
              size={25}
              color={Colors.primaryText}
            />
          }
          secureTextEntry={true}
        />
        <StyledBtn
          bgcolor={Colors.greenBtn}
          txtColor={Colors.btnText}
          activity={this.state.activity}
          title={this.state.activity ? "Please wait..." : "Sign Up"}
          onPress={this.signupAction}
          width={180}
        />
      </View>
    );
  }
}

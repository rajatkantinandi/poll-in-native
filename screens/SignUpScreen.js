import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "expo";
import TitleBar from "../components/TitleBar";
import StyledBtn from "../components/StyledBtn";
import StyledInput from "../components/StyledInput";
export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: "Sign Up"
  };
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    activity: false
  };
  signupAction = async () => {
    const { username, password, repeatPassword } = this.state;
    if (!username) alert("Username must not be empty");
    else if (!password) alert("Password must not be empty");
    else if (username.length < 5)
      alert("username must be atleast 5 characters long");
    else if (!password.match(/\w{8}\w*/))
      alert(
        "Password must be 8 characters long & should contain only letters & numbers"
      );
    else if (password !== repeatPassword) {
      alert("Passwords did not match!!");
    } else {
      this.setState({ activity: true });
      const data = {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        "https://poll-in.herokuapp.com/signup",
        data
      );
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
  render() {
    return (
      <View style={styles.container}>
        <TitleBar />
        <StyledInput
          bgColor="#335"
          placeholder="Choose an Username"
          color="white"
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
          icon={
            <Icon.FontAwesome name="user-circle" size={30} color={"white"} />
          }
        />
        <StyledInput
          bgColor="#335"
          placeholder="Choose a Password"
          color="white"
          onChangeText={password => this.setState({ password })}
          icon={<Icon.MaterialIcons name="lock" size={30} color={"white"} />}
          secureTextEntry={true}
        />
        <Text style={styles.hint}>
          ** Password must be atleast 8 chars long & have only letters & numbers
        </Text>
        <StyledInput
          bgColor="#335"
          placeholder="Repeat Password"
          color="white"
          onChangeText={repeatPassword => this.setState({ repeatPassword })}
          icon={<Icon.MaterialIcons name="lock" size={30} color={"white"} />}
          secureTextEntry={true}
        />
        <StyledBtn
          bgcolor="green"
          txtColor="#ccc"
          activity={this.state.activity}
          title={this.state.activity ? "Please wait..." : "Sign Up"}
          onPress={this.signupAction}
          width={220}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#777",
    alignItems: "center"
  },
  hint: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 5
  }
});

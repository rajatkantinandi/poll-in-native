import React from "react";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import { Icon } from "expo";
import TitleBar from "../components/TitleBar";
import StyledBtn from "../components/StyledBtn";
import StyledInput from "../components/StyledInput";
export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Sign In"
  };
  state = {
    username: "",
    password: "",
    activity: false,
    userId: ""
  };
  authUserStore = async () => {
    try {
      await AsyncStorage.setItem("authUser", this.state.username);
      await AsyncStorage.setItem("authUserId", this.state.userId);
    } catch (err) {
      alert("Error in storing");
    }
  };
  // loginActionMock = async () => {
  //   await this.authUserStore();
  //   this.props.navigation.navigate("Main");
  // };
  loginAction = async () => {
    const { username, password } = this.state;
    if (!username) alert("Username must not be empty");
    else if (!password) alert("Password must not be empty");
    else if (username.length < 5)
      alert("username must be atleast 5 characters long");
    else if (!password.match(/\w{8}\w*/))
      alert(
        "Password must be 8 characters long & should contain only letters & numbers"
      );
    else {
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
        "https://poll-in.herokuapp.com/signin",
        data
      );
      const result = await response.json();
      if (response.ok) {
        this.setState({ userId: result.userid, username: result.username });
        await this.authUserStore();
        this.props.navigation.navigate("Main");
      } else {
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
          bgColor="#322"
          placeholder="Enter your Username"
          color="white"
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
          icon={
            <Icon.FontAwesome name="user-circle" size={30} color={"white"} />
          }
        />
        <StyledInput
          bgColor="#322"
          placeholder="Enter your Password"
          color="white"
          onChangeText={password => this.setState({ password })}
          icon={<Icon.MaterialIcons name="lock" size={30} color={"white"} />}
          secureTextEntry={true}
        />
        <StyledBtn
          bgcolor="#229"
          txtColor="#ccc"
          activity={this.state.activity}
          title={this.state.activity ? "Please wait..." : "Sign In"}
          onPress={this.loginAction}
          width={220}
        />
        <View style={styles.dialogBox}>
          <Text style={styles.hint}>Don't Have an account?</Text>
          <StyledBtn
            bgcolor="green"
            txtColor="#ccc"
            title={"Register"}
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          />
        </View>
        <View style={styles.dialogBox}>
          <Text style={styles.hint}>Wanna try without signing in?</Text>
          <StyledBtn
            bgcolor="maroon"
            txtColor="#ccc"
            title={"Switch to demo mode"}
            onPress={() => this.props.navigation.navigate("DemoNav")}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#777"
  },
  dialogBox: {
    padding: 10,
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  hint: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 5
  }
});

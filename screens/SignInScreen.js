import React from "react";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import { Icon } from "expo";
import TitleBar from "../components/TitleBar";
import StyledBtn from "../components/StyledBtn";
import StyledInput from "../components/StyledInput";
import RequestApi from "../constants/RequestApi";
import { ColorMode } from "../constants/Colors";

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
        username: username,
        password: password
      };
      const response = await RequestApi("login", data);
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
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.signInbg
      },
      dialogBox: {
        padding: 5,
        flex: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 2
      },
      hint: {
        fontSize: 15,
        fontWeight: "bold",
        color: Colors.primaryText,
        textAlign: "center",
        margin: 2
      }
    });
    return (
      <View style={styles.container}>
        <TitleBar />
        <StyledInput
          bgColor={Colors.bloodInput}
          placeholder="Enter your Username"
          color={Colors.primaryText}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
          icon={
            <Icon.FontAwesome
              name="user-circle"
              size={25}
              color={Colors.primaryText}
            />
          }
        />
        <StyledInput
          bgColor={Colors.bloodInput}
          placeholder="Enter your Password"
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
        <StyledBtn
          bgcolor={Colors.blueBtn}
          txtColor={Colors.btnText}
          activity={this.state.activity}
          title={this.state.activity ? "Please wait..." : "Sign In"}
          onPress={this.loginAction}
          width={220}
        />
        <View style={styles.dialogBox}>
          <Text style={styles.hint}>Don't Have an account?</Text>
          <StyledBtn
            bgcolor={Colors.greenBtn}
            txtColor={Colors.btnText}
            title={"Register"}
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          />
        </View>
        <View style={styles.dialogBox}>
          <Text style={styles.hint}>Wanna try without signing in?</Text>
          <StyledBtn
            bgcolor={Colors.maroonBtn}
            txtColor={Colors.btnText}
            title={"Switch to demo mode"}
            onPress={() => this.props.navigation.navigate("DemoNav")}
          />
        </View>
      </View>
    );
  }
}

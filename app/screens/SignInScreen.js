import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  TouchableNativeFeedback,
  Keyboard
} from "react-native";
import { useState, useRef } from "react";
import { shadow, button, colors } from "../common/styles";
import CustomInput from "../components/CustomInput";
import Check from "../components/Check";
import MainLogo from "../components/Logo/MainLogo";

function SignInScreen({ navigation }) {
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [successSignIn, setSuccessSignIn] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    create: {
      bottom: 0,
    },
    logo: {
      top: -40,
    },
    inputBoxes: {
      height: 170,
      justifyContent: "space-between",
      alignItems: "center",
    },
    signUpButton: {
      position: "absolute",
      bottom: 30,
    },
    passwordForgot: {
      marginTop: 15,
    },
    greyText: {
      color: "grey",
    },
  });

  handleSignIn = () => {
    //console.log(passwordInput);

    // setEmailError(true);
    // setPasswordError(false);

    setSuccessSignIn(<Check />);
    setTimeout(
      () => [setSuccessSignIn(null), navigation.navigate("User")],
      2000
    );
  };

  return (
    <TouchableNativeFeedback onPress={()=> Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={styles.logo}>
        <MainLogo />
      </View>

      <View style={styles.inputBoxes}>
        <CustomInput
          iconName="mail"
          holderText="Email"
          error={emailError}
          setError={setEmailError}
          setInput={setEmailInput}
          errorInfo="The provided value for the disabled user property is inv"
          extraWidth={50}
        />
        <CustomInput
          iconName="lock-closed"
          holderText="Password"
          error={passwordError}
          setError={setPasswordError}
          isPassword={true}
          setInput={setPasswordInput}
          errorInfo="The provided email is already in use by an existing user. Each user must have a unique email."
          extraWidth={50}
        />
        <TouchableOpacity
          onPress={handleSignIn}
          style={[shadow, button, { width: 250, height: 35 }]}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.passwordForgot}>
        <Text style={styles.greyText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Sign Up")}
        style={styles.signUpButton}
      >
        <Text>Don't have an account? Create</Text>
      </TouchableOpacity>

      {successSignIn}
    </View>
    </TouchableNativeFeedback>
  );
}

export default SignInScreen;

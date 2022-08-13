import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { useState, useRef, useContext } from "react";
import { shadow, button, colors } from "../common/styles";
import CustomInput from "../components/CustomInput";
import Check from "../components/Check";
import MainLogo from "../components/Logo/MainLogo";
import auth from "@react-native-firebase/auth";
import { AppContext } from "../management/globals";
import GLOBAL from "../common/values"

function SignInScreen({ navigation}) {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [successSignIn, setSuccessSignIn] = useState(null);

  const [isSigned, setIsSigned] = useContext(AppContext)


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
    setEmailError(null)
    setPasswordError(null)
    auth()
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        setSuccessSignIn(<Check />);
        setTimeout(
          () => [setSuccessSignIn(null), setIsSigned(!isSigned)],
          2000
        );
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          setEmailError("That email address is invalid!");
        }
        if(error.code === "auth/weak-password" || error.code === "auth/invalid-password"){
          setPasswordError("Password must be at least 6 characters!")
        }
        
        //If specific errors have not occured, set generic error
        if(emailError && passwordError){
          setEmailError("An error occured!")
        }
        
      });

  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
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
            extraWidth={50}
          />
          <CustomInput
            iconName="lock-closed"
            holderText="Password"
            error={passwordError}
            setError={setPasswordError}
            isPassword={true}
            setInput={setPasswordInput}
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

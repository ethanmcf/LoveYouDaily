import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableNativeFeedback, Keyboard } from "react-native";
import { useState } from "react";
import UserSection from "../components/SigningPage/UserSection";
import CreaterSection from "../components/SigningPage/CreaterSection";
import LoginSwitch from "../components/SigningPage/LoginSwitch";
import { colors } from "../common/styles";
import Check from "../components/Check";
import MainLogo from "../components/Logo/MainLogo";

function SignUpScreen({ navigation }) {
  //User Sign Up States
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");
  const [userCodeInput, setUserCodeInput] = useState("");

  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [userCodeError, setUserCodeError] = useState(false);

  //Creator Sign Up States
  const [creatorEmailInput, setCreatorEmailInput] = useState("");
  const [creatorPasswordInput, setCreatorPasswordInput] = useState("");
  const [creatorNameInput, setCreatorNameInput] = useState("");

  const [creatorEmailError, setCreatorEmailError] = useState(false);
  const [creatorPasswordError, setCreatorPasswordError] = useState(false);
  const [creatorNameError, setCreatorNameError] = useState(false);

  //Other State
  const [selectedSection, setSelectedSection] = useState("user");
  const [successSignIn, setSuccessSignIn] = useState(null);

  //Handles signing up errors and success
  handleSignUp = () => {
    if (selectedSection == "user") {
      setUserCodeError(true);
      setUserPasswordError(false);
      setUserEmailError(true);
    } else {
      setCreatorEmailError(false);
      setCreatorPasswordError(true);
      setCreatorNameError(true);
    }
    //console.log(selectedSection);
    // setSuccessSignIn(<Check />);
    // setTimeout(
    //   () => [
    //     setSuccessSignIn(null),
    //     //navigation.goBack()
    //   ],
    //   1800
    // );
  };

  //Sets section for sign up
  const section = () => {
    if (selectedSection == "user") {
      return (
        <UserSection
          style={styles.adjustSection}
          didPress={handleSignUp}
          errors={{
            code: userCodeError,
            email: userEmailError,
            password: userPasswordError,
          }}
          setErrors={{
            code: setUserCodeError,
            email: setUserEmailError,
            password: setUserPasswordError,
          }}
          setInputs={{
            code: setUserCodeInput,
            email: setUserEmailInput,
            password: setUserPasswordInput,
          }}
        />
      );
    }

    return (
      <CreaterSection
        style={styles.adjustSection}
        didPress={handleSignUp}
        errors={{
          name: creatorNameError,
          email: creatorEmailError,
          password: creatorPasswordError,
        }}
        setErrors={{
          name: setCreatorNameError,
          email: setCreatorEmailError,
          password: setCreatorPasswordError,
        }}
        setInputs={{
          name: setCreatorNameInput,
          email: setCreatorEmailInput,
          password: setCreatorPasswordInput,
        }}
      />
    );
  };

  //Styles
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
      position: "absolute",
      top: 100,
      width: 150,
      height: 150,
    },
    signInButton: {
      position: "absolute",
      bottom: 30,
    },
    pageInfo: {
      color: "grey",
      fontSize: 10,
      top: -15,
    },
    logo: {
      top: -40,
    },
  });

  return (
    <TouchableNativeFeedback onPress={()=> Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={styles.logo}>
        <MainLogo />
      </View>

      <LoginSwitch setSection={setSelectedSection} />

      {section()}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.signInButton]}
      >
        <Text>Already have an account? Sign in</Text>
      </TouchableOpacity>
      {successSignIn}
    </View>
    </TouchableNativeFeedback>
  );
}
export default SignUpScreen;

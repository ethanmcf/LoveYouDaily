import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { button, shadow } from "../../common/styles";
import CustomInput from "../CustomInput";
import auth from "@react-native-firebase/auth";
import GLOBAL from "../../common/values"

function UserSection({ setSuccessfulSignUp }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [codeError, setCodeError] = useState(null);

  handleSignUp = () => {
    setEmailError(null);
    setPasswordError(null);
    setCodeError(null);
    
    GLOBAL.dbManager.codeExists(codeInput).then(function (codeExists) {
      if (codeExists && codeInput.length != 0) {
        auth()
          .createUserWithEmailAndPassword(emailInput, passwordInput)
          .then(() => {
            setSuccessfulSignUp(true);
            //Adds data to database, if issue adding data delete email account
            if(GLOBAL.dbManager.createNewUserAccount(emailInput,codeInput, auth().currentUser.uid)){
              GLOBAL.dbManager.deleteUser(auth().currentUser)
              Alert.alert(
                "Issue",
                "There was an issue creating your account. Make sure you are connected to internet. Please try again",
                [{text:"OK"}]
              )
            }
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              setEmailError("That email address is already in use!");
            }
            if (error.code === "auth/invalid-email") {
              setEmailError("That email address is invalid!");
            }
            if (
              error.code === "auth/weak-password" ||
              error.code === "auth/invalid-password"
            ) {
              setPasswordError("Password must be at least 6 characters!");
            }

            //If specific errors have not occured, set generic error
            if (emailError && passwordError) {
              setEmailError("An error occured!");
            }
          });

      }else{
        setCodeError("That code does not exist!")
      }
      
    });
  };
  return (
    <View style={styles.container}>
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
        setInput={setPasswordInput}
        isPassword={true}
        extraWidth={50}
      />
      <CustomInput
        iconName="qr-code-outline"
        holderText="Code"
        error={codeError}
        setError={setCodeError}
        setInput={setCodeInput}
        extraWidth={50}
      />
      <TouchableOpacity
        onPress={() => {
          handleSignUp();
        }}
        style={[shadow, button, { width: 250, height: 35 }]}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default UserSection;

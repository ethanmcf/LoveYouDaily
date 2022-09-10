import React from 'react'
import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomInput from "../CustomInput";
import { shadow, button } from "../../common/styles";
import auth from "@react-native-firebase/auth"
import dbManager from "../../management/database-manager";

function CreaterSection({ setSuccessfulSignUp }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);

  handleSignUp = () => {
    setEmailError(null)
    setPasswordError(null)
    setNameError(null)

    //Set error if there is no name
    if(nameInput.length == 0){
      setNameError("Invalid name!")
      return
    }

    //Set error if name is not only letters
    if(!(/^[a-zA-Z]+$/.test(nameInput))){
      setNameError("Name can only contain letters!")
      return
    }
    //Try creating a new user
    auth()
      .createUserWithEmailAndPassword(emailInput == "" ? " " : emailInput, passwordInput == "" ? " " : passwordInput)
      .then(() => {
        setSuccessfulSignUp(true)
        dbManager.createNewCreatorAccount(nameInput, emailInput, auth().currentUser.uid)
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
  }

  return (
    <View style={styles.container}>
      <CustomInput
        iconName="person-circle"
        holderText="Name"
        error={nameError}
        setError={setNameError}
        setInput={setNameInput}
        extraWidth={50}

      />
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
      <TouchableOpacity onPress={()=> {handleSignUp()}} style={[shadow, button, {width: 250, height: 35}]}>
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

export default CreaterSection;

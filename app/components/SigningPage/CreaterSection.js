import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomInput from "./CustomInput";
import { shadow, button } from "../../common/styles";


function CreaterSection({ didPress, errors, setErrors, setInputs }) {
  return (
    <View style={styles.container}>
      <CustomInput
        iconName="person-circle"
        holderText="Name"
        error={errors.name}
        setError={setErrors.name}
        isPassword={false}
        setInput={setInputs.name}
        errorInfo="The provided value for the disabled user property is invalid."
      />
      <CustomInput
        iconName="mail"
        holderText="Email"
        error={errors.email}
        setError={setErrors.email}
        isPassword={false}
        setInput={setInputs.email}
        errorInfo="The provided value for the disabled user property is invalid."
      />
      <CustomInput
        iconName="lock-closed"
        holderText="Password"
        error={errors.password}
        setError={setErrors.password}
        isPassword={true}
        setInput={setInputs.password}
        errorInfo="The provided value for the disabled user property is invalid."
      />
      <TouchableOpacity onPress={didPress} style={[shadow, button]}>
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

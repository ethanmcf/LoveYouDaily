import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { button, shadow } from "../../common/styles";
import CustomInput from "../CustomInput";

function UserSection({ didPress, errors, setErrors, setInputs }) {

  return (
    <View style={styles.container}>
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
      <CustomInput
        iconName="qr-code-outline"
        holderText="Code"
        error={errors.code}
        setError={setErrors.code}
        isPassword={false}
        setInput={setInputs.code}
        errorInfo="The provided value for the disabled user property is invalid."
      />
      <TouchableOpacity onPress={didPress} style={[shadow, button, {width:250, height: 35}]}>
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

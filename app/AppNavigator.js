import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import TabBar from "./components/TabBar";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserScreen from "./screens/UserScreen";
import UserHeader from "./components/UserPage/UserHeader";
const path = "users";
function AppNavigator() {
  const Stack = createNativeStackNavigator();
  if (path == "user") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              header: () => <UserHeader />,
            }}
            name="User"
            component={UserScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
            name="Sign In"
            component={SignInScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
            name="Sign Up"
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <TabBar />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
          name="Sign In"
          component={SignInScreen}
        />
      </NavigationContainer>
    );
  }
}
export default AppNavigator;

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/authentication/login";
import Signup from "./screens/authentication/signup";
import Home from "./screens/home";
import { Text } from "react-native";

export default function App(){
  const stack = createStackNavigator()
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="home">
        <stack.Screen component={Login} name="login" options={{title: 'Login', headerShown:false}} />
        <stack.Screen component={Signup} name="signup" options={{title: 'Sign Up', headerShown:false, }} />
        <stack.Screen component={Home} name="home" options={{title: 'VeeStore', headerTitleAlign:'center',headerShown:false }} />
      </stack.Navigator>
    </NavigationContainer>
  )
}
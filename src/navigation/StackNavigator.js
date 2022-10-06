import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../components/Profile";
import { TabsNavigator } from "./TabsNavigator";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Stack = createNativeStackNavigator();

export function StackNavigator({ navigation }) {
  const HeaderElement = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon name="fastfood" size={30} style={{ color: "#fff" }} />
        <Text
          style={{
            fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
            fontSize: 24,
            color: "#fff",
          }}
        >
          FoodieBay
        </Text>
      </View>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => ({
        headerRight: (props) => (
          <TouchableOpacity
            {...props}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Icon name="info" size={30} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: (props) => <HeaderElement {...props} />,
          headerStyle: { backgroundColor: "#645CAA" },
        }}
        component={TabsNavigator}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerStyle: {
            backgroundColor: "#645CAA",
          },
          headerTitleStyle: {
            fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
            fontSize: 22,
            color: "#fff",
          },
          headerTintColor: "#fff",
        }}
        component={Profile}
      />
    </Stack.Navigator>
  );
}

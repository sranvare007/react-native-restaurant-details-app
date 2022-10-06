import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Delivery from "../components/Delivery";
import Dining from "../components/Dining";
import Icons from "react-native-vector-icons/MaterialIcons";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import DeliveryStackNavigator from "./DeliveryStackNavigator";
import DiningStackNavigator from "./DiningStackNavigator";

const Tabs = createBottomTabNavigator();

export function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 65, paddingVertical: 9 },
        tabBarLabelStyle: {
          marginBottom: 10,
          fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
          fontSize: 16,
        },
      }}
    >
      <Tabs.Screen
        name="Delivery"
        component={DeliveryStackNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const opacity = focused ? 1 : 0.6;
            return (
              <Icons
                name="delivery-dining"
                size={30}
                style={{ opacity: opacity }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Dining"
        component={DiningStackNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const opacity = focused ? 1 : 0.6;
            return (
              <Icons name="restaurant" size={30} style={{ opacity: opacity }} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
}

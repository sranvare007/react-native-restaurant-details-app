import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Delivery from "../components/Delivery";
import DeliveryDetails from "../components/DeliveryDetails";

const Stack = createNativeStackNavigator();

export default function DeliveryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DeliveryList" component={Delivery} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
    </Stack.Navigator>
  );
}

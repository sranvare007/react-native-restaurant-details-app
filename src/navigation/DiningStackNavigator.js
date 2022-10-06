import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dining from "../components/Dining";
import DiningDetails from "../components/DiningDetails";

const Stack = createNativeStackNavigator();

export default function DiningStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DiningList" component={Dining} />
      <Stack.Screen name="DiningDetails" component={DiningDetails} />
    </Stack.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./navigation/RootStackParamList"
import LeaderboardScreen from "./screens/LeaderboardScreen"
import QuestionScreen from "./screens/QuestionScreen"

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Leaderboard' component={LeaderboardScreen} />
        <Stack.Screen name='Questions' component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
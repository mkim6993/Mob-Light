import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f472b6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="party" options={{ title: 'Party' }} />
      </Stack>
  );
}

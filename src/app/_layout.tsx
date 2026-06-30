import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";
import "@/styles/global.css";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#FFFFFF" } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pokemon/[id]" />
      </Stack>
    </ApolloProvider>
  );
}
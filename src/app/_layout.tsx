import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pokemon/[id]" />
      </Stack>
    </ApolloProvider>
  );
}
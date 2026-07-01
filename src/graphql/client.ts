import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

//Aqui é a configuração do Apollo Client para conectar ao GraphQL da PokeAPI
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql.pokeapi.co/v1beta2/graphqls",
  }),
});

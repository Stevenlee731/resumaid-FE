import React from "react";
import "./App.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "./components/Home";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

if (process.env.NODE_ENV === "development") {
  require("./mocks");
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
  }),
});

const EXCHANGE_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }: any) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<ExchangeRates />} />
        <Route path="invoices/:invoiceId" element={<Invoice />} />
        <Route path="users" element={<Users />}>
          <Route path="me" element={<div>Me</div>} />
          <Route path=":userId" element={<Others />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
};

function Invoice() {
  let { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>
      <Routes>
        <Route path=":id" element={<Others />} />
        <Route path="me" element={<div>me</div>} />
      </Routes>
    </div>
  );
}

function Others() {
  let { userId } = useParams();
  console.log(userId, "steve");
  return <div>others</div>;
}

export default App;

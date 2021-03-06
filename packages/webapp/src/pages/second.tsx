import React from "react";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { gql, useQuery } from "urql";

export const Index = () => {
  const [{ fetching, data, error }] = useQuery({
    query: gql`
      {
        motd
        allIngredients {
          id
          name
        }
      }
    `,
  });

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error...</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Message of the day (again):</h1>
      <p>{data.motd}</p>
      <ol>
        <li>
          <Link href="/accounts/login">Login</Link>
        </li>
        <li>
          <Link href="/">Index page</Link>
        </li>
      </ol>
      <hr />
      <h2>Ingredients:</h2>
      <ol>
        {data.allIngredients.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default withUrqlClient(
  (_ssrExchange, ctx) => {
    return {
      url: "http://localhost:3000/api/graphql/",
      credentials: "include",
      fetchOptions: {
        headers: {
          "x-app-source": typeof window === undefined ? "ssr" : "csr",
          ...(ctx?.req
            ? {
                // Forward the cookies when we are server side
                Cookie: ctx.req.headers.cookie,
              }
            : {}),
        },
      },
    };
  },
  { ssr: true }
)(Index);

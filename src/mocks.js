import { graphql, setupWorker } from "msw";

const { start } = setupWorker(
  graphql.query("GetRates", (req, res, ctx) => {
    return res(
      ctx.data({
        rates: {
          currency: "dollar",
          rate: "100",
        },
      })
    );
  }),

  graphql.mutation("Logout", (req, res, ctx) => {
    return res(
      ctx.errors([
        {
          message: "This is a mocked error!",
          locations: [
            {
              line: 1,
              column: 2,
            },
          ],
        },
      ])
    );
  })
);

start();

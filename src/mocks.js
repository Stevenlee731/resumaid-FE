import {graphql, rest, setupWorker} from 'msw'

const {start} = setupWorker(
  graphql.query('GetUser', (req, res, ctx) => {
    return res(
      ctx.data({
        user: {
          firstName: 'John',
          lastName: 'Maverick',
        },
      }),
    )
  }),
  rest.get(
    'https://gist.githubusercontent.com/Stevenlee731/dde8a4a37620642b13e3c6336703a243/raw/3ce6af234c6117ac9e461c854685e76b54bbfaa8/resume.json',
    (req, res, ctx) => {
      return res(
        ctx.status(403),
        ctx.json([
          {firstName: 'John', lastName: 'Maverick'},
          {firstName: 'Cathaline', lastName: 'McCoy'},
        ]),
      )
    },
  ),
)

start()

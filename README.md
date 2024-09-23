# NinjaOne Test

- [Remix docs](https://remix.run/docs)

## Development

Install dependencies:

```sh
npm i
```

Run the dev server:

```sh
npm run dev
```

## Tests

Run the tests in the terminal:

```sh
npm run test
```

Run the tests in the browser:

```sh
npm run test:ui
```


## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

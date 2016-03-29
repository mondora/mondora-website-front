[![Code Climate](https://codeclimate.com/github/mondora/mondora-website-front.png)](https://codeclimate.com/github/mondora/mondora-website-front)

# Mondora Website Front

This is the repository of of the mondora website frontend. The source code for
the backend can be found at
[mondora/mondora-website-back](https://github.com/mondora/mondora-website-back).

## Configuration

The app can be configured by running `npm run config`. All environment variables
starting with `__APP_CONFIG__` will be collected into an object. That object is
exported as the global variable `window.APP_CONFIG` in
`/assets/js/app-config.js`.

Example:
```sh
__APP_CONFIG__KEY_1=value_1 __APP_CONFIG__KEY_2=value_2 npm run config
```
will produce the following `/assets/js/app-config.js`:
```js
window.APP_CONFIG = {
    KEY_1: "value_1",
    KEY_2: "value_2"
};
```

## Configuration options

* `BACKEND_HOST`: the backend host to connect to, defaults to `localhost:3000`
* `BACKEND_USE_SSL`: whether to use SSL to connect to the backend, defaults to
  `false`

## Development environment setup

First, make sure to have `node >0.12.0` or `iojs >2.0.0` installed.

```sh
git clone https://github.com/mondora/mondora-website-front.git
cd mondora-website-front
npm install
npm run dev
```

Keep in mind that you also need to have the backend up and running. For
instructions on how to set that up, see
[mondora/mondora-website-back](https://github.com/mondora/mondora-website-back).

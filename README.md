# Mash News

> A mashup of the best sites on the internet aggregated for busy people

## Installation

1. Make sure you’re up and running with Node.js v15+ (e.g. by using [nvm](https://github.com/nvm-sh/nvm) and running `nvm use`)
2. Clone this repository
3. Run `yarn` (or `yarn install --frozen-lockfile` to prevent version mismatches)
4. Copy `.env.example` to `.env` and fill in the respective values

## Structure

This repository consists of two main packages.

- `api` = ETL process importing news feeds and serving them using a local HTTP server
- `ui` = the main single-page application displaying the `api` data

## Usage

### Build UI statically for deployment

```sh
yarn build
```

Next, you need to deploy the built files to your environment/server/container.

### Run application in dev mode (incl. hot-reloading)

```sh
yarn start
```

Head over to <http://localhost:3000/>.

### Deploy UI and API data

```sh
yarn deploy
```

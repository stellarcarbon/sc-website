# sc-website

Repository containing code for the https://www.stellarcarbon.io website.

Staging can be found on https://test.stellarcarbon.io/

TODO: robots.txt maken

Cypress e2e test werkt niet op digitalocean app platform.

```
[2024-04-30 11:54:37] │ Your system is missing the dependency: Xvfb
[2024-04-30 11:54:37] │
[2024-04-30 11:54:37] │ Install Xvfb and run Cypress again.
[2024-04-30 11:54:37] │
[2024-04-30 11:54:37] │ Read our documentation on dependencies for more information:
[2024-04-30 11:54:37] │
[2024-04-30 11:54:37] │ https://on.cypress.io/required-dependencies
```

## Developer instructions

This is a NextJS project.

Install using

```
npm install
```

Run locally

```
npm run dev
```

Run unit tests

```
npm test
```

Run e2e tests

```
npm run e2e
```

Run e2e headless

```
npm run e2e:headless
```

### CarbonAPI code generation

The CarbonAPI client is generated based on the OpenAPI schema of the CarbonAPI. The latest version can be found on https://api.stellarcarbon.io/docs/.

Generate or update the API client with:

`npm run generate-client`

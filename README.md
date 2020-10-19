![pipeline](../../workflows/pipeline/badge.svg) ![Coverage](./badges/coverage.svg)

# Bank Backend Demo

NodeJS project for a bank backend demo

## Requirements

-   [NodeJS](https://nodejs.org/en/download/)

## How to deploy

```
npm install
npm run build
npm run prod
```

### Using PM2 to deploy a clustered environment

Install PM2 using npm:

```
npm install pm2 -g
```

Register the application as a service

```
pm2 start dist/bank-backend-demo-bundle.js
```

Usefull PM2 commands

```
pm2 list
pm2 monit
pm2 delete bank-backend-demo-bundle
```

## Available development commands

```
npm run test
npm run test:coverage
```

<!-- TechStack -->
### Tech Stack

- ***Express.js***
- ***Typescript***
- ***Yarn***


<!-- Features -->
### Features

- ***Package managament*** with Yarn
- ***Testing*** with Jest and Supertest
- ***Cross-Origin Resource-Sharing*** enabled using cors
- ***Secured HTTP Headers*** using helmet
- ***Logging*** with winston
- ***Environment variables*** using dotenv
- ***Compression*** with gzip
- ***Git hooks*** with husky and lint-staged
- ***Linting and enforced code style*** using Eslint and Prettier
- ***Containerization*** with Docker 



### Linting

```bash
  # run ESLint
  yarn lint
  
  # fix ESLint errors
  yarn lint:fix

  # run prettier
  yarn code:check

  # fix prettier errors
  yarn code:format
  
  # fix prettier errors in specific file
  yarn code:format:specific-file <file-name>
```
   
<!-- Running Tests -->
### Running Tests

To run tests, run the following command

```bash
  yarn test
```

<!-- Run Locally -->
### Run Locally

Start the server in development mode

```bash
  yarn dev
```

Start the server in production mode

```bash
  yarn start
```

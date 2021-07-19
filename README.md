# RealWorldApp Cypress Tests

Testing RealWorldApp with Cypress and TypeScript 

## Setup Testing Environment

1. Clone https://github.com/iljapavlovs/realworld-nx-nestjs-angular.
2. Follow instructions from its `README.md`.
3. Open your browser at http://localhost:4200 to confirm that the app is up and running. 
4. Restore DB dump to seed test data:
```shell
cat backup.sql | docker exec -i realworld-nx-nestjs-angular_database_1 /usr/bin/mysql -u root --password=root db
```
5. Login to RealWorld test app with `test@test.com/test` to check that data was seed correctly. 

## Running test

You may run tests with 'npm test'

## Improvements

-[ ] Add extra check for article to appear in Global Feed.
-[ ] Add cleanup method.
-[ ] Improve code readability by moving checks and actions to specific commands.
-[ ] Configure linters.
-[ ] Set up a single compose file for setting up test environment.

## Installation

```bash
$ npm install
```

## Database preparation
```bash
# development
$ npm run prepare:db:dev
$ npm run migrate:dev

# test
$ npm run prepare:db:test
$ npm run migrate:test
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# test acceptance
$ npm run test:acceptance
```

## Database structure
Since performance is not a critical factor and the emphasis is on data integrity, flexibility, and maintainability, choosing a normalized database structure would be a suitable decision for the given task. Here are some reasons why a **normalized structure** might be preferred:
- Data Integrity: Normalization helps maintain data integrity by eliminating redundancy and ensuring consistent relationships between entities. 
- Data Consistency and Updates: With a normalized structure, updates to data are more straightforward and consistent. When modifying a specific piece of information, we only need to update it in one place, avoiding the need for multiple updates across denormalized tables.
"Normalize until it hurts, denormalize until it works".

## License

Nest is [MIT licensed](LICENSE).
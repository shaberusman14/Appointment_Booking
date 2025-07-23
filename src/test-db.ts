import AppDataSource from '../ormconfig';

AppDataSource.initialize()
  .then(() => {
    console.log('✅ PostgreSQL: Connected successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ PostgreSQL: Connection FAILED.\n', err);
    process.exit(1);
  });

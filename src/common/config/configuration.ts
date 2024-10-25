import { registerAs } from '@nestjs/config';

import sqlConfig from './sql.config';

const databaseConfig = registerAs('database', () => ({
  sql: {
    ...sqlConfig(),
  },
}));

export default databaseConfig;

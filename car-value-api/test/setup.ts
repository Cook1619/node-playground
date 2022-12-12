import { rm } from 'fs/promises';
import { join } from 'path';

// runs before each e2e test runs
// delete db for testing env only
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', '/test.sqlite'));
  } catch (error) {}
});

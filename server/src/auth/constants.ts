import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export const JWT_SECRET = process.env.JWT_SECRET!;

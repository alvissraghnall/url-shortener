import * as env from "env-var";

export const PORT = env.get('PORT').required().asIntPositive();
export const PGUSERNAME = env.get('PGUSER').required();
export const PGPWD = env.get('PGPASSWORD').required();
export const PGNAME = env.get('PGNAME').required();
export const PGPORT = env.get('PGPORT').required().asIntPositive();
export const PGHOST = env.get('PGHOST').required();

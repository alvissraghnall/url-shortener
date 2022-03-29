import Pool from 'pg-pool';
//import { PGNUSERAME, DBUSERNAME, PGPWD, PGPORT, DBHOST } from "./env";

/*
const pool = new Pool({
  user: DBUSERNAME,
  password: DBPWD,
  host: DBHOST,
  port: DBPORT,
  database: DBNAME
});
*/

const pool = new Pool();

export default pool;

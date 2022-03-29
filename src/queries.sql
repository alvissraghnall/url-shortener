CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE URLs (
  id uuid_generate_v4(),
  url text,
  short char(6)
);

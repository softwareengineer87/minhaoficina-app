DROP TABLE IF EXISTS barbershops, customers, services, schedules CASCADE

CREATE TABLE IF NOT EXISTS business (
  business_id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT,
  logo TEXT
);

CREATE TABLE IF NOT EXISTS launchs (
  launch_id TEXT PRIMARY KEY,
  name TEXT,
  tel TEXT,
  cpf TEXT,
  model TEXT,
  kilometer INTEGER,
  plate TEXT,
  observation TEXT,
  date DATE
);

CREATE TABLE IF NOT EXISTS parts (
  part_id TEXT PRIMARY KEY,
  launch_id TEXT,
  name TEXT,
  price NUMERIC,
  
  CONSTRAINT fk_launchs FOREIGN KEY(launch_id) REFERENCES launchs(launch_id)  
);



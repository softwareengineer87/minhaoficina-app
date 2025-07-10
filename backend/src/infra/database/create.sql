CREATE TABLE IF NOT EXISTS business (
  business_id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT,
  logo TEXT
);

CREATE TABLE IF NOT EXISTS launchs (
  launch_id TEXT PRIMARY KEY,
  business_id TEXT,
  name TEXT,
  tel TEXT,
  cpf TEXT,
  model TEXT,
  kilometer INTEGER,
  plate TEXT,
  observation TEXT,
  date DATE,

  CONSTRAINT fk_business FOREIGN KEY(business_id) REFERENCES business(business_id)
);

CREATE TABLE IF NOT EXISTS parts (
  part_id TEXT PRIMARY KEY,
  launch_id TEXT,
  name TEXT,
  price NUMERIC,
  
  CONSTRAINT fk_launchs FOREIGN KEY(launch_id) REFERENCES launchs(launch_id)  
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id TEXT PRIMARY KEY,
  launch_id TEXT,
  url TEXT,
  
  CONSTRAINT fk_launchs FOREIGN KEY(launch_id) REFERENCES launchs(launch_id)  
);



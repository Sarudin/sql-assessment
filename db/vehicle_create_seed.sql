-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
DROP TABLE IF EXISTS vehicles;

CREATE TABLE IF NOT EXISTS "Vehicles" (
    "id" serial,
    "make" text,
    "model" text,
    "year" integer,
    "ownerId" integer,
    PRIMARY KEY ("id"),
    CONSTRAINT "ownerId" FOREIGN KEY ("ownerId") REFERENCES "Users"("id")
);

INSERT INTO "Vehicles" ("make", "model", "year", "ownerId") VALUES ('Toyota', 'Camry', 1991, 1);
INSERT INTO "Vehicles" ("make", "model", "year", "ownerId") VALUES ('Honda', 'Civic', 1995, 1);
INSERT INTO "Vehicles" ("make", "model", "year", "ownerId") VALUES ('Ford', 'Focus', 2005, 1);
INSERT INTO "Vehicles" ("make", "model", "year", "ownerId") VALUES ('Ford', 'Taurus', 2003, 2);
INSERT INTO "Vehicles" ("make", "model", "year", "ownerId") VALUES ('VW', 'Bug', 2010, 2);
INSERT INTO "Vehicles" ("make", "model", "year", "ownerId") VALUES ('Mini', 'Coup', 2013, 3);

SELECT * FROM "Users" WHERE "email" = $1
JOIN "Vehicles" on "Users"."id" = "Vehicles"."ownerId";

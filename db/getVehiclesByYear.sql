select "year", "firstname", "lastname" from "Vehicles"
join "Users" on "Users"."id" = "Vehicles"."ownerId"
where "year" > 2000 order by "year" desc;

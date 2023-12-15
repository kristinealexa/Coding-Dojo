<!-- Create 3 new dojos -->
SELECT * FROM dojos_and_ninjas_schema_db.dojos;

INSERT INTO dojos (name) VALUES ("Chicago");
INSERT INTO dojos (name) VALUES ("LA");
INSERT INTO dojos (name) VALUES ("San Diego");

<!-- Delete the dojos you just created -->
DELETE FROM `dojos_and_ninjas_schema_db`.`dojos` WHERE (`id` = '1');
DELETE FROM `dojos_and_ninjas_schema_db`.`dojos` WHERE (`id` = '2');
DELETE FROM `dojos_and_ninjas_schema_db`.`dojos` WHERE (`id` = '3');

<!-- Create 3 more dojos -->
INSERT INTO dojos (name) VALUES ("New York");
INSERT INTO dojos (name) VALUES ("Nashville");
INSERT INTO dojos (name) VALUES ("New Mexico");

<!-- Create 3 ninjas that belong to the first dojo -->
SELECT * FROM dojos_and_ninjas_schema_db.ninjas;
INSERT INTO ninjas (first_name,last_name,age,_dojo_id) VAULES ("kristine","rodriguez",25,4),("billy","bob",20,4),("sponge","bob",23,4);

<!-- Create 3 ninjas that belong to the second dojo -->
INSERT INTO ninjas (first_name,last_name,age,_dojo_id) VAULES ("kim","possible",20,5),("hello","kitty",12,5),("cookie","monster",50,5);

<!-- Create 3 ninjas that belong to the thrid dojo -->
INSERT INTO ninjas (first_name,last_name,age,_dojo_id) VAULES ("baby","yoda",267,6),("dr","evil",40,6),("bat","man",80,6)

<!-- Retrieve all the ninjas from the first dojo -->
SELECT * FROM dojos WHERE id = 4;

<!-- Retrieve all the ninjas from the last dojo -->
SELECT * FROM dojos WHERE id = 6;

<!-- Retrieve the last ninja's dojo -->
SELECT * FROM dojos

<!-- Use a JOIN to retrieve the ninja with id 6 as well as the data from its dojo. Be sure to do this in one query using a join statement.-->
SELECT * FROM dojos
JOIN ninjas ON dojos.id = ninjas.dojo_id WHERE dojos.id = 6;

<!-- Use a JOIN to retrieve all the ninjas as well as that ninja's dojo, note, you will see repeated data on dojos as a dojo can have many ninjas! -->
SELECT * FROM dojos
JOIN ninjas ON dojo.id = ninjas.dojos_id;
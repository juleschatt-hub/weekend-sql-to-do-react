CREATE TABLE "to_dos" (
	"id" SERIAL PRIMARY KEY,
	"task_title" VARCHAR(255),
	"description" TEXT,
	"check_list_items" VARCHAR(255),
	"due_date" DATE,
	"is_complete" BOOLEAN
	
);

SELECT * FROM to_dos;

INSERT INTO "to_dos" ("task_title", "description", "check_list_items", "due_date", "is_complete")
VALUES 
('Get Groceries', 'The task is complete when all ites from grocery list have been purchased', NULL, '2024-07-21', false);
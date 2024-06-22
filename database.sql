CREATE TABLE "to_dos" (
	"id" SERIAL PRIMARY KEY,
	"task_title" VARCHAR(255),
	"description" TEXT,
	"due_date" DATE,
	"is_complete" BOOLEAN
	
);

SELECT * FROM to_dos;

INSERT INTO "to_dos" ("task_title", "description", "due_date", "is_complete")
VALUES 
('Get Groceries', 'The task is complete when all ites from grocery list have been purchased', '2024-07-21', false),
('Get a Job', 'Apply to jobs and prepare for interviews', '2024-10-25', true),
('Build Todo App', 'Make sure all requirements are met that are laid out in the read me', '2024-06-25', false)
;
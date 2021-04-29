`drop table if exists workflow_logs, contact_workflows, user_workflow, workflows, users;

create table users(
	id serial primary key not null
	salesforce_id VARCHAR(18),
	first_name varchar(250),
	last_name varchar(250)
);

create table workflows(
	id serial primary key,
	user_id varchar(18),
	flow_url varchar(250),
	sql_query varchar(250),
	active boolean,
	constraint fk_user
		foreign key(user_id)
			references users(id)
);

create table user_workflows(
	user_id int,
	workflow_id int,
	constraint fk_user
		foreign key(user_id)
			references users(id)
	constraint fk_workflow
		foreign key(workflow_id)
			references(id)
);

create table contact_workflows(
	workflow_id int,
	contact_id VARCHAR(18),
	constraint fk_workflow,
		foreign key(workflow_id)
			references workflows(id) on delete cascade,
	constraint fk_contact
		foreign key(contact_id)
			references "SalesforceContacts"(id)
);

create table workflow_logs(
	id serial primary key not null,
	workflow_id int not null,
	action_name varchar,
	time_of_completion timestamp,
	record_id varchar,
	constraint fk_workflow
		foreign key(workflow_id)
			references workflows(id) on delete cascade
);`
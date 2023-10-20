--drop extension if exists uuid-ossp cascade;
drop type if exists type_of_users cascade;

drop table if exists suggestions,
feedbacks,
messages,
languages,
work_experience,
educations,
learning_materials,
social_media_links,
projects,
profiles,
users;

--create extension if not exists "uuid-ossp";
create type type_of_users as enum ('web developer', 'migracode student');

create table users(
--	id uuid primary key default uuid-generate-v4(),
	id serial primary key,
	username varchar(60) not null,
	password text not null,
	email varchar(120) not null,
	user_type type_of_users not null,
	unique(email)
);

create table profiles(
	id serial primary key,
	user_id int not null references users(id) on delete cascade,
	first_name varchar(22) not null,
	last_name varchar(32),
	phone_number varchar(20),
	country varchar(29) not null,
	city varchar(31),
	short_description varchar(120),
	description text,
	image_link text,
	skils text
);

create table projects(
	id serial primary key,
	profile_id int not null references profiles(id) on delete cascade,
	name varchar(120) not null,
	description text,
	repository_link text,
	live_demo_link text,
	project_images_links text,
	technologies_used text
);

create table social_media_links(
	id serial primary key,
	profile_id int not null references profiles(id) on delete cascade,
	name varchar(50) not null,
	link text not null,
	unique(profile_id, link)
);

create table learning_materials(
	id serial primary key,
	profile_id int not null references profiles(id) on delete cascade,
	name varchar(50) not null,
	description text,
	link_resource text not null
);

create table educations(
	id serial primary key,
	profile_id int not null references profiles(id) on delete cascade,
	school_or_institution_name varchar(120) not null,
	degree varchar(120),
	location text,
	start_date date,
	graduation_date date
);
create table work_experience(
    id serial primary key,
    profile_id int not null references profiles(id) on delete cascade,
    company_name varchar(255) not null,
    job_title varchar(255) not null,
    start_date date,
    end_date date,
    job_description text
);
create table languages(
	id serial primary key,
	profile_id int not null references profiles(id) on delete cascade,
	language varchar(30) not null
);
create table messages(
	id serial primary key,
	sender_profile_id int not null references profiles(id) on delete cascade,
	receiver_profile_id int not null references profiles(id) on delete cascade,
	message text not null,
	date date default current_date,
	time time default current_time
);
create table feedbacks(
	id serial primary key,
	submiter_profile_id int not null references profiles(id) on delete cascade,
	recipient_profile_id int not null references profiles(id) on delete cascade,
	feedback_text text not null,
    rating int not null
);
create table suggestions(
	id serial primary key,
	submiter_profile_id int not null references profiles(id) on delete cascade,
	recipient_profile_id int not null references profiles(id) on delete cascade,
	suggestion_text text not null
);



----------------------------------------------------------
-- model

-- users table
drop table if exists users cascade;
create table users (
    chat_id character varying(50) primary key,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(255) unique not null,
    step int not null default 1,
    user_created_at timestamptz default current_timestamp
);


--messages table
drop table if exists messages cascade;
create table messages (
    chat_id character varying(50) references users(chat_id),
    image_id serial not null,
    image_path character varying(255) not null,
    info text not null,
    message_created_at timestamptz default current_timestamp
);




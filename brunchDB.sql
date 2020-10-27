use project;
create table contents(
	id bigint not null auto_increment,
    title varchar(255),
    content varchar(500),
    author bigint,
    foreign key(Id)references people(id) on update cascade,
    source varchar(50),
    primary key(id)
);

create database project;
use project;
create table people(
	id bigint not null auto_increment,
    name varchar(255),
    profile varchar(255),
    job varchar(30),
    info varchar(50),
    favor varchar(30),
    primary key(id)
);
create table category(
	id bigint not null auto_increment,
    CategoryName varchar(30),
    primary key(id)
);
create table peopleCategory(
	id bigint not null auto_increment,
    peopleId bigint,
    foreign key(peopleId)references people(id) on update cascade,
    categoryId bigint,
    foreign key(categoryId)references category(id) on update cascade,
    primary key(id)
);
select p1.name, p1.profile, p1.job, p1.img, p2.CategoryName
from
(select * from people where id in
	(select peopleId from peoplecategory where categoryId = 
		(select id from category where CategoryName = "브랜딩")
	)
) p1,
(select p1.peopleId,p2.CategoryName from
	(select peopleId, categoryId from peoplecategory where peopleId in
		(select peopleId from peoplecategory where categoryId in 
			(select id from category where CategoryName = "브랜딩")
		)
	) p1,
	(select * from category where id in 
		(select categoryId from peoplecategory where peopleId in
			(select peopleId from peoplecategory where categoryId in 
				(select id from category where CategoryName = "브랜딩")
			)
		)
	)p2
	where p1.categoryId = p2.id
)p2

where p1.id = p2.peopleId;
alter table people add img varchar(30);
select contents.title,contents.content,people.name,contents.source 
from contents,people
where contents.author = people.id;

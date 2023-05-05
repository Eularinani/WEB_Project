
create table Livro (
    Livro_id SERIAL not null,
    Titulo  VARCHAR(200) not null,							--4 algarismos, com 2 casas decimais
    Livr_capa varchar(300) ,
    Livro_Lançamento date not null,
    Livro_Volume int,
    primary key (Livro_id)
);


create table Autor (
    Autor_id SERIAL not null,
    Autor_nome VARCHAR(20) not null,							--4 algarismos, com 2 casas decimais
    primary key (Autor_id));
    
create table Oferta (
    Oferta_id SERIAL not null,
    Oferta_nome VARCHAR(20) not null,
    Oferta_foto varchar(300),
    Oferta_Dia date not null,
	oferta_Livro_id int,
    Oferta_contaP int,
    oferta_user_id int,
    primary key (Oferta_id)
);


create table appuser (
    usr_id serial,
    usr_foto varchar{300},
    usr_name varchar(60) not null,
    usr_pass varchar(200) not null, 								
    usr_email varchar NOT null UNIQUE,
    usr_token varchar(200),						
    primary key (usr_id));


create table Estado (
    Estado_id SERIAL not null,
    Estado_nome VARCHAR(20) not null,							--4 algarismos, com 2 casas decimais
    primary key (Estado_id)
);

create table Transacao (
    Trasancao_id SERIAL not null,
    Transacao_nome VARCHAR(20) not null,
    
    Transacao_Usuario_id int not null,
	Transacao_Local_id int not null,
	Transacao_Oferta_id int not null,
    primary key (Trasancao_id)
);

create table Locais (
    Local_id SERIAL not null,
    Local_raio float not null,
    primary key (Local_id)
);

create table Estado_Transacao(
Estado_Transacao_id serial not null,
Estado_Transacao_Trasancao_id int not null,
Estado_Transacao_Estado_id int not null,
primary key (Estado_Transacao_id)
);

create table confimacao(
confimacao_id serial not null,
confimacao_nome varchar(30)
confimacao_Livro_id int not null,
confimacao_oferta_id int not null,
primary key (confimacao_id) 
);

create table Autor_Livro(
    Autor_Livro_id serial not null,
    Autor_Livro_Autor_id int not null,
    Autor_Livro_livro_id int not null,
    primary key (Autor_Livro_id)
    );
	
	
	alter table transacao
add constraint transacao_fk_appuser
foreign key (transacao_usuario_id) references appuser(usr_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table Autor_Livro
add constraint Autor_Livro_fk_Autor
foreign key (Autor_Livro_Autor_id) references Autor(Autor_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table Autor_Livro
add constraint Autor_Livro_fk_Livro
foreign key (Autor_Livro_Livro_id) references Livro(Livro_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;


alter table oferta
add constraint Oferta_fk_Livro
foreign key (oferta_Livro_id) references Livro(Livro_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table oferta
add constraint Oferta_fk_appuser
foreign key (oferta_user_id) references appuser(user_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table troca 
add constraint troca_fk_oferta
foreign key (Troca_oferta_id) references oferta(oferta_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

 
 
 
 
 
 
 
 -------o codigo a baixo tem um pouco de erro
alter table Estado_Transacao
add constraint Estado_Transacao_fk_transacao
foreign key (Estado_Transacao_Trasancao_id) references transacao(Trasancao_id )
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table transacao
add constraint transacao_fk_oferta
foreign key (Transacao_Oferta_id) references oferta(oferta_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table al
add constraint autor_fk_livro
foreign key (al_livro_id) references (al_autor_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table locais
add constraint                             <------- Falta os locais
foreign key
ON DELETE NO ACTION ON UPDATE NO ACTION;








CREATE TABLE LocailP (
    id serial PRIMARY KEY,
    geom geography(Point, 4326),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

);
CREATE TABLE Tranzacao (
    id serial PRIMARY KEY,
    name TEXT,
    area POLYGON,
    poi_id INTEGER REFERENCES poi(id),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
CREATE TABLE Local_transacao(
    id serial PRIMARY KEY,
    university_id integer REFERENCES universities(id),
    school_id integer REFERENCES schools(id),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
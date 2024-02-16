create database bd_tcc;

use bd_tcc;

# drop database bd_tcc;

create table tbl_user ( #TBL DE USUARIO
	user_name varchar(20), #nome de usuario (ficticio)
    user_type char(5), #definindo o tipo de usuario
    user_email varchar(50), #email valido do usuario
    user_password varchar(30), #senha do usuario
    user_inactive boolean default 0,
    constraint id_user_pk primary key (user_name),
    constraint user_un unique (user_email)
);

#Mudar o sistema de codigos para algo mais randomizado
create table tbl_group (
	_code int auto_increment,
    _name varchar(30),
    constraint id_group_pk primary key (_code)
);

create table tbl_group_user (
	code_group int,
    user_name varchar(20),
    constraint group_user_pk primary key (code_group, user_name),
    constraint user_name_group_user_fk foreign key (user_name)
    references tbl_user (user_name),
    constraint code_group_user_fk foreign key (code_group)
    references tbl_group (_code) ON DELETE CASCADE
);

create table tbl_info ( #TBL DE USUARIO
	user_name varchar(20),
    date_birth date, #a partir da data de nascimento definiremos sua faixa etaria
    user_sex char(1), #sexo (feminino ou masculino)
    full_name varchar(40), #nome completo (real) do usuario
    user_level int default 0, #nivel atual do usuario
	total_exp int default 0, #exp total (acumulativo) do usuario
    constraint id_info_pk primary key (user_name),
    constraint id_user_info_fk foreign key (user_name) 
    references tbl_user (user_name)
);

create table tbl_language ( #TBL DE LINGUAGENS
	id int auto_increment,
    code_group int,
    _name varchar(15), #nome da linguagem
	_description varchar(150), #descricao da linguagem
    constraint id_language_pk primary key (id),
    constraint code_group_language_fk foreign key (code_group)
    references tbl_group (_code) ON DELETE CASCADE
);

create table tbl_difficulty ( #TBL DE DIFICULDADES
	id int auto_increment,
    _name varchar(15), #nome da dificuldade
    _description varchar(150), #descricao da dificuldade
    constraint id_difficulty_pk primary key(id)
);

create table tbl_teory (
	id int auto_increment,
    _name varchar(50), #nome da teoria/titulo da teoria (para identificação)
    teory_text varchar(250), #texto da teoria
	id_lang int, #id da linguagem a qual a teoria se refere
    id_diff int, #id da dificuldade a qual a teoria se refere
	constraint id_teory_pk primary key (id),
    constraint id_language_teory_fk foreign key(id_lang)
    references tbl_language (id) ON DELETE CASCADE,
    constraint id_difficulty_teory_fk foreign key (id_diff)
    references tbl_difficulty (id) ON DELETE CASCADE
);

create table tbl_task ( #TBL DAS PERGUNTAS (SOLO)
	id int auto_increment,
    _name varchar(50), #nome da questão/titulo da questão (para identificação)
    task_text varchar(250), #texto da pergunta	
	explanation_task varchar(100), #explicacao da pergunta (Um resumo p/quando a pessoa errar)
	id_lang int, #id da linguagem a qual a pergunta se refere
    id_diff int, #id da dificuldade a qual a pergunta se refere
	exp_task int default 0, #Cd pergunta dará (ou não) uma quantidade de exp que será adicionada ao exp_total da tabela user
	constraint id_task_pk primary key (id),
    constraint task_un unique (_name),
    constraint id_language_quest_fk foreign key(id_lang)
    references tbl_language (id) ON DELETE CASCADE,
    constraint id_difficulty_task_fk foreign key (id_diff)
    references tbl_difficulty (id) ON DELETE CASCADE
);

create table tbl_teory_book ( #TBL DE RELAÇÃO ENTRE TEORIAS E O PERGUNTAS
	id_teory int, #id da teoria a qual a pergunta se refere
    id_task int, #id da pergunta a ser registrada em determinado curso
    constraint id_teory_book_pk primary key(id_teory, id_task),
    constraint id_task_teory_book_fk foreign key(id_task)
    references tbl_task (id) ON DELETE CASCADE,
    constraint id_teory_teory_book_fk foreign key(id_teory)
    references tbl_teory(id) ON DELETE CASCADE
);

# PRECISA CRIAR UM GATILHO PARA ADD AS INFO DAS TABELAS A SEGUIR ? -----------------------------------------------

create table tbl_registration ( #TBL DA MATRICULA (RELACIONAMENTO)
	id int auto_increment,
    user_name varchar(20), #id do usuario que está "matriculado" em determinado curso
    id_lang int, #id da linguagem a qual o usuario está matriculado
    id_diff int, #id da dificuldade da linguagem referente a qual o usuario está matriculado
    quest_active int default 0,
    date_registration datetime default now(), #data da matricula do usuario
	constraint id_registration_pk primary key(id),
    constraint registration_un unique (id_diff, id_lang, user_name),
    constraint id_lang_registration_fk foreign key(id_lang)
    references tbl_language (id) ON DELETE CASCADE,
    constraint id_diff_registration_fk foreign key (id_diff)
    references tbl_difficulty (id) ON DELETE CASCADE,
    constraint id_user_registration_fk foreign key (user_name)
    references tbl_user (user_name)
);


create table tbl_tasks_book ( #TBL DE RELAÇÃO ENTRE PERGUNTAS E O CURSO
	id_registration int, #id do curso em que o usuario está matriculado (linguagem + dificuldade)
    id_task int, #id da pergunta a ser registrada em determinado curso
    constraint id_tasks_book_pk primary key(id_registration, id_task),
    constraint id_task_tasks_book_fk foreign key(id_task)
    references tbl_task (id) ON DELETE CASCADE,
    constraint id_registration_tasks_book_fk foreign key(id_registration)
    references tbl_registration(id) ON DELETE CASCADE
);

# ---------------------------------------------------------------------------------------------------------------

#Nível basico: Preencher com um padrão de quiz (Answer_text faz parte das alternativas)
create table tbl_answer_basic ( #TBL DE RESPOSTAS O NÍVEL BASICO P/DETERMINADA PERGUNTA DE DETERMINADO CURSO
	id int auto_increment,
    answer_text varchar(100), #resposta correta (Completa), usada para validação
    id_task int, #id da pergunta a qual a resposta se refere
    alternativeA varchar(100), #alternativa A
    alternativeB varchar(100), #alternativa B 
    alternativeC varchar(100), #alternativa C
    constraint id_answer_basic_pk primary key(id),
    constraint answer_basic_un unique (id_task),
	constraint id_task_answer_basic_fk foreign key (id_task)
    references tbl_task (id) ON DELETE CASCADE
);

#Nível intermediario: reencher as alternativas com, no maximo, 3 palavras, referente a programação (Com excessão da answer_text)
create table tbl_answer_intermediary ( #TBL DE RESPOSTAS DO NÍVEL INTERMEDIARIO P/DETERMINADA PERGUNTA DE DETERMINADO CURSO
	id int auto_increment,
    answer_text varchar(200), #resposta correta (Completa), usada para apenas para validação
    id_task int, #id da pergunta a qual a resposta se refere
    alternativeA varchar(30), #alternativa A
    alternativeB varchar(30), #alternativa B 
    alternativeC varchar(30), #alternativa C
    alternativeD varchar(30), #alternativa D
    alternativeE varchar(30), #alternativa E
    constraint id_answer_intermediary_pk primary key(id),
    constraint answer_intermediary_un unique (id_task),
	constraint id_task_answer_intermediary_fk foreign key (id_task)
    references tbl_task (id) ON DELETE CASCADE
);

#Tabela para a visualização de uma resposta "meia correta" da questão
create table tbl_answer_half_correct (
	answerId int,
    correctly_answer varchar(30),
    ahc_text varchar(200),
    constraint id_answer_half_correct_pk primary key (answerId)
);

#Nível avançado: preencher as alternativas com, no maximo, 3 palavras (As usaremos para recriar a resposta correta)
create table tbl_answer_advanced ( #TBL DE RESPOSTAS DO NÍVEL AVANÇADO P/DETERMINADA PERGUNTA DE DETERMINADO CURSO
	id int auto_increment,
    answer_text varchar(100), #resposta correta (Completa), usada para validação
    id_task int, #id da pergunta a qual a resposta se refere
    alternativeA varchar(30), #alternativa A
    alternativeB varchar(30), #alternativa B 
    alternativeC varchar(30), #alternativa C
    alternativeD varchar(30), #alternativa D
    alternativeE varchar(30), #alternativa E
    alternativeF varchar(30) default '', #alternativa F
    alternativeG varchar(30) default '', #alternativa G
    constraint id_answer_advanced_pk primary key(id),
    constraint answer_advanced_un unique (id_task),
	constraint id_task_answer_advanced_fk foreign key (id_task)
    references tbl_task (id) ON DELETE CASCADE
);

# ---------------------------------------------------------------------------------------------------------

insert into tbl_user (user_name, user_email, user_password, user_type) values ("Admin","admin01@gmail.com","admin0001","admin"), ("Other","other01@gmail.com","other0001","comum");
insert into tbl_group (_name) values ("Público"), ("GRUPO DOIS"), ("GROUP TRHEE"), ("GRUPO DE FOUR");
insert into tbl_group_user (code_group, user_name) values (3, "Admin"), (1, "Admin"), (1, "Other"), (2, "Other"), (4, "Other");

insert into tbl_difficulty (_name, _description) values ("Básico","Nível simples e fácil, focado em um quiz para ajudar o usuário a memorizar coisas importantes."), 
("Intermediário","Nível com um aumento no grau de dificuldade em relação ao anterior, onde o usuário completa o código dado."), 
("Avançado","Nível relativamente díficil, onde o usuário desenvolve o código sozinho com as alternativas dadas, de acordo com o enunciado.");
 
insert into tbl_language (code_group, _name, _description) values (1, "HTML","HTML é uma linguagem de marcação utilizada na construção de páginas na Web. "), 
(1, "JavaScript","JavaScript é a linguagem de programação essencial para interatividade em páginas web."), 
(1, "SQL","SQL é uma linguagem para gerenciar bancos de dados relacionais, permitindo consultas e manipulações."),
(1, "NodeJs","é um software de código que permite a execução de códigos JavaScript fora de um navegador web."),
(2, "MySQL","MySQL é uma linguagem para gerenciar bancos de dados relacionais, permitindo consultas e manipulações.");

insert into tbl_teory (_name, teory_text, id_lang, id_diff) values ("HTML01TEORY", "Em HTML há uma tag que contém todo o código do site dentro, sendo ela <html>", 1, 1), 
("JS01TEORY", "JavaScript é uma linguagem muito uilizada pelo mundo todo, sendo que alguns framworks foram criados a partir dele, como React, Vue e Angular.", 2, 1), 
("HTML02TEORY", "Em HTML há duas tags essenciais para a formação do site, sendo elas <head> e <body>.", 1, 1), 
("NODEJS01TEORY", "NodeJs é uma linguagem normalmente utilizada para a formação do Back-End do site.", 4, 1),
("MYSQL01TEORY", "MySql é utilizado para a criação de um banco de dados, desde sua estrutura.", 5, 1);
 
#TASKS BÁSICAS -----------------------------------------------------------------------------------------------------

insert into tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) values ("HTML01", "Qual tag que contém todo o código para a formação do site?", "Leia a Teoria HTML 01 para saber mais.", 1, 1, 5), 
("JS01", "Quais frameworks foram criados a partir do JavaScript", "Leia a Teoria JS 01 para saber mais.", 2, 1, 5), 
("HTML03", "Quais tags são essencias para a formação do site em HTML?", "Leia a Teoria HTML 02 para saber mais.", 1, 1, 0), 
("NODEJS01", "Node normalmente tende a ser utilizado para a formação do que, em um site?", "Leia a Teoria NODEJS 01 para saber mais.", 4, 1, 5),
("SQL01", "SQL é uma linguagem usada para a construção de algo muito importante num projeto, o que é?", "Leia a Teoria SQL 01 para saber mais.", 3, 1, 0);

insert into tbl_answer_basic (id_task, answer_text, alternativeA, alternativeB, alternativeC) values (1, "Tag <html>", "Tag <h1>", "Tag <head>", "Tag <body>"), 
(2, "React, Vue e Angular", "React, Vue e HTML", "XML, HTML e CSS", "React-Native, e HTML"), 
(3, "<head> e <body>", "<head> e <link>", "<p> e <body>", "<h1> e <h6>"),
(4, "Back-End", "Banco de Dados", "Front-End", "Sistema Operacional"),
(5, "Banco de Dados", "Front-End", "IA", "Sistema Operacional");

#-------------------------------------------------------------------------------------------------------------------

#TASKS INTERMEDIÁRIAS ----------------------------------------------------------------------------------------------

/*
As tasks intermediários são formadas ao substituir as palavras a completar por ‼ (alt 19) a fim de o usuario o completar 
com as possiveis alternativas. Podendo conter no maximo 3 alternativas (Todas dentro de answer_text, separados por ' '),
e o restante das alternativas (erradas) ficam separados nos outros campos. Utilize \n para a separação do texto
em linha dentro do front (No maximo de 5 linhas).
*/
insert into tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) values ("JS02", "‼ (validacao == true) {\n    console.log(1)\n} ‼ {\n    console.log(0)\n}", "Leia a Teoria JS 02 para saber mais.", 2, 2, 5), 
("HTML02", "<head>\n	<meta ‼='UTF-8'>\n<‼>", "Leia a Teoria HTML 02 para saber mais.", 1, 2, 5), 
("HTML04", "<head>\n    <script src='js/script.js'><‼>\n    <‼ rel='stylesheet' ‼='css/style.css'>\n</head>", "Leia a Teoria HTML 04 para saber mais.", 1, 2, 0), 
("NODEJS02", "‼ api = express();\napi.‼(cors());\napi.use(express.json());\n‼.use('/teste', routes);", "Leia a Teoria NODEJS 02 para saber mais.", 4, 2, 5),
("SQL02", "create ‼ bd_teste;\nuse bd_teste;\n‼ database bd_teste;\ncreate table tbl_teste ( ??? );\ndrop ‼ tbl_teste", "Leia a Teoria SQL 02 para saber mais.", 3, 2, 5);

insert into tbl_answer_intermediary (id_task, answer_text, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE) 
values (6, "if else", "for", "while", "promisse", "async  await", "foreach"),
(7, "charset /head", "/name", "name /charset", "head", "meta/", "charset"),
(8, "/script link href", "head meta", "name style", "src", "rel", "script/"),
(9, "const use api", "express let", "cors int", "route", "routes", "json"),
(10, "database drop table", "use", "create", "insert", "delete", "select");

#-------------------------------------------------------------------------------------------------------------------

#TASKS AVANÇADAS ---------------------------------------------------------------------------------------------------
/*
insert into tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) values ("HTML05", "", "Leia a Teoria HTML 05 para saber mais.", 1, 3, 5), 
("JS03", "", "Leia a Teoria JS 03 para saber mais.", 2, 3, 5), 
("HTML06", "", "Leia a Teoria HTML 05 para saber mais.", 1, 3, 0), 
("NODEJS03", "", "Leia a Teoria NODEJS 03 para saber mais.", 4, 3, 5),
("SQL03", "", "Leia a Teoria SQL 03 para saber mais.", 3, 3, 5);

insert into tbl_answer_advanced (id_task, answer_text, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE, alternativeF, alternativeG) 
values (11, "", "", "", "", "", "", "", ""), 
(12, "", "", "", "", "", "", "", ""), 
(13, "", "", "", "", "", "", "", ""),
(14, "", "", "", "", "", "", "", ""),
(15, "", "", "", "", "", "", "", "");
*/

#-------------------------------------------------------------------------------------------------------------------

insert into tbl_teory_book (id_teory, id_task) values (1, 1), (2, 2), (3, 3);

select * from tbl_user;
# select * from tbl_group;
# select * from tbl_group_user;
# select * from tbl_info;
# select * from tbl_language;
# select * from tbl_difficulty;
# select * from tbl_teory;
# select * from tbl_quest;
# select * from tbl_answer_basic;
# select * from tbl_answer_intermediary;
# select * from tbl_answer_advanced;
# select * from tbl_registration;
# select * from tbl_question_book;
# select * from tbl_teory_book;

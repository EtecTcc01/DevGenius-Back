# CREATE DATABASE bd_tcc;

# USE bd_tcc;

# DROP DATABASE bd_tcc;

# USE railway;

# DROP DATABASE railway;

CREATE TABLE tbl_user ( #TBL DE USUARIO
	user_name VARCHAR(20), #nome de usuario (ficticio)
    user_type CHAR(5), #definindo o tipo de usuario
    user_email VARCHAR(50), #email valido do usuario
    user_password VARCHAR(30), #senha do usuario
    user_inactive BOOLEAN DEFAULT 0,
    CONSTRAINT tbl_user_id_pk PRIMARY KEY (user_name),
    CONSTRAINT tbl_user_un UNIQUE (user_email)
);

CREATE TABLE tbl_info ( #TBL DE USUARIO
	user_name VARCHAR(20),
    date_birth DATE, #a partir da data de nascimento definiremos sua faixa etaria
    user_sex CHAR(1), #sexo (F ou M)
    user_level INT DEFAULT 0, #nivel atual do usuario
	total_exp INT DEFAULT 0, #exp total (acumulativo) do usuario
    CONSTRAINT tbl_info_id_pk PRIMARY KEY (user_name),
    CONSTRAINT tbl_info_user_name_fk FOREIGN KEY (user_name) 
    REFERENCES tbl_user (user_name)
);

#Mudar o sistema de codigos para algo mais randomizado
CREATE TABLE tbl_group (
	_code INT AUTO_INCREMENT,
    _name VARCHAR(30),
    CONSTRAINT tbl_group_id_pk PRIMARY KEY (_code)
);

CREATE TABLE tbl_group_user (
	code_group INT,
    user_name VARCHAR(20),
    CONSTRAINT tbl_group_user_id_pk PRIMARY KEY (code_group, user_name),
    CONSTRAINT tbl_group_user_user_name_fk FOREIGN KEY (user_name)
    REFERENCES tbl_user (user_name),
    CONSTRAINT tbl_group_user_code_group_fk FOREIGN KEY (code_group)
    REFERENCES tbl_group (_code) ON DELETE CASCADE
);

CREATE TABLE tbl_language ( #TBL DE LINGUAGENS
	id INT AUTO_INCREMENT,
    code_group INT,
    _name VARCHAR(15), #nome da linguagem
	_description VARCHAR(150), #descricao da linguagem
    CONSTRAINT tbl_language_id_pk PRIMARY KEY (id),
    CONSTRAINT tbl_language_code_group_fk FOREIGN KEY (code_group)
    REFERENCES tbl_group (_code) ON DELETE CASCADE
);

CREATE TABLE tbl_difficulty ( #TBL DE DIFICULDADES
	id INT AUTO_INCREMENT,
    _name VARCHAR(15), #nome da dificuldade
    _description VARCHAR(150), #descricao da dificuldade
    CONSTRAINT tbl_difficulty_id_pk PRIMARY KEY (id)
);

CREATE TABLE tbl_teory (
	id INT AUTO_INCREMENT,
    _name VARCHAR(50), #nome da teoria/titulo da teoria (para identificação)
    teory_text VARCHAR(250), #texto da teoria
	id_lang INT, #id da linguagem a qual a teoria se refere
    id_diff INT, #id da dificuldade a qual a teoria se refere
	CONSTRAINT tbl_teory_id_pk PRIMARY KEY (id),
    CONSTRAINT tbl_teory_id_lang_fk FOREIGN KEY (id_lang)
    REFERENCES tbl_language (id) ON DELETE CASCADE,
    CONSTRAINT tbl_teory_id_diff_fk FOREIGN KEY (id_diff)
    REFERENCES tbl_difficulty (id) ON DELETE CASCADE
);

CREATE TABLE tbl_task ( #TBL DAS PERGUNTAS (SOLO)
	id INT AUTO_INCREMENT,
    _name VARCHAR(50), #nome da questão/titulo da questão (para identificação)
    task_text VARCHAR(250), #texto da pergunta	
	explanation_task VARCHAR(100), #explicacao da pergunta (Um resumo p/quando a pessoa errar)
	id_lang INT, #id da linguagem a qual a pergunta se refere
    id_diff INT, #id da dificuldade a qual a pergunta se refere
	exp_task INT DEFAULT 0, #Cd pergunta dará (ou não) uma quantidade de exp que será adicionada ao exp_total da tabela user
	CONSTRAINT tbl_task_id_pk PRIMARY KEY (id),
    CONSTRAINT tbl_task_un UNIQUE (_name),
    CONSTRAINT tbl_task_id_lang_fk FOREIGN KEY(id_lang)
    REFERENCES tbl_language (id) ON DELETE CASCADE,
    CONSTRAINT tbl_task_id_diff_fk FOREIGN KEY (id_diff)
    REFERENCES tbl_difficulty (id) ON DELETE CASCADE
);

CREATE TABLE tbl_teory_book ( #TBL DE RELAÇÃO ENTRE TEORIAS E O PERGUNTAS
	id_teory INT, #id da teoria a qual a pergunta se refere
    id_task INT, #id da pergunta a ser registrada em determinado curso
    CONSTRAINT tbl_teory_book_id_pk PRIMARY KEY(id_teory, id_task),
    CONSTRAINT tbl_teory_book_id_task_fk FOREIGN KEY(id_task)
    REFERENCES tbl_task (id) ON DELETE CASCADE,
    CONSTRAINT tbl_teory_book_id_teory_fk FOREIGN KEY(id_teory)
    REFERENCES tbl_teory(id) ON DELETE CASCADE
);

# PRECISA CRIAR UM GATILHO PARA ADD AS INFO DAS TABELAS A SEGUIR ? -----------------------------------------------

CREATE TABLE tbl_registration ( #TBL DA MATRICULA (RELACIONAMENTO)
	id INT AUTO_INCREMENT,
    user_name VARCHAR(20), #id do usuario que está "matriculado" em determinado curso
    id_lang INT, #id da linguagem a qual o usuario está matriculado
    id_diff INT, #id da dificuldade da linguagem referente a qual o usuario está matriculado
    quest_active INT DEFAULT 0,
    date_registration datetime DEFAULT now(), #data da matricula do usuario
	CONSTRAINT tbl_registration_id_pk PRIMARY KEY(id),
    CONSTRAINT tbl_registration_un UNIQUE (id_diff, id_lang, user_name),
    CONSTRAINT tbl_registration_id_lang_fk FOREIGN KEY(id_lang)
    REFERENCES tbl_language (id) ON DELETE CASCADE,
    CONSTRAINT tbl_registration_id_diff_fk FOREIGN KEY (id_diff)
    REFERENCES tbl_difficulty (id) ON DELETE CASCADE,
    CONSTRAINT tbl_registration_id_user_fk FOREIGN KEY (user_name)
    REFERENCES tbl_user (user_name)
);


CREATE TABLE tbl_task_book ( #TBL DE RELAÇÃO ENTRE PERGUNTAS E O CURSO
	id_registration INT, #id do curso em que o usuario está matriculado (linguagem + dificuldade)
    id_task INT, #id da pergunta a ser registrada em determinado curso
    CONSTRAINT tbl_task_book_id_pk PRIMARY KEY(id_registration, id_task),
    CONSTRAINT tbl_task_book_id_task_fk FOREIGN KEY(id_task)
    REFERENCES tbl_task (id) ON DELETE CASCADE,
    CONSTRAINT tbl_task_book_id_registration_fk FOREIGN KEY(id_registration)
    REFERENCES tbl_registration(id) ON DELETE CASCADE
);

# ---------------------------------------------------------------------------------------------------------------

#Nível basico: Preencher com um padrão de quiz (Answer_text faz parte das alternativas)
CREATE TABLE tbl_answer_basic ( #TBL DE RESPOSTAS O NÍVEL BASICO P/DETERMINADA PERGUNTA DE DETERMINADO CURSO
	id INT AUTO_INCREMENT,
    answer_text VARCHAR(100), #resposta correta (Completa), usada para validação
    id_task INT, #id da pergunta a qual a resposta se refere
    alternativeA VARCHAR(100), #alternativa A
    alternativeB VARCHAR(100), #alternativa B 
    alternativeC VARCHAR(100), #alternativa C
    CONSTRAINT tbl_answer_basic_id_pk PRIMARY KEY(id),
    CONSTRAINT tbl_answer_basic_un UNIQUE (id_task),
	CONSTRAINT tbl_answer_basic_id_task_fk FOREIGN KEY (id_task)
    REFERENCES tbl_task (id) ON DELETE CASCADE
);

#Nível Intermediario: reencher as alternativas com, no maximo, 3 palavras, referente a programação (Com excessão da answer_text)
CREATE TABLE tbl_answer_Intermediary ( #TBL DE RESPOSTAS DO NÍVEL INTERMEDIARIO P/DETERMINADA PERGUNTA DE DETERMINADO CURSO
	id INT AUTO_INCREMENT,
    answer_text VARCHAR(200), #resposta correta (Completa), usada para apenas para validação
    id_task INT, #id da pergunta a qual a resposta se refere
    alternativeA VARCHAR(30), #alternativa A
    alternativeB VARCHAR(30), #alternativa B 
    alternativeC VARCHAR(30), #alternativa C
    alternativeD VARCHAR(30), #alternativa D
    alternativeE VARCHAR(30), #alternativa E
    CONSTRAINT tbl_answer_intermediary_id_pk PRIMARY KEY(id),
    CONSTRAINT tbl_answer_intermediary_un UNIQUE (id_task),
	CONSTRAINT tbl_answer_intermediary_id_task_fk FOREIGN KEY (id_task)
    REFERENCES tbl_task (id) ON DELETE CASCADE
);

#Tabela para a visualização de uma resposta "meia correta" da questão
/*
CREATE TABLE tbl_answer_half_correct (
	answerId INT,
    correctly_answer VARCHAR(30),
    ahc_text VARCHAR(200),
    CONSTRAINT tbl_answer_half_correct_id_pk PRIMARY KEY (answerId)
);
*/

#Nível avançado: preencher o campo com a resposta correta (Completa) e usar c/validação no front
CREATE TABLE tbl_answer_advanced ( #TBL DE RESPOSTAS DO NÍVEL AVANÇADO P/DETERMINADA PERGUNTA DE DETERMINADO CURSO
	id INT AUTO_INCREMENT,
    answer_text VARCHAR(200), #resposta correta (Completa), usada para validação
    id_task INT, #id da pergunta a qual a resposta se refere
    CONSTRAINT tbl_answer_advanced_id_pk PRIMARY KEY(id),
    CONSTRAINT tbl_answer_advanced_un UNIQUE (id_task),
	CONSTRAINT tbl_answer_advanced_id_task_fk FOREIGN KEY (id_task)
    REFERENCES tbl_task (id) ON DELETE CASCADE
);

# ---------------------------------------------------------------------------------------------------------

INSERT INTO tbl_user (user_name, user_email, user_password, user_type) VALUES ("Admin","admin01@gmail.com","admin0001","admin"), ("Other","other01@gmail.com","other0001","comum");
INSERT INTO tbl_group (_name) VALUES ("Público"), ("GRUPO DOIS"), ("GROUP TRHEE"), ("GRUPO DE FOUR");
INSERT INTO tbl_group_user (code_group, user_name) VALUES (3, "Admin"), (1, "Admin"), (1, "Other"), (2, "Other"), (4, "Other");

INSERT INTO tbl_difficulty (_name, _description) VALUES ("Básico","Nível simples e fácil, focado em um quiz para ajudar o usuário a memorizar coisas importantes."), 
("Intermediário","Nível com um aumento no grau de dificuldade em relação ao anterior, onde o usuário completa o código dado."), 
("Avançado","Nível relativamente díficil, onde o usuário desenvolve o código sozinho com as alternativas dadas, de acordo com o enunciado.");
 
INSERT INTO tbl_language (code_group, _name, _description) VALUES (1, "HTML","HTML é uma linguagem de marcação utilizada na construção de páginas na Web. "), 
(1, "JavaScript","JavaScript é a linguagem de programação essencial para INTeratividade em páginas web."), 
(1, "SQL","SQL é uma linguagem para gerenciar bancos de dados relacionais, permitindo consultas e manipulações."),
(1, "NodeJs","é um software de código que permite a execução de códigos JavaScript fora de um navegador web."),
(2, "MySQL","MySQL é uma linguagem para gerenciar bancos de dados relacionais, permitindo consultas e manipulações.");

INSERT INTO tbl_teory (_name, teory_text, id_lang, id_diff) VALUES ("HTML01TEORY", "Em HTML há uma tag que contém todo o código do site dentro, sendo ela <html>", 1, 1), 
("JS01TEORY", "JavaScript é uma linguagem muito uilizada pelo mundo todo, sendo que alguns framworks foram criados a partir dele, como React, Vue e Angular.", 2, 1), 
("HTML02TEORY", "Em HTML há duas tags essenciais para a formação do site, sendo elas <head> e <body>.", 1, 1), 
("NODEJS01TEORY", "NodeJs é uma linguagem normalmente utilizada para a formação do Back-End do site.", 4, 1),
("MYSQL01TEORY", "MySql é utilizado para a criação de um banco de dados, desde sua estrutura.", 5, 1);
 
#TASKS BÁSICAS -----------------------------------------------------------------------------------------------------

INSERT INTO tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) VALUES ("HTML01", "Qual tag que contém todo o código para a formação do site?", "Leia a Teoria HTML 01 para saber mais.", 1, 1, 5), 
("JS01", "Quais frameworks foram criados a partir do JavaScript", "Leia a Teoria JS 01 para saber mais.", 2, 1, 5), 
("HTML03", "Quais tags são essencias para a formação do site em HTML?", "Leia a Teoria HTML 02 para saber mais.", 1, 1, 0), 
("NODEJS01", "Node normalmente tende a ser utilizado para a formação do que, em um site?", "Leia a Teoria NODEJS 01 para saber mais.", 4, 1, 5),
("SQL01", "SQL é uma linguagem usada para a construção de algo muito importante num projeto, o que é?", "Leia a Teoria SQL 01 para saber mais.", 3, 1, 0);

INSERT INTO tbl_answer_basic (id_task, answer_text, alternativeA, alternativeB, alternativeC) VALUES (1, "Tag <html>", "Tag <h1>", "Tag <head>", "Tag <body>"), 
(2, "React, Vue e Angular", "React, Vue e HTML", "XML, HTML e CSS", "React-Native, e HTML"), 
(3, "<head> e <body>", "<head> e <link>", "<p> e <body>", "<h1> e <h6>"),
(4, "Back-End", "Banco de Dados", "Front-End", "Sistema Operacional"),
(5, "Banco de Dados", "Front-End", "IA", "Sistema Operacional");

#-------------------------------------------------------------------------------------------------------------------

#TASKS INTERMEDIÁRIAS ----------------------------------------------------------------------------------------------

/*
As tasks Intermediários são formadas ao substituir as palavras a completar por ‼ (alt 19) a fim de o usuario o completar 
com as possiveis alternativas. Podendo conter no maximo 3 alternativas (Todas dentro de answer_text, separados por ' '),
e o restante das alternativas (erradas) ficam separados nos outros campos. Utilize \n para a separação do texto
em linha dentro do front (No maximo de 5 linhas).
*/
INSERT INTO tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) VALUES ("JS02", "‼ (validacao == true) {\n    console.log(1)\n} ‼ {\n    console.log(0)\n}", "Leia a Teoria JS 02 para saber mais.", 2, 2, 5), 
("HTML02", "<head>\n	<meta ‼='UTF-8'>\n<‼>", "Leia a Teoria HTML 02 para saber mais.", 1, 2, 5), 
("HTML04", "<head>\n    <script src='js/script.js'><‼>\n    <‼ rel='stylesheet' ‼='css/style.css'>\n</head>", "Leia a Teoria HTML 04 para saber mais.", 1, 2, 0), 
("NODEJS02", "‼ api = express();\napi.‼(cors());\napi.use(express.json());\n‼.use('/teste', routes);", "Leia a Teoria NODEJS 02 para saber mais.", 4, 2, 5),
("SQL02", "create ‼ bd_teste;\nuse bd_teste;\n‼ database bd_teste;\nCREATE TABLE tbl_teste ( ??? );\ndrop ‼ tbl_teste", "Leia a Teoria SQL 02 para saber mais.", 3, 2, 5);

INSERT INTO tbl_answer_Intermediary (id_task, answer_text, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE) 
VALUES (6, "if else", "for", "while", "promisse", "async  await", "foreach"),
(7, "charset /head", "/name", "name /charset", "head", "meta/", "meta"),
(8, "/script link href", "head meta", "name style", "src", "rel", "script/"),
(9, "const use api", "express let", "cors INT", "route", "routes", "json"),
(10, "database drop table", "use", "create", "insert", "delete", "select");

#-------------------------------------------------------------------------------------------------------------------

#TASKS AVANÇADAS ---------------------------------------------------------------------------------------------------

INSERT INTO tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) VALUES ("HTML05", "Utilize das possibilidades dada para criar um código padrão <head> HTML.", "Leia a Teoria HTML 05 para saber mais.", 1, 3, 5), 
("JS03", "Utilize das possibilidades dadas para criar um código JS.", "Leia a Teoria JS 03 para saber mais.", 2, 3, 5), 
("HTML06", "Utilize das possibilidades dadas para criar um código HTML.", "Leia a Teoria HTML 05 para saber mais.", 1, 3, 0), 
("NODEJS03", "Utilize das possibilidades dadas para criar um código NodeJs.", "Leia a Teoria NODEJS 03 para saber mais.", 4, 3, 5),
("SQL03", "Utilize das possibilidades dadas para criar um código JS.", "Leia a Teoria SQL 03 para saber mais.", 3, 3, 5);

INSERT INTO tbl_answer_advanced (id_task, answer_text) 
VALUES (11, "<meta charset=''>\n<meta http-equiv='' content=''\n<meta name='' content=''>\n<title> Document </title>"), 
(12, ""), 
(13, ""),
(14, ""),
(15, "");

#-------------------------------------------------------------------------------------------------------------------

INSERT INTO tbl_teory_book (id_teory, id_task) VALUES (1, 1), (2, 2), (3, 3);

SELECT * FROM tbl_user;
# SELECT * FROM tbl_group;
# SELECT * FROM tbl_group_user;
# SELECT * FROM tbl_info;
# SELECT * FROM tbl_language;
# SELECT * FROM tbl_difficulty;
# SELECT * FROM tbl_teory;
# SELECT * FROM tbl_quest;
# SELECT * FROM tbl_answer_basic;
# SELECT * FROM tbl_answer_INTermediary;
# SELECT * FROM tbl_answer_advanced;
# SELECT * FROM tbl_registration;
# SELECT * FROM tbl_question_book;
# SELECT * FROM tbl_teory_book;

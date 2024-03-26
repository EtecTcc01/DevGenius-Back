#Arquivo p/inserts e selects das tabelas do bd_tcc

# USE bd_tcc;

# -----------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO tbl_user (user_name, user_email, user_password, user_type) VALUES ("Admin","admin01@gmail.com","admin0001","admin"), ("Other","other01@gmail.com","other0001","comum");
INSERT INTO tbl_info (user_name, first_name, last_name, date_birth, user_sex) VALUES ("Admin", "Ademilson", "Oliveira Da Silva", "2000-02-09", "M"), ("Other", "Otherian", "Theodor Silveira", "1988-04-22", "F");
INSERT INTO tbl_group (_name) VALUES ("Público"), ("GRUPO DOIS"), ("GROUP TRHEE"), ("GRUPO DE FOUR");
INSERT INTO tbl_group_user (code_group, user_name) VALUES (3, "Admin"), (1, "Admin"), (1, "Other"), (2, "Other"), (4, "Other");

INSERT INTO tbl_difficulty (_name, _description) VALUES ("Básico","Nível simples e fácil, focado em um quiz para ajudar o usuário a memorizar coisas importantes."), 
("Intermediário","Nível com um aumento no grau de dificuldade em relação ao anterior, onde o usuário completa o código dado."), 
("Avançado","Nível relativamente díficil, onde o usuário desenvolve o código sozinho com as alternativas dadas, de acordo com o enunciado.");
 
INSERT INTO tbl_language (code_group, _name, _description, avatar) VALUES (1, "Projeto WEB","HTML + CSS. 'Pacote' com duas linguagens de marcação de texto para a construção de projetos web.", "logo-html5"), 
(1, "JavaScript","JavaScript é a linguagem de programação essencial para INTeratividade em páginas web.", "logo-javascript"), 
(1, "NodeJs","é um software de código que permite a execução de códigos JavaScript fora de um navegador web.", "logo-nodejs"),
(2, "MySQL","MySQL é uma linguagem para gerenciar bancos de dados relacionais, permitindo consultas e manipulações.", "None");

INSERT INTO tbl_teory (_name, teory_text, id_lang, id_diff) VALUES ("HTML01TEORY", "Em HTML há uma tag que contém todo o código do site dentro, sendo ela <html>", 1, 1), 
("JS01TEORY", "JavaScript é uma linguagem muito uilizada pelo mundo todo, sendo que alguns framworks foram criados a partir dele, como React, Vue e Angular.", 2, 1), 
("HTML02TEORY", "Em HTML há duas tags essenciais para a formação do site, sendo elas <head> e <body>.", 1, 1), 
("NODEJS01TEORY", "NodeJs é uma linguagem normalmente utilizada para a formação do Back-End do site.", 3, 1),
("MYSQL01TEORY", "MySql é utilizado para a criação de um banco de dados, desde sua estrutura.", 4, 1);
 
#TASKS BÁSICAS -----------------------------------------------------------------------------------------------------

INSERT INTO tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) VALUES ("HTML01", "Qual tag que contém todo o código para a formação do site?", "Leia a Teoria HTML 01 para saber mais.", 1, 1, 5), 
("JS01", "Quais frameworks foram criados a partir do JavaScript", "Leia a Teoria JS 01 para saber mais.", 2, 1, 5), 
("HTML03", "Quais tags são essencias para a formação do site em HTML?", "Leia a Teoria HTML 02 para saber mais.", 1, 1, 0), 
("NODEJS01", "Node normalmente tende a ser utilizado para a formação do que, em um site?", "Leia a Teoria NODEJS 01 para saber mais.", 3, 1, 5);

INSERT INTO tbl_answer_basic (id_task, answer_text, alternativeA, alternativeB, alternativeC) VALUES (1, "Tag <html>", "Tag <h1>", "Tag <head>", "Tag <body>"), 
(2, "React, Vue e Angular", "React, Vue e HTML", "XML, HTML e CSS", "React-Native, e HTML"), 
(3, "<head> e <body>", "<head> e <link>", "<p> e <body>", "<h1> e <h6>"),
(4, "Back-End", "Banco de Dados", "Front-End", "Sistema Operacional");

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
("NODEJS02", "‼ api = express();\napi.‼(cors());\napi.use(express.json());\n‼.use('/teste', routes);", "Leia a Teoria NODEJS 02 para saber mais.", 3, 2, 5);

INSERT INTO tbl_answer_Intermediary (id_task, answer_text, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE) 
VALUES (5, "if else", "for", "while", "promisse", "async await", "foreach"),
(6, "charset /head", "/name", "name /charset", "head", "meta/", "meta"),
(7, "/script link href", "head meta", "name style", "src", "rel", "script/"),
(8, "const use api", "express let", "cors INT", "route", "routes", "json");

#-------------------------------------------------------------------------------------------------------------------

#TASKS AVANÇADAS ---------------------------------------------------------------------------------------------------

INSERT INTO tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) VALUES ("HTML05", "Utilize das possibilidades dada para criar um código padrão <head> HTML.", "Leia a Teoria HTML 05 para saber mais.", 1, 3, 5), 
("JS03", "Utilize das possibilidades dadas para criar um código JS.", "Leia a Teoria JS 03 para saber mais.", 2, 3, 5), 
("HTML06", "Utilize das possibilidades dadas para criar um código HTML.", "Leia a Teoria HTML 05 para saber mais.", 1, 3, 0), 
("NODEJS03", "Utilize das possibilidades dadas para criar um código NodeJs.", "Leia a Teoria NODEJS 03 para saber mais.", 4, 3, 5);

INSERT INTO tbl_answer_advanced (id_task, answer_text) 
VALUES (9, "<meta charset=''>\n<meta http-equiv='' content=''\n<meta name='' content=''>\n<title> Document </title>"), 
(10, ""), 
(11, ""),
(12, "");

#-------------------------------------------------------------------------------------------------------------------

INSERT INTO tbl_teory_book (id_teory, id_task) VALUES (1, 1), (2, 2), (3, 3);

SELECT * FROM tbl_user;
# SELECT * FROM tbl_group;
# SELECT * FROM tbl_group_user;
# SELECT * FROM tbl_info;
# SELECT * FROM tbl_language;
# SELECT * FROM tbl_difficulty;
# SELECT * FROM tbl_teory;
# SELECT * FROM tbl_task;
# SELECT * FROM tbl_answer_basic;
# SELECT * FROM tbl_answer_Intermediary;
# SELECT * FROM tbl_answer_advanced;
# SELECT * FROM tbl_registration;

# SELECT * FROM tbl_task_book;
# SELECT * FROM tbl_teory_book;

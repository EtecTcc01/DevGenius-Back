#ARQUIVO P/INSERT'S NAS TABELAS DO db_devgenius

# USE bd_tcc;
# -----------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO tbl_user_type (_name) VALUES ("COMUM"), ("ADMINISTRATOR"), ("EDUCATOR");
INSERT INTO tbl_user (_name, _email, _password, id_type) VALUES ("Admin","admin01@gmail.com","admin0001", 2), ("Other","other01@gmail.com","other0001", 1);
INSERT INTO tbl_user_info (id_user, date_birth, _sex) VALUES (1, "2000-02-09", "M"), (2, "1988-04-22", "F");
INSERT INTO tbl_group (_name) VALUES ("Público"), ("GRUPO DOIS"), ("GROUP TRHEE"), ("GRUPO DE FOUR");
INSERT INTO tbl_user_group (id_group, id_user) VALUES (2, 1), (1, 1), (1, 2), (2, 2), (4, 2);

INSERT INTO tbl_operation (_name, _description) VALUES ("Básico","Nível simples e fácil, focado em um quiz para ajudar o usuário a memorizar coisas importantes."), 
("Intermediário","Nível com um aumento no grau de dificuldade em relação ao anterior, onde o usuário completa o código dado."), 
("Avançado","Nível relativamente díficil, onde o usuário desenvolve o código sozinho com as alternativas dadas, de acordo com o enunciado.");
 
INSERT INTO tbl_course (_name, _description, id_group, _icon) VALUES 
("Projeto WEB", "HTML + CSS. 'Pacote' com duas linguagens de marcação de texto para a construção de projetos web.", 1, "https://cdn.dribbble.com/users/783/screenshots/104300/shot_1295820312.gif"), 
("JavaScript", "JavaScript é a linguagem de programação essencial para INTeratividade em páginas web.", 1, "https://img.icons8.com/?size=100&id=108784&format=png&color=000000"), 
("NodeJs", "É um software de código que permite a execução de códigos JavaScript fora de um navegador web.", 1, "https://img.icons8.com/?size=100&id=ouWtcsgDBiwO&format=png&color=000000"), 
("MySQL", "MySQL é uma linguagem para gerenciar bancos de dados relacionais, permitindo consultas e manipulações.", 2, "https://img.icons8.com/?size=100&id=8httoRHg3Sbt&format=png&color=000000"), 
("Teste Grupo", "Testando grupo... Testando", 2, "none");

INSERT INTO tbl_stage (id_course, _name) VALUES (1, "HTML 01"), (1, "HTML 02"), (2, "JAVASCRIPT 01"), 
(3, "NODEJS 01"), (3, "NODEJS 02"), (5, "Teste 01");

INSERT INTO tbl_teory (_name, _text, id_stage) VALUES ("HTML01TEORY", "Em HTML há uma tag que contém todo o código do site dentro, sendo ela <html>", 1), 
("JS01TEORY", "JavaScript é uma linguagem muito uilizada pelo mundo todo, sendo que alguns framworks foram criados a partir dele, como React, Vue e Angular.", 3), 
("HTML02TEORY", "Em HTML há duas tags essenciais para a formação do site, sendo elas <head> e <body>.", 2), 
("NODEJS01TEORY", "NodeJs é uma linguagem normalmente utilizada para a formação do Back-End do site.", 4),
# ("MYSQL01TEORY", "MySql é utilizado para a criação de um banco de dados, desde sua estrutura.", 8),
#("TESTE02TEORY", "Testando grupo e suas teorias.", 7),
("TESTE01TEORY", "Testando grupo e suas teorias.", 6), ("TESTE01.2TEORY", "Testando grupo e suas teorias.", 6);
 
#TASKS BÁSICAS -----------------------------------------------------------------------------------------------------

# As tasks básica são, basicamente, um quiz, onde é adicionado uma tarefa e alternativas a serem escolhidas

INSERT INTO tbl_task (id_operation, _name, _text, _explanation, id_stage) VALUES (1, "HTML BÁSICO 01", "Qual tag que contém todo o código para a formação do site?", "Leia a Teoria HTML 01 para saber mais.", 1),
(1, "JS BÁSICO 01", "Quais frameworks foram criados a partir do JavaScript", "Leia a Teoria JS 01 para saber mais.", 3), 
(1, "HTML BÁSICO 02", "Quais tags são essencias para a formação do site em HTML?", "Leia a Teoria HTML 03 para saber mais.", 2), 
(1, "NODEJS BÁSICO 01", "Node normalmente tende a ser utilizado para a formação do que, em um site?", "Leia a Teoria NODEJS 01 para saber mais.", 4);

INSERT INTO tbl_answer_basic (id_task, _text, _alternativeA, _alternativeB, _alternativeC) VALUES (1, "Tag <html>", "Tag <h1>", "Tag <head>", "Tag <body>"), 
(2, "React, Vue e Angular", "React, Vue e HTML", "XML, HTML e CSS", "React-Native, e HTML"), 
(3, "<head> e <body>", "<head> e <link>", "<p> e <body>", "<h1> e <h6>"),
(4, "Back-End", "Banco de Dados", "Front-End", "Sistema Operacional");

#TASKS INTERMEDIÁRIAS ----------------------------------------------------------------------------------------------

/*
As tasks Intermediários são formadas ao substituir as palavras a completar por "‼" (alt 19) a fim de o usuario o completar 
com as possiveis alternativas. Contendo no maximo 3 alternativas erradas (Todas dentro de _text, separados por ' ').
Utilize "\n" para a separação do texto por linha dentro do front (No maximo de 5 linhas).
*/

INSERT INTO tbl_task (id_operation, _name, _text, _explanation, id_stage) VALUES (2, "JS INTERMEDIÁRIO 01", "‼ (validacao == true) {\n    console.log(1)\n} ‼ {\n    console.log(0)\n}", "Leia a Teoria JS 02 para saber mais.", 3), 
(2, "HTML INTERMEDIÁRIO 01", "<head>\n	<meta ‼='UTF-8'>\n<‼>", "Leia a Teoria HTML 02 para saber mais.", 1), 
(2, "HTML INTERMEDIÁRIO 02", "<head>\n    <script src='js/script.js'><‼>\n    <‼ rel='stylesheet' ‼='css/style.css'>\n</head>", "Leia a Teoria HTML 04 para saber mais.", 2), 
(2, "NODEJS INTERMEDIÁRIO 01", "‼ api = express();\napi.‼(cors());\napi.use(express.json());\n‼.use('/teste', routes);", "Leia a Teoria NODEJS 02 para saber mais.", 5);

INSERT INTO tbl_answer_intermediary (id_task, _text, _alternativeA, _alternativeB, _alternativeC, _alternativeD, _alternativeE) 
VALUES (5, "if else", "for", "while", "promisse", "async await", "foreach"),
(6, "charset /head", "/name", "name /charset", "head", "meta/", "meta"),
(7, "/script link href", "head meta", "name style", "src", "rel", "script/"),
(8, "const use api", "express let", "cors INT", "route", "routes", "json");

#TASKS AVANÇADAS ---------------------------------------------------------------------------------------------------

INSERT INTO tbl_task (id_operation, _name, _text, _explanation, id_stage) VALUES (3, "HTML Avançado 01", "Utilize das possibilidades dada para criar um código padrão <head> HTML.", "Leia a Teoria HTML 05 para saber mais.", 1);

INSERT INTO tbl_answer_advanced (id_task, _code) VALUES (9, "<meta charset=''>\n<meta http-equiv='' content=''>\n<meta name='' content=''>\n<title> Document </title>");

#-------------------------------------------------------------------------------------------------------------------

#TESTE
INSERT INTO tbl_task (id_operation, _name, _text, _explanation, id_stage) VALUES (1, "HTML BÁSICO 01.2", "Quais tags são usadas para 'linkar' o arquivo JavaScript e CSS com o HTML?", "Leia a Teoria HTML 01 para saber mais.", 6);
INSERT INTO tbl_answer_basic (id_task, _text, _alternativeA, _alternativeB, _alternativeC) VALUES (10, "Tag <script> e <link>", "Tag <html> e <script>", "Tag <css> e <js>", "Tag <universal>");


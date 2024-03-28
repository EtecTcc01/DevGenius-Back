CREATE DATABASE bd_tcc;

USE bd_tcc;

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
    first_name VARCHAR(30),
    last_name VARCHAR(50),
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
    avatar VARCHAR(50) DEFAULT "None",
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
    # task_instruction VARCHAR(100) DEFAULT "", #dica para o usuário
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

/*
CREATE TABLE tbl_task_book ( #TBL DE RELAÇÃO ENTRE PERGUNTAS E O CURSO
	id_registration INT, #id do curso em que o usuario está matriculado (linguagem + dificuldade)
    id_task INT, #id da pergunta a ser registrada em determinado curso
    CONSTRAINT tbl_task_book_id_pk PRIMARY KEY(id_registration, id_task),
    CONSTRAINT tbl_task_book_id_task_fk FOREIGN KEY(id_task)
    REFERENCES tbl_task (id) ON DELETE CASCADE,
    CONSTRAINT tbl_task_book_id_registration_fk FOREIGN KEY(id_registration)
    REFERENCES tbl_registration(id) ON DELETE CASCADE
);
*/

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

# --------------------------------------------------------------------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------------------------------------------------------------------

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
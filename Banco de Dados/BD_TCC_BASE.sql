CREATE DATABASE db_devgenius;

USE db_devgenius;

# DROP DATABASE db_devgenius;

CREATE TABLE tbl_user_type ( #TABELA DE TIPOS DE USUÁRIOS
	_id INT UNSIGNED AUTO_INCREMENT,
    _name VARCHAR(30), #tipo: COMUM, ADMINISTRATOR e EDUCATOR
    CONSTRAINT tbl_user_type_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_user ( #TBL PARA CADASTRO DE USUARIOS
	_id INT UNSIGNED AUTO_INCREMENT,
    id_type INT UNSIGNED, #tipo de usuario
	_name VARCHAR(30), #nome de usuario (ficticio)
    _email VARCHAR(100), #email valido do usuario
    _password VARCHAR(30), #senha do usuario
    _inactive BOOLEAN DEFAULT 0, #status da conta do usuário
    date_register DATETIME DEFAULT NOW(), #data em que o usuário foi cadastrado
    CONSTRAINT tbl_user_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_title ( #TABELA DE TÍTULOS
	_id INT UNSIGNED AUTO_INCREMENT,
    _name VARCHAR(50), #nome do titulo
    _description VARCHAR(300), #descrição da titulo
    _exp INT DEFAULT 0, #exp ganho ao adquirir o titulo
    CONSTRAINT tbl_title_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_user_title ( #TABELA DE CONQUISTAS DO USUÁRIO
	id_title INT UNSIGNED, #id da conquista
    id_user INT UNSIGNED, #id do usuário
    date_reward DATETIME DEFAULT NOW(), #data/horario em que o título foi adquirido
    CONSTRAINT tbl_user_title_id_pk PRIMARY KEY (id_title, id_user)
);

CREATE TABLE tbl_user_info ( #TABELA DE INFORMAÇÕES DE USUARIO
	id_user INT UNSIGNED, #id correpondente ao usuário
    date_birth VARCHAR(10), #data de nascimento do usuário
    profile_image VARCHAR(500) DEFAULT "", #imagem de perfil do usuário
    _sex CHAR(1), #sexo do usuário: F (Feminino), M (Masculino) ou O (Outro ?)
    _level INT DEFAULT 0, #nivel atual do usuario
	total_exp FLOAT DEFAULT 0, #exp total (acumulativo) do usuario
    title_actual VARCHAR(50) DEFAULT "Nenhum", #titulo atual exercido pelo usuário
    CONSTRAINT tbl_user_info_id_pk PRIMARY KEY (id_user)
);

CREATE TABLE tbl_achievement ( #TABELA DE CONQUISTAS
	_id INT UNSIGNED AUTO_INCREMENT,
    _title VARCHAR(100), #titulo da conquista
    _description VARCHAR(300), #descrição da conquista
    _icon VARCHAR(500) DEFAULT "", #icon da conquista
     _exp INT DEFAULT 0, #exp ganho ao adquirir a conquista
    CONSTRAINT tbl_achievement_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_user_achievement ( #TABELA DE CONQUISTAS DO USUÁRIO
	id_achievement INT UNSIGNED, #id da conquista
    id_user INT UNSIGNED, #id do usuário
    date_reward DATETIME DEFAULT NOW(), #data/horario em que a conquista foi adquirida
    CONSTRAINT tbl_user_achievement_id_pk PRIMARY KEY (id_achievement, id_user)
);

CREATE TABLE tbl_group ( #TABELA DE GRUPOS
	_id INT UNSIGNED AUTO_INCREMENT,
    _name VARCHAR(50), #nome do grupo
    CONSTRAINT tbl_group_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_user_group ( #TABELA DE GRUPOS DO USUÁRIO
	id_group INT UNSIGNED, #id do curso
    id_user INT UNSIGNED, #id do usuário participante do curso
    _perm BOOLEAN DEFAULT 0, #state p/definir state de admin p/o usuário
	date_register DATETIME DEFAULT NOW(), #data/horario em que o usuário foi adicionado ao grupo
    CONSTRAINT tbl_user_group_id_pk PRIMARY KEY (id_group, id_user)
);

CREATE TABLE tbl_course ( #TABELA DE CURSOS
	_id INT UNSIGNED AUTO_INCREMENT,
    id_group INT UNSIGNED, #id do grupo ao o curso se refere
	_name VARCHAR(30), #nome do curso/linguagem
	_description VARCHAR(150), #descricao do curso/linguagem
    _icon VARCHAR(500) DEFAULT "none", #icon do curso/linguagem
	CONSTRAINT tbl_course_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_stage ( #TABELA DE ETAPA P/APRENDIZADO
	_id INT UNSIGNED AUTO_INCREMENT,
    id_course INT UNSIGNED, #id do curso ao qual a etapa se refere
    _name VARCHAR(50), #nome/titulo da etapa
    CONSTRAINT tbl_stage_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_teory ( #TABELA DE TEORIAS
	_id INT UNSIGNED AUTO_INCREMENT,
    id_stage INT UNSIGNED, #id da etapa ao qual a teoria se refere
    _name VARCHAR(50), #nome da teoria/titulo da teoria (para identificação)
    _text VARCHAR(500), #texto teórico
	CONSTRAINT tbl_teory_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_operation ( #TBL DE OPERAÇÕES
	_id INT UNSIGNED AUTO_INCREMENT,
    _name VARCHAR(30), #nome da operação
    _description VARCHAR(150), #descricao da operação
    CONSTRAINT tbl_operation_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_task ( #TABELA DAS TAREFAS
	_id INT UNSIGNED AUTO_INCREMENT,
    id_stage INT UNSIGNED, #id da etapa ao qual a tarefa se refere
    id_operation INT UNSIGNED, #id do tipo de operação, usada p/identificação
    _name VARCHAR(50), #nome da questão/titulo da tarefa
    _text VARCHAR(300), #texto da tarefa
	_explanation VARCHAR(300), #explicacao da tarefa (Um resumo p/quando a pessoa errar)
    CONSTRAINT tbl_task_id_pk PRIMARY KEY (_id)
);

CREATE TABLE tbl_registration ( #TABELA DA MATRICULA DO CURSO (RELACIONAMENTO)
	_id INT UNSIGNED AUTO_INCREMENT,
    id_user INT UNSIGNED, #id do usuario que está "matriculado" em determinado curso
    id_course INT UNSIGNED, #id do curso ao qual o registro se refere
    date_registration DATETIME DEFAULT NOW(), #data da matricula do usuario
    level_stage INT UNSIGNED DEFAULT (0), #estagio, por index, de onde o usuário parou
	_lifes INT DEFAULT 5, #definindo a qtd de vida de cada estagio
	_phase INT DEFAULT 0, #definindo a fase atual o estágio em que o usuário está
    _points INT DEFAULT 0, #Pontos acumulados (Atual) do usuário
	CONSTRAINT tbl_registration_id_pk PRIMARY KEY(_id)
);

# ---------------------------------------------------------------------------------------------------------------
#TABELAS DE RESPOSTAS, DIVIDIDAS EM NÍVEIS DE DIFICULDADE

#Nível basico: Preencher com um padrão de quiz (_text faz parte das alternativas)
CREATE TABLE tbl_answer_basic ( #TABELA DE RESPOSTAS DO NÍVEL BASICO P/DETERMINADA TAREFA
	_id INT UNSIGNED AUTO_INCREMENT,
    id_task INT UNSIGNED, #id da tarefa a qual a resposta se refere
    _text VARCHAR(50), #resposta correta (Completa), usada para validação
    _alternativeA VARCHAR(50), #alternativa A
    _alternativeB VARCHAR(50), #alternativa B 
    _alternativeC VARCHAR(50), #alternativa C
    CONSTRAINT tbl_answer_basic_id_pk PRIMARY KEY(_id)
);

# --------------------------------------------------------------------------------------------------------------------------------------------

#Nível Intermediario: Preencher as alternativas com, no maximo, 3 palavras, referente a programação (Com excessão da _text)
CREATE TABLE tbl_answer_intermediary ( #TABELA DE RESPOSTAS DO NÍVEL INTERMEDIARIO P/DETERMINADA TAREFA
	_id INT UNSIGNED AUTO_INCREMENT,
    id_task INT UNSIGNED, #id da tarefa a qual a resposta se refere
    _text VARCHAR(300), #resposta correta, usada para apenas para validação
    _alternativeA VARCHAR(50), #alternativa A
    _alternativeB VARCHAR(50), #alternativa B 
    _alternativeC VARCHAR(50), #alternativa C
    _alternativeD VARCHAR(50), #alternativa D
    _alternativeE VARCHAR(50), #alternativa E
    CONSTRAINT tbl_answer_intermediary_id_pk PRIMARY KEY(_id)
);

# --------------------------------------------------------------------------------------------------------------------------------------------

#Nível avançado: Preencher o campo _code com o código completo (P/ser desmontada no front, usada p/validação e alternativas)
CREATE TABLE tbl_answer_advanced ( #TABELA DE RESPOSTAS DO NÍVEL AVANÇADO P/DETERMINADA TAREFA
	_id INT AUTO_INCREMENT,
    id_task INT UNSIGNED, #id da tarefa a qual a resposta se refere
    _code VARCHAR(300), #codigo completo
    CONSTRAINT tbl_answer_advanced_id_pk PRIMARY KEY(_id)
);
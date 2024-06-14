#ARQUIVO DE ARMAZENAMENTO DE RELAÇÕES ENTRE AS TABELAS DO db_devgenius

# USUÁRIO ----------------------------------------------------------------------------------------------------------
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_un
UNIQUE (_email, _name);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_id_type_fk
FOREIGN KEY (id_type) REFERENCES tbl_user_type (_id);

ALTER TABLE tbl_user_info ADD CONSTRAINT tbl_user_info_id_user_fk 
FOREIGN KEY (id_user) REFERENCES tbl_user (_id) ON DELETE CASCADE;

# GRUPOS/CURSOS -----------------------------------------------------------------------------------------------------

ALTER TABLE tbl_user_group ADD CONSTRAINT tbl_user_group_id_user_fk 
FOREIGN KEY (id_user) REFERENCES tbl_user (_id) ON DELETE CASCADE;

ALTER TABLE tbl_user_group ADD CONSTRAINT tbl_user_group_id_group_fk 
FOREIGN KEY (id_group) REFERENCES tbl_group (_id) ON DELETE CASCADE;

ALTER TABLE tbl_course ADD CONSTRAINT tbl_course_id_group_fk
FOREIGN KEY (id_group) REFERENCES tbl_group (_id) ON DELETE CASCADE;

# ACHIEVEMENTS/TÍTULOS -----------------------------------------------------------------------------------------------------

ALTER TABLE tbl_user_achievement ADD CONSTRAINT tbl_user_achievement_id_user_fk 
FOREIGN KEY (id_user) REFERENCES tbl_user (_id) ON DELETE CASCADE;

ALTER TABLE tbl_user_achievement ADD CONSTRAINT tbl_user_achievement_id_achievement_fk 
FOREIGN KEY (id_achievement) REFERENCES tbl_achievement (_id) ON DELETE CASCADE;

ALTER TABLE tbl_user_title ADD CONSTRAINT tbl_user_title_id_user_fk 
FOREIGN KEY (id_user) REFERENCES tbl_user (_id) ON DELETE CASCADE;

ALTER TABLE tbl_user_title ADD CONSTRAINT tbl_user_title_id_title_fk 
FOREIGN KEY (id_title) REFERENCES tbl_title (_id) ON DELETE CASCADE;

# TEORIAS/TAREFAS/ETAPAS -----------------------------------------------------------------------------------------------

ALTER TABLE tbl_teory ADD CONSTRAINT tbl_teory_id_stage_fk
FOREIGN KEY (id_stage) REFERENCES tbl_stage (_id) ON DELETE CASCADE;

ALTER TABLE tbl_task ADD CONSTRAINT tbl_task_id_stage_fk
FOREIGN KEY (id_stage) REFERENCES tbl_stage (_id) ON DELETE CASCADE;

ALTER TABLE tbl_task ADD CONSTRAINT tbl_task_id_operation_fk 
FOREIGN KEY (id_operation) REFERENCES tbl_operation (_id) ON DELETE CASCADE;

ALTER TABLE tbl_stage ADD CONSTRAINT tbl_stage_id_course_fk 
FOREIGN KEY (id_course) REFERENCES tbl_course (_id) ON DELETE CASCADE;

# CONTROLE ---------------------------------------------------------------------------------------------------------

ALTER TABLE tbl_registration ADD CONSTRAINT tbl_registration_un 
UNIQUE (id_user, id_course);

ALTER TABLE tbl_registration ADD CONSTRAINT tbl_registration_id_course_fk 
FOREIGN KEY (id_course) REFERENCES tbl_course (_id) ON DELETE CASCADE;

ALTER TABLE tbl_registration ADD CONSTRAINT tbl_registration_id_user_fk 
FOREIGN KEY (id_user) REFERENCES tbl_user (_id) ON DELETE CASCADE;

# RESPOSTAS -------------------------------------------------------------------------------------------------------
# CUIDADO!!! CADA ID_TASK É UNICO DENTRO DO CONTEXTO DA TABELA, MAS PODE REPETIR EM OUTRAS (EVITE!)

ALTER TABLE tbl_answer_basic ADD CONSTRAINT tbl_answer_basic_un
UNIQUE (id_task);

ALTER TABLE tbl_answer_basic ADD CONSTRAINT tbl_answer_basic_id_task_fk 
FOREIGN KEY (id_task) REFERENCES tbl_task (_id) ON DELETE CASCADE;

ALTER TABLE tbl_answer_intermediary ADD CONSTRAINT tbl_answer_intermediary_un
UNIQUE (id_task);

ALTER TABLE tbl_answer_intermediary ADD CONSTRAINT tbl_answer_intermediary_id_task_fk 
FOREIGN KEY (id_task) REFERENCES tbl_task (_id) ON DELETE CASCADE;

ALTER TABLE tbl_answer_advanced ADD CONSTRAINT tbl_answer_advanced_un
UNIQUE (id_task);

ALTER TABLE tbl_answer_advanced ADD CONSTRAINT tbl_answer_advanced_id_task_fk 
FOREIGN KEY (id_task) REFERENCES tbl_task (_id) ON DELETE CASCADE;
# Battle-of-Heroes
API with NodeJS and MySQL 


Observações : 

- Por conta de limitações do ORM, optei por fazer a tratativa das requisições HTTP (referentes a poderes_personagens) sem o uso de algumas funcionalidades do Sequelize.

- A escrita para definição da tabela personagens_poderes é a seguinte : 

                          CREATE TABLE personagens_poderes (
                           	id_personagem integer not null,
                           	id_poder integer not null,
                               CONSTRAINT key_composed  primary key (id_personagem , id_poder),
                               CONSTRAINT fk_character foreign key  (id_personagem) references personagens (id),
                               CONSTRAINT fk_power     foreign key  (id_poder) references poderes (id)
                         );

-Só escreva o código acima depois que as tabelas personagens e poderes forem declaradas

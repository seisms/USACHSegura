-------------------------------------
/*Poblamiento de USACH Segura*/
-------------------------------------

insert into TUSUARIO (tu_tnombre)
values('Administrador');

insert into TUSUARIO (tu_tnombre)
values('Estudiante');

insert into TUSUARIO (tu_tnombre)
values('Funcionario');

insert into TUSUARIO (tu_tnombre)
values('Académico');


insert into TPERTENENCIA (tper_tnombre)
values ('Celular/Tablet');

insert into TPERTENENCIA (tper_tnombre)
values ('Laptop');

insert into TPERTENENCIA (tper_tnombre)
values ('Mochila/Bolso');

insert into TPERTENENCIA (tper_tnombre)
values ('Billetera');

insert into TPERTENENCIA (tper_tnombre)
values ('Objeto de Valor');


insert into TINCIDENTE (tin_tnombre)
values ('Asalto');

insert into TINCIDENTE (tin_tnombre)
values ('Robo');

insert into TINCIDENTE (tin_tnombre)
values ('Hurto');

insert into TINCIDENTE (tin_tnombre)
values ('Lanzazo');


insert into SECTOR
values ('Escuela de Artes y Oficios', NULL, 1, 1, 'si');
insert into SECTOR
values ('FEUSACH', NULL, 1, 2, 'si');
insert into SECTOR
values ('Vicerrectoria de Apoyo Estudiantil', NULL, 1, 3, 'si');
insert into SECTOR
values ('Gimnasio EAO', NULL, 1, 4, 'si');
insert into SECTOR
values ('Aula Magna', NULL, 1, 5, 'si');
insert into SECTOR
values ('Departamento de Ingeneria Informática', NULL, 1, 6, 'si');
insert into SECTOR
values ('Departamento de Ingenieria Metalurgica', NULL, 1, 7, 'si');
insert into SECTOR
values ('Departamento de Ingenieria Mecánica', NULL, 1, 8, 'si');
insert into SECTOR
values ('Facultad Tecnológica', NULL, 1, 9, 'si');
insert into SECTOR
values ('Departamento de Ingenieria Industrial', NULL, 1, 10, 'si');
insert into SECTOR
values ('Patio EAO', NULL, 1, 11, 'si');
insert into SECTOR
values ('Patio Mecánica - Informática', NULL, 1, 12, 'si');
insert into SECTOR
values ('Estacionamientos 1', NULL, 1, 13, 'si');
insert into SECTOR
values ('Casino EAO', NULL, 1, 14, 'si');


insert into USUARIO
values('daniel.ojeda.v@usach.cl','+56911223344','segura2024');
insert into USUARIO
values('diego.cuevas.a@usach.cl','+56922334455','LinuxEnjoyer123');
insert into USUARIO
values('vicente.torres@usach.cl','+56933445566','Hamburger');
insert into USUARIO
values('aldair.machagua@usach.cl','+56944556677','Nose1234');
insert into USUARIO
values('guillermo.pereira@usach.cl','+56955667788','hoynopescow');
insert into USUARIO
values('rodrigo.abarzua@usach.cl','+56966778899','cryptographic2025');


insert into RUSUARIO
values('daniel.ojeda.v@usach.cl',1); 
insert into RUSUARIO
values('diego.cuevas.a@usach.cl',1);
insert into RUSUARIO
values('aldair.machagua@usach.cl',2);
insert into RUSUARIO
values('vicente.torres@usach.cl',2);
insert into RUSUARIO
values('vicente.torres@usach.cl',3);
insert into RUSUARIO
values('guillermo.pereira@usach.cl',3);
insert into RUSUARIO
values('rodrigo.abarzua@usach.cl',4);


insert into FRECUENTA
values('aldair.machagua@usach.cl','Escuela de Artes y Oficios');
insert into FRECUENTA
values('aldair.machagua@usach.cl','Gimnasio EAO');
insert into FRECUENTA
values('aldair.machagua@usach.cl','FEUSACH');

insert into FRECUENTA
values('vicente.torres@usach.cl','Escuela de Artes y Oficios');
insert into FRECUENTA
values('vicente.torres@usach.cl','Departamento de Ingeneria Informática');
insert into FRECUENTA
values('vicente.torres@usach.cl','Casino EAO');
insert into FRECUENTA
values('vicente.torres@usach.cl','Estacionamientos 1');

insert into FRECUENTA
values('rodrigo.abarzua@usach.cl','Casino EAO');
insert into FRECUENTA
values('rodrigo.abarzua@usach.cl','Departamento de Ingenieria Mecánica');


insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('rodrigo.abarzua@usach.cl', 1, 'micelular.jpg', 'Celular de profe');
insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('rodrigo.abarzua@usach.cl', 4, 'capture123.jpg', 'Mi billetera');
insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('rodrigo.abarzua@usach.cl', 5, 'foto123.jpg', 'Mi reloj');

insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('aldair.machagua@usach.cl', 1, 'celular.jpg', 'Celular');
insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('aldair.machagua@usach.cl', 2, 'latop.jpg', 'Laptop U');
insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('aldair.machagua@usach.cl', 3, 'mochila.jpg', 'Mochila usach');

insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('guillermo.pereira@usach.cl', 1, 'celular.png', 'Mi celu');
insert into PERTENENCIA (per_correo, per_tipo, per_img, per_nombre)
values('guillermo.pereira@usach.cl', 3, 'foto001.jpg', 'mochilita');


insert into REPORTE (rep_correo, rep_sector, rep_tipo, rep_fecha, rep_hora)
values('guillermo.pereira@usach.cl',
    'Casino EAO',
    4,
    '2024-10-12',
    '14:13:00');	   
insert into REPORTE (rep_correo, rep_sector, rep_tipo, rep_fecha, rep_hora)
values('guillermo.pereira@usach.cl',
    'Estacionamientos 1',
    1,
    '2024-05-06',
    '19:00:00');

insert into REPORTE (rep_correo, rep_sector, rep_tipo, rep_fecha, rep_hora)
values('aldair.machagua@usach.cl',
    'FEUSACH',
    3,
    '2024-11-10',
    '13:00:00');


insert into PUSURPADA
values(1,7);
insert into PUSURPADA
values(2,8);
insert into PUSURPADA
values(3,4);


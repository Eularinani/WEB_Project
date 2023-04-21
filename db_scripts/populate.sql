-- None at the moment,users must be created using the API because of the bcrypt
iNSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('A Guerra dos Tronos','https://images.pexels.com/photos/3021320/pexels-photo-3021320.jpeg?auto=compress&cs=tinysrgb&w=1200', '2011-08-01', 1);
INSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Harry Potter e a Pedra Filosofal', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ft5M4Xj2WphRdSrcgoRizejnCuqBd3ZVzOT0V5AOnA1FYyZn', '1997-06-26', 1);
iNSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Genesis','https://images.pexels.com/photos/3021320/pexels-photo-3021320.jpeg?auto=compress&cs=tinysrgb&w=1200', '2000-08-01', 2);
INSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Nutuk', 'https://images.pexels.com/photos/4245015/pexels-photo-4245015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '1997-05-21', 1);
iNSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('james piterson','https://images.pexels.com/photos/15450205/pexels-photo-15450205.jpeg?auto=compress&cs=tinysrgb&w=1200', '2000-08-01', 4);
INSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Bem vindo a Berlin', 'https://images.pexels.com/photos/6045690/pexels-photo-6045690.jpeg?auto=compress&cs=tinysrgb&w=1200', '1987-09-26', 1);
iNSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Paixão','https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2019-08-01', 1);
INSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('eddie estern', 'https://images.pexels.com/photos/3747163/pexels-photo-3747163.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load', '2000-06-26', 2);
iNSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('ECKHART TOLLE','https://images.pexels.com/photos/4627894/pexels-photo-4627894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2013-07-01', 3);
INSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('YOUR SILENCE WILL NOT PROTECT YOU', 'https://images.pexels.com/photos/3847701/pexels-photo-3847701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '1987-06-26', 1);
iNSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Nâscuti asasini','https://images.pexels.com/photos/4509061/pexels-photo-4509061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2015-03-01', 1);
INSERT INTO Livro (Titulo, Livr_capa, Livro_Lançamento, Livro_Volume) VALUES ('Jalal al-Din Rumi', 'https://images.pexels.com/photos/4270847/pexels-photo-4270847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2006-06-26', 1);
Jal
select *from livro where (livro_lançamento = '07/08/2010') and(livro_volume = '1')

INSERT INTO Autor (Autor_nome) VALUES ('Marco R. Miguel');
INSERT INTO Autor (Autor_nome) VALUES ('J. K. Rowling');
INSERT INTO Autor (Autor_nome) VALUES ('ECKHART T. TOLIN');
INSERT INTO Autor (Autor_nome) VALUES ('Eddie Stern');
INSERT INTO Autor (Autor_nome) VALUES ('AUDRE KIS LORDE');
INSERT INTO Autor (Autor_nome) VALUES ('John Aueust');
INSERT INTO Autor (Autor_nome) VALUES ('RADHA S.S.BEAS');



ALTER TABLE Livro
DROP COLUMN livr_capa;
ALTER TABLE Livro
add COLUMN Livr_capa text(500);
-- None at the moment,users must be created using the API because of the bcrypt
insert into livro(livro_id, titulo, livro_lançamento, livro_volume) values ('1','O SOL','07/05/2001','1');
insert into livro(livro_id, titulo, livro_lançamento, livro_volume)
values ('4','Astros','07/08/2010','1');
insert into livro(livro_id, titulo, livro_lançamento, livro_volume)
values ('3','O Mentalista','09/05/2015','1');
select *from livro where (livro_lançamento = '07/08/2010') and(livro_volume = '1')

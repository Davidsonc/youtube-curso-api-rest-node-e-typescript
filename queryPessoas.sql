-- database: c:\xampp\htdocs\youtube-curso-api-rest-node-e-typescript\database.sqlite

-- Use the ▷ button in the top right corner to run the entire file.

SELECT 
    A.id
    ,A.nome pessoa
    ,A.sobrenome
    ,A.email
    ,B.nome cidade
FROM
    pessoa A
        INNER JOIN cidade B 
            on A.cidadeId = B.id

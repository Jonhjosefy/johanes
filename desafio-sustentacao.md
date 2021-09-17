# Desafio - Leitura de logs

A Ewally teve um incidente no autorizador de cartão que levou o tempo de autorização ultrapassar o limite, com isso tivemos um numero de 100 transações que precisam ser revertidas, porém devido a um bug no código algumas transações não foram revertidas.

Agora o time de sustentação precisa criar um script que lê 2 arquivos de logs, um que contém os requests de reversão e outro que contém a resposta dessas requisições, para encontrar quais transações não foram revertidas e é necessario que seja feito um ajuste manual.

## Identificando reversões que falharam

Quando uma reversão é bem sucedida o log de response conterá um code igual a 0 e uma mensagem de "SUCCESS", igual ao objeto exemplo abaixo:

```
{
  "Response":{
    "code":0,
    "message":"SUCCESS"
  }
}

```

Já quando uma reversão falha, o code sera igual a 1 e uma mensagem de "ERROR", igual ao objeto exemplo abaixo:

```
{
  "Response":{
    "code":1,
    "message":"ERROR"
  }
}

```

# Requisitos
  * O teste deve ser feito usando javascript.
  * È necessario enviar o código desenvolvido e um arquivo JSON contendo todos os id_compra das transações em que a reversão falhou.
  * O desafio deve ser feito até no maximo 3 dias a partir da data de recebimento.
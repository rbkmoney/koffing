# Koffing
Личный кабинет мерчанта

## Установка

    npm install

## Интеграция с Keycloak
Настройка происходит с помощью файла [keycloak.json](/app/keycloak.json)

## Пример Docker развертки
    
    docker build -t <your name>/koffing .
    docker run --rm --name koffing -it -p 8000:8000 -p 9000:9000 <your name>/koffing
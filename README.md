### Parser RSS ленты + Admin UI

## Описание задачи:
link: https://sharing.clickup.com/t/h/22wc1cz/S45D29HWOD8M1FT
1. Реализовать на NodeJS/Laravel Parser RSS ленты(например https://lifehacker.com/rss можно выбрать на ваше усмотрение) по cron task(или с помощью worker будет плюсом). Новые публикации должны будут сохранены в БД в таблице 'posts'.
2. Создать CRUD для Posts -- REST API( или GraphQL API) 
3. Создать Admin UI SPA(на выбор React/Vue/Angular2) по управлению записями в виде списка с пагинацией, возможностью сортировки и поиска. 
4. В Admin UI так же должна быть реализована возможность создания, редактирования и удаления постов
Закрыть доступ к  Admin UI с помощью HTTP Basic Auth (плюсом будет реализовать JWT Auth).
Создать Public GitHub(Gitlab etc.) репозиторий. Выложить код. Выслать ссылку

## Пример структуры проекта
.env.example 
├── .gitignore 
├── Makefile # Команды быстрого сборки и запуска проекта (make up, make down, make build etc.)
├── README.md # Описание проекта(прочитав его я без проблем должен запустил Ваше приложение)
└── src # тут код!!!
    └── index.js

**Содердимое папок docker и src показано в качестве демострации и может отличаться. Так же в проекте могут присутсвывать и другие файлы и папки. СУБД на Ваш выбор.

### Stack
client: Typescript, ReactJS, Redux Toolkit, Jwt tokens(access & refresh tokens)
server: Typescript, Express, MongoDB, Jwt tokens(access & refresh tokens)
parser: Typescript, NodeJS, Puppeteer, Cheerio, MongoDB


### =========================
### Запуск проекта
1. в файлах: .env.dev(папка server) & .env.local(папка parser) указать DB_URL(у меня стоит локально moongosh по этому ссылка на локальную DB от MongoDB)
2. в каждой из папок (server, parser, client), в терминале прописать 
```
npm i
```
3. в папке parser, в терминале make up
4. в папке server, в терминале make up-dev
5. в папке client, в терминале make up
6. через Postman по роутеру http://localhost:5000/api/v1.0.0/auth/signup добавляем админа
Body -> row ->
```
{
    "name": "test",
    "email": "test@gmail.com",
    "password": "123456"
}
```
7. Если при обновлении/создании поста выбьет 404 ошибку в левом верхнем углу под шапкой - то это ознает что refresh token was expired и надо вручную зайти на home page (например в URL удалить все лишнее и оставить http://localhost:3000/)

если что-то не так, дайте пожалуйста знать
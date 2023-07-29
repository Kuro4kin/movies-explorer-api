
# movies-explorer-api

# Проект Movies бэкенд(api)

## Директории

`/routes` — папка с файлами роутера, содержить роуты сущностей User и Movie а также файл Index.js объединяюший эти сущности, с роутами регистрации и аутентификации.   
`/controllers` — папка с файлами контроллеров Users и Movies   
`/models` — папка с файлами описания схем User и Movie  
`/constants` — папка с файлами констант ошибок и регулярных выражений   
`/errors` — папка с файлами кастомных ошибок
`/middlewares`— папка с файлами мидлвар (аутентификации, централизованной обработки ошибок, логирования запросов и ошибок) 
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта
Для запуска проект необходимо установить все библиотеки и пакеты из файла package.json
`npm install` либо `npm ci`, -
после чего
`npm run start` — запускает сервер;
`npm run dev` — запускает сервер с hot-reload;


## Основные эндпоинты
POST /signup - создает нового пользователя(user)
GET /signin - производиn аутентификацию пользователя, отправляет в cookies токен 
POST /signout - удаляет полученный ранее токен из cookies
GET /users/me - возвращает информацию о пользователе (email и имя)
PATCH /users/me - обновляет информацию о пользователе (email и имя)
GET /movies - возвращает все сохранённые текущим пользователем фильмы
POST /movies - создаёт фильм с переданными в теле (country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId)
DELETE /movies/_id - удаляет сохранённый фильм по id 

Ссылка на проект на ГитХабе:
https://kuro4kin.github.io/movies-explorer-api/

Ссылка на проект:
https://api.movies.kurochkin.nomoreparties.co

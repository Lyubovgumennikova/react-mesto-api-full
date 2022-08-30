# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения, связанный с базой данных MongoDB. Проект создан в рамках учебы в Яндекс.Практикум на курсе "Веб-разработчик" со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`.
Функционал:
Роуты для пользователей:
GET /users - возвращает всех пользователей;
GET /users/:userId - возвращает пользователя по переданному _id;
POST /users - создает пользователя с переданными в теле запроса name, about и avatar;

Роуты для карточек:
GET /cards - возвращает все карточки из базы данных;
POST /cards - создаёт карточку с переданными в теле запроса name и link. owner проставляется посредством временного мидлвэра (добавляет в каждый запрос объект user);
DELETE /cards/:cardId - удаляет карточку по переданному _id;

Технологии:
expressjs
API REST
MongoDB
RegExp

Инструкция по установке:
Клонировать репозиторий:

git clone https://github.com/Lyubovgumennikova/react-mesto-api-full.git
В директории проекта запустить приложение в режиме разработки:

npm install - устанавливает зависимости;
npm run dev - запускает сервер;
npm run start - запускает сервер с hot-reload;

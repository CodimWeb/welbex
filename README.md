## Демо проекта
<a href="http://vhost281471.ispsite.ru/" target="_blank">Demo</a>


## Развертывание проекта
<p>composer install</p>
<p>npm install</p>
<p>создать базу данных в файле .env заполнить поля</p>
<p>DB_DATABASE=</p>
<p>DB_USERNAME=</p>
<p>DB_PASSWORD=</p>

<p>php artisan migrate</p>
<p>php artisan storage:link</p>


## Инструкция к апи

<p>POST /api/auth/registration - регистрация пользователя <span color="red">параметры</span> login:string, email:string, password:string, passwordConfirm:string<p/>
<p>POST /api/auth/login - авторизация пользователя <span color="red">параметры</span> login:string, password:string<p/>
<p>POST /api/auth/refresh - получение нового access токена<p/>
<p>POST /api/auth/logout - разавторизация пользователя<p/>
<p>GET /api/me - получение данных пользователя<p/>
<p>GET /posts - получение всех постов<p/>
<p>GET /post/{id} - получение одного поста<p/>
<p>POST /post - создание поста параметры <br/>media:file - картинка или видео,<br/>mediaType:string:"image":"video" - тип файла,<br/>title:string - заголовок,<br/>text:string - описание<p/>
<p>POST /post/update - обновление поста параметры <br/>media:file:string - картинка или видео если было изменено, если нет пустая строка,<br/>mediaType:string:"image":"video" - тип файла аналогично картинке,<br/>title:string - заголовок,<br/>text:string - описание<p/>
<p>DELETE /post/{id} - получение одного поста<p/>


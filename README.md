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

<p>POST /registration - регистрация пользователя <span color="red">параметры</span> login:string, email:string, password:string, passwordConfirm:string<p/>

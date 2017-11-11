<p align="center">
<a href="https://travis-ci.org/vedmant/jogging-time"><img src="https://travis-ci.org/vedmant/jogging-time.svg?branch=master" alt="Build Status"></a>
</p>

## Laravel 5.5 & Vue.js 2.4 + Vuex Sample Project ##

**Laravel example** is a tutorial Single Page Application (SPA) for Laravel 5.5 and Vue.js 2.4 Frontend

[Demo](https://jogging-time.vedmant.com/)

Use login: `user@gmail.com` and password: `123456`

### Installation ###

```
git clone https://github.com/vedmant/jogging-time.git # To clone repo
cd jogging-time 
composer install # Install php dependencies

# Prepare enviroment variables
cp .env.example .env # Copy configuration file
php artisan key:generate # Generate unique key

# Prepare database
touch database/database.sqlite # Create sqlite database
php artisan migrate --seed # Create DB Schema and seed sample data
php artisan passport:install # Install Passport

# Compile assets
yarn # Install Javascript dependencies
yarn prod # Compile assets

# Start server
php artisan serve # Start server
```

If you don't have installed yarn, run `npm install -g yarn`

### Main features ###
* Fully separate Backend and Frontend
* Authentication based on Laravel Passport
* List pages with filters and CRUD editing
* Backend validation
* Admin panel
* Simple widgets
* Simple reports
* Full Phpunit test coverage
* Sample E2E tests using Nightwatch and Cypress


### Includes ###

* [Laravel Passport](https://laravel.com/docs/5.4/passport) API Authentication
* [API Docs Gerator](https://github.com/mpociot/laravel-apidoc-generator) Laravel API Documentation Generator
* [Laravel DebugBar](https://github.com/barryvdh/laravel-debugbar) Debug bar for Laravel
* [Vue.js](https://vuejs.org/) The Progressive JavaScript Framework
* [Vuex](https://vuex.vuejs.org/en/intro.html) State management pattern + library for Vue.js
* [Vue-Router](https://router.vuejs.org/en/) Router library for Vue.js


### Other Features ###

* Front page
* Authentication (registration, login, logout, throttle)
* Users roles: administrator (all access), manager (manage records)
* User dashborad with widgets and charts
* Entries list with filter by date (list, show, edit, delete, create)
* Report page with chart
* User profile page
* Admin dashboard with widgets
* Users admin (list, show, edit, delete, create)
* Entries admin (list, show, edit, delete, create)
* Global loader for all requests with small delay


### Development ###

To run convenient development server with hot reloading:

```
php artisan serve # Will serve backend on localhost:8000
yarn hot # Will server frontend on loaclhost:8080 and fallback on localhost:8000
```

And open http://localhost:8080

Alternatively you can use watch method:

```
yarn watch
```

And open http://localhost:8000

To compile assets for production run:
```
yarn prod
```

Or to display bundle analyzer
```
yarn production -- --env.analyzer true
```

### Tests ###

To run all Phpunit tests:

```
./vendor/bin/phpunit 
```

To run Nightwatch E2E tests:

```
php artisan serve
yarn test-nw
```

To run Cypress E2E tests:

```
php artisan serve
yarn test
# Or you can open GUI with
yarn test-gui
```


### Credentials ###

For testing application the database is seeded with sample users:

* Administrator: email = admin@gmail.com, password = 123456
* Manager: email = manager@gmail.com, password = 123456
* User: email = user@gmail.com, password = 123456


### TODO ###

- Replace Vue Resource with Axios
- Add more E2E tests


### License ###

And of course:

[MIT](LICENSE.md)

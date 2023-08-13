<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">

   <!-- CSRF Token -->
   <meta name="csrf-token" content="{{ csrf_token() }}">

   <title>{{ config('app.name', 'Running Times') }}</title>

   <!-- Styles -->
    @vite(['resources/assets/sass/app.scss'])

    <!-- Scripts -->
   <script>window.Laravel = {!! json_encode(['csrfToken' => csrf_token(), 'demoMode' => env('APP_DEMO')]) !!};</script>
</head>
<body>

<div id="app"></div>

<!-- Scripts -->
@vite(['resources/assets/js/app.js'])
</body>
</html>

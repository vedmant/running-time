<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">

   <!-- CSRF Token -->
   <meta name="csrf-token" content="{{ csrf_token() }}">

   <title>{{ config('app.name', 'Jogging Times') }}</title>

   <!-- Styles -->
   <link href="{{ mix('css/app.css') }}" rel="stylesheet">

   <!-- Scripts -->
   <script>window.Laravel = {!! json_encode(['csrfToken' => csrf_token()]) !!};</script>
</head>
<body>

@yield('content')

<!-- Scripts -->
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>

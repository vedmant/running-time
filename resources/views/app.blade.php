@extends('layouts.app')

@section('content')
   <div id="app">
      <navbar></navbar>
      <spinner></spinner>

      <transition name="fade" mode="out-in">
         <router-view></router-view>
      </transition>
   </div>
@endsection

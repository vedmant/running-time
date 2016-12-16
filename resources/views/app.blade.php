@extends('layouts.app')

@section('content')
   <div id="app">
      <spinner></spinner>
      <toast position="nw"></toast>

      <navbar></navbar>

      <transition name="fade" mode="out-in">
         <router-view></router-view>
      </transition>
   </div>
@endsection

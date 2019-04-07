<template>
  <div>
    <spinner />
    <toast position="nw" />

    <navbar />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

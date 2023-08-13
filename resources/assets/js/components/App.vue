<template>
  <div>
    <Spinner />
    <Toast position="nw" />

    <Navbar />

    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>
  </div>
</template>

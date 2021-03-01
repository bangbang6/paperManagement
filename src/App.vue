<template>
  <div id="app">
    <Head></Head>
    <Main></Main>
  </div>
</template>

<script>
import Main from './pages/Main'
import Head from './components/Head'

export default {
  name: 'App',
  components: {
    Main, Head
  }
}
</script>
<style lang="scss" scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>



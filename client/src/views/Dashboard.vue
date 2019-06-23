<template>
  <div class="dashboard">
    <calculator />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Calculator from '@/components/Calculator.vue'

  export default {

    name: 'dashboard',
    components: {
      Calculator
    }
  }
</script>
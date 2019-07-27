<template v-slot:Calculator>
  <div name='Calculator' class="card calculate d-inline-flex p-6" id="calculator">
    <input v-model.number="amount" type="number" class="rounded" style="background-color: gray">

    <select v-model="from" class="rounded">
      <option disabled value="">Please select one</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>
    <span>Selected: {{ calculator }}</span>

    <select @change="calculate" v-model="to" class="rounded">
      <option disabled value="">Please select one</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>
    <span>Selected: {{ calculator }}</span>
    <h5>Total: {{this.result}}</h5>

  </div>

</template>



<script>
  import convert from "convert-units"

  export default {
    name: "Calculator",
    props: [],
    data() {
      return {
        to: "",
        from: "",
        amount: 0,
        result: 0
      }
    },
    computed: {
      calculator() {
        return this.$store.state.calculator;
      }
    },
    methods: {
      calculate() {
        this.result = convert(this.amount).from(this.from).to(this.to)
      }
    },
    components: {}
  }
</script>
<style>
  #calculator {
    display: flex;
    justify-content: center;
  }
</style>
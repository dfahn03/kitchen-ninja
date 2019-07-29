<template v-slot:Calculator>
  <div name='Calculator' class="card calculate d-inline-flex p-6" id="calculator">
    <input v-model.number="amount" type="number" class="rounded unit-input text-center" min="0" step=".5"
      style="background-color: rgb(236, 236, 236)">

    <span>Convert From: {{ calculator }}</span>
    <select v-model="from" class="rounded">
      <option disabled value="">Convert From</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>

    <span>Convert To: {{ calculator }}</span>
    <select @change="calculate" v-model="to" class="rounded">
      <option disabled value="">Convert To</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>
    <br>
    <h5>Total: {{this.result.toFixed(2)}}
      <small v-if="this.to == 'lb'">lbs</small>
      <small v-else-if="this.to == 'g'">grams</small>
      <small v-else-if="this.to == 'oz'">oz</small>
      <small v-else></small>
    </h5>

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

  .card {
    border: 1px solid #000;
  }

  .unit-input {
    border: none;
  }
</style>
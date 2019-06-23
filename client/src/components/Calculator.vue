<template>
  <div class="card calculate d-inline-flex p-6">
    <input v-model.number="amount" type="number">

    <select v-model="from">
      <option disabled value="">Please select one</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>
    <span>Selected: {{ calculator }}</span>

    <select @change="calculate" v-model="to">
      <option disabled value="">Please select one</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>
    <span>Selected: {{ calculator }}</span>
    <h5>total conversion {{this.result}}</h5>

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
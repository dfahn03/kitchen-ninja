<template>
  <div class="autocomplete">
    <input :class="inputClass" readonly :value="selected.itemName" type="text" @focus="isOpen = true" v-if="!isOpen">
    <input v-else :class="inputClass" type="text" @input="onChange" v-model.trim="search" @keydown.down="onArrow(1)"
      @keydown.up="onArrow(-1)" @keydown.enter="onEnter" :placeholder="placeholder" @blur="blurOff">
    <ul id="autocomplete-results" v-if="isOpen" class="autocomplete-results" ref="resultbox">
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" @mouseover="setIndex(i)"
        class="autocomplete-result" :class="{ 'is-active': i === index }"
        v-html="result.html ? result.html : result.itemName"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "autocomplete",
    props: {
      items: {
        type: Array,
        required: false,
        default: () => []
      },
      async: {
        type: Boolean,
        required: false,
        default: false
      },
      inputClass: String,
      placeholder: String,
      canOpen: {
        type: Boolean,
        required: false,
        default: true
      },
      selected: { type: Object }
    },
    data() {
      return {
        isOpen: false,
        results: [],
        result: {},
        search: "",
        isLoading: false,
        index: 0
      };
    },
    mounted() {
      if (this.selected) {
        // this.setResult(this.selected)
        debugger

        this.result = this.selected
        this.search = this.selected.itemName
      }
    },
    methods: {
      blurOff() {
        this.onChange()
      },
      onChange() {
        this.$emit("input", this.search.toLowerCase() || "");
        if (this.async) {
          this.isLoading = true;
        } else {
          this.filterResults();
          // this.open();
        }
      },
      filterResults() {
        // first uncapitalize all the things
        this.results = this.items.filter(item => {
          return item.itemName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        });
      },
      setResult(result) {
        if (!result) { return }
        this.search = result.itemName;
        this.$emit("result", { component: this, result });
        this.close();
      },
      onArrow(n) {
        let i = this.index + n;
        if (this.results[i]) {
          this.$refs.resultbox.scroll(0, i * 16);
          this.setIndex(i);
        }
      },
      setIndex(i) {
        this.index = i;
      },
      onEnter() {
        this.setResult(this.results[this.index]);
      },
      open() {
        if (!this.canOpen) return
        this.isOpen = true;
        document.body.classList.add("no-scroll");
      },
      close() {
        this.isOpen = false;
        this.index = -1;
        document.body.classList.remove("no-scroll");
      },
      handleEscape(e) {
        if (e.keyCode == 27) {
          this.close();
        }
      },
      handleClickOutside(e) {
        if (!this.$el.contains(e.target)) {
          this.close();
        }
      }
    },
    watch: {
      items: function (val, oldValue) {
        // this.results = val;
        this.isLoading = false;
      }
    },
    mounted() {
      document.addEventListener("keydown", this.handleEscape);
      document.addEventListener("click", this.handleClickOutside);
    },
    destroyed() {
      document.removeEventListener("keydown", this.handleEscape);
      document.removeEventListener("click", this.handleClickOutside);
    }
  };
</script>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    width: 100%;
    position: absolute;
    z-index: 2;
    background: white;
    color: black;
    font-size: .75em;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result img {
    max-height: 30px;
    max-width: 30px;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: var(--primary);
    color: var(--light);
  }

  .autocomplete-results::-webkit-scrollbar {
    width: 6px;
  }

  .autocomplete-results::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px var(--dark);
  }

  .autocomplete-results::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px var(--dark);
  }
</style>
<template>
  <div class="autocomlete">
    <h2 class="autocomlete-header">Привіт!</h2>
    <p class="autocomlete-text">Вкажи місто щоб отримати дані про погоду</p>
    <form
      class="autocomlete-form"
      @submit.prevent="redirection()"
    >
      <input
        autocomplete="off"
        placeholder="Наприклад, Копенгаген"
        id="user-choice"
        list="data-cities"
        class="autocomlete-search"
        v-model="search"
        @input="onChange"
        type="text"
      >
      <loader
        v-if="loading"
      />
    <datalist 
      id="data-cities"
      v-else-if="allCities.length"
      class="autocomplete-results"
    >
      <option
        v-for="(town, i) in allCities"
        :key="i" 
        :value="town"
        @click="getValue(town)"
        class="autocomplete-result"
      >
      </option>
    </datalist>
    <p
      v-else
      v-show="isOpen"
    >
      City not found
    </p>
    <button>ПРОДОВЖИТИ</button>
    </form> 
  </div>
</template>

<script>
import loader from "./loader.vue"
import { mapGetters, mapActions, mapMutations } from "vuex"
export default {
  name: 'SearchAutocomplete',
  components: {
    loader
  },
  computed: {
    ...mapGetters(["allCities"]),
    ...mapMutations(["clearDataCities"]),
  },
  data() {
    return {
      loading: false,
      search: '',
      isOpen: false,
    };
  },
  methods: {
    ...mapActions(["fetchCities"]),
    ...mapMutations(["cityRecord"]),
    filterResults() {
      let result; 
      result = this.allCities.filter(town => town.toLowerCase().includes(this.search.toLowerCase()));
      return result
    },
    async onChange(event) {
      this.search = event.target.value
      this.loading = true;
      await this.fetchCities(encodeURIComponent(this.search.toLowerCase()));
      this.loading = false;
      this.filterResults();
    },
    redirection() {
      if(!this.search){
        alert("Заполните поле!")
      }else {
        this.cityRecord(this.search)
        this.$router.push({ name: 'town' })
      }
    },
    getValue(town) {
      this.clearDataCities()
      this.search = town
    }
  }
};
</script>

<style lang="scss">

.autocomlete {
  width: 80%;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;

    .autocomlete-header {
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      margin-top: 200px;
    }

    .autocomlete-text {
      margin-top: 20px;
      font-size: 22px;
      line-height: 30px;
    }

    .autocomlete-form {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;

        input {
          margin-top: 100px;
          width: 710px;
          height: 65px;
          background: #F1F1F1;
          border: 1px solid transparent;
          border-radius: 10px 10px 0px 0px;
          border-bottom: 1px solid grey;   
        }

        datalist {
          max-height: 100px;
          width: 100%;
        }

        input::placeholder {
          padding: 20px 0px 20px 30px;
          font-size: 18px;
          line-height: 25px;
          color: #7D7D7D;
        }

        button {
          position: absolute;
          top: 265px;
          width: 264px;
          height: 60px;
          text-align: center;
          background: #000AFF;
          color: white;
          border-radius: 5px;
          font-size: 18px;
        }
    }
}



// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
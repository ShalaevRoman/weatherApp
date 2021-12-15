export default {
  actions: {
    async fetchCities(ctx, search) {
      const res = await fetch(
        "https://emoney-test.alfabank.kiev.ua/app/geo.php?key=test_open_api_key_042&term=" + search
      );
      const cities = await res.json();
      

      ctx.commit('updatePosts', cities)
    },
    async fetchTown(ctx, town) {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=b751df5797d80d75682f02129c056383`)
      .then(async response => {
        const data = await response.json();

      if (!response.ok) {
        const error =  response.statusText;
        return Promise.reject(error)
      }

      ctx.commit('updateDataCity', data)
    })
    .catch(error => {
      console.error("There was an error!", error);
      ctx.commit('updateError', error)
    }); 
    }
  },
  mutations: {
    updatePosts(state, cities) {
      state.cities = cities.list
    },
    updateError(state, error) {
      state.cityError = error
    },
    updateDataCity(state, data) {
      state.dataCity = data
    },
    cityRecord(state, town) {
      state.town = town
    },
    clearDataCities(state) {
      state.cities = []
    }
  },
  state: {
    cities: [],
    cityError: '',
    dataCity: {},
    town: ''
  },
  getters: {
    allCities(state) {
      return state.cities
    },
    getCityWeather(state) {
      return state.dataCity
    },
    getTown(state) {
      return state.town
    },
    getCityError(state) {
      return state.cityError
    }
  }
}
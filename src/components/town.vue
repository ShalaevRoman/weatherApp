<template>
<div>
  <div 
    class="wrapper"
    :class="{ night: isNight }"
  >
    <div
      class="weather-wrapper"
      :class="{ night: isNight }" 
    >
      <loader
        v-if="loading"
      />
      <div
        v-else
      >
        <div class="weather-view">
          <div class="weather-city">
            <h1>{{this.name}}</h1>
            <p class="weather-date">{{this.date.toLocaleString()}}</p>
            <p class="weather-temperature">{{ this.celsius }}℃</p>
          </div>
          <img
            v-if="isNight" 
            src="../assets/night.png" alt="day">
          <img
            v-else 
            src="../assets/day.png" alt="day">
        </div>
        <div class="weather-info">
          <div class="name-info">
            <p>
              <img src="../assets/icon/1.png" alt="icon">
                Координати
            </p>
            <p>
              <img src="../assets/icon/2.png" alt="icon">
                Відносна вологість
            </p>
            
            <p>
              <img src="../assets/icon/3.png" alt="icon">
                Атмосферний тиск
            </p>
            
            <p>
              <img src="../assets/icon/4.png" alt="icon">
                Час сходу сонця
            </p>  
            <p>
              <img src="../assets/icon/5.png" alt="icon">
                Час заходу сонця
            </p>
          </div>
          <div class="name-data">
            <p>
              <span>
                Ш:{{this.lon}}
              </span>
              <span>
                Д:{{this.lat}}
              </span>
            </p>
            <p>{{this.humidity}}%</p>
            <p>{{this.pressure}}гПа</p>
            <p>{{this.sunrise}}</p>
            <p>{{this.sunset}}</p>
          </div>
        </div>
      </div>
    </div>
    <p 
      class="info-btn"
      :class="{ night: isNight }"
      @click="$router.push({ name: 'Home' })"
    >
      повернутись назад
    </p>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import loader from './loader.vue';
export default {
  components: {
     loader 
  },
  name: 'town',
  computed: {
    ...mapGetters(["getCityWeather"]),
    ...mapGetters(["getTown"]),
    ...mapGetters(["getCityError"])
  },
  methods: {
    ...mapActions(["fetchTown"]),
    toCelsius(temp) {
      let result = temp - 273
      return this.celsius = Math.round(result) 
    },
    coordinatesOfSun(coordinates) {
      let result = new Date(coordinates*1000)
      return result = `${result.getHours()} : ${result.getMinutes()}`
    },
  },
  async mounted() {
    this.loading = true;
    await this.fetchTown(this.getTown)
    this.loading = false;

    this.weatherData = this.getCityWeather

    if(this.getCityError) {
      this.$router.push({ name: 'cityError' })
    }
    
    if(this.weatherData.dt > this.weatherData.sys.sunset || this.weatherData.dt < this.weatherData.sys.sunrise) {
      this.isNight = true
    }

    this.toCelsius(this.weatherData.main.temp)
    this.name = this.weatherData.name
    this.lon = this.weatherData.coord.lon
    this.lat = this.weatherData.coord.lat
    this.humidity = this.weatherData.main.humidity
    this.pressure = this.weatherData.main.pressure
    this.sunrise = this.coordinatesOfSun(this.weatherData.sys.sunrise)
    this.sunset = this.coordinatesOfSun(this.weatherData.sys.sunset)
    console.log(this.weatherData)
  },
  data() {
    return {
      loading: false,
      date: new Date(),
      isNight: false,
      weatherData: {},
      celsius: '',
      name: '',
      lon: '',
      lat: '',
      humidity: '',
      pressure: '',
      sunrise: '',
      sunset: ''
    }
  },
} 
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: linear-gradient(180deg, #5db8fa 0%, #b4e3ff 100%);
  }

  .weather-wrapper {
    display: flex;
    flex-direction: column;
    width: 610px;
    height: 560px;
    background: linear-gradient(180deg, #74C5FF 0%, #A4DEFF 100%);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 20px;
    margin-top: 100px;

      .weather-view {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        color: white;
        margin-top: 63px;

          h1 {
            padding: 10px;
          }

          .weather-date {
            font-size: 14px;
          }

          .weather-temperature {
            font-size: 60px;
            line-height: 82px
          }
      }

      .weather-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 570px;
        height: 244px;
        margin: 50px 20px 20px;
        background: rgba(18, 69, 146, 0.14);
        border-radius: 15px;
        color: white;

          p {
            padding: 5px;
          }

          .name-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .name-data {
            p {
              padding: 10px;
            }
          }
      }
  }
  .info-btn {
    cursor: pointer;
    margin-top: 60px;
    padding: 20px;
    text-align: center;
    color: blue;
    font-size: 18px;font-weight: 600;
    font-size: 18px;
    line-height: 25px;
  }

    .night {
    background: linear-gradient(170.67deg, #092685 7.05%, #031246 92.95%);
    color: white;
  }
</style>
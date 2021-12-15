<template>
  <div class="wrapper-error">
     <img src="../assets/artboard.png" alt="day">
     <p>Нажаль, ми не знайшли інформації по даному запиту :(</p>
     <button 
      @click="$router.push({ name: 'Home' })"
     >
     повернутись назад
     </button>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "cityError",
  computed: {
    ...mapGetters(["getCityError"]),
  }
}
</script> 

<style lang="scss">
  .wrapper-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      margin-top: 70px;
    }
    
    p {
      margin-top: 30px;
      font-size: 20px;
    }

    button {
      width: 264px;
      height: 60px;
      text-align: center;
      background: #000AFF;
      color: white;
      border-radius: 5px;
      font-size: 18px;
      margin-top: 80px;
    }
  }
</style>
<template>
  <div class="about">
    <h1>Редактор</h1>
    <svg>
      <circle fill="black" r="4" :cx="cx" cy="100" />
    </svg>
    <v-input type="number" >Default Slot</v-input>
    <v-text-field label="Ширина" v-model="cx" :rules="rules" />
  </div>
</template>

<style scoped>
svg {
  width: 350px;
  height: 200px;
  background-color: bisque;
}
</style>

<script>
export default {
  data () {
    return {
      cx: 200,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters'
      ]
    }
  }
}
</script>

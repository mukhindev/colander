<template>
  <div class="editor">
    <div class="preview">
      <svg :width="w * zoom" :height="h * zoom">
        <circle fill="black" :r="r * zoom" :cx="cx * zoom" :cy="cy * zoom" />
      </svg>
    </div>
    <div class="zoom">
      <v-btn text icon color="secondary" @click="zoomMinus">
        <v-icon>mdi-magnify-minus</v-icon>
      </v-btn>
      <v-btn text icon color="secondary" @click="zoomPlus">
        <v-icon>mdi-magnify-plus</v-icon>
      </v-btn>
    </div>
    <v-text-field label="h" v-model="h" suffix="мм" />
    <v-text-field label="w" v-model="w" suffix="мм" />
    <v-text-field label="x" v-model="cx" suffix="мм" :rules="rules" />
    <v-text-field label="y" v-model="cy" suffix="мм" :rules="rules" />
    <v-text-field label="Ширина" v-model="cx" suffix="мм" :rules="rules" />
  </div>
</template>

<style scoped>
svg {
  background-color: bisque;
  transition: .25s;
  margin: auto;
}
.preview {
  overflow: scroll;
  height: 50vh;
  background-color: blue;
}
</style>

<script>
export default {
  data () {
    return {
      zoom: 1,
      h: 356,
      w: 596,
      cx: 32,
      cy: 32,
      r: 4,
      rules: [
        value => !!value || 'Required.',
        value => (value >= 0) || 'Выходит за пределы',
        value => (value <= 350) || 'Выходит за пределы'
      ]
    }
  },
  methods: {
    zoomMinus () {
      if (this.zoom > 0.2) this.zoom = this.zoom - 0.1
    },
    zoomPlus () {
      if (this.zoom <= 2) this.zoom = this.zoom + 0.1
    }
  }
}
</script>

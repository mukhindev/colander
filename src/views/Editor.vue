<template>
  <v-container class="pa-0" fluid>
    <v-row class="editor" no-gutters >
      <v-col cols="12" md="9" class="p-relative">
        <div class="preview">
          <svg :width="w * zoom" :height="h * zoom">
            <circle v-for="(hole, i) in holes" :key="i" fill="black" :r="hole.tool * zoom" :cx="hole.x * zoom" :cy="hole.y * zoom" @click="act = i" :class="{ active: i === act }" />
          </svg>
        </div>
        <div class="zoom">
          <v-btn icon small color="secondary" @click="zoomMinus" class="mr-2">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon small color="secondary" @click="zoomPlus">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-container class="config">
          Размеры детали
          <v-row class="mb-2">
            <v-col cols="6">
              <v-text-field
                label="Высота"
                :value="h"
                @change="value => h = value"
                type="number"
                suffix="мм"
                onfocus="this.select()"
                outlined
                hide-details
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Ширина"
                :value="w"
                @change="value => w = value"
                type="number"
                suffix="мм"
                onfocus="this.select()"
                outlined
                hide-details
                dense
              />
            </v-col>
          </v-row>
          <div>Отверстие</div>
          <div>
            <v-btn v-for="(line, i) in holes" :key="i" fab x-small :color="active(i)" dark class="mr-1 mt-1 mb-1" depressed @click="act = i">
              <span class="ty1">{{ line.tool }}</span>
              <small class="ty2">{{ i + 1 }}</small>
            </v-btn>
          </div>

          <v-row>
            <v-col cols="6">
              <v-select
                label="Сверло"
                v-model="holes[act].tool"
                :items="tools"
                outlined
                hide-details
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Глубина"
                :value="holes[act].z"
                @change="value => holes[act].z = value"
                :rules="rules"
                type="number"
                suffix="мм"
                onfocus="this.select()"
                outlined
                hide-details
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="x"
                :value="holes[act].x"
                @change="value => holes[act].x = value"
                :rules="rules"
                type="number"
                suffix="мм"
                onfocus="this.select()"
                outlined
                hide-details
                dense
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="y"
                :value="holes[act].y"
                @change="value => holes[act].y = value"
                :rules="rules"
                type="number"
                suffix="мм"
                onfocus="this.select()"
                outlined
                hide-details
                dense
              />
            </v-col>
          </v-row>

          <v-btn @click="addHole" depressed block color="primary" class="mt-3"><v-icon dark left>mdi-plus</v-icon>Добавить</v-btn>
        </v-container>
      </v-col>
    </v-row>
    <v-row class="output">
      <v-col>
        <v-container fluid>
          <pre v-for="(line, i) in output" :key="i" :class="{ active: (i - 1) === act }">{{ line }}</pre>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      zoom: 1,
      act: 0,
      tools: [5, 8, 10, 15],
      holes: [
        {
          tool: 5,
          x: 0,
          y: 0,
          z: 0
        }
      ],
      h: 246,
      w: 596,
      rules: [
        value => (value >= 0) || 'Граница!',
        value => (value <= this.w) || 'Граница!'
      ]
    }
  },
  computed: {
    output () {
      const line = this.holes.map(element => `XB X=${element.x} Y=${element.y} Z=${element.z} T=101 F1 K0 P0 Q=0# R=5# x=0 y=0`)
      return [
        `H DX=${this.w} DY=${this.h} DZ=20.00 -A C=0 T=0 R=1 *MM /"def.tlg"`,
        ...line
      ]
    },
    active () {
      return function (i) {
        if (i === this.act) return 'green'
      }
    }
  },
  methods: {
    zoomMinus () {
      if (this.zoom > 0.2) this.zoom = this.zoom - 0.1
    },
    zoomPlus () {
      if (this.zoom <= 2) this.zoom = this.zoom + 0.1
    },
    addHole () {
      this.holes.push(
        {
          tool: 5,
          x: 0,
          y: 0,
          z: 0
        }
      )
      this.act = this.holes.length - 1
    }
  }
}
</script>

<style scoped>
svg {
  background-color: rgb(255, 255, 255);
  transition: .25s;
  margin: auto;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1)
}

circle {
  transition: .25s;
  cursor: pointer;
}

circle:hover {
  stroke: rgba(98, 185, 40, 0.4);
  stroke-width: 1%;
}

.active {
  fill: rgb(98, 185, 40);
  background-color: rgba(98, 185, 40, 0.4);
}

.preview {
  text-align: center;
  overflow: auto;
  width: 100%;
  height: 60vh;
  min-height: 100%;
  background-color: rgb(190, 190, 190);
  padding: 3rem;
}

.output {
  border-top: 1px solid silver;
  height: 40vh;
}

.zoom {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.ty1 {
  position: absolute;
  top: -1px;
}

.ty2 {
  opacity: 0.6;
  position: absolute;
  top: -12px;
}
</style>

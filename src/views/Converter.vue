<template>
  <v-container fluid>
    <v-row class="editor">
      <v-col cols="12" sm="4">
        <v-textarea
          label="mpr"
          v-model="mpr"
          outlined
        />
        <a v-if="mpr && xxl.length > 2" :href="`${base}`" :download="`gcode_${this.json[0].LA}_${this.json[0].BR}.xxl`" target="_blank">
          Скачать .xxl
        </a>
      </v-col>
      <v-col cols="12" sm="4">
        <pre v-for="(x, i) in xxl" :key="i">{{ x }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      mpr: ''
    }
  },
  computed: {
    json () {
      const rg = /^<100|<102/
      const json = this.mpr
        .split(/\s\n\s*/)
        .filter(el => {
          return rg.test(el)
        })
        .map(el => {
          const str = el.trim().split(/\n\s*/)
            .map((el, index) => {
              if (index === 0) el = `type=${/\d+/.exec(el)}`
              return el.replace(/["]/g, '')
                .split('=').map(el => `"${el}"`).join(':')
            })
            .join()
          return JSON.parse(`{${str}}`)
        })
      return json
    },
    xxl () {
      if (!this.mpr) return ['Вставьте код программы KDT Trepan (*.MPR) в поле слева ...']
      if (this.json.length < 2) return ['В коде не найдено нужных фрагментов']
      const lines = this.json.map(el => {
        return 'XB' + ' ' +
        `X=${el.XA}` + ' ' +
        `Y=${el.YA}` + ' ' +
        `Z=${el.TI}` + ' ' +
        'T=101' + ' ' +
        'F1' + ' ' +
        'K0' + ' ' +
        'P0' + ' ' +
        'Q=0#' + ' ' +
        'R=5#' + ' ' +
        'x=0' + ' ' +
        'y=0'
      })
      lines[0] = `H DX=${this.json[0].LA} DY=${this.json[0].BR} DZ=${this.json[0].DI} -A C=0 T=0 R=1 *MM /"def.tlg"`
      return lines
    },
    base () {
      if (this.xxl.length < 2) return ''
      const str = this.xxl.toString().replace(/,/g, '\n')
      return 'data:application/octet-stream;base64, ' + window.btoa(str)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-container fluid>
    <v-row class="editor">
      <v-col cols="12" sm="4">
        <v-textarea
          label="mpr"
          outlined
          v-model="mpr"
        ></v-textarea>
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
      const rg = /<100|<102/
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
      if (this.json.length < 2) return ['Вставьте код .MPR в поле слева ...']
      const lines = this.json.map(element => `XB X=${element.XA} Y=${element.YA} Z=${element.TI} T=101 F1 K0 P0 Q=0# R=5# x=0 y=0`)
      lines[0] = `H DX=${this.json[0].LA} DY=${this.json[0].BR} DZ=${this.json[0].DI} -A C=0 T=0 R=1 *MM /"def.tlg"`
      return lines
    }
  }
}
</script>

<style scoped>

</style>

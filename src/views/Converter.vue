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
      const file1 = this.mpr.split('<')

      const file2 = []

      for (const f in file1) {
        const sp = file1[f].split('\n')
        sp[0] = `type: ${sp[0].slice(0, 3)}`
        const string = `${sp.toString().replace(/[=]/g, ':')}`.replace(', ,', '').replace(',!,', '')
        file2.push(string)
      }

      const ii = file2.filter(el => !el.includes('VERSION')).filter(el => !el.includes('101'))

      const result = ii.map(el => el.split(',').map((el2, index) => {
        const t = el2.split(':')
        return `"${t[0]}": "${t[1].replace(/["]/g, '').trim()}"`
      }))

      return result.map(el => JSON.parse(`{${el.toString()}}`))
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

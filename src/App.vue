<template>
  <v-app>

    <div class="burger primary">
      <v-app-bar-nav-icon @click="drawer = true" class="white--text" />
    </div>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense >

        <h1 class="mb-2">Colander</h1>

        <v-list-item-group active-class="blue--text">

          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>

          <v-list-item to="/editor">
            <v-list-item-icon>
              <v-icon>mdi-axis-arrow</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Редактор</v-list-item-title>
          </v-list-item>

          <v-list-item to="/converter">
            <v-list-item-icon>
              <v-icon>mdi-format-page-break</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Конвертор</v-list-item-title>
          </v-list-item>

        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  })
}
</script>

<style>
.burger {
  position: fixed;
  z-index: 5;
  top: 0.5rem;
  left: 0.5rem;
}
.p-relative {
  position: relative;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
  background: rgb(230, 230, 230);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.3);
}
</style>

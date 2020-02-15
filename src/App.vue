<template>
  <v-app>
    <v-app-bar app dark elevate-on-scroll color="blue">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Colander</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="blue--text"
        >
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

<template>
  <div class="sorting-button-container">
    <default-button v-if="todos.length" :checked="selectedSort === 'all'" @click="changeSorting('all')">All</default-button>
    <default-button v-if="countActive && countCompleted" :checked="selectedSort === 'active'" @click="changeSorting('active')">Active</default-button>
    <default-button v-if="countCompleted && countActive" :checked="selectedSort === 'completed'" @click="changeSorting('completed')">Completed</default-button>
  </div>
</template>

<script>
import DefaultButton from "@/components/UI/DefaultButton.vue";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {DefaultButton},
  methods: {
    ...mapMutations({
      setSelectedSort: 'todos/setSelectedSort'
    }),

    changeSorting(selectedSort) {
      this.setSelectedSort(selectedSort);
    }
  },
  computed: {
    ...mapState({
      selectedSort: state => state.todos.selectedSort,
      todos: state => state.todos.todos
    }),
    ...mapGetters({
      countCompleted: "todos/countCompleted",
      countActive: 'todos/countActive'
    })
  },

}
</script>

<style lang="scss" scoped>
.sorting-button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex: 1;
}
</style>
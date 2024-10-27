<template>
  <div>
    <filter-button @click="checkAllTodos">Check all</filter-button>
    <TodoFilter/>
    <filter-button>Clear completed</filter-button>
  </div>
</template>

<script>
import FilterButton from "@/components/UI/FilterButton.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import {mapActions, mapState} from "vuex";

export default {
  components: {TodoFilter, FilterButton},
  methods: {
    ...mapActions({
      updateCompletedStatus: 'todos/updateCompletedStatus'
    }),
    checkAllTodos() {
      this.todos.forEach(todo =>
          this.updateCompletedStatus({todoId: todo.id, completed: true})
      )
    }
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
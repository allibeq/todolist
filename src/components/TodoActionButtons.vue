<template>
  <div class="action-buttons">
    <default-button v-if="countActive" class="action-buttons__action" @click="checkAllTodos">Check all</default-button>
    <TodoFilter class="action-buttons__sort-btn"/>
    <default-button v-if="countCompleted" class="action-buttons__action" @click="removeCompleted">Clear completed</default-button>
  </div>
</template>

<script>
import DefaultButton from "@/components/UI/DefaultButton.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import {mapState, mapActions, mapGetters} from "vuex";

export default {
  components: {DefaultButton, TodoFilter},
  methods: {
    ...mapActions({
      updateAllTodosCompleted: 'todos/updateAllTodosCompleted',
      removeAllCompletedTodos: 'todos/removeAllCompletedTodos',
    }),
    checkAllTodos() {
      this.updateAllTodosCompleted();
    },
    removeCompleted() {
      this.removeAllCompletedTodos();
    }
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
    }),
    ...mapGetters({
      countCompleted: 'todos/countCompleted',
      countActive: "todos/countActive"
    })
  }
}
</script>

<style lang="scss" scoped>
.action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 10px;

  &__action {
    flex: 0 0 auto;
  }

  &__sort-btn {
    flex: 3;
    display: flex;
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .action-buttons{
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
  }
}
@media (max-width: 480px) {
  .action-buttons{
    display: flex;
    flex: 2;
    flex-direction: row;
    gap: 0.2rem;
    margin-bottom: 0;
  }

}
</style>
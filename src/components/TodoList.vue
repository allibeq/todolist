<template>
  <div class="todo-list-container">
    <ul class="todo-list_container__list">
      <draggable :list="sortedTodos" :item-key="todo => todo.id" tag="ul" @start="dragging = true" @end="dragging = false">
        <template #item="{ element }">
          <TodoItem :key="element.id" :todo="element" />
        </template>
      </draggable>
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import draggable from "vuedraggable";

export default {
  components: {TodoItem, draggable},
  data() {
    return {
      dragging: false,
      previousSortIndexes: []
    }
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
    }),
    ...mapGetters({
      sortedTodos: "todos/sortedTodos"
    }),

  },
  methods: {
    ...mapActions({
      reinitSortIndexes: "todos/reinitSortIndexes"
    }),
  },
  watch: {
    sortedTodos: {
      handler(newTodos) {
        const hasOrderChanged = newTodos.length === this.previousSortIndexes.length &&
            newTodos.every((todo, index) => todo.id === this.previousSortIndexes[index].id);

        if (!hasOrderChanged) {
          this.reinitSortIndexes();
        }

        this.previousSortIndexes = [...newTodos];
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-list-container {
  margin-top: 40px;
  margin-bottom: 32px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 420px;
  height: 100px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    height: 80px;
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #2024271A;
    border-radius: 8px;
  }

  &__list {
    width: 100%;
    height: 85px;
    list-style: none;
  }
}
@media (max-width: 768px) {
  .todo-list-container {
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-width: 420px;
    width: 100%;
    max-height: 400px;
    height: 100%;
  }
}
</style>
<template>
  <div class="app">
    <div class="todo-window">
      <div class="todo-window__picture">
        <img src="@/assets/pic1.png">
      </div>
      <h1 class="todo-window__header">Today I need to</h1>
      <TodoItemForm/>
      <TodoList v-if="todos.length > 0 || !isLoading"/>
      <div class="todo-window__loading-message" v-else-if="isLoading">
        <span>is loading...</span>
      </div>
      <div v-if="!todos.length" class="todo-window__no-task-message">
        <img src="@/assets/checkmark.svg">
        <span> Congrats, you have no more tasks to do </span>
      </div>
      <div v-if="todos.length" class="todo-window__progress">
        <TodoProgressBar :color="'#5D5FEF'" :all-tasks="todos.length" :count="countCompleted">Completed</TodoProgressBar>
        <TodoProgressBar :color="'#ff4081'" :all-tasks="todos.length" :count="countActive">To be finished</TodoProgressBar>
      </div>
      <TodoActionButtons/>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import TodoItemForm from "@/components/TodoItemForm.vue";
import TodoProgressBar from "@/components/TodoProgressBar.vue"
import {mapState, mapGetters, mapActions} from "vuex";
import TodoActionButtons from "@/components/TodoActionButtons.vue";

export default {
  components: {
    TodoActionButtons,
    TodoList,
    TodoItemForm,
    TodoProgressBar
  },
  methods: {
    ...mapActions({
      getTodoTasks: 'todos/getTodoTasks',
    }),
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
      isLoading: state => state.todos.isLoading,
    }),
    ...mapGetters({
      countCompleted: "todos/countCompleted",
      countActive: "todos/countActive"
    })
  },
  mounted() {
    this.getTodoTasks();
  }
}
</script>

<style lang="scss">
*, html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  background: linear-gradient(0deg, #84FAB0 0%, #85F9BC 21.87%, #88F8D7 42.19%, #8BF6F5 60.94%, #8EDDF5 80.73%, #8FD3F4 100%),
  linear-gradient(303.79deg, #F0C3FC -53.74%, #D7BEFC -4.64%, #BCB1FC 40.96%, #A1AEFC 83.05%, #94BDFC 127.47%, #8EC5FC 170.73%);
  height: 100vh;
  width: 100%;
  background-blend-mode: multiply;
  display: flex;
  justify-content: center;
  align-items: center;

}
.todo-window {
  max-width: 730px;
  width: 90%;
  max-height: 719px;
  height: auto;
  border-radius: 24px;
  background: #FFF;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__loading-message {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    max-width: 410px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8F99A3;
  }
  &__no-task-message {
    font-family: 'Inter', sans-serif;
    color: #8F99A3;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    font-size: 0.8rem;
  }
  &__picture {
    margin-top: 3vh;
    margin-bottom: 5vh;
  }

  &__header {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: #202427;
    font-size: 1.5rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 5vh;
  }

  &__progress {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 410px;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .app {
    height: 100%;
  }
  .todo-window {
    padding: 1rem;
    width: 100vw;
    height: 100%;
    border-radius: 0;

    &__header {
      font-size: 1.5rem;
    }

    &__picture {
      margin-top: 5vh;
      margin-bottom: 5vh;

      &.img {
        width: 50%;
        height: 50%;
      }
    }

    &__progress {
      gap: 0.5rem;
    }
  }
}

@media (max-width: 1200px) {
  .todo-window {
    padding: 0.5rem;

    &__header {
      font-size: 1.2rem;
    }
  }
}

</style>
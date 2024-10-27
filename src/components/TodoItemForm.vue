<template>
  <div>
    <form @submit.prevent class="todo-form">
      <input
          class="todo-form__input"
          v-model.trim="todo.text"
          type="text"
          placeholder="Add new todo..."
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
      >
      <filter-button v-show="todo.text.length" :staticBtn="true" @click="addNewTodoItem">Submit</filter-button>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import FilterButton from "@/components/UI/FilterButton.vue";

export default {
  components: {FilterButton},
  data() {
    return {
      todo:{
        text:'',
        completed: false
      },
      isInputFocused: false
    }
  },
  methods: {
    ...mapActions({
      addToDoItem: 'todos/addToDoItem',
    }),
    addNewTodoItem() {
      if (this.todo.text !== '') {
        this.addToDoItem(this.todo);
        this.todo = {
          text: '',
          completed: false
        };
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.todo-form {
  max-width: 410px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  &__input {
    flex: 1;
    width: 317px;
    height: 40px;
    border: 1px solid #C7CCD1;
    border-radius: 8px;
    padding: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #8F99A3;
    font-weight: 400;

    :focus {
      width: 410px;
      color: #202427;
    }
  }
}
@media (max-width: 768px) {
  .todo-form {
    max-width: 410px;
    width: 100%;
    height: 50px;
    &__input {
      max-width: 317px;
      width: 100%;
      font-size: 0.9rem;
    }
  }
}
</style>
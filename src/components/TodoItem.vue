<template>
    <li class="todo-item">
      <div class="todo-item__container">
        <div class="todo-item__drag-handle">⋮⋮</div>
        <input class="todo-item__input-checkbox"
               type="checkbox"
               :checked="todo.completed"
               @change="updateComplete($event.target.checked, todo)">

        <div class="todo-item__text"
             v-if="!isEditing">
          {{todo.text}}
        </div>

        <div class="todo-item__text-input-container" v-else>
          <input v-model="editText"
                 ref="editInput"
                 @blur="confirmEdit(todo)"
                 @keydown.enter="confirmEdit(todo)"
                 @keydown.esc="cancelEdit(todo)"
                 class="todo-item__text-input-container__text-input">
        </div>
        <div class="todo-item__action-button-container">
          <img src="@/assets/pencil.svg"
               class="todo-item__action-button-container__edit-btn"
               @click="editTodoTask"/>
          <img src="@/assets/bin.svg"  class="todo-item__action-button-container__remove-btn"
               @click="removeTodoTask(todo)"/>
        </div>
      </div>
    </li>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      isChecked: false,
      isEditing: false,
      editText: ''
    }
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods:{
    ...mapActions({
      updateCompletedStatus: 'todos/updateCompletedStatus',
      updateTodoText: 'todos/updateTodoText',
      removeTodoItem: 'todos/removeTodoItem',
    }),
    updateComplete(completed, todo) {
      this.updateCompletedStatus({todoId: todo.id, completed});
    },
    editTodoTask() {
      this.isEditing = true;
      this.editText = this.todo.text;
      this.$nextTick(() => {
        const input = this.$refs.editInput;
        if (input) {
          input.focus();
        }
      });
    },
    confirmEdit(todo) {
      this.updateTodoText({todoId: todo.id, newText: this.editText});
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editText = '';
    },
    removeTodoTask(todo) {
      this.removeTodoItem(todo.id);
    },
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  //border: none;
  height: 25px;


  &__container {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &__drag-handle {
    cursor: grab;
    padding-right: 10px;
  }
  &__input-checkbox {
    margin-right: 10px;
    width: 16px;
    height: 16px;
    border: 1px solid #C7CCD1;
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    max-width: 100%;
    overflow: scroll;
    flex-grow: 1;
    font-size: 14px;
    color: #202427;
  }
  &__text-input-container {
    flex-grow: 1;

    &__text-input {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      padding: 5px;
      font-size: 14px;
      color: #202427;
      border: none;

      &:focus {
        outline: none;
      }
    }
  }
  &__action-button-container {
    display: flex;
    gap: 10px;

    &__edit-btn,
    &__remove-btn {
      cursor: pointer;
    }
  }
}

</style>
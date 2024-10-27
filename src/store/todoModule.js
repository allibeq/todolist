import axios from "axios";

const BASE_URL = "https://todos-a2ad3-default-rtdb.firebaseio.com/tasks.json";

export const todoModule = {
    state: () => ({
        todos: [],
        isLoading: false,
        selectedSort: 'all',
        url: ''
    }),
    getters: {
        sortedTodos(state) {
            switch (state.selectedSort) {
                case 'completed':
                    return state.todos.filter(todo => todo.completed === true);
                case 'active':
                    return state.todos.filter(todo => todo.completed === false);
                default:
                    return state.todos;
            }
        },
        countCompleted(state) {
            return state.todos.reduce((count, todo) => count + (todo.completed ? 1 : 0), 0);
        },
        countActive(state) {
            return state.todos.reduce((count, todo) => count + (!todo.completed ? 1 : 0), 0);
        },
        getCompleted(state) {
            return state.todos.filter(todo => todo.completed);
        }
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        addTodo(state, todo) {
            state.todos.unshift(todo);
        },
        removeTodo(state, todoId) {
            state.todos = state.todos.filter(todo => todo.id !== todoId);
        },
        setNewCompleteStatus(state, {todoId, completed}) {
            const todo = state.todos.find(todo => todo.id === todoId);
            if (todo) {
                todo.completed = completed;
            }
        },
        setCompleteStatusForAll(state, completed) {
            state.todos = state.todos.map(todo => {
                return { ...todo, completed };
            });
        },
        removeAllCompletedTodos(state) {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        editTodoText(state, {todoId, newText}) {
            const todo = state.todos.find(todo => todo.id === todoId);
            if (todo) {
                todo.text = newText;
            }
        }
    },
    actions: {
        async getTodoTasks({commit}) {
            commit("setIsLoading", true);
            try {
                commit("setIsLoading", true);
                const todos = [];
                const response = await axios.get(BASE_URL);
                const keys = Object.keys(response.data);
                keys.forEach((key) => {
                    const todo = {
                        id: key,
                        text: response.data[key].text,
                        completed: response.data[key].completed,
                        sortIndex: response.data[key].sortIndex
                    };
                    todos.push(todo);
                });
                const sortedTodos = todos.sort((a, b) => a.sortIndex - b.sortIndex)
                commit('setTodos', sortedTodos);
            } catch (error) {
                console.error(`Error during fetching data: ${error.message}`);
            } finally {
                commit("setIsLoading", false);
            }
        },
        async addToDoItem({commit}, newTodo) {
            try {
                let res = await axios.post(BASE_URL, newTodo);
                newTodo.id = res.data.name;
                commit('addTodo', newTodo);
            } catch (error) {
                console.error(`Failed to add todo task: ${error.message}`);
            }
        },
        async removeTodoItem({commit}, todoId) {
            const url = `https://todos-a2ad3-default-rtdb.firebaseio.com/tasks/${todoId}.json`;
            try {
                await axios.delete(url);
                commit('removeTodo', todoId);
            } catch (error) {
                console.error(`Failed to delete todo task: ${error.message}`);
            }
        },
        async updateCompletedStatus ({commit}, {todoId, completed}) {
            const url = `https://todos-a2ad3-default-rtdb.firebaseio.com/tasks/${todoId}.json`;
            try {
                await axios.patch(url, {
                    completed: completed
                });
                commit('setNewCompleteStatus', {todoId, completed});
            } catch (error) {
                console.error(`Failed to update task: ${error.message}`);
            }
        },
        async updateTodoText ({commit}, {todoId, newText}) {
            const url = `https://todos-a2ad3-default-rtdb.firebaseio.com/tasks/${todoId}.json`;
            try {
                await axios.patch(url, {
                    text: newText
                });
                commit('editTodoText', {todoId, newText});
            } catch (error) {
                console.error(`Failed to update text task: ${error.message}`);
            }
        },
        // this may be a problem for a large number of queries,
        // but for the test task I chose this solution method
        async updateAllTodosCompleted({ commit, state, dispatch }) {
            try {
                await Promise.all(
                    state.todos.map(todo => {
                        return dispatch('updateCompletedStatus', { todoId: todo.id, completed: true })
                    })
                );
                commit('setCompleteStatusForAll', true);
            } catch (error) {
                console.error(`Failed to update complete status: ${error.message}`);
            }
        },
        async removeAllCompletedTodos({commit, dispatch, getters}) {
            try {
                await Promise.all(
                    getters.getCompleted.map(todo => {
                        return dispatch('removeTodoItem', todo.id);
                    })
                );
                commit('removeAllCompletedTodos');
            } catch (error) {
                console.error(`Failed to remove all complete tasks: ${error.message}`);
            }
        },
        async reinitSortIndexes({state}) {
            const requestBody = {}
            state.todos.forEach((value, index) => {
                requestBody[`${value.id}/sortIndex`] = index;
            });
            try {
                await axios.patch(BASE_URL, requestBody);
            } catch (error) {
                console.error(`Failed to update sort indexes: ${error.message}`);
            }
        }
    },
    namespaced: true,
}
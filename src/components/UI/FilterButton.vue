<template>
  <button :class="{
    'my-button': true,
    'my-button__btn-checked': checked || staticBtn
  }"><slot></slot></button>
</template>

<script>

export default {
 name: 'filter-button',
  props: {
   checked: {
     type: Boolean,
     required: false
   },
    staticBtn: {
     type: Boolean,
     required: false
    }
  },
}
</script>

<style lang="scss" scoped>
.my-button {
  background: #FFF;
  border-radius: 8px;
  border: none;
  font-family: 'Inter', sans-serif;
  color: #202427;
  font-weight: 600;
  padding: 12px 16px 12px 16px;
  height: 40px;
  cursor: pointer;

  &__btn-checked, &:hover {
    background: #2578F4;
    color: #FFF;
  }
}
@media (max-width: 768px) {
  .my-button {
    height: 2rem;
    padding: 8px 10px;
    display: flex;
    text-align: center;
  }
}
@media (max-width: 480px) {
  .my-button {
    height: 2rem;
    padding: 8px 10px;
    display: flex;
    text-align: center;
  }
}
</style>
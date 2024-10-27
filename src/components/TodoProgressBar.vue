<template>
  <div class="progress">
<!--    <div class="progress__count">-->
      <span class="progress__count line"> {{ count }} {{ count > 1 ? 'tasks' : 'task' }}</span>
<!--    </div>-->
    <div class="progress__status">
      <slot class="progress__status"></slot>
    </div>
    <div class="progress__bar">
      <div class="progress__bar__line progress__bar__line__pending" :style="{width: `${count > 0 ? (count/allTasks) * 100 : 0}% `, backgroundColor: `${color}`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    allTasks: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  width: 100%;
  height: auto;
  max-width: 190px;
  max-height: 85px;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 2rem;
  gap: 0.5rem;

  &__count {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    color: #202427;
    opacity: 0.5;
    font-size: 0.8rem;
  }

  &__status {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.2rem;
    padding-bottom: 0.5rem;
  }

  &__bar {
    width: 100%;
    background-color: #12202427;
    height: 0.3rem;
    border-radius: 5px;


    &__line {
      height: 100%;
      border-radius: 5px;
      transition: width 1s linear;
    }
  }
}
</style>
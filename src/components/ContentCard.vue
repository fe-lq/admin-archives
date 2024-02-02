<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <div class="content-card">
    <a-spin :spinning="props.loading">
      <slot></slot>
    </a-spin>
  </div>
</template>

<style scoped lang="scss">
.content-card {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}
</style>

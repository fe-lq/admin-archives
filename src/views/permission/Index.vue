<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleClick = () => {
  router.push('/permission/role')
}
</script>

<template>
  <div>权限</div>
  <ElButton type="primary" @click="handleClick">跳转到角色</ElButton>
  <RouterView />
</template>

<style module lane="scss"></style>

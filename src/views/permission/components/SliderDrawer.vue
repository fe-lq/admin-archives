<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
  visible: boolean
}

type Emits = {
  close: []
}

interface FormType {
  users: string[]
  role: string
  permissions?: number[]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const form = reactive<FormType>({
  users: [],
  role: '',
  permissions: []
})
const handleConfirm = () => {
  console.log(form)
  emit('close')
}
</script>
<template>
  <a-drawer :open="props.visible" title="添加角色" direction="rtl" @close="emit('close')">
    <a-form :model="form" label-width="80px" label-position="left">
      <a-form-item label="角色名称">
        <a-input v-model:value="form.role" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="成员">
        <a-select v-model:value="form.users" placeholder="请选择成员">
          <a-select-option label="超级管理员" :value="0" />
          <a-select-option label="管理员" :value="1" />
          <a-select-option label="角色1" :value="2" />
        </a-select>
      </a-form-item>
      <a-form-item label="权限节点">
        <a-select v-model:value="form.permissions" placeholder="请选择权限节点">
          <a-select-option label="超级管理员" :value="0" />
          <a-select-option label="管理员" :value="1" />
          <a-select-option label="角色1" :value="2" />
        </a-select>
      </a-form-item>
    </a-form>
    <template #footer>
      <div class="drawer-footer">
        <a-button @click="emit('close')">取消</a-button>
        <a-button type="primary" @click="handleConfirm">确认</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<style scoped lang="scss">
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>

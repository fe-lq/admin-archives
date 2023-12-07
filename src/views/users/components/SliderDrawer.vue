<script setup lang="ts">
import { computed, reactive } from 'vue'

interface Props {
  visible: boolean
}

type Emits = {
  'update:visible': [value: boolean]
}

interface FormType {
  userName: string
  phone: string
  password: string
  role: number
  email?: string
  status: 0 | 1
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const form = reactive<FormType>({
  userName: '',
  phone: '',
  password: '',
  role: 0,
  status: 1
})

const visible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})

const handleCancel = () => {
  visible.value = false
}
const handleConfirm = () => {
  console.log(form)
}
</script>
<template>
  <a-drawer v-model:open="visible" title="添加用户">
    <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="用户名">
        <a-input v-model:value="form.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model:value="form.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          v-model:value="form.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="form.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          v-model:value="form.role"
          :options="[
            { label: '超级管理员', value: 0 },
            { label: '管理员', value: 1 },
            { label: '角色1', value: 2 }
          ]"
          placeholder="请选择角色"
        />
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="form.status" placeholder="请选择状态">
          <a-select-option :value="1">启用</a-select-option>
          <a-select-option :value="0">禁用</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <template #footer>
      <div class="drawer-footer">
        <a-button @click="handleCancel">取消</a-button>
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

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
  status: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const form = reactive<FormType>({
  userName: '',
  phone: '',
  password: '',
  role: 0,
  status: true
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
  <a-drawer v-model="visible" title="添加用户" direction="rtl">
    <a-form :model="form" label-width="80px" label-position="left" class="form-container">
      <a-form-item label="用户名">
        <a-input v-model="form.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model="form.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model="form.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select v-model="form.role" placeholder="请选择角色">
          <a-select-option label="超级管理员" :value="0" />
          <a-select-option label="管理员" :value="1" />
          <a-select-option label="角色1" :value="2" />
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model="form.status" placeholder="请选择状态">
          <a-select-option label="启用" :value="true" />
          <a-select-option label="禁用" :value="false" />
        </a-select>
      </a-form-item>
    </a-form>
    <template #footer>
      <div style="flex: auto">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleConfirm">确认</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<style scoped lang="scss">
.form-container {
  margin-bottom: 10px;
  // .el-input {
  //   --el-input-width: 220px;
  // }

  // .el-select {
  //   width: 220px;
  // }
}
</style>

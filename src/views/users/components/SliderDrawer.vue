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
  <ElDrawer v-model="visible" title="添加用户" direction="rtl">
    <ElForm :model="form" label-width="80px" label-position="left" class="form-container">
      <ElFormItem label="用户名">
        <ElInput v-model="form.userName" placeholder="请输入用户名" />
      </ElFormItem>
      <ElFormItem label="手机号">
        <ElInput v-model="form.phone" placeholder="请输入手机号" />
      </ElFormItem>
      <ElFormItem label="密码">
        <ElInput v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </ElFormItem>
      <ElFormItem label="邮箱">
        <ElInput v-model="form.email" placeholder="请输入邮箱" />
      </ElFormItem>
      <ElFormItem label="角色">
        <ElSelect v-model="form.role" placeholder="请选择角色">
          <ElOption label="超级管理员" :value="0" />
          <ElOption label="管理员" :value="1" />
          <ElOption label="角色1" :value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="状态">
        <ElSelect v-model="form.status" placeholder="请选择状态">
          <ElOption label="启用" :value="true" />
          <ElOption label="禁用" :value="false" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div style="flex: auto">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="handleConfirm">确认</ElButton>
      </div>
    </template>
  </ElDrawer>
</template>

<style scoped lang="scss">
.form-container {
  .el-input {
    --el-input-width: 220px;
  }

  .el-select {
    width: 220px;
  }
}
</style>

<script setup lang="ts">
import { createUser, updateUser } from '@/api/user'
import { DrawerEnum, Role, User } from '@/types/user'
import { message } from 'ant-design-vue'
import { FormInstance, Rule } from 'ant-design-vue/es/form'
import { computed, reactive } from 'vue'

interface Props {
  type: DrawerEnum
  visible: boolean
  formData?: User
}

type Emits = {
  'update:visible': [value: boolean]
  onConfirm: []
}

const formAddRef = ref<FormInstance>()
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const formValues = reactive<Partial<User>>({
  role: Role.USER,
  status: true
})
onUpdated(() => {
  Object.assign(formValues, props.formData)
})

const title = computed(() => (props.type === DrawerEnum.ADD ? '添加用户' : '编辑用户'))

const visible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})

const handleCancel = () => {
  formAddRef.value?.resetFields()
  visible.value = false
}

const handleConfirm = async () => {
  await formAddRef.value?.validate()
  try {
    if (props.type === DrawerEnum.EDIT) {
      await updateUser(formValues as User)
    } else {
      await createUser(formValues)
    }
    emit('onConfirm')
    visible.value = false
    message.success('操作成功')
  } catch (error) {
    message.error('操作失败')
  }
}

const rules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur', max: 12 }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { message: '请输入正确的手机号', trigger: 'blur', pattern: /^\d{11}$/ }
  ],
  password: [{ required: true, message: '密码长度为6-20', trigger: 'blur', max: 20, min: 6 }],
  email: [
    {
      message: '请输入正确的邮箱',
      trigger: 'blur',
      pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    }
  ]
}
</script>
<template>
  <a-drawer v-model:open="visible" :title="title" width="450" @close="handleCancel">
    <a-form key="2" ref="formAddRef" :model="formValues" :label-col="{ span: 5 }" :rules="rules">
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="formValues.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formValues.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formValues.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formValues.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="角色" name="role">
        <a-select
          v-model:value="formValues.role"
          :options="[
            { label: '超级管理员', value: Role.ADMIN },
            { label: '管理员', value: Role.USER }
          ]"
          placeholder="请选择角色"
        />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="formValues.status">
          <a-radio :value="true">启用</a-radio>
          <a-radio :value="false">禁用</a-radio>
        </a-radio-group>
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

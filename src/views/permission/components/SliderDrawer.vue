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
  <ElDrawer :model-value="props.visible" title="添加角色" direction="rtl" @close="emit('close')">
    <ElForm :model="form" label-width="80px" label-position="left" class="form-container">
      <ElFormItem label="角色名称">
        <ElInput v-model="form.role" placeholder="请输入角色名称" />
      </ElFormItem>
      <ElFormItem label="成员">
        <ElSelect v-model="form.users" placeholder="请选择成员">
          <ElOption label="超级管理员" :value="0" />
          <ElOption label="管理员" :value="1" />
          <ElOption label="角色1" :value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="权限节点">
        <ElSelect v-model="form.permissions" placeholder="请选择权限节点">
          <ElOption label="超级管理员" :value="0" />
          <ElOption label="管理员" :value="1" />
          <ElOption label="角色1" :value="2" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div style="flex: auto">
        <ElButton @click="emit('close')">取消</ElButton>
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

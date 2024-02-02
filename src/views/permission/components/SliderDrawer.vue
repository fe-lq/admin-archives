<script setup lang="ts">
import { getPermRang } from '@/api/permission'
import { getUserList } from '@/api/user'
import { MenuItem, PermFormType } from '@/types/permission'
import { User } from '@/types/user'
import { FormInstance } from 'ant-design-vue'
import { reactive } from 'vue'

interface Props {
  visible: boolean
  title: string
  formValue?: PermFormType
}

type Emits = {
  close: []
  onConfirm: [form: PermFormType]
}

const defaultForm = {
  roleName: '',
  members: [],
  permissionScope: []
}

const props = defineProps<Props>()
const menuList = reactive<MenuItem[]>([])
const userList = reactive<User[]>([])
const emit = defineEmits<Emits>()
const formAddRef = ref<FormInstance>()
const form = ref<PermFormType>(defaultForm)

const handleCancel = () => {
  formAddRef.value?.resetFields()
  emit('close')
}

const handleConfirm = async () => {
  await formAddRef.value?.validate()
  emit('onConfirm', form.value)
  formAddRef.value?.resetFields()
}

onUpdated(() => {
  if (props.formValue) {
    form.value = props.formValue
  } else {
    form.value = defaultForm
  }
})

onMounted(async () => {
  const { data } = await getPermRang()
  const { data: users } = await getUserList()
  menuList.push(...data)
  userList.push(...users)
})
</script>
<template>
  <a-drawer
    :open="props.visible"
    width="450"
    :title="props.title"
    direction="rtl"
    @close="handleCancel"
  >
    <a-form ref="formAddRef" :model="form" :label-col="{ span: 5 }">
      <a-form-item
        label="角色名称"
        name="roleName"
        required
        :rule="[{ required: true, message: '请输入角色名称', trigger: 'blur' }]"
      >
        <a-input v-model:value="form.roleName" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="绑定成员" name="members">
        <a-select v-model:value="form.members" show-arrow mode="multiple" placeholder="请选择成员">
          <a-select-option v-for="user in userList" :key="user.userId" :value="user.userId">{{
            user.userName
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="权限节点" tooltip="不设置就是所有权限" name="permissionScope">
        <a-tree-select
          v-model:value="form.permissionScope"
          filterTreeNode
          treeNodeFilterProp="menuName"
          multiple
          show-arrow
          allow-clear
          tree-checkable
          :tree-data="menuList"
          tree-default-expand-all
          :field-names="{
            children: 'children',
            label: 'menuName',
            value: 'id'
          }"
          placeholder="请选择权限节点"
        />
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

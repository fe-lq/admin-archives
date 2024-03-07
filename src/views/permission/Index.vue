<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SliderBrawer from './components/SliderDrawer.vue'
import { FormInstance, Modal, message } from 'ant-design-vue'
import { PermFormType, Permission } from '@/types/permission'
import { createPerm, deletePerm, getPermList, updatePerm } from '@/api/permission'
import { DrawerEnum } from '@/types/common'

interface FormType {
  userName?: string
  roleName?: string
}
const drawerVisible = ref(false)
const loading = ref(false)
const brawerTitle = ref('新增权限')
const editItemValues = ref<PermFormType & { id?: number }>()
const drawerType = ref<DrawerEnum>(DrawerEnum.ADD)
const formRef = ref<FormInstance>()
const tableData = ref<Permission[]>([])
const searchForm = reactive<FormType>({})

const fetchPermissions = async () => {
  try {
    loading.value = true
    const res = await getPermList(searchForm)
    tableData.value = res.data
  } catch (error: any) {
    message.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPermissions()
})

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '成员',
    dataIndex: 'members'
  },
  {
    title: '权限范围',
    dataIndex: 'permissionScope'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]

const handleSearch = () => {
  fetchPermissions()
}

const handleReset = () => {
  formRef.value?.resetFields()
  fetchPermissions()
}

const handleDelete = (row: Permission) => {
  Modal.confirm({
    title: '提示',
    content: '确认是否要删除当前数据？',
    onCancel: () => {
      message.warning('操作已取消')
    },
    onOk: async () => {
      try {
        await deletePerm({ id: row.id })
        fetchPermissions()
        message.success('操作成功')
      } catch (error: any) {
        message.error(error.message)
      }
    }
  })
}

const handleConfirm = async (values: PermFormType) => {
  try {
    if (drawerType.value === DrawerEnum.EDIT) {
      await updatePerm({ ...values, id: editItemValues.value?.id! })
    } else {
      await createPerm(values)
    }
    drawerVisible.value = false
    fetchPermissions()
    message.success('操作成功')
  } catch (error) {
    message.error('操作失败')
  }
}

const handleOpenDrawer = (row?: Permission) => {
  if (row) {
    editItemValues.value = {
      ...row,
      members: row.members?.map((item) => item.userId) ?? [],
      permissionScope: row.permissionScope?.map((item) => item.id) ?? []
    }
    drawerType.value = DrawerEnum.EDIT
    brawerTitle.value = '编辑权限'
  } else {
    editItemValues.value = undefined
    drawerType.value = DrawerEnum.ADD
    brawerTitle.value = '新增权限'
  }
  drawerVisible.value = true
}

const getPermItems = (permissionScopeList: Permission['permissionScope']) => {
  if (!permissionScopeList?.length) {
    return '所有权限'
  }
  return permissionScopeList.map((item) => item.menuName).join(', ')
}
</script>

<template>
  <ContentCard :loading="loading">
    <a-form ref="formRef" layout="inline" :model="searchForm" class="form-container">
      <a-form-item label="角色">
        <a-input v-model:value="searchForm.roleName" placeholder="请输入角色名称" allowClear />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchForm.userName" placeholder="请输入用户名" allowClear />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-space>
      </a-form-item>
      <a-form-item class="add-item">
        <a-button type="primary" @click="handleOpenDrawer()">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, record }: any">
        <template v-if="column.dataIndex === 'members'">
          <a-space :size="0" wrap>
            <a-tag v-for="user in record.members" :key="user" color="blue">{{
              user.userName
            }}</a-tag>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'permissionScope'">
          {{ getPermItems(record.permissionScope) }}
        </template>
        <template v-if="column.dataIndex === 'operate'">
          <!-- 超级管理员暂且写死控制不能修改 -->
          <a-space wrap>
            <a-button
              type="primary"
              size="small"
              :disabled="record.id === 1"
              @click="handleOpenDrawer(record)"
              >编辑</a-button
            >
            <a-button
              type="primary"
              danger
              size="small"
              :disabled="record.id === 1"
              @click="handleDelete(record)"
            >
              删除
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </ContentCard>

  <SliderBrawer
    :title="brawerTitle"
    :visible="drawerVisible"
    :formValue="editItemValues"
    @close="drawerVisible = false"
    @onConfirm="handleConfirm"
  />
</template>

<style lang="scss" scoped>
.form-container {
  margin-bottom: 20px;
  .ant-input,
  .ant-select {
    width: 200px;
  }
  .add-item {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>

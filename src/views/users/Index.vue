<script lang="ts" setup>
import { reactive, ref } from 'vue'
import dayJs from 'dayjs'
import SliderDrawer from './components/SliderDrawer.vue'
import { FormInstance, Modal, message } from 'ant-design-vue'
import { deleteUser, getUserList, readUser } from '@/api/user'
import { DrawerEnum } from '@/types/common'
import { User } from '@/types/user'
import { getDecryptPsw, getMaskPhone } from '@/utils/index'

interface FormType {
  userName?: string
  phone?: string
  email?: string
  status?: 0 | 1
}
const drawerVisible = ref(false)
const drawerType = ref<DrawerEnum>(DrawerEnum.ADD)
const formRef = ref<FormInstance>()
const tableData = ref<User[]>([])
const editFormValues = ref<User>()
const loading = ref<boolean>()
const searchForm = reactive<FormType>({})

const fetchUsers = async () => {
  try {
    loading.value = true
    const { data } = await getUserList({
      ...searchForm,
      status: typeof searchForm.status === 'number' ? !!searchForm.status : undefined
    })
    tableData.value = data
  } catch (error: any) {
    message.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

const handleSearch = () => {
  fetchUsers()
}

const handleReset = () => {
  formRef.value?.resetFields()
  fetchUsers()
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '角色',
    dataIndex: 'role'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '手机号',
    dataIndex: 'phone'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]

const handleOpenDrawer = async (userId?: number) => {
  if (userId) {
    try {
      const { data } = await readUser({ userId })
      editFormValues.value = { ...data, password: getDecryptPsw(data.password) }
      drawerType.value = DrawerEnum.EDIT
    } catch (error: any) {
      message.error(error.message)
    }
  } else {
    drawerType.value = DrawerEnum.ADD
  }
  drawerVisible.value = true
}

const handleDelete = (userId: number) => {
  Modal.confirm({
    title: '提示',
    content: '确认是否要删除当前数据？',
    onCancel: () => {
      message.warning('操作已取消')
    },
    onOk: async () => {
      try {
        await deleteUser({ userId })
        fetchUsers()
        message.success('操作成功')
      } catch (error: any) {
        message.error(error.message)
      }
    }
  })
}
</script>

<template>
  <a-spin :spinning="loading">
    <ContentCard>
      <a-form key="1" ref="formRef" layout="inline" :model="searchForm" class="form-container">
        <a-form-item label="用户名" name="userName">
          <a-input v-model:value="searchForm.userName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="searchForm.phone" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="searchForm.status" placeholder="请选择状态" allowClear>
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
        <a-form-item class="add-item">
          <a-button type="primary" @click="() => handleOpenDrawer()">新增</a-button>
        </a-form-item>
      </a-form>
      <a-table :columns="columns" :data-source="tableData">
        <!-- 组件问题先any一下，等更新呢 -->
        <template #bodyCell="{ text, column, record }: any">
          <template v-if="column.dataIndex === 'createDate'">
            {{ dayJs(text).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
          <template v-if="column.dataIndex === 'status'">
            <a-tag v-if="text" color="success">启用</a-tag>
            <a-tag v-else color="error">禁用</a-tag>
          </template>
          <template v-if="column.dataIndex === 'phone'">
            {{ getMaskPhone(text) }}
          </template>
          <template v-if="column.dataIndex === 'operate'">
            <a-space>
              <a-button type="primary" size="small" @click="() => handleOpenDrawer(record.userId)"
                >编辑</a-button
              >
              <a-button
                type="primary"
                danger
                size="small"
                @click="() => handleDelete(record.userId)"
                >删除</a-button
              >
            </a-space>
          </template>
        </template>
      </a-table>
    </ContentCard>
  </a-spin>
  <SliderDrawer
    v-model:visible="drawerVisible"
    :type="drawerType"
    :form-data="editFormValues"
    @onConfirm="fetchUsers"
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

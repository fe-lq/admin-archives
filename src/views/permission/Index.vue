<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SliderBrawer from './components/SliderDrawer.vue'
import { Modal, message } from 'ant-design-vue'

interface FormType {
  userName: string
  phone: string
  email?: string
  role?: string
}
const drawerVisible = ref(false)
const searchForm = reactive<FormType>({
  userName: '',
  phone: ''
})

const tableData = [
  {
    users: ['Tom', '李四', '张总', '高总'],
    role: '超级管理员',
    permissions: ['线上档案', '商品信息']
  },
  {
    users: ['Sire', '李四', '张总', '高总'],
    role: '管理员',
    permissions: ['客户管理', '商品信息']
  },
  {
    users: ['Sire', '李四', '高总'],
    role: '管理员',
    permissions: ['客户管理', '线上商品']
  }
]

const columns = [
  {
    title: '角色名称',
    dataIndex: 'role'
  },
  {
    title: '成员',
    dataIndex: 'users'
  },
  {
    title: '权限范围',
    dataIndex: 'permissions'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]

const onSubmit = () => {
  console.log(searchForm)
  console.log('submit!')
}

const handleClick = (row: any) => {
  console.log(row)
}

const handleDelete = (row: any) => {
  Modal.confirm({
    title: '提示',
    content: '确认是否要删除当前数据？',
    onCancel: () => {
      message.warning('操作已取消')
    },
    onOk: () => {
      console.log(row)
      message.success('操作成功')
    }
  })
}
</script>

<template>
  <ContentCard>
    <a-form layout="inline" :model="searchForm" class="form-container">
      <a-form-item label="用户名">
        <a-input v-model:value="searchForm.userName" placeholder="请输入用户名" clearable />
      </a-form-item>
      <a-form-item label="角色">
        <a-input v-model:value="searchForm.role" placeholder="请输入角色名称" clearable />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="onSubmit">查询</a-button>
          <a-button @click="onSubmit">重置</a-button>
        </a-space>
      </a-form-item>
      <a-form-item class="add-item">
        <a-button type="primary" @click="drawerVisible = true">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'users'">
          <a-space :size="0" wrap>
            <a-tag v-for="user in record.users" :key="user">{{ user }}</a-tag>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'permissions'">
          {{ record.permissions.join(', ') }}</template
        >
        <template v-if="column.dataIndex === 'operate'">
          <a-space wrap>
            <a-button type="primary" size="small" @click="handleClick(record)">编辑</a-button>
            <a-button type="primary" danger size="small" @click="handleDelete(record)">
              删除
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </ContentCard>

  <SliderBrawer :visible="drawerVisible" @close="drawerVisible = false" />
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

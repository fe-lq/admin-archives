<script lang="ts" setup>
import { reactive } from 'vue'
import { getMaskPhone } from '@/utils/index'

interface FormType {
  userName?: string
  phone?: string
  wxCode?: string
  registerDate?: [string, string]
}
const searchForm = reactive<FormType>({})

const tableData = [
  {
    registerDate: '2016-05-03',
    userName: 'Tom',
    wxCode: 'la-xxxx',
    phone: '17621733753',
    lastLoginTime: '2023-12-07 11:10:35'
  },
  {
    registerDate: '2016-05-02',
    userName: 'Tom',
    wxCode: 'la-xxxx',
    phone: '17665433753',
    lastLoginTime: '2023-12-07 11:10:35'
  },
  {
    registerDate: '2016-05-04',
    userName: 'Tom',
    wxCode: 'la-xxxx',
    phone: '17611113753',
    lastLoginTime: '2023-12-07 11:10:35'
  },
  {
    registerDate: '2016-05-01',
    userName: 'Tom',
    wxCode: 'la-xxxx',
    phone: '17622213753',
    lastLoginTime: '2023-12-07 11:10:35'
  }
]

const onSubmit = () => {
  console.log(searchForm)
  console.log('submit!')
}

const columns = [
  {
    title: '注册日期',
    dataIndex: 'registerDate'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '微信号',
    dataIndex: 'wxCode'
  },
  {
    title: '手机号',
    dataIndex: 'phone'
  },
  {
    title: '最近登录时间',
    dataIndex: 'lastLoginTime'
  }
]
</script>

<template>
  <ContentCard>
    <a-form layout="inline" :model="searchForm" class="form-container">
      <a-form-item label="用户名">
        <a-input v-model:value="searchForm.userName" placeholder="请输入用户名" allowClear />
      </a-form-item>
      <a-form-item label="注册日期">
        <a-range-picker v-model:value="searchForm.registerDate" />
      </a-form-item>
      <a-form-item label="微信号">
        <a-input v-model:value="searchForm.wxCode" placeholder="请输入微信号" allowClear />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model:value="searchForm.phone" placeholder="请输入手机号" allowClear />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="onSubmit">查询</a-button>
          <a-button @click="onSubmit">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, record }: any">
        <template v-if="column.dataIndex === 'phone'">
          {{ getMaskPhone(record.phone) }}
        </template>
      </template>
    </a-table>
  </ContentCard>
</template>

<style lang="scss" scoped>
.form-container {
  margin-bottom: 10px;
  .ant-form-item {
    margin-bottom: 10px;
  }

  .ant-input,
  .ant-select {
    width: 200px;
  }
}
</style>

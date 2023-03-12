<script lang="ts" setup>
import dayjs from 'dayjs'
const isBlackList = ref(false)
const isBlackListChange = () => {
  paginationConfig.current = 1
  queryUserList()
}
const columns = [
  {
    title: 'userId',
    dataIndex: 'userId',
  },
  {
    title: '用户名',
    dataIndex: 'nickName',
  },
  {
    title: '归属地',
    slotName: 'addressIp',
  },
  {
    title: '注册时间',
    slotName: 'createdTimestamp',
  },
  {
    title: '操作',
    slotName: 'action',
  },
]
const paginationConfig = reactive({ pageSize: 15, total: 0, current: 1 })
const data = ref([])
const pageChange = (current: number) => {
  paginationConfig.current = current
  queryUserList()
}
const queryUserList = async () => {
  const res = await api.queryUserList({
    current: paginationConfig.current,
    size: paginationConfig.pageSize,
    status: isBlackList.value,
  })
  console.log(res)
  data.value = res.data.records
  paginationConfig.current = res.data.current
  paginationConfig.total = res.data.total
}
queryUserList()

const defineUserModalShow = ref(false)
const loading = ref(false)
const defineUserParam = reactive<{ userId: string | number; reason: string }>({
  userId: '',
  reason: '',
})

const defineUserModalOpen = (userId: number) => {
  defineUserParam.userId = userId
  defineUserModalShow.value = true
}
const defineUserModalOk = async () => {
  if (defineUserParam.reason === '') return Message.error('请先填写删除该用户的理由')
  loading.value = true
  const res = await api.defineUser(defineUserParam)
  loading.value = false
  if (res.code === 200) {
    Message.success('已将用户添加至黑名单')
    queryUserList()
    defineUserModalShow.value = false
  }
}
const defineUserModalBeforeClose = () => {
  defineUserParam.reason = ''
  defineUserParam.userId = ''
}

const unDefineUser = async (userId: number) => {
  const res = await api.nDefineUser(userId)
  if (res.code === 200) {
    Message.success('将用户移至白名单成功')
    queryUserList()
  } else {
    Message.error('操作失败')
  }
}
</script>

<template>
  <a-card>
    <h2>用户管理</h2>
    <div py-10px>
      <a-radio-group type="button" v-model="isBlackList" @change="isBlackListChange">
        <a-radio :value="false">白名单</a-radio>
        <a-radio :value="true">黑名单</a-radio>
      </a-radio-group>
    </div>

    <a-table :bordered="false" :columns="columns" :data="data" :pagination="paginationConfig" @page-change="pageChange">
      <template #addressIp="{ record }">
        <a-tooltip :content="record.signIp">
          <div>{{ record.signIpAddress }}</div>
        </a-tooltip>
      </template>
      <template #createdTimestamp="{ record }">
        <div>{{ dayjs(record.createdTimestamp).format('YYYY-MM-DD HH:mm') }}</div>
      </template>
      <template #action="{ record }">
        <a-button type="text">详情</a-button>
        <a-button v-if="!isBlackList" type="text" status="danger" @click="defineUserModalOpen(record.userId)">设置为黑名单</a-button>
        <a-button v-else type="text" status="success" @click="unDefineUser(record.userId)">设置为白名单</a-button>
      </template>
    </a-table>
    <!-- 弹框 -->
    <a-modal v-model:visible="defineUserModalShow" :footer="false" @before-close="defineUserModalBeforeClose">
      <template #title> 您确定要拉黑此用户吗 </template>
      <a-input v-model="defineUserParam.reason" placeholder="请填写拉黑此用户的理由"></a-input>
      <div mt-20px flex justify-end>
        <a-button mr-10px @click="defineUserModalShow = false">取消</a-button>
        <a-button :loading="loading" @click="defineUserModalOk" type="primary">保存</a-button>
      </div>
    </a-modal>
  </a-card>
</template>

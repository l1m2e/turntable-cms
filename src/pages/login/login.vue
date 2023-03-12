<script lang="ts" setup>
const router = useRouter()
const isAccountPassword = ref(true)
const form = reactive({
  userid: '10000',
  openid: 'o8r0954slKs9pJsWPPkZhJNQUB7A',
})
const login = async () => {
  const res = await api.login(form)
  if (res.code === 200) {
    Message.success(`欢迎回来${res.data.user.userId}`)
    router.push({ path: '/dashboard' })
    useStore.token.value = res.data.token
  } else {
    Message.error(res.message)
  }
}
</script>

<template>
  <div w-100vw h100vh center bg-gray1 dark:bg-dark>
    <div v-if="isAccountPassword" bg="[var(--color-bg-1)]" w-420px h-540px rounded-4 border="#6777ef t-16">
      <h1 font-700 color="[var(--color-text-1)]" text-8 mt-10 text-center>登录</h1>
      <a-form :model="form" layout="vertical" p-5>
        <a-form-item field="name" label="用户名">
          <a-input v-model="form.userid" size="large" placeholder="请输入用户名">
            <template #prefix>
              <div i-carbon:user text-4 />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" label="密码" mt-3>
          <a-input-password v-model="form.openid" size="large" placeholder="请输入密码">
            <template #prefix>
              <div i-carbon:password text-4 />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <div w="100%" h="100%" center>
            <div class="button" @click="login">登录</div>
          </div>
        </a-form-item>
      </a-form>
      <p color-warmgray text-center mt-10px>
        使用小程序扫码登录？
        <a-link @click="">去登录</a-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.button {
  width: 280px;
  height: 50px;
  background-color: #6777ef;
  margin-top: 5px;
  border-radius: 5px;
  color: white;
  box-shadow: 0 0 20px #6777ef56;
  transition: all 0.6s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.button:hover {
  background-color: #4e59ad;
}
</style>

<template>
  <div style="background: #333;width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
    <el-input type="danger" placeholder="" v-model="code" style="width: 200px;">
      <el-button  size="mini" slot="append" icon="el-icon-right" @click="login"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      code: ''
    }
  },
  methods: {
    login() {
      if(this.code == null || this.code == undefined || this.code.trim() == '') return;
      this.$api.login({code: this.code}).then(res => {
        if(res.code == 200) {
          sessionStorage.setItem("code", this.code)
          this.$router.push({path: "/"});
        } else this.$message.error("口令错误")
      }).catch(e => this.$message.error("口令错误"));
    }
  }
}
</script>



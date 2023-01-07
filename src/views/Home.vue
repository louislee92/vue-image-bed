<template>
  <div class="wrapper">
    <div class="header">
      <el-input style="max-width: 3rem;" v-model="params.keyword"
                placeholder="输入ID、名称模糊搜索"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="primary" @click="upload">上传</el-button>
    </div>
    <div class="content" v-viewer>
      <div v-for="item in data.records" class="image-item">
        <div class="image-photo"><img :src="url(item.path)" :alt="item.name"></div>
        <div class="image-info">
          <p>文件名：{{item.name}}</p>
          <p>大小：{{item.size}}</p>
          <p>日期：{{item.time}}</p>
          <p>URL：{{url(item.path)}}</p>
        </div>
        <div class="image-opt">
          <el-button size="mini" type="success" title="复制URL" @click="copyURL(item)" icon="el-icon-copy-document"></el-button>
          <el-button size="mini" type="success" title="下载图片" @click="download(item)" icon="el-icon-download"></el-button>
          <el-button size="mini" type="danger" title="删除图片" @click="del(item)" icon="el-icon-delete"></el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-pagination layout="prev, pager, next"
                     :total="data.total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
export default {
  name: 'Home',
  data() {
    return {
      params: {
        id: '',
        keyword: '',
        current: 1,
        size: 10,
      },
      data: {
        total: 0,
        records: []
      },
      urlPrefix: '',
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.search()
  },
  computed: {
    url() {
      return path => this.urlPrefix + path;
    }
  },
  methods: {
    init() {
      this.$api.urlprefix().then(res => {
        if(res.code == 200) this.urlPrefix = res.data;
      })
    },
    search() {
      console.log(this.params)
      this.data.records = [];
      this.$api.read(this.params).then(res => {
        console.log("res ", res)
        if(res.code == 200) {
          this.data = res.data;
        }
        else console.error("error", res)
      }).catch(e => {
        console.error("error", e)
      })
    },
    upload() {
      let _this = this
      var fileCancel = true;
      var inputFileElem = document.createElement('input');
      inputFileElem.type = 'file';
      inputFileElem.multiple = true;
      inputFileElem.style = 'display: none';
      inputFileElem.click();
      inputFileElem.onchange = function () {
        fileCancel = false;
        console.log(inputFileElem.files)
        var formData = new FormData();
        for(var i = 0; i < inputFileElem.files.length; i++) {
          formData.append("files", inputFileElem.files[i]);
        }
        _this.$api.batchUpload(formData).then(res => {
          _this.search();
        }).catch(e => {
          console.error("error", e)
          _this.$message.error("上传出错");
        })
      };
      // 一次性事件
      window.addEventListener('focus', function (){
        setTimeout(function (){
          if(fileCancel) inputFileElem.remove();
        }, 100);
      }, { once: true });
    },
    copyURL(item) {
      // text是复制文本
      // 创建input元素
      const el = document.createElement('input')
      // 给input元素赋值需要复制的文本
      el.setAttribute('value', this.url(item.path))
      // 将input元素插入页面
      document.body.appendChild(el)
      // 选中input元素的文本
      el.select()
      // 复制内容到剪贴板
      document.execCommand('copy')
      // 删除input元素
      document.body.removeChild(el)
      this.$message.info('已复制地址到剪切板');
    },
    download(item) {
      var aElem = document.createElement('a');
      aElem.href = this.url(item.path);
      aElem.download = item.name;
      aElem.target = '_blank';
      aElem.click();
    },
    del(item) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.del([item.id]).then(res => {
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          }
          else throw new Error('删除失败')
        }).catch(e => this.$message.error("删除失败"));
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>


<style lang="scss" scoped>
$--size: 1rem;
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  &.dark {
    background: #333;
  }

  .header {
    display: flex;
    & > * {
      margin-left: .1rem;
    }
  }
  .content {
    position: absolute;
    top: 40px; bottom: 40px;
    width: 100%; overflow: auto;

    .image-item {
      width: calc(100% - .2rem);
      height: $--size;
      margin: auto; margin-top: .1rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid rgba(0,0,0,0.1);
      overflow: hidden;
      position: relative;

      &:hover {
        background: rgba(0,0,0,0.03);
      }

      .image-photo {
        width: $--size; height: $--size;
        min-width: $--size;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        & > img {
          width: 90%;
          transform: scale(1);
          transition: all .2s;
        }
      }
      &:hover .image-photo > img {
        transform: scale(1.3);
      }

      .image-info {
        font-size: .12rem;
        padding-left: .1rem; padding-right: .1rem;
      }

      .image-opt {
        position: absolute;
        top: .1rem; right: .1rem;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
  }

}
</style>

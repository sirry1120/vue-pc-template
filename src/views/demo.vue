<!--  -->
<template>
  <div class="page">
    <div class="left">
      <span>操作台</span>
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane label="配置一"
          name="first">
          <div class="switch">
            <!-- 开关 -->
            <el-switch v-model="value1"
              :inactive-text="valueLabel1">
            </el-switch>
            <el-switch v-model="value2"
              :inactive-text="valueLabel2">
            </el-switch>
            <el-switch v-model="value3"
              :inactive-text="valueLabel3">
            </el-switch>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置二"
          name="second">
          <div class="switch">
            <!-- 开关 -->
            <el-switch v-model="value4"
              :inactive-text="valueLabel4">
            </el-switch>
            <el-switch v-model="value5"
              :inactive-text="valueLabel5">
            </el-switch>
            <el-switch v-model="value6"
              :inactive-text="valueLabel6">
            </el-switch>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
    <div class="right">
      <div>
        <el-upload class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :auto-upload="false"
          :on-change="changeFile"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small"
            type="primary">点击上传</el-button>

        </el-upload>
      </div>
      <div>
        <img :src="imgUrl"
          alt=""
          class="demo-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
      imgUrl: '',
      activeName:'first',
      valueLabel1: '开关1成功',
      valueLabel2: '开关2成功',
      valueLabel3: '开关3失败',
      valueLabel4: '开关3失败',
      valueLabel5: '开关3失败',
      valueLabel6: '开关3失败',
    }
  },
  watch: {
    value1: {
      handler(val) {
        if (val) {
          this.valueLabel1 = '开关1成功'
        } else {
          this.valueLabel1 = '开关1失败'
        }
      },
    },
    value2: {
      handler(val) {
        if (val) {
          this.valueLabel2 = '开关2成功'
        } else {
          this.valueLabel2 = '开关2失败'
        }
      },
    },
    value3: {
      handler(val) {
        if (val) {
          this.valueLabel3 = '开关3成功'
        } else {
          this.valueLabel3 = '开关3失败'
        }
      },
    },
    value4: {
      handler(val) {
        if (val) {
          this.valueLabel3 = '开关4成功'
        } else {
          this.valueLabel3 = '开关4失败'
        }
      },
    },
    value5: {
      handler(val) {
        if (val) {
          this.valueLabel3 = '开关5成功'
        } else {
          this.valueLabel3 = '开关5失败'
        }
      },
    },
    value6: {
      handler(val) {
        if (val) {
          this.valueLabel3 = '开关6成功'
        } else {
          this.valueLabel3 = '开关6失败'
        }
      },
    },
  },
  methods: {
    changeFile(file, fileList) {
      this.imgUrl = window.URL.createObjectURL(file.raw)
    },
  },
}
</script>
<style lang='scss' scoped>
.page {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    width: 15%;
    height: 100%;
    background-color: green;
    .el-tabs {
        margin-left:20px;
      .switch {
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-switch {
          margin-top: 20px;
        }
      }
    }
  }
  .right {
    flex: 1;
  }
}
.demo-img {
  width: 500px;
}
</style>
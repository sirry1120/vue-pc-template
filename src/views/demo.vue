<!--  -->
<template>
  <div class="page">
    <div class="left">
      <!-- <span>操作台</span> -->
      <!-- <el-tabs class="demo-tabs"
        v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane label="人脸匿名"
          name="first">
<el-radio-group v-model="radio">
          <el-radio-button 
            label="1">数据集</el-radio-button>
          <el-radio-button
            label="2">开放场景</el-radio-button>
</el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="身份保留"
          name="second">

        </el-tab-pane>
      </el-tabs> -->

      <el-radio-group style="margin-top:20px;"
        v-model="radio">
        <el-radio-button label="1">人脸匿名</el-radio-button>
        <el-radio-button label="2">身份保留</el-radio-button>
      </el-radio-group>
      <div v-show="radio==='1'">
        <el-switch v-model="value1"
          style="margin-top:20px;"
          active-text="数据集"
          inactive-text="开放场景">
        </el-switch>
        <div v-show="value1"
          style="margin-top:20px;">
          <el-radio v-model="radio1"
            label="1">Celeba-HQ</el-radio>
          <el-radio v-model="radio1"
            label="2">Vggface-HQ</el-radio>
        </div>
      </div>

      <div v-show="radio==='2'">
        <div class="mg-top-20">局部属性</div>
        <div class="mg-top-20">
          <el-radio v-model="radio3"
            label="1">大鼻子</el-radio>
          <el-radio v-model="radio3"
            label="2">尖鼻子</el-radio>
        </div>
        <div class="mg-top-20">
          <el-radio v-model="radio4"
            label="1">柳叶眉</el-radio>
          <el-radio v-model="radio4"
            label="2">浓眉</el-radio>
        </div>
        <div class="mg-top-20">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="大嘴唇"></el-checkbox>
            <el-checkbox label="眼袋"></el-checkbox>
            <el-checkbox label="口红"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="mg-top-20">全局属性</div>
                <div class="mg-top-20">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="性别"></el-checkbox>
            <el-checkbox label="年龄"></el-checkbox>
            <el-checkbox label="微笑"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

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
      radio: '1',
      radio1: '1',
      radio3: '1',
      radio4: '1',
      checkList:[],
      value1: true,
      value2: true,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
      imgUrl: '',
      activeName: 'first',
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
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
  },
}
</script>
<style lang='scss' scoped>
.page {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    width: 20%;
    height: 100%;
    border-right: 1px solid black;
    // background-color: green;
    .demo-tabs {
      margin-left: 20px;
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
.mg-top-20 {
  margin-top: 20px;
}
</style>
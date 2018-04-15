<template>
  <div class="headline-list">
  
    <el-row :gutter="20">
      <el-col :span="3">
        <div>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="">
              <el-button @click="showUploadDialog()" type="primary" icon="el-icon-upload el-icon--right">上传 Excel</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <el-col :span="17">
        <div style="margin-left: 15px;">
          <el-input placeholder="请输入内容" v-model="queryMsg" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="文案题目" value="title"></el-option>
              <el-option label="文案描述" value="desc"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="queryByNameOrDesc"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <el-input v-model="splitSymbol" placeholder="请输入切割符号，默认按 . 切割"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="splitBySymbol">切割</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="headlines"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="title"
        label="题目"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        >
      </el-table-column>
    </el-table>

    <div class="block text-center margin-top-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      @close="closeUploadDialog"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="uploadDialogVisible"
      width="40%"
      :before-close="handleClose">

      <div class="text-center">
        <el-upload
          :disabled = "!showUploadArea"
          name="file"
          ref="headlineUpload"
          :file-list="fileList"
          :on-progress="showProgress"
          :before-upload="startProgress"
          :on-success="uploadSucess"
          :on-error="uploadFailed"
          class="upload-demo"
          drag
          :action="uploadParam.url"
          :headers="myHeaders"
          :data="uploadParam.data"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-dialog>

  </div>

  
</template>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style lang="less" scoped>
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


<script>
import { getHeadlinesByPage, splitHeadlinesAndReturn } from "@/views/headline/apis/index";
import {
  HEADLINE_DELETE_FLAG_FALSE,
  HEADLINE_DELETE_FLAG_TRUE,
  HEADLINE_FLAG_INIT,
  HEADLINE_FLAG_SPLITED,
  HEADLINE_FLAG_CONSTRUCTED,
  HEADLINE_SELECT_FLAG_INIT,
  HEADLINE_SELECT_FLAG_SELECTED
} from "@/views/headline/assets/js/common";

export default {
  name: "HeadlineList",
  data() {
    return {
      headlines: undefined,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentStep: 1,
      headlineSearch: {
        author: undefined,
        deleteFlag: HEADLINE_DELETE_FLAG_FALSE,
        description: undefined,
        flag: HEADLINE_FLAG_INIT,
        headlinePk: undefined,
        name: undefined,
        selectFlag: HEADLINE_SELECT_FLAG_INIT,
        seperator: undefined,
        title: undefined
      },
      select: "desc",
      queryMsg: undefined,
      myHeaders: {},
      uploadParam: {
        url: "/daren/headline/upload",
        data: {}
      },
      uploadDialogVisible: false,
      showUploadArea: true,
      uploadInterval: "",
      uploadFileStatus: "",
      fileUploadProgress: 10,
      fileList: [],
      splitSymbol: undefined,
      splitedFirstPageHeadlines: []
    };
  },
  methods: {
    loadData() {
      var condition = {
        deleteFlag: HEADLINE_DELETE_FLAG_FALSE,
        flag: HEADLINE_FLAG_INIT,
        selectFlag: HEADLINE_SELECT_FLAG_INIT
      };
      if (
        this.headlineSearch.title != undefined &&
        this.headlineSearch.title.length > 0
      ) {
        condition.title = "%" + this.headlineSearch.title + "%";
      } else {
        condition.title = undefined;
      }

      if (
        this.headlineSearch.description != undefined &&
        this.headlineSearch.description.length > 0
      ) {
        condition.description = this.headlineSearch.description;
      } else {
        condition.description = undefined;
      }

      var params = {
        condition: condition,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      getHeadlinesByPage(params)
        .then(
          function(result) {
            this.headlines = result.data.headlines;
            this.total = result.data.pageCount;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData();
    },
    queryByNameOrDesc() {
      console.log("queryByNameOrDesc");
      if (this.select == "desc") {
        this.headlineSearch.title = undefined;
        this.headlineSearch.description = this.queryMsg;
      } else {
        this.headlineSearch.description = undefined;
        this.headlineSearch.title = this.queryMsg;
      }
      this.loadData();
    },
    showUploadDialog() {
      this.uploadDialogVisible = true;
    },
    closeUploadDialog() {
      this.loadData();
      this.uploadDialogVisible = false;
    },
    showProgress() {
      console.info("In Progress");
    },
    startProgress(file) {
      this.showUploadArea = false;
    },
    uploadSucess(response, file, fileList) {
      this.$refs.headlineUpload.clearFiles();
      this.showUploadArea = true;
      this.fileUploadProgress = 100;
      this.uploadFileStatus = "success";
      this.loadData();
      this.uploadDialogVisible = false;
    },
    uploadFailed(err, file, fileList) {
      this.$refs.headlineUpload.clearFiles();
      this.$message.error("上传失败");
      this.uploadFileStatus = "exception";
      this.showUploadArea = true;
    },
    handleClose(done) {
      this.uploadDialogVisible = false;
      clearInterval(this.uploadInterval);
    },
    splitBySymbol(){
      var params = {
        seperator: this.splitSymbol,
        pageSize: 10
      };
      splitHeadlinesAndReturn(params)
        .then(
          function(result) {
            this.splitedFirstPageHeadlines = result.data;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    console.log("Hello created");
  },
  mounted() {
    console.log("hello mount");
    this.loadData();
  }
};
</script>
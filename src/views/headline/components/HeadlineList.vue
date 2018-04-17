<template>
  <div class="headline-list">

    <el-form :inline="true" :model="headlineSearch" class="demo-form-inline" v-if="pageTyp === 'import'">
      <el-form-item>
        <el-button @click="showUploadDialog()" type="primary" icon="el-icon-upload el-icon--right">上传 Excel</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="splitSymbol" placeholder="请输入切割符号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="splitBySymbol">切割</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="headlineSearch" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="headlineSearch.keywords" placeholder="请输入查询关键字"></el-input>
      </el-form-item>
       <el-form-item label="分隔符" v-if="pageTyp === 'split'">
        <el-input v-model="headlineSearch.seperator" placeholder="请输入查询分隔符"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryOriginalHeadlines">查询</el-button>
      </el-form-item>
    </el-form>

    <div v-if="pageTyp === 'split'">
      <el-form :inline="true" :model="headlineSearch" class="demo-form-inline">
        <el-form-item label="段数">
          <el-input v-model="hcount" placeholder="生成文案段数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generateByPks">生成</el-button>
        </el-form-item>
      </el-form>
      <el-alert
        style="margin-top:10px"
        title="请选择要组装的文案"
        type="error"
        v-if = "multipleSelection.length==0">
      </el-alert>
    </div>

    <div class="col-center-block">
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

    <el-table
      :data="headlines"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      @selection-change="handleSelectionChange">
      >
      <el-table-column
        type="selection"
        prop='headlinePk'
        width="55">
      </el-table-column>
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

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="col-center-block">
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

    <!-- 编辑 -->
    <el-dialog
      title="编辑文案"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :append-to-body=true
      :visible="editDialogVisible"
      width="40%"
      :before-close="handleEditDialogClose">

      <el-form v-loading="loadingEditStep" :model="editHeadline" ref="editHeadline" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="文案题目" prop="title">
          <el-input id="editTitle" size="small" v-model="editHeadline.title"></el-input>
        </el-form-item>
        <el-form-item label="文案作者" prop="author">
          <el-input id="editAuthor" size="small" v-model="editHeadline.author"></el-input>
        </el-form-item>
        <el-form-item label="文案描述" prop="description">
          <el-input id="editDesc" type="textarea" v-model="editHeadline.description"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="handleEditDialogClose">取消</el-button>
          <el-button type="primary" @click="submitEditForm">保存</el-button>
        </el-form-item>

      </el-form>
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
.col-center-block {  
    float: none;  
    display: block;  
    margin-left: auto;  
    margin-right: auto;  
} 
</style>


<script>
import {
  getHeadlinesByPage,
  splitHeadlinesAndReturn,
  constructHeadlinesAndReturn,
  batchDelete,
  softItemDelete,
  updateHeadline,
  exportAndDownloadHeadlines
} from "@/views/headline/apis/index";
import {
  HEADLINE_PAGETYP_SPLIT,
  HEADLINE_PAGETYP_CONST,
  HEADLINE_PAGETYP_IMPORT
} from "@/assets/js/common";
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
        flag: HEADLINE_FLAG_INIT,
        headlinePk: undefined,
        name: undefined,
        selectFlag: HEADLINE_SELECT_FLAG_INIT,
        seperator: undefined,
        keywords: ""
      },
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
      splitedFirstPageHeadlines: [],
      pageTyp: HEADLINE_PAGETYP_IMPORT,
      editDialogVisible: false,
      loadingStep: false,
      loadingEditStep: false,
      editHeadline: {},
      isSelectAll: false,
      multipleSelection: [],
      hcount: 3
    };
  },
  methods: {
    loadData() {
      var params = {
        condition: this.headlineSearch,
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
    queryOriginalHeadlines() {
      console.log("queryOriginalHeadlines");
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
    splitBySymbol() {
      var params = {
        sep: this.splitSymbol,
        ps: 10
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
    },
    batchDelete() {
      var headlinePks = [];
      this.multipleSelection.forEach(function(value, index, array) {
        headlinePks.push(value.headlinePk);
      });
      batchDelete({ headlinePks: headlinePks })
        .then(
          function(result) {
            console.log(result);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteItem(val) {
      softItemDelete(val.headlinePk)
        .then(
          function(result) {
            console.log(result);
            this.loadData();
          }.bind(this)
        )
        .catch(function(error) {
          console.error(error);
        });
    },
    editItem(val) {
      this.editHeadline = val;
      this.editDialogVisible = true;
    },
    submitEditForm() {
      updateHeadline(this.editHeadline)
        .then(
          function(result) {
            console.log(result);
            this.editDialogVisible = false;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEditDialogClose() {
      if (this.$refs["editHeadline"]) {
        this.$refs["editHeadline"].clearValidate();
      }
      this.editDialogVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    generateByPks() {
      console.log("generateByPks");
      var headlinePks = [];
      this.multipleSelection.forEach(function(value, index, array) {
        headlinePks.push(value.headlinePk);
      });
      var params = {
        number: this.hcount,
        headlinePks: headlinePks
      };
      constructHeadlinesAndReturn(params)
        .then(
          function(result) {
            this.constructedHeadlines = result.data;
            this.loadData();
          }.bind(this)
        )
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  created() {
    console.log("Hello created");
  },
  mounted() {
    console.log("hello mount");
    this.loadData();
  },
  watch: {
    "$route.params.pagetyp"(newTyp, oldTyp) {
      console.log("PAGE TYPE: " + newTyp);
      this.pageTyp = newTyp;
      this.headlineSearch.deleteFlag = HEADLINE_DELETE_FLAG_FALSE;
      if (newTyp == HEADLINE_PAGETYP_IMPORT) {
        this.headlineSearch.flag = HEADLINE_FLAG_INIT;
        this.loadData();
      }
      if (newTyp == HEADLINE_PAGETYP_SPLIT) {
        this.headlineSearch.flag = HEADLINE_FLAG_SPLITED;
        this.headlineSearch.selectFlag = HEADLINE_SELECT_FLAG_INIT;
        this.loadData();
      }
      if (newTyp == HEADLINE_PAGETYP_CONST) {
        this.headlineSearch.flag = HEADLINE_FLAG_CONSTRUCTED;
        this.loadData();
      }
    }
  }
};
</script>
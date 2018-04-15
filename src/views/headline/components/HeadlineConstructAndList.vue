<template>
  <div class="headline-list">

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="headlineSearch.title" placeholder="文案名称"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="headlineSearch.description" placeholder="文案描述"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="headlineSearch.seperator" placeholder="切割符号"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="queryByTitleAndDescAndSep">查询</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 15px">
      <el-col :span="3">
        <el-checkbox v-model="isSelectAll">导出所有文案</el-checkbox>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="exportAndDownloadHeadlines">导出</el-button>
      </el-col>
    </el-row>

    <el-table
      ref="splitedHeadlines"
      :data="headlines"
      style="width: 100%"
      tooltip-effect="dark"
      :default-sort = "{prop: 'date', order: 'descending'}"
      @selection-change="handleSelectionChange">
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
          <el-input id="editAuthor" size="small" v-model="editHeadline.title"></el-input>
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
</style>


<script>
import {
  getHeadlinesByPage,
  constructHeadlinesAndReturn,
  batchDelete,
  softItemDelete,
  updateHeadline,
  exportAndDownloadHeadlines
} from "@/views/headline/apis/index";
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
        flag: HEADLINE_FLAG_CONSTRUCTED,
        headlinePk: undefined,
        name: undefined,
        selectFlag: HEADLINE_SELECT_FLAG_INIT,
        seperator: undefined,
        title: undefined
      },
      multipleSelection: [],
      hcount: 3,
      constructedHeadlines: [],
      editDialogVisible: false,
      loadingStep: false,
      loadingEditStep: false,
      editHeadline: {},
      isSelectAll: false
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
    queryByTitleAndDescAndSep() {
      console.log("queryByTitleAndDescAndSep");
      this.loadData();
    },
    handleClose(done) {
      this.uploadDialogVisible = false;
      clearInterval(this.uploadInterval);
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.editHeadline = val
      this.editDialogVisible = true
    },
    submitEditForm() {
      updateHeadline(this.editHeadline)
      .then(function(result){
        console.log(result)
        this.editDialogVisible = false
      }.bind(this))
      .catch(function(error){
        console.log(error)
      })
    },
    handleEditDialogClose() {
      if (this.$refs['editHeadline']) {
          this.$refs['editHeadline'].clearValidate()
        }
      this.editDialogVisible = false
    },
    exportAndDownloadHeadlines() {
      var headlinePks=[]
      this.multipleSelection.forEach(function(value){
        headlinePks.push(value.headlinePk)
      })
      var params = {
        headlinePks: headlinePks,
        isAllSelect: this.isSelectAll
      }
      exportAndDownloadHeadlines(params)
      .then(function(result){
        console.log('success')
      }.bind(this))
      .catch(function(error){
        console.log(error)
      })
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
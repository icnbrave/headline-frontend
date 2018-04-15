<template>
  <el-table
    :data="tableData"
    border
    style="width">
    <el-table-column
      v-for="(item, index) in params"
      fixed
      :prop="item.prop"
      :label="item.title"
      :key="index"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="scope">     
        <el-button v-if="editable" @click="handleClickEdit(scope.$index)" type="text" size="small">编辑</el-button>
        <el-button v-if="deletable" @click="handleClickDelete(scope.$index)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      params: undefined,
      tableData: undefined,
      editable: false,
      deletable: true
    },
    data () {
      return {
      }
    },
    methods: {
      handleClickDelete (row) {
        this.$emit('listenToDeleteEvent', this.tableData[row])
        console.log('gridlist 删除' + row + '行')
        this.tableData.splice(row, 1)
      },
      handleClickEdit (row) {
        this.$emit('listenToEditEvent', this.tableData[row])
        console.log('gridlist 编辑' + row + '行')
      },
      handleClickSelect (row) {
        this.$emit('listenToClickEvent', this.tableData[row])
        console.log('gridlist 选择' + row + '行')
      }
    },
    created () {
        // alert('gridlist created!!!!')
    }
  }
</script>

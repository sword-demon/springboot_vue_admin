<script>
export default {
  name: 'Menu',
  created() {
    // 请求分页查询数据
    this.getPageData(this.name);
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      name: '',
      dialogFormVisible: false,
      form: {
        id: 0,
        name: '',
        path: '',
        icon: '',
        description: '',
      },
      // 多选框
      multipleSelection: [],
      disabledDelete: false,
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getPageData(this.name);
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.getPageData(this.name);
    },
    getPageData(username) {
      let pageParam = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
      };
      this.$http.get('/menu/page', {params: pageParam}).then(resp => {
        if (resp.code === '200') {
          this.total = resp.data.total;
          this.tableData = resp.data.records;
        } else {
          this.$message.error(resp.msg);
        }
      }).catch(err => {
        this.$message.error(err);
      });
    },
    search() {
      this.getPageData(this.name);
    },
    reset() {
      this.name = '';
      this.getPageData();
    },
    addUser() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    submit() {
      this.$http.post('/menu', this.form).then(resp => {
        console.log(resp);
        if (this.form.id) {
          this.$message.success('修改成功');
        } else {
          this.$message.success('添加成功');
        }
        this.dialogFormVisible = false;
        this.getPageData();
      });

    },
    handleEdit(row) {
      this.form = {...row};
      this.dialogFormVisible = true;
    },
    handleDelete(id) {
      this.$http.delete('/menu/' + id).then(resp => {
        console.log(resp);
        this.$message.success('删除成功');
        this.getPageData();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length) {
        this.disabledDelete = true;
      } else {
        this.disabledDelete = false;
      }
    },
    handleDeleteBatch() {
      if (this.multipleSelection.length) {
        let ids = this.multipleSelection.map(v => v.id);
        this.$http.post('user/delete/batch', ids).then(resp => {
          console.log(resp);
          this.$message.success('批量删除成功');
          this.getPageData();
        }).catch(err => {
          this.$message.error(err || '系统异常');
        });
      } else {
        this.$message.error('请选择需要删除的数据');
      }
    },
  },
};
</script>

<template>
    <div>
        <div style="margin: 10px 0">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="name" clearable placeholder="请输入菜单名称"
                              prefix-icon="el-icon-search"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
                    <el-button class="ml-5" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary" @click="addUser">新增</el-button>
            <el-popconfirm
                    cancel-button-text='取消'
                    class="ml-5"
                    confirm-button-text='确认'
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定批量删除这些数据吗？"
                    @confirm="handleDeleteBatch"
            >
                <el-button slot="reference" :disabled="!disabledDelete" type="danger">批量删除
                </el-button>
            </el-popconfirm>
        </div>
        <el-table :data="tableData" border stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" prop="id" width="80"></el-table-column>
            <el-table-column label="菜单名称" prop="name"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="图标" prop="icon"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm
                            cancel-button-text='取消'
                            class="ml-5"
                            confirm-button-text='确认'
                            icon="el-icon-info"
                            icon-color="red"
                            title="确定删除吗？"
                            @confirm="handleDelete(scope.row.id)"
                    >
                        <el-button slot="reference" type="danger">
                            删除
                        </el-button>
                    </el-popconfirm>
                    <!--                                <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :page-sizes="[5, 10, 15, 20]"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="dialogFormVisible" title="添加角色信息">
            <el-form :model="form">
                <el-form-item label="名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off" clearable placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="路径" label-width="120px">
                    <el-input v-model="form.path" clearable placeholder="路径"/>
                </el-form-item>
                <el-form-item label="图标" label-width="120px">
                    <el-input v-model="form.icon" clearable placeholder="图标"/>
                </el-form-item>
                <el-form-item label="描述" label-width="120px">
                    <el-input v-model="form.description" clearable placeholder="描述"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped></style>

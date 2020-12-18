<template>
  <div class="teachers">
    <div class="teacher-add-drawer">
      <a-button type="primary" @click="showAddDrawer">
        <span><a-icon type="user-add" /></span>
        <span>添加教师</span>
      </a-button>

      <div class="query-students-input-form">
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input placeholder="教师号" v-model="inputData.tid"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="教师姓名" v-model="inputData.tname">
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="教师性别" v-model="inputData.gender">
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="办公室" v-model="inputData.office"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="职称" v-model="inputData.title"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="学院名" v-model="inputData.aname"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="searchForm">
              <span>查找</span>
              <a-icon type="search" />
            </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="reset">
              <span>重置</span>
              <a-icon type="redo" />
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

      <a-drawer
        title="添加教师"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isAddVisible"
        @close="onClose"
      >
        <a-form-model ref="addForm" :model="addData" :rules="rules">
          <a-form-model-item label="教师号" prop="tid">
            <a-input-number v-model="addData.tid" />
          </a-form-model-item>
          <a-form-model-item label="教师名" prop="tname">
            <a-input v-model="addData.tname" />
          </a-form-model-item>
          <a-form-model-item label="性别" prop="gender">
            <a-input v-model="addData.gender" />
          </a-form-model-item>
          <a-form-model-item label="办公室(可选)" prop="office">
            <a-input v-model="addData.office" />
          </a-form-model-item>
          <a-form-model-item label="职称" prop="title">
            <a-input v-model="addData.title" />
          </a-form-model-item>
          <a-form-model-item label="学院名" prop="aname">
            <a-input v-model="addData.aname" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>

    <div class="teacher-edit-drawer">
      <a-drawer
        title="修改教师"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isEditVisible"
        @close="onClose"
      >
        <a-form-model ref="editForm" :model="editData" :rules="rules">
          <a-form-model-item label="教师号" prop="tid">
            <a-input-number v-model="editData.tid" />
          </a-form-model-item>
          <a-form-model-item label="教师名" prop="tname">
            <a-input v-model="editData.tname" />
          </a-form-model-item>
          <a-form-model-item label="性别" prop="gender">
            <a-input v-model="editData.gender" />
          </a-form-model-item>
          <a-form-model-item label="办公室(可选)" prop="office">
            <a-input v-model="editData.office" />
          </a-form-model-item>
          <a-form-model-item label="职称" prop="title">
            <a-input v-model="editData.title" />
          </a-form-model-item>
          <a-form-model-item label="学院名" prop="aname">
            <a-input v-model="editData.aname" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="editForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>

    <div class="teachers-table">
      <a-table
        bordered
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :customRow="editClick"
      >
        <template slot="delete" slot-scope="text, record">
          <a-popconfirm
            v-if="data.length"
            title="确定要删除吗?"
            @confirm="() => onDelete()"
          >
            <a-button @click="setKey(record.key)"
              ><a-icon type="delete"
            /></a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const data = [];

const columns = [
  {
    title: "教师号",
    dataIndex: "tid",
    width: "10%",
  },
  {
    title: "教师姓名",
    dataIndex: "tname",
    width: "10%",
  },
  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "办公室",
    dataIndex: "office",
  },
  {
    title: "职称",
    dataIndex: "title",
  },
  {
    title: "学院名",
    dataIndex: "aname",
  },
  {
    title: "删除",
    dataIndex: "delete",
    width: "5%",
    scopedSlots: { customRender: "delete" },
  },
];

const pagination = {
  defaultPageSize: 5,
  showTotal: (total) => `共${total}条数据`,
};

const addData = {
  tid: "",
  tname: "",
  gender: "",
  office: "",
  title: "",
  aname: "",
};

const deleteData = {
  key: "",
};

const editData = {
  tid: "",
  tname: "",
  gender: "",
  office: "",
  title: "",
  aname: "",
};

const rules = {
  tid: [{ required: true, message: "请输入教师号", trigger: "blur" }],
  tname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
  title: [{ required: true, message: "请输入职称", trigger: "blur" }],
  aname: [{ required: true, message: "请输入所属学院名", trigger: "blur" }],
};

const inputData = {
  tid: "",
  tname: "",
  gender: "",
  office: "",
  title: "",
  aname: "",
};

export default {
  data() {
    return {
      columns,
      data,
      isAddVisible: false,
      isEditVisible: false,
      rules,
      addData,
      pagination,
      deleteData,
      editData,
      inputData,
    };
  },
  created: function () {
    this.query_teachers_info();
  },
  methods: {
    query_teachers_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/teachers_info",
      })
        .then((response) => {
          console.log(response);
          var teachers = response.data.all_teachers_info;
          for (var teacher in teachers) {
            teachers[teacher].key = teachers[teacher].tid;
          }
          this.data = teachers;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_teacher_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/teacher",
        data: this.addData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete_teacher_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/delete/teacher_info",
        data: this.deleteData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit_teacher_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/update/teacher_info",
        data: this.editData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_teachers_info_by_any: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/teachers_info_by_any",
        data: this.inputData,
      })
        .then((response) => {
          console.log(response);
          this.updateSearchData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log(this.addData);
          addData.key = addData.tid;
          this.add_teacher_info();
          this.isAddVisible = false;
          console.log("check ok, to submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showAddDrawer: function () {
      this.isAddVisible = true;
    },
    onClose: function () {
      this.isAddVisible = false;
      this.isEditVisible = false;
    },
    setKey(key) {
      this.deleteData.key = key;
      console.log(this.deleteData);
    },
    onDelete() {
      this.delete_teacher_info();
      // location.reload();
    },
    editClick(record, index) {
      return {
        on: {
          dblclick: () => {
            this.isEditVisible = true;
            console.log(record, index);
            this.editData.tid = record.tid;
            this.editData.tname = record.tname;
            this.editData.gender = record.gender;
            this.editData.office = record.office;
            this.editData.title = record.title;
            this.editData.aname = record.aname;
          },
        },
      };
    },
    editForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log(this.editData);
          this.edit_teacher_info();
          this.isEditVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    searchForm: function () {
      console.log(this.inputData);
      this.query_teachers_info_by_any();
    },
    updateSearchData: function (responseData) {
      var searchedTeachers = responseData.data.query_teachers_info_by_condition;
      //先把表内数据清空
      this.data = [];
      for (var teacher in searchedTeachers) {
        searchedTeachers[teacher].key = searchedTeachers[teacher].tid;
        this.data.push(searchedTeachers[teacher]);
      }
    },
    reset: function () {
      this.inputData.tid = '';
      this.inputData.tname = '';
      this.inputData.gender = '';
      this.inputData.office = '';
      this.inputData.title = '';
      this.inputData.aname = '';
      this.query_teachers_info();
    }
  },
};
</script>

<style>
</style>
<template>
  <div class="students-management">
    <div class="student-add-drawer">
      <a-button type="primary" @click="showDrawer">
        <span><a-icon type="user-add" /></span>
        <span>添加学生</span>
      </a-button>

      <div class="query-student-input-form">
        <a-form-model layout="inline">
          <div class="input-form">
            <a-form-model-item>
              <a-input placeholder="学生学号" v-model="inputData.sid">
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学生姓名" v-model="inputData.sname">
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学生性别" v-model="inputData.gender">
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学生班级号" v-model="inputData.cid">
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学院名" v-model="inputData.aname">
              </a-input>
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
          </div>
        </a-form-model>
      </div>

      <div id="add-drawer-form">
        <a-drawer
          title="添加学生"
          :width="400"
          placement="right"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
        >
          <a-form-model ref="addForm" :model="formData" :rules="rules">
            <a-form-model-item label="学号" prop="sid">
              <a-input-number v-model="formData.sid" />
            </a-form-model-item>
            <a-form-model-item label="姓名" prop="sname">
              <a-input v-model="formData.sname" />
            </a-form-model-item>
            <a-form-model-item label="性别" prop="gender">
              <a-input v-model="formData.gender" />
            </a-form-model-item>
            <a-form-model-item label="班级号" prop="cid">
              <a-input-number v-model="formData.cid" />
            </a-form-model-item>
            <a-form-model-item label="学院名" prop="aname">
              <a-input v-model="formData.aname" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="submitForm"> 提交 </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-drawer>
      </div>
    </div>

    <div id="update-drawer-form">
      <a-drawer
        title="修改学生"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isUpdate"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <a-form-model ref="checkForm" :model="updateInfo" :rules="rules">
          <a-form-model-item label="学号" prop="sid">
            <a-input-number v-model="updateInfo.sid" />
          </a-form-model-item>
          <a-form-model-item label="姓名" prop="sname">
            <a-input v-model="updateInfo.sname" />
          </a-form-model-item>
          <a-form-model-item label="性别" prop="gender">
            <a-input v-model="updateInfo.gender" />
          </a-form-model-item>
          <a-form-model-item label="班级号" prop="cid">
            <a-input-number v-model="updateInfo.cid" />
          </a-form-model-item>
          <a-form-model-item label="学院名" prop="aname">
            <a-input v-model="updateInfo.aname" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="updateForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>
    <div class="students-table">
      <a-table
        bordered
        :columns="columns"
        :data-source="data"
        :customRow="rowClick"
        :pagination="pagination"
      >
        <template slot="operation" slot-scope="text, record">
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

const deleteData = {
  key: "",
};

const columns = [
  {
    title: "学号",
    dataIndex: "sid",
    width: "10%",
  },
  {
    title: "姓名",
    dataIndex: "sname",
    width: "30%",
  },
  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "班级号",
    dataIndex: "cid",
  },
  {
    title: "学院名",
    dataIndex: "aname",
  },
  {
    title: "删除",
    dataIndex: "operation",
    width: "5%",
    scopedSlots: { customRender: "operation" },
  },
];
const rules = {
  sid: [{ required: true, message: "请输入学号", trigger: "blur" }],
  sname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
  cid: [{ required: true, message: "请输入班级号", trigger: "blur" }],
  aname: [{ required: true, message: "请输入学院名", trigger: "blur" }],
};

const formData = {
  sid: "",
  sname: "",
  gender: "",
  cid: "",
  aname: "",
};

const updateInfo = {
  sid: "",
  sname: "",
  gender: "",
  cid: "",
  aname: "",
};

const pagination = {
  defaultPageSize: 5,
  showTotal: (total) => `共${total}条数据`,
};

const inputData = {
  sid: "",
  sname: "",
  gender: "",
  cid: "",
  aname: "",
};

export default {
  data() {
    return {
      visible: false,
      pagination,
      isUpdate: false,
      data,
      columns,
      rules,
      formData, //表单数据
      updateInfo, //更新数据
      deleteData, //标记学生key，删除时用(key==sid)
      inputData,
    };
  },
  created: function () {
    this.query_students_info();
  },
  watch: {
    //仅仅用来监听数据
    data() {
      // console.log("监听到数据变化！")
    },
  },
  methods: {
    query_students_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/students_info",
      })
        .then((response) => {
          var students = response.data.all_students_info;
          //为每个学生增加一个key用来标识
          for (var stu in students) {
            students[stu].key = students[stu].sid;
          }
          this.data = students;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_student_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/student_info",
        data: this.formData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update_student_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/update/student_info",
        data: this.updateInfo,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete_student: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/delete/student",
        data: this.deleteData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_student_info_by_condition: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/students_info_by_any",
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
    onClose() {
      this.visible = false;
      this.isUpdate = false;
    },
    showDrawer() {
      this.visible = true;
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log(this.formData);
          formData.key = formData.sid;
          this.add_student_info();
          this.visible = false;
          // location.reload();
          console.log("check ok, to submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateForm() {
      this.$refs.checkForm.validate((valid) => {
        if (valid) {
          console.log(this.updateInfo);
          updateInfo.key = updateInfo.sid;
          //调用update方法axios
          this.update_student_info();
          //刷新过快会导致失败...TODO
          this.isUpdate = false;
          console.log("check ok, to submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    rowClick(record, index) {
      return {
        on: {
          dblclick: () => {
            console.log(record, index);
            this.isUpdate = true;
            updateInfo.sid = record.sid;
            updateInfo.sname = record.sname;
            updateInfo.gender = record.gender;
            updateInfo.cid = record.cid;
            updateInfo.aname = record.aname;
          },
        },
      };
    },
    setKey(key) {
      this.deleteData.key = key;
      console.log(this.deleteData.key);
    },
    onDelete() {
      this.delete_student();
    },
    searchForm: function () {
      console.log(this.inputData);
      this.query_student_info_by_condition();
    },
    //更新查询出的数据
    updateSearchData: function (responseData) {
      var searchedStudents = responseData.data.query_students_info_by_condition;
      //先把表内数据清空
      this.data = [];
      for (var student in searchedStudents) {
        searchedStudents[student].key = searchedStudents[student].sid;
        this.data.push(searchedStudents[student]);
        console.log(this.data);
      }
    },
    reset: function () {
      this.inputData.sid = "";
      this.inputData.sname = "";
      this.inputData.gender = "";
      this.inputData.cid = "";
      this.inputData.aname = "";
      this.query_students_info();
    },
  },
};
</script>


<style scoped>
</style>
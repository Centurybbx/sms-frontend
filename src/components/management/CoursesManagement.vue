<template>
  <div class="courses-management">
    <div class="course-add-drawer">
      <a-button type="primary" @click="showAddDrawer">
        <span><a-icon type="file-add" /></span>
        添加课程
      </a-button>

      <div class="query-courses-input-form">
        <a-form-model layout="inline">
          <div class="input-form">
            <a-form-model-item>
              <a-input placeholder="课程号" v-model="inputData.cid"> </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="课程名" v-model="inputData.cname">
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学分" v-model="inputData.credit"> </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学期" v-model="inputData.term"> </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="学时" v-model="inputData.period"> </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="教师号" v-model="inputData.tid"> </a-input>
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

      <a-drawer
        title="添加课程"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isAddVisible"
        @close="onClose"
      >
        <a-form-model ref="addForm" :model="addData" :rules="rules">
          <a-form-model-item label="课程号" prop="cid">
            <a-input-number v-model="addData.cid" />
          </a-form-model-item>
          <a-form-model-item label="课程名" prop="cname">
            <a-input v-model="addData.cname" />
          </a-form-model-item>
          <a-form-model-item label="学分" prop="credit">
            <a-input-number v-model="addData.credit" />
          </a-form-model-item>
          <a-form-model-item label="学期" prop="term">
            <a-input v-model="addData.term" />
          </a-form-model-item>
          <a-form-model-item label="学时(可选)" prop="period">
            <a-input v-model="addData.period" />
          </a-form-model-item>
          <a-form-model-item label="教师号" prop="tid">
            <a-input-number v-model="addData.tid" />
          </a-form-model-item>
          <a-form-model-item label="学院名" prop="aname">
            <a-input v-model="addData.aname" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="addForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>

    <div class="course-edit-drawer">
      <a-drawer
        title="修改课程"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isEditVisible"
        @close="onClose"
      >
        <a-form-model ref="editForm" :model="editData" :rules="rules">
          <a-form-model-item label="课程号" prop="cid">
            <a-input-number v-model="editData.cid" />
          </a-form-model-item>
          <a-form-model-item label="课程名" prop="cname">
            <a-input v-model="editData.cname" />
          </a-form-model-item>
          <a-form-model-item label="学分" prop="credit">
            <a-input-number v-model="editData.credit" />
          </a-form-model-item>
          <a-form-model-item label="学期" prop="term">
            <a-input v-model="editData.term" />
          </a-form-model-item>
          <a-form-model-item label="学时(可选)" prop="period">
            <a-input v-model="editData.period" />
          </a-form-model-item>
          <a-form-model-item label="教师号" prop="tid">
            <a-input-number v-model="editData.tid" />
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

    <div class="courses-table">
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
    title: "课程号",
    dataIndex: "cid",
  },
  {
    title: "课程名",
    dataIndex: "cname",
  },
  {
    title: "学分",
    dataIndex: "credit",
  },
  {
    title: "学期",
    dataIndex: "term",
  },
  {
    title: "学时",
    dataIndex: "period",
  },
  {
    title: "教师号",
    dataIndex: "tid",
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

const rules = {
  cid: [{ required: true, message: "请输入课程号", trigger: "blur" }],
  cname: [{ required: true, message: "请输入课程名", trigger: "blur" }],
  credit: [{ required: true, message: "请输入课程学分", trigger: "blur" }],
  term: [{ required: true, message: "请输入学期", trigger: "blur" }],
  tid: [{ required: true, message: "请输入教师号", trigger: "blur" }],
  aname: [{ required: true, message: "请输入所属学院名", trigger: "blur" }],
};

const addData = {
  cid: "",
  cname: "",
  credit: "",
  term: "",
  period: "",
  tid: "",
  aname: "",
};

const deleteData = {
  key: "",
};

const editData = {
  cid: "",
  cname: "",
  credit: "",
  term: "",
  period: "",
  tid: "",
  aname: "",
};

const inputData = {
  cid: "",
  cname: "",
  credit: "",
  term: "",
  period: "",
  tid: "",
  aname: "",
};

export default {
  data() {
    return {
      columns,
      data,
      pagination,
      rules,
      isAddVisible: false,
      isEditVisible: false,
      addData,
      deleteData,
      editData,
      inputData,
    };
  },
  created() {
    this.query_courses_info();
  },
  watch: {
    //改变数据会变化
  },
  methods: {
    query_courses_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/courses_info",
      })
        .then((response) => {
          console.log(response);
          var courses = response.data.all_courses_info;
          for (var course in courses) {
            courses[course].key = courses[course].cid;
          }
          this.data = courses;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_course_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/course_info",
        data: addData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete_course_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/delete/course_info",
        data: deleteData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit_course_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/update/course_info",
        data: editData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_courses_info_by_any: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/courses_info_by_any",
        data: inputData,
      })
        .then((response) => {
          console.log(response);
          this.updateSearchData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAddDrawer: function () {
      this.isAddVisible = true;
    },
    onClose: function () {
      this.isAddVisible = false;
      this.isEditVisible = false;
    },
    addForm: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log(this.addData);
          addData.key = addData.cid;
          this.add_course_info();
          this.isAddVisible = false;
          console.log("check ok, to submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setKey: function (key) {
      this.deleteData.key = key;
      console.log(this.deleteData);
    },
    onDelete: function () {
      this.delete_course_info();
    },
    editClick(record, index) {
      return {
        on: {
          dblclick: () => {
            this.isEditVisible = true;
            console.log(record, index);
            this.editData.cid = record.cid;
            this.editData.cname = record.cname;
            this.editData.credit = record.credit;
            this.editData.term = record.term;
            this.editData.period = record.period;
            this.editData.tid = record.tid;
            this.editData.aname = record.aname;
          },
        },
      };
    },
    editForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log(this.editData);
          this.edit_course_info();
          this.isEditVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    searchForm: function () {
      console.log(this.inputData);
      this.query_courses_info_by_any();
    },
    updateSearchData: function (searchData) {
      var courses = searchData.data.query_courses_info_by_condition;
      this.data = [];
      for (var course in courses) {
        courses[course].key = courses[course].cid;
        this.data.push(courses[course]);
      }
    },
    reset: function () {
      this.inputData.cid = "";
      this.inputData.cname = "";
      this.inputData.credit = "";
      this.inputData.term = "";
      this.inputData.period = "";
      this.inputData.tid = "";
      this.inputData.aname = "";
      this.query_courses_info();
    },
  },
};
</script>

<style>
</style>
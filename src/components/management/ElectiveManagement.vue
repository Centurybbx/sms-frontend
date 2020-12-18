<template>
  <div class="elective-management">
    <div class="elective-add-drawer">
      <a-button type="primary" @click="showAddDrawer">
        <span><a-icon type="file-add" /></span>
        添加选课
      </a-button>

      <div class="query-elective-input-form">
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input placeholder="选课号" v-model="inputData.eid"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="学号" v-model="inputData.sid"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="课程号" v-model="inputData.cid"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="成绩" v-model="inputData.grade"> </a-input>
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
        title="添加选课"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isAddVisible"
        @close="onClose"
      >
        <a-form-model ref="addForm" :model="addData" :rules="rules">
          <a-form-model-item label="选课号" prop="eid">
            <a-input-number v-model="addData.eid" />
          </a-form-model-item>
          <a-form-model-item label="学号" prop="sid">
            <a-input v-model="addData.sid" />
          </a-form-model-item>
          <a-form-model-item label="课程号" prop="cid">
            <a-input v-model="addData.cid" />
          </a-form-model-item>
          <a-form-model-item label="成绩" prop="grade">
            <a-input v-model="addData.grade" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="addForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>

    <div class="elective-edit-drawer">
      <a-drawer
        title="修改选课"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isEditVisible"
        @close="onClose"
      >
        <a-form-model ref="editForm" :model="editData" :rules="rules">
          <a-form-model-item label="选课号" prop="eid">
            <a-input-number v-model="editData.eid" />
          </a-form-model-item>
          <a-form-model-item label="学号" prop="sid">
            <a-input v-model="editData.sid" />
          </a-form-model-item>
          <a-form-model-item label="课程号" prop="cid">
            <a-input v-model="editData.cid" />
          </a-form-model-item>
          <a-form-model-item label="成绩" prop="grade">
            <a-input v-model="editData.grade" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="editForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>

    <div class="elective-table">
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
    title: "选课号",
    dataIndex: "eid",
  },
  {
    title: "学号",
    dataIndex: "sid",
  },
  {
    title: "课程号",
    dataIndex: "cid",
  },
  {
    title: "成绩",
    dataIndex: "grade",
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
  eid: [{ required: true, message: "请输入选课号", trigger: "blur" }],
  sid: [{ required: true, message: "请输入学号", trigger: "blur" }],
  cid: [{ required: true, message: "请输入课程号", trigger: "blur" }],
  grade: [{ required: true, message: "请输入成绩", trigger: "blur" }],
};

const addData = {
  eid: "",
  sid: "",
  cid: "",
  grade: "",
};

const deleteData = {
  key: "",
};

const editData = {
  eid: "",
  sid: "",
  cid: "",
  grade: "",
};

const inputData = {
  eid: "",
  sid: "",
  cid: "",
  grade: "",
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
      this.query_elective_info();
  },
  watch: {
    //改变数据会变化
  },
  methods: {
    query_elective_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/elective_table_info",
      })
        .then((response) => {
          console.log(response);
          var elective_info = response.data.elective_table_info;
          for (var elective in elective_info) {
            elective_info[elective].key = elective_info[elective].eid;
          }
          this.data = elective_info;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_elective_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/elective_info",
        data: addData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete_elective_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/delete/elective_info",
        data: deleteData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit_elective_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/update/elective_info",
        data: editData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_elective_info_by_any: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/elective_info_by_any",
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
          addData.key = addData.aid;
          this.add_elective_info();
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
      this.delete_elective_info();
    },
    editClick(record, index) {
      return {
        on: {
          dblclick: () => {
            this.isEditVisible = true;
            console.log(record, index);
            this.editData.eid = record.eid;
            this.editData.sid = record.sid;
            this.editData.cid = record.cid;
            this.editData.grade = record.grade;
          },
        },
      };
    },
    editForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log(this.editData);
          this.edit_elective_info();
          this.isEditVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    searchForm: function () {
      console.log(this.inputData);
      this.query_elective_info_by_any();
    },
    updateSearchData: function (searchData) {
      var elective_info = searchData.data.query_elective_info_by_any;
      this.data = [];
      for (var elective in elective_info) {
        elective_info[elective].key = elective_info[elective].eid;
        this.data.push(elective_info[elective]);
      }
    },
    reset: function () {
      this.inputData.eid = "";
      this.inputData.sid = "";
      this.inputData.cid = "";
      this.inputData.grade = "";
      this.query_elective_info();
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="major-management">
    <div class="major-add-drawer">
      <a-button type="primary" @click="showAddDrawer">
        <span><a-icon type="file-add" /></span>
        添加专业
      </a-button>

      <div class="query-major-input-form">
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input placeholder="专业号" v-model="inputData.mid"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="专业名" v-model="inputData.mname"> </a-input>
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
        title="添加专业"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isAddVisible"
        @close="onClose"
      >
        <a-form-model ref="addForm" :model="addData" :rules="rules">
          <a-form-model-item label="专业号" prop="mid">
            <a-input-number v-model="addData.mid" />
          </a-form-model-item>
          <a-form-model-item label="专业名" prop="mname">
            <a-input v-model="addData.mname" />
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
        title="修改专业"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isEditVisible"
        @close="onClose"
      >
        <a-form-model ref="editForm" :model="editData" :rules="rules">
          <a-form-model-item label="专业号" prop="mid">
            <a-input-number v-model="editData.mid" />
          </a-form-model-item>
          <a-form-model-item label="专业名" prop="mname">
            <a-input v-model="editData.mname" />
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
    title: "专业号",
    dataIndex: "mid",
  },
  {
    title: "专业名",
    dataIndex: "mname",
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
  mid: [{ required: true, message: "请输入专业号", trigger: "blur" }],
  mname: [{ required: true, message: "请输入专业名", trigger: "blur" }],
  aname: [{ required: true, message: "请输入学院名", trigger: "blur" }],
};

const addData = {
  mid: "",
  mname: "",
  aname: "",
};

const deleteData = {
  key: "",
};

const editData = {
  mid: "",
  mname: "",
  aname: "",
};

const inputData = {
  mid: "",
  mname: "",
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
    this.query_majors_info();
  },
  watch: {
    //改变数据会变化
  },
  methods: {
    query_majors_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/all_majors_info",
      })
        .then((response) => {
          console.log(response);
          var majors = response.data.query_all_majors_info;
          for (var major in majors) {
            majors[major].key = majors[major].mid;
          }
          this.data = majors;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_major_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/major_info",
        data: addData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete_major_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/delete/major_info",
        data: deleteData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit_major_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/update/major_info",
        data: editData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_majors_info_by_any: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/majors_info_by_any",
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
          this.add_major_info();
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
      this.delete_major_info();
    },
    editClick(record, index) {
      return {
        on: {
          dblclick: () => {
            this.isEditVisible = true;
            console.log(record, index);
            this.editData.mid = record.mid;
            this.editData.mname = record.mname;
            this.editData.aname = record.aname;
          },
        },
      };
    },
    editForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log(this.editData);
          this.edit_major_info();
          this.isEditVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    searchForm: function () {
      console.log(this.inputData);
      this.query_majors_info_by_any();
    },
    updateSearchData: function (searchData) {
      var majors = searchData.data.query_majors_info_by_any;
      this.data = [];
      for (var major in majors) {
        majors[major].key = majors[major].mid;
        this.data.push(majors[major]);
      }
    },
    reset: function () {
      this.inputData.mid = "";
      this.inputData.mname = "";
      this.inputData.aname = "";
      this.query_majors_info();
    },
  },
};
</script>

<style>
</style>
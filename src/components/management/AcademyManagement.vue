<template>
  <div class="academy-management">
    <div class="academy-add-drawer">
      <a-button type="primary" @click="showAddDrawer">
        <span><a-icon type="file-add" /></span>
        添加学院
      </a-button>

      <div class="query-classes-input-form">
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input placeholder="学院号" v-model="inputData.aid"> </a-input>
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
        title="添加学院"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isAddVisible"
        @close="onClose"
      >
        <a-form-model ref="addForm" :model="addData" :rules="rules">
          <a-form-model-item label="学院号" prop="aid">
            <a-input-number v-model="addData.aid" />
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
        title="修改学院"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isEditVisible"
        @close="onClose"
      >
        <a-form-model ref="editForm" :model="editData" :rules="rules">
          <a-form-model-item label="学院号" prop="aid">
            <a-input-number v-model="editData.aid" />
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
    title: "学院号",
    dataIndex: "aid",
  },
  {
    title: "学院名",
    dataIndex: "aname",
  },
  {
    title: "总人数",
    dataIndex: "number",
    width: "10%"
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
  aid: [{ required: true, message: "请输入学院号", trigger: "blur" }],
  aname: [{ required: true, message: "请输入学院名", trigger: "blur" }],
};

const addData = {
  aid: "",
  aname: "",
};

const deleteData = {
  key: "",
};

const editData = {
  aid: "",
  aname: "",
};

const inputData = {
  aid: "",
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
    this.query_academies_info();
  },
  watch: {
    //改变数据会变化
  },
  methods: {
    query_academies_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/all_academies_info",
      })
        .then((response) => {
          console.log(response);
          var academies = response.data.query_all_academies_info;
          for (var academy in academies) {
            academies[academy].key = academies[academy].aid;
          }
          this.data = academies;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_academy_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/academy_info",
        data: addData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delete_academy_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/delete/academy_info",
        data: deleteData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit_academy_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/update/academy_info",
        data: editData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_academies_info_by_any: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/academies_info_by_any",
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
          this.add_academy_info();
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
      this.delete_academy_info();
    },
    editClick(record, index) {
      return {
        on: {
          dblclick: () => {
            this.isEditVisible = true;
            console.log(record, index);
            this.editData.aid = record.aid;
            this.editData.aname = record.aname;
          },
        },
      };
    },
    editForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log(this.editData);
          this.edit_academy_info();
          this.isEditVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    searchForm: function () {
      console.log(this.inputData);
      this.query_academies_info_by_any();
    },
    updateSearchData: function (searchData) {
      var academies = searchData.data.query_academies_info_by_any;
      this.data = [];
      for (var academy in academies) {
        academies[academy].key = academies[academy].aid;
        this.data.push(academies[academy]);
      }
    },
    reset: function () {
      this.inputData.aid = '';
      this.inputData.aname = '';
      this.query_academies_info();
    }
  },
};
</script>

<style>
</style>
<template>
  <div class="classes-management">
    <div class="classes-add-drawer">
      <a-button type="primary" @click="showAddDrawer">
        <span><a-icon type="file-add" /></span>
        添加班级
      </a-button>

      <div class="query-classes-input-form">
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input placeholder="班级号" v-model="inputData.cid"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="班级名" v-model="inputData.cname"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="专业号" v-model="inputData.mid"> </a-input>
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
        title="添加班级"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isAddVisible"
        @close="onClose"
      >
        <a-form-model ref="addForm" :model="addData" :rules="rules">
          <a-form-model-item label="班级号" prop="cid">
            <a-input-number v-model="addData.cid" />
          </a-form-model-item>
          <a-form-model-item label="班级名" prop="cname">
            <a-input v-model="addData.cname" />
          </a-form-model-item>
          <a-form-model-item label="专业号" prop="mid">
            <a-input-number v-model="addData.mid" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="addForm"> 提交 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>

    <div class="course-edit-drawer">
      <a-drawer
        title="修改班级"
        :width="400"
        placement="right"
        :closable="false"
        :visible="isEditVisible"
        @close="onClose"
      >
        <a-form-model ref="editForm" :model="editData" :rules="rules">
          <a-form-model-item label="班级号" prop="cid">
            <a-input-number v-model="editData.cid" />
          </a-form-model-item>
          <a-form-model-item label="班级名" prop="cname">
            <a-input v-model="editData.cname" />
          </a-form-model-item>
          <a-form-model-item label="专业号" prop="mid">
            <a-input-number v-model="editData.mid" />
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
    title: "班级号",
    dataIndex: "cid",
  },
  {
    title: "班级名",
    dataIndex: "cname",
  },
  {
    title: "专业号",
    dataIndex: "mid",
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
  cid: [{ required: true, message: "请输入班级号", trigger: "blur" }],
  cname: [{ required: true, message: "请输入班级名", trigger: "blur" }],
  mid: [{ required: true, message: "请输入专业号", trigger: "blur" }],
};

const addData = {
  cid: "",
  cname: "",
  mid: "",
};

const deleteData = {
  key: "",
};

const editData = {
  cid: "",
  cname: "",
  mid: "",
};

const inputData = {
  cid: "",
  cname: "",
  mid: "",
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
        url: "http://127.0.0.1:5000/query/all_classes_info",
      })
        .then((response) => {
          console.log(response);
          var classes = response.data.query_all_classes_info;
          for (var clazz in classes) {
            classes[clazz].key = classes[clazz].cid;
          }
          this.data = classes;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_course_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/add/class_info",
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
        url: "http://127.0.0.1:5000/delete/class_info",
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
        url: "http://127.0.0.1:5000/update/class_info",
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
        url: "http://127.0.0.1:5000/query/classes_info_by_any",
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
            this.editData.mid = record.mid;
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
      var classes = searchData.data.query_classes_info_by_any;
      this.data = [];
      for (var clazz in classes) {
        classes[clazz].key = classes[clazz].cid;
        this.data.push(classes[clazz]);
      }
    },
    reset: function () {
      this.inputData.cid = '';
      this.inputData.cname = '';
      this.inputData.mid = '';
      this.query_courses_info();
    }
  },
};
</script>

<style>
</style>
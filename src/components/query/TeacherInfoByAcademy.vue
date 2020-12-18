<template>
  <div class="teachers-info-by-academy">
    <div class="query-input-form">
      <a-form-model layout="inline">
        <a-form-model-item label="学院名">
          <a-input v-model="inputData.aname" placeholder="请输入要查询的学院名">
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="职称">
          <a-input
            v-model="inputData.title"
            placeholder="请输入要查询的教师职称"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="submit">
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

    <div class="teachers-info-table">
      <a-table
        bordered
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
      >
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
  },
  {
    title: "教师名",
    dataIndex: "tname",
  },
  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "职称",
    dataIndex: "title",
  },
  {
    title: "学院名",
    dataIndex: "aname",
  },
];

const pagination = {
  defaultPageSize: 5,
  showTotal: (total) => `共${total}条数据`,
};

const inputData = {
  aname: "",
  title: "",
};

export default {
  data() {
    return {
      data,
      columns,
      pagination,
      //   options,
      inputData,
    };
  },
  created() {
    this.query_all_teachers_info();
  },
  watch: {
    data() {
      //观察变化
    },
  },
  methods: {
    query_all_teachers_info: function () {
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
    query_teachers_info_by_title_and_aname: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/teachers_info_by_title_and_aname",
        data: this.inputData,
      })
        .then((response) => {
          console.log(response);
          //查询后更新table数据
          this.updateSearchData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit: function () {
      this.query_teachers_info_by_title_and_aname();
    },
    updateSearchData: function (responseData) {
      var teachers = responseData.data.query_teachers_info_by_title_and_aname;
      this.data = [];
      for (var teacher in teachers) {
        teachers[teacher].key = teachers[teacher].tid;
        this.data.push(teachers[teacher]);
      }
    },
    reset: function () {
      this.inputData.aname = "";
      this.inputData.title = "";
      this.query_all_teachers_info();
    },
  },
};
</script>

<style scoped>
</style>
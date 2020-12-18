<template>
  <div class="course-info-by-academy">
    <div class="query-input-form">
      <a-form-model layout="inline">
        <a-form-model-item label="学院名">
          <a-input v-model="inputData.aname" placeholder="请输入要查询的学院名">
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

    <div class="course-info-table">
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
    title: "学时",
    dataIndex: "period",
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
};

export default {
  data() {
    return {
      data,
      columns,
      pagination,
      inputData,
    };
  },
  created() {
    this.query_all_courses_info();
  },
  watch: {
    data() {
      //监听
    },
  },
  methods: {
    query_courses_info_by_academy: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/courses_info_by_academy",
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
    query_all_courses_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/courses_info",
      }).then((response) => {
        console.log(response);
        var courses = response.data.all_courses_info;
        for (var course in courses) {
          courses[course].key = courses[course].cid;
        }
        this.data = courses;
      });
    },
    submit: function () {
      console.log(this.inputData);
      this.query_courses_info_by_academy();
    },
    updateSearchData: function (searchData) {
      var courses = searchData.data.query_courses_info_by_aname;
      this.data = [];
      for (var course in courses) {
        courses[course].key = courses[course].cid;
        this.data.push(courses[course]);
      }
      console.log(this.data);
    },
    reset: function () {
      this.inputData.aname = "";
      this.query_all_courses_info();
    },
  },
};
</script>

<style>
</style>
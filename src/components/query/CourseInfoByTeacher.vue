<template>
  <div class="course-info-by-teacher">
    <div class="input-form">
      <a-form-model layout="inline">
        <a-form-model-item label="教师号">
          <a-input v-model="inputData.tid" placeholder="请输入要查询的教师号">
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="submit">
            <span>提交</span>
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
    title: "教师号",
    dataIndex: "tid",
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
];

const pagination = {
  defaultPageSize: 5,
  showTotal: (total) => `共${total}条数据`,
};

const inputData = {
  tid: "",
};

export default {
  data() {
    return {
      inputData,
      data,
      columns,
      pagination,
    };
  },
  created() {
    this.quert_all_courses_info();
  },
  methods: {
    quert_all_courses_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/courses_info",
      })
        .then((response) => {
          var courses = response.data.all_courses_info;
          for (var course in courses) {
            courses[course].key = courses[course].cid;
          }
          this.data = courses;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_course_info_by_tid: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/course_info_by_tid",
        data: inputData,
      })
        .then((response) => {
          console.log(response);
          var allInfo = response.data.query_course_info_by_tid;
          for (var info in allInfo) {
            allInfo[info].key = allInfo[info].cid;
          }
          this.data = allInfo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit: function () {
      this.query_course_info_by_tid();
    },
    reset: function () {
      this.inputData.tid = "";
      this.quert_all_courses_info();
    },
  },
};
</script>

<style scoped>
</style>
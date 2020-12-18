<template>
  <div class="course-info-by-stu">
    <div class="input-form">
      <a-form-model layout="inline">
        <a-form-model-item label="学号">
          <a-input
            v-model="SidAndTerm.sid"
            placeholder="请输入要查询的学生学号"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="学期">
          <a-input v-model="SidAndTerm.term" placeholder="请输入要查询的学期">
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="submit"> 提交 </a-button>
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
    title: "成绩号",
    dataIndex: "eid",
  },
  {
    title: "学号",
    dataIndex: "sid",
  },
  {
    title: "姓名",
    dataIndex: "sname",
  },
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
    title: "成绩",
    dataIndex: "grade",
  },
];

const pagination = {
  defaultPageSize: 5,
  showTotal: (total) => `共${total}条数据`,
};

const SidAndTerm = {
  sid: "",
  term: "",
};

export default {
  data() {
    return {
      data,
      columns,
      pagination,
      SidAndTerm,
    };
  },
  created() {
    this.query_all_elective_courses_info();
  },
  methods: {
    query_all_elective_courses_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/stu_elective_courses_info",
      })
        .then((response) => {
          console.log(response);
          var courses = response.data.query_elective_courses_info;
          for (var course in courses) {
            courses[course].key = courses[course].eid;
          }
          this.data = courses;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_course_info_by_sid_and_term: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/courses_info_by_term_and_sid",
        data: SidAndTerm,
      })
        .then((response) => {
          console.log(response);
          var allInfo = response.data.query_courses_info_by_term_and_sid;
          for (var info in allInfo) {
            //TODO:加key
            allInfo[info].key = allInfo[info].eid;
          }
          this.data = allInfo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit: function () {
      console.log(this.SidAndTerm);
      this.query_course_info_by_sid_and_term();
    },
    reset: function () {
      this.SidAndTerm.sid = "";
      this.SidAndTerm.term = "";
      this.query_all_elective_courses_info();
    },
  },
};
</script>

<style scoped>
</style>
<template>
  <div class="elective-info-by-term-and-class">
    <div class="input-form">
      <a-form-model layout="inline">
        <a-form-model-item label="班级号">
          <a-input v-model="CidAndTerm.cid" placeholder="请输入要查询的班级号">
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="学期">
          <a-input v-model="CidAndTerm.term" placeholder="请输入要查询的学期">
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

    <div class="elective-info-table">
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
    title: "学号",
    dataIndex: "sid",
  },
  {
    title: "姓名",
    dataIndex: "sname",
  },
  {
    title: "平均成绩",
    dataIndex: "average_grade",
  },
];

const pagination = {
  defaultPageSize: 5,
  showTotal: (total) => `共${total}条数据`,
};

const CidAndTerm = {
  cid: "",
  term: "",
};

export default {
  data() {
    return {
      data,
      columns,
      pagination,
      CidAndTerm,
    };
  },
  created() {
    this.query_all_elective_info();
  },
  methods: {
    query_all_elective_info: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/all_elective_info",
      })
        .then((response) => {
          console.log(response);
          var allInfo = response.data.query_all_elective_info;
          for (var info in allInfo) {
            allInfo[info].key = allInfo[info].sid;
          }
          this.data = allInfo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    query_elective_info_by_cid_and_term: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/query/students_grades_by_class_and_term",
        data: CidAndTerm,
      })
        .then((response) => {
          console.log(response);
          var allInfo = response.data.query_elective_info_by_cid_and_term;
          for (var info in allInfo) {
            //TODO:加key
            allInfo[info].key = allInfo[info].sid;
          }
          this.data = allInfo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit: function () {
      console.log(this.SidAndTerm);
      this.query_elective_info_by_cid_and_term();
    },
    reset: function () {
      this.CidAndTerm.cid = "";
      this.CidAndTerm.term = "";
      this.query_all_elective_info();
    },
  },
};
</script>

<style scoped>
</style>
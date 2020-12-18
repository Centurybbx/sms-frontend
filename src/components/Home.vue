<template>
  <div class="home-page">
    <a-card>
      <div class="description">
        <h2>欢迎进入</h2>
        <h2>教务管理系统</h2>
        <a-icon type="smile" id="smileIcon" />
      </div>
      <div id="space"></div>
      <div class="collapse">
        <a-collapse accordion>
          <a-collapse-panel key="1" header="管理页使用说明">
            <p>{{ text.manageDescription }}</p>
          </a-collapse-panel>
          <a-collapse-panel
            key="2"
            header="查询页使用说明"
            :disabled="false"
          >
            <p>{{ text.queryDescription }}</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-card>
  </div>
</template>

<script>
const text = {
  manageDescription: '在管理页中可以双击数据进行修改，添加/删除按钮分别可以添加/删除数据，也可以根据输入的任意属性组合进行查询。',
  queryDescription: '在查询页中仅可以输入指定数据进而实现查询操作。'
}
export default {
  data() {
    return {
      text,
    }
  }
};
</script>

<style scoped>
.home-page .description {
  text-align: center;
}
.home-page #smileIcon {
  width: 100px;
  height: 100px;
  font-size: 100px;
}
.home-page #space {
  height: 80px;
}
</style>
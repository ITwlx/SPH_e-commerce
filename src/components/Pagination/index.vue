<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('pagiInfo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startNumAndendNum.start > 1"
      @click="$emit('pagiInfo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNumAndendNum.start > 2">···</button>
    <button
      v-for="(page, index) in startNumAndendNum.end"
      :key="index"
      v-if="page > startNumAndendNum.start - 1"
      @click="$emit('pagiInfo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <button v-show="startNumAndendNum.end < totalPage - 1">···</button>
    <button
      v-show="startNumAndendNum.end < totalPage"
      @click="$emit('pagiInfo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('pagiInfo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "total", "continues", "pageSize"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndendNum() {
      let start = 0,
        end = 0;
      let { totalPage, pageNo, continues, total } = this;
      let halfLength = parseInt(this.continues / 2);
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - halfLength;
        end = pageNo + halfLength;
        if (pageNo - halfLength < 1) {
          start = 1;
          end = continues;
        }
        if (pageNo + halfLength > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .cative{
    background-color: skyblue;
  }
}
</style>

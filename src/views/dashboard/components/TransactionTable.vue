<template>
  <div>
  <!-- <h3>最新文章</h3> -->
  <el-table :data="list" style="width: 100%;">
    <el-table-column label="文章标题" min-width="185">
      <template slot-scope="scope">
        {{ scope.row.title  }}
      </template>
    </el-table-column>
    <el-table-column label="文章分类" min-width="105" align="center">
      <template slot-scope="scope">
        {{ scope.row.type == 1 ? '知识': '政策' }}
      </template>
    </el-table-column>
    <!-- <el-table-column label="访问量" min-width="80" align="center">
      <template slot-scope="{row}">
          {{ row.hits }}
      </template>
    </el-table-column> -->
    <el-table-column label="发布时间" min-width="90" align="center">
      <template slot-scope="{row}">
          <span v-if="row.createTime != null"> {{ formatDate(row.created) }}</span>
          <span v-else> {{ formatDate(row.updated) }}</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { formatDate } from "@/utils/date.js";
import { getArticleList } from '@/apis/article'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatDate(time) {
      return formatDate(time);
    },
    async fetchData() {
      const res = await getArticleList(8,1);
      this.list = res.records;
    }
  }
}
</script>

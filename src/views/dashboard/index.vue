<template>
  <div class="dashboard-container">
    <panel-group style="margin-top: 10px" />
    <el-row style="width: 100%;">
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 12 }">
        <div class="rubbish-counts" style="
        margin-right: 20px;
        padding: 20px;
        height: 70vh;
        background-color: #e5f2fd;
      ">
          <div class="title">垃圾分类收录数据</div>
          <el-row style="display: flex; ">
            <el-col :md="{ span: 12 }" :lg="{ span: 14 }" class="counts_chart">
              <div class="pie" ref="pieCharts" style="width: 100%;height: 100%;"></div>
            </el-col>
            <el-col :md="{ span: 12 }" :lg="{ span: 10 }" class="counts_data" style="
              background-color: #f7f9fb;
              backdrop-filter: blur(10px);
              border-radius: 20px;
              height: 100%;
              ">
              <div class="counts_data_item">
                1299
                <div class="item_text">可回收垃圾</div>
              </div>
              <div class="counts_data_item">
                1032
                <div class="item_text">厨余垃圾</div>
              </div>
              <div class="counts_data_item">
                1424
                <div class="item_text">其他垃圾</div>
              </div>
              <div class="counts_data_item">
                234
                <div class="item_text">有害垃圾</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="height: 70vh; ">
        <el-row style="height: 50%; margin-left: 20px;">
          <div class="user-behavior" style="height: 100%; background-color: #f4fdfd;padding: 20px;">
            <div class="title">用户行为数据</div>
            <div style="display: flex;height: 100%;">
              <div class="bar" ref="barCharts" style="width: 50%;height: 100%;"></div>
              <div class="line" ref="lineCharts" style="width: 50%;height: 100%;"></div>
            </div>
          </div>
        </el-row>
        <el-row style="height: 50%;margin-top: 20px;background-color: #ecffed;box-sizing: border-box;">
          <div class="article-show" style="height: 100%;padding: 20px;">
            <div class="title">近期文章</div>
            <TransactionTable></TransactionTable>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TransactionTable from './components/TransactionTable'
import PanelGroup from './components/PanelGroup'

export default {
  create: {

  },
  methods: {
    initPieChart() {
      var myChart = this.$echarts.init(this.$refs.pieCharts);
      // 2. 指定配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 注意颜色写的位置
        color: [
          "#f4516c",
          "#0096ff",
          "#9fe6b8",
          "#32c5e9",
          "#1d9dff"
        ],
        series: [
          {
            name: "垃圾类别占比统计",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["30%", "60%"],
            center: ["50%", "50%"],
            roseType: "radius",
            data: [
              { value: 1299, name: "可回收垃圾" },
              { value: 1032, name: "厨余垃圾" },
              { value: 1424, name: "其他垃圾" },
              { value: 234, name: "有害垃圾" },
            ],
            label: {
              fontSize: 10
            },
            labelLine: {
              length: 4,
              length2: 6
            }
          }
        ]
      };
      myChart.setOption(option);
      // window.addEventListener('resize',()=>{
      //   myChart.resize();
      // })
    },
    initBarChart() {
      var mycharts = this.$echarts.init(this.$refs.barCharts)
      var data = [70, 34, 60];
      var titlename = ["参与率", "搜索率", "掌握率"];
      var valdata = [1,1,1]; // 纵轴
      var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
      var options = {
        //图标位置
        grid: {
          top: "10%",
          left: "22%",
          bottom: "10%"
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#333",
              fontSize: 14,
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#00000072",
                  borderRadius: 15,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            },
          },
          {
            show: false,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#666"
              }
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: data,
            barCategoryGap: 20,
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }

          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barCategoryGap: 20,
            data: [100, 100, 100, 100, 100],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 3,
                barBorderRadius: 15
              }
            }
          }
        ]
      };
      mycharts.setOption(options);
    },
    initLineChart() {
      var mycharts = this.$echarts.init(this.$refs.lineCharts)
      const options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b"
            }
          }
        },
        legend: {
          top: "0%",
          textStyle: {
            color: "#00000072",
            fontSize: "12"
          }
        },
        grid: {
          left: "10",
          top: "30",
          right: "10",
          bottom: "10",
          containLabel: true
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#00000072",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: "#00000072"
              }
            },
            data: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30"
            ]
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20
          }
        ],
// y轴线颜色
        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "#d7dbe3"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#d7dbe3",
                fontSize: 12
              }
            },
            splitLine: {
              lineStyle: {
                color: "#d7dbe3"
              }
            }
          }
        ],
        series: [
          {
            name: "播放量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12
              }
            },
            data: [
              30,
              40,
              30,
              40,
              30,
              40,
              30,
              60,
              20,
              40,
              20,
              40,
              30,
              40,
              30,
              40,
              30,
              40,
              30,
              60,
              20,
              40,
              20,
              40,
              30,
              60,
              20,
              40,
              20,
              40
            ]
          },
          {
            name: "转发量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12
              }
            },
            data: [
              50,
              30,
              50,
              60,
              10,
              50,
              30,
              50,
              60,
              40,
              60,
              40,
              80,
              30,
              50,
              60,
              10,
              50,
              30,
              70,
              20,
              50,
              10,
              40,
              50,
              30,
              70,
              20,
              50,
              10,
              40
            ]
          }
        ]
      };
      mycharts.setOption(options)
    }
  },
  name: 'Dashboard',
  components: {
    PanelGroup,
    TransactionTable,
    TransactionTable
},
  data() {
    return {
      res: ""
    }
  },
  computed: {

  },
  mounted() {
    this.initPieChart();
    this.initBarChart();
    this.initLineChart();
  }

}
</script>

<style lang="scss" scoped>
.github-corner {
  position: absolute;
  top: 0px;
  border: 0;
  right: 0;
}

.dashboard {
  &-container {
    width: 100%;
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.title {
  font-size: 22px;
  font-weight: 500;
  color: #545767;
}

.counts_data_item {
  width: 100%;
  padding: 4% 0;
  text-align: center;
  font-size: 32px;
  color: #666;
}

.item_text {
  font-size: 16px;
  color: #00000073;
}

.box {
  position: relative;
  width: 220px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  z-index: 1;
}

.box::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  text-decoration: none;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}

.box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
  filter: blur(30px);
}

.box:hover:before,
.box:hover:after {
  transform: skewX(0deg) scaleX(1.3);
}

.box:before,
.box:after {
  background: linear-gradient(315deg, #ffbc00, #ff0058)
}

.box span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.box span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.1s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08)
}

.box span::before {
  top: -40px;
  left: 40px;
  width: 50px;
  height: 50px;
  opacity: 1;
}

.box span::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.5s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation-delay: -1s;
}

.box span:after {
  bottom: -40px;
  right: 40px;
  width: 50px;
  height: 50px;
  opacity: 1;
}

.box .content {
  position: relative;
  width: 190px;
  height: 254px;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transform: 0.5s;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box .content h2 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
}

.dashboard-container {
  width: 100%;
  padding: 30px;
  margin: 0px;
}
</style>

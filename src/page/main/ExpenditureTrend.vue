<template>
  <el-card>
    <div class="expenditure-trend">
        <div id="echart1" style="height: 500px;width:46%;float:left;"></div>
        <div id="echart2" style="height: 500px;width:46%;"></div>
    </div>
  </el-card>
</template>

<script>

const echarts = require('echarts/lib/echarts') // 引入 ECharts 主模块
require('echarts/lib/chart/bar') // 引入柱状图
require('echarts/lib/chart/pie') // 引入柱状图
require('echarts/lib/component/tooltip') // 引入提示框和标题组件
require('echarts/lib/component/title')
export default {
    name: 'ExpenditureTrend',
    data() {
        return {
            option1: {
                title: {
                    text: 'ECharts测试图表1',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '袜子', '短裤', '鞋子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [15, 20, 36, 10, 25, 20, 52, 10, 30]
                }]
            },
            option2: {
                backgroundColor: '#2c343c',
                title: {
                    text: 'ECharts测试图表2',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:274, name:'联盟广告'},
                            {value:235, name:'视频广告'},
                            {value:400, name:'搜索引擎'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            }
        }
    },
    mounted() {
        var myChart1 = echarts.init(document.getElementById('echart1')) // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('echart2')) // 基于准备好的dom，初始化echarts实例
        this.$nextTick(() => {
            myChart1.setOption(this.option1) // 绘制图表
            myChart2.setOption(this.option2) // 绘制图表
        })
    },
}
</script>

<style lang="scss" scoped>
.expenditure-trend{
    min-height: 80vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>

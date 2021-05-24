<template>
    <div class="time-number2">
        <div class="title">成果数量趋势
            <el-radio-group v-model="radio" style="margin-left: 55%" size="mini">
                <el-radio-button label="现在"></el-radio-button>
                <el-radio-button label="一月前"></el-radio-button>
                <el-radio-button label="一年前"></el-radio-button>
            </el-radio-group>
        </div>
        <v-chart :options="getOption()"></v-chart>
    </div>
</template>



<script>
    import * as echarts from 'echarts';
    var data = [Math.random() * 300];
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];
    for (var i = 1; i < 20; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    export default {
        data () {
            return {
                radio:"现在",
                date:[],
            }
        },
        methods: {
            getOption () {
                return {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGup: false,
                        show: true,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisLabel: {
                            show: true,
                            fontSize: 12,
                            color: '#eee'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 11
                    }, {
                        start: 0,
                        end: 11
                    }],
                    series: [
                        {
                            name: '数量',
                            type: 'line',
                            symbol: 'none',
                            sampling: 'lttb',
                            itemStyle: {
                                color: '#74fbf5'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 1,
                                    color: '#74fbf5'
                                }, {
                                    offset: 1,
                                    color: '#74fbf5'
                                }])
                            },
                            data: data
                        }
                    ]
                }
            }
        },
    }
</script>

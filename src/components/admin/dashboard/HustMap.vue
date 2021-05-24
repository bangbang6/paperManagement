<template>
    <div style="height: 100%">
            <div class="title">成果分布地图</div>
            <div class="wrapper">
                    <ve-amap
                            :settings="chartSettings"
                            :tooltip="tooltip"
                            :series="series"
                            width="100%"
                            :style="{height:'100%',position: 'relative'}"
                            :after-set-option-once="afterSet"
                    >
                            <ve-amap
                                    :settings="chartSettings2"
                                    :tooltip="tooltip"
                                    :series="series2"
                                    width="50%"
                                    :style="{height:'20%',position: 'absolute',right: '0',bottom: '0'}"
                                    :after-set-option-once="afterSet"
                            ></ve-amap>
                    </ve-amap>

            </div>
     </div>

</template>

<script>
    export default {
        data () {
            return {
                chartSettings: {
                    key: "723508a3369754233a578f36a4d3cf24",
                    amap: {
                        zoom: 16,
                        center: [114.415399, 30.510991],
                        mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
                        animateEnable: true,
                    },
                },
                chartSettings2: {
                    key: "723508a3369754233a578f36a4d3cf24",
                    amap: {
                        zoom: 10,
                        center: [114.138177, 30.676737],
                        mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
                        animateEnable: true,
                    },
                },
                series: [],
                series2: [],
                tooltip: {
                }
            }
        },
        mounted () {
            let littleDotData = [
                {
                    name: '南六楼',
                    value: [114.413633, 30.509502, 10400],
                },
                {
                    name: '东五楼',
                    value: [114.418071, 30.511844, 20300]
                },
                {
                    name: '南五楼',
                    value: [114.415502, 30.509215, 4400]
                },
            ]
            let littleDotData2 = [
                {
                    name: '网安基地',
                    value: [114.138177, 30.676737, 12300]
                },
            ]
            this.series = [{
                type: 'effectScatter',
                data: littleDotData,
                coordinateSystem: 'amap',
                symbolSize: function (val) {
                    return val[2] / 1000
                },
                rippleEffect: {
                    brushType: "stroke", //涟漪
                },
                hoverAnimation: true,//移上去有动画
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter (params) {
                            return params.data.name
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#74fbf5',/* colors[0][0], */
                        shodowColor: '#74fbf5' /* colors[0][0] */
                    }
                }
            }]
            this.series2 = [{
                type: 'effectScatter',
                data: littleDotData2,
                coordinateSystem: 'amap',
                symbolSize: function (val) {
                    return val[2] / 1000
                },
                rippleEffect: {
                    brushType: "stroke", //涟漪
                },
                hoverAnimation: true,//移上去有动画
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter (params) {
                            return params.data.name
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#74fbf5',/* colors[0][0], */
                        shodowColor: '#74fbf5' /* colors[0][0] */
                    }
                }
            }]
            /* let map = echarts.init(document.getElementById('map'))
            map.on('click', (params) => {
              console.log('params', params);
            }) */
        },
        methods: {
            afterSet: function (echarts) {
                var amap = echarts.getModel().getComponent('amap').getAMap()
                console.log('amap', amap);
                amap.on('click', e => {
                    console.log('e', e);
                    //  this.chartSettings.amap.center = [e.lnglat.Q, e.lnglat.R]
                    // this.chartSettings.amap = {
                    //   zoom: 16,
                    //   center: [e.lnglat.Q, e.lnglat.R],
                    //   mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
                    // }
                    // console.log('a', amap.getZoom());
                    amap.setZoomAndCenter(14, [e.lnglat.R, e.lnglat.Q])
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        padding-left: 10px;
        box-sizing: border-box;
        font-weight: 500;
        color: white;
        font-size: 18px;
        height: 20px;

    }
    .inner{
        border-color: #9a6e3a;
    }
    .wrapper{
        width:100%;
        height: 80%;
        background: linear-gradient(to left, #74fbf5, #74fbf5) left top no-repeat,
        linear-gradient(to bottom, #74fbf5, #74fbf5) left top no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) right top no-repeat,
        linear-gradient(to bottom, #74fbf5, #74fbf5) right top no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) left bottom no-repeat,
        linear-gradient(to bottom,#74fbf5, #74fbf5) left bottom no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
        /*设置大小*/

        background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem, 0.9rem 0.15rem;
        background-color: #60626621;
        box-sizing: border-box;

        padding: 0.15rem;
        margin-top: 10px;
    }
    .ve-amap{
        div[_echarts_instance_]{
            height:100%;
        }
    }
</style>
<style lang="scss">
    .ve-amap{
     div[_echarts_instance_]{
            height:100%!important;
        }
    }
</style>

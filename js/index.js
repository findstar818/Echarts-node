
// 时间模块
setInterval(() => {
    var dt = new Date()
    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var h = padZero(dt.getHours());
    var min = padZero(dt.getMinutes());
    var s = padZero(dt.getSeconds());
    document.querySelector('.showTime').innerHTML = '当前时间:' + y + '年' + m + '月' + d + '日-' + h + '时' + min + '分' + s + '秒'
}, 1000)

function padZero(n) {
    return n > 9 ? n : '0' + n
}

//为了避免全局变量的污染 采用立即执行函数
//柱状图模块1
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/left1',
        method: 'GET',
        success: (results) => {
            var data = results[0]
            // console.log('data=>',data);
            $('.left-first').text(data.name)
            //实例化对象
            var myChart = echarts.init(document.querySelector('.bar-lt .chart'))
            //指定配置项和数据
            var option = {
                color: ['#2f89cf'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        //坐标轴指示器，坐标轴触发有效
                        type: 'shadow' //默认为直线 可选为: 'line' | 'shadow'
                    }
                },
                //修改图表大小
                grid: {
                    top: '10px',
                    left: '0%',
                    right: '0%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data.Xdata,
                        axisTick: {
                            alignWithLabel: true
                        },
                        //修改刻度标签样式
                        axisLabel: {
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '12'
                        },
                        //不显示 x坐标轴样式
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        //修改刻度标签样式
                        axisLabel: {
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '12'
                        },
                        //y轴线条 1px 
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)',
                                width: 1,
                            }
                        },
                        //y 轴 分割线的样式
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)'
                            },
                        }
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '35%',
                        data: data.Sdata,
                        itemStyle: {
                            //修改柱子圆角
                            barBorderRadius: 5
                        }
                    }
                ]
            };
            //把配置对象给实例对象
            myChart.setOption(option)
            //图标跟随屏幕自适应
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }
    })
})();
//柱状图模块2
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/right1',
        method: 'GET',
        success: (results) => {
            var data = results[0]
            // console.log('data=>',data);
            $('.right-first').text(data.name)
            var myColor = data.color
            //实例化对象
            var myChart = echarts.init(document.querySelector('.bar-rt .chart'))
            //指定配置和数据
            var option = {
                grid: {
                    top: '10%',
                    left: '22%',
                    bottom: '10%',
                    //是否顾及标签的正常显示  去掉之后 将不会给侧标签让出位置
                    // containLabel: true
                },
                //不显示x轴的相关信息
                xAxis: {
                    show: false
                },
                yAxis: [{
                    type: 'category',
                    //使 y 轴翻转
                    inverse: true,
                    data: data.Ydata[0],
                    //刻度标签文字颜色设置为白色
                    axisLabel: {
                        color: '#fff'
                    },
                    //不显示y轴的线
                    axisLine: {
                        show: false
                    },
                    //不显示刻度
                    axisTick: {
                        show: false
                    }
                },
                {
                    show: true,
                    data: data.Ydata[1],
                    //使 y 轴翻转
                    inverse: true,
                    //不显示y轴的线
                    axisLine: {
                        show: false
                    },
                    //不显示刻度
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            color: '#fff'
                        }
                    }
                }],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        data: data.Sdata,
                        //设置层级 使其覆盖
                        yAxisIndex: 0,
                        //修改第一组内部柱子的圆角
                        itemStyle: {
                            barBorderRadius: 20,
                            //此处的color可以修改柱子的颜色
                            color: function (params) {
                                //params 传进来的是柱子对象
                                // dataIndex是当前柱子的索引号
                                return myColor[params.dataIndex]
                            }
                        },
                        //柱子之间的距离
                        barCategoryGap: 50,
                        //柱子的宽度
                        barWidth: 10,
                        //显示柱子内的文字
                        label: {
                            show: true,
                            position: 'inside',
                            //{c}会自动解析为 data 里面的数据
                            // a: 系列名  b：数据名  c：数据值
                            formatter: '{c}%'
                        }
                    },
                    {
                        name: '框',
                        type: 'bar',
                        //柱子距离
                        barCategoryGap: 50,
                        //柱子宽度
                        barWidth: 15,
                        itemStyle: {
                            color: 'none',
                            borderColor: '#00c1de',
                            borderWidth: 3,
                            barBorderRadius: 15
                        },
                        data: data.indexData,
                        //设置层级 使其覆盖
                        yAxisIndex: 1,
                    }
                ]
            };
            //配置给实例对象
            myChart.setOption(option)
            //适配
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }
    })
})();

//折线图模块1
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/yearData',
        method: 'GET',
        success: (results) => {
            var yearData = results
            $('.left-second').text(yearData[2].name)
            $('.left-second').append("<a href='javascript:;'>2021</a><a href='javascript:;'>2022</a>")
            // console.log('yearData=>', yearData);
            //实例化对象
            var myChart = echarts.init(document.querySelector('.line-lt .chart'))
            //指定配置和数据
            var option = {
                //设置 color 设置折线颜色
                color: ['#00f2f1', '#ed3f35'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    //修改图例组件 文字颜色
                    textStyle: {
                        color: '#4c9bfd' //图例文字颜色
                    },
                    right: '10%' //距离右边10%
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    show: true, //显示边框
                    borderColor: '#012f4a'

                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        show: false  //刻度去除
                    },
                    axisLabel: {
                        color: '#4c9bfd'  //x轴刻度标签字体颜色
                    },
                    axisLine: {
                        show: false  //去除 x 轴
                    },
                    boundaryGap: false  //去除轴内间距
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false  //刻度去除
                    },
                    axisLabel: {
                        color: '#4c9bfd'  //x轴刻度标签字体颜色
                    },
                    axisLine: {
                        show: false  //去除 x 轴
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#012f4a' //分割线颜色
                        }
                    }
                },
                series: [
                    {
                        name: '新增粉丝',
                        type: 'line',
                        data: yearData[0].data[0],
                        //折线修饰为圆滑
                        smooth: true
                    },
                    {
                        name: '新增游客',
                        type: 'line',
                        data: yearData[0].data[1],
                        //折线修饰为圆滑
                        smooth: true
                    }
                ]
            };
            //将配置给实例对象
            myChart.setOption(option)
            //自适应
            window.addEventListener('resize', () => {
                myChart.resize()
            })

            //点击切换内容效果
            $('.line-lt h2').on('click', 'a', function () {
                //点击 a 之后 根据当前的索引号 找到对应的 yearData的相关对象
                var obj = yearData[$(this).index()]
                option.series[0].data = obj.data[0]
                option.series[1].data = obj.data[1]
                //需要重新渲染
                myChart.setOption(option)
            })

        }
    })
})();

//折线图模块2
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/right2',
        method: 'GET',
        success: (results) => {
            var data = results[0]
            $('.right-second').text(data.name)
            var myChart = echarts.init(document.querySelector('.line-rt .chart'))
            var option = {

                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    top: '0%',
                    textStyle: {
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '12'
                    }
                },
                grid: {
                    top: '30',
                    left: '10',
                    right: '10',
                    bottom: '10',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        // x轴更换数据
                        data: data.Xdata,
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,.6)',
                                fontSize: 12
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)',
                            }
                        },
                    },

                ],

                yAxis: [
                    {
                        type: 'value',
                        axisTick: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)',
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,.6)',
                                fontSize: 12
                            }
                        },
                        //修改分割线颜色
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)',
                            }
                        }

                    },
                ],
                series: [
                    {
                        name: data.Sname[0],
                        type: 'line',
                        smooth: true,
                        areaStyle: {},
                        data: data.Sdata[0],
                        //单独修改当前线条样式
                        lineStyle: {
                            color: '#0184d5',
                            width: '2'
                        },
                        //填充颜色
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                                    }
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)"
                        },
                        // symbol 设置拐点
                        showSymbol: false,
                        symbol: 'circle', //小圆点  rect方块 arrow三角
                        symbolSize: 8,
                        itemStyle: {
                            color: '#0184d5',
                            borderColor: 'rgba(211,220,107,.1)',
                            borderWidth: '12'
                        },

                    },
                    {
                        name: data.Sname[1],
                        type: 'line',
                        smooth: true,
                        areaStyle: {},
                        data: data.Sdata[1],
                        // 单独修改线的样式
                        lineStyle: {
                            color: "#00d887",
                            width: 2
                        },
                        // 填充区域
                        areaStyle: {
                            // 渐变色，只需要复制即可
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                                    }
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)"
                        },
                        // 设置拐点 小圆点
                        symbol: "circle",
                        // 拐点大小
                        symbolSize: 8,
                        // 设置拐点颜色以及边框
                        itemStyle: {
                            color: "#00d887",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12
                        },
                        // 开始不显示拐点， 鼠标经过显示
                        showSymbol: false,
                    }
                ]
            };
            myChart.setOption(option)
            //自适应 
            window.addEventListener('resize', () => {
                myChart.resize()
            })

        }
    })
})();

//饼形图模块1
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/left3',
        method: 'GET',
        success: (results) => {
            var data = results[0]
            $('.left-third').text(data.name)
            var myChart = echarts.init(document.querySelector('.pie-lt .chart'))
            var option = {
                color: data.color,
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    //距离底部
                    bottom: '0%',
                    //小图标的宽高
                    itemWidth: 10,
                    itemHeight: 10,
                    //修改图里组件的文字为12px
                    textStyle: {
                        fontSize: '12',
                        color: 'rgba(255,255,255,.5)'
                    },
                },
                series: [
                    {
                        name: data.Sname,
                        type: 'pie',
                        //设置饼形图在容器中的位置
                        center: ['50%', '45%'],
                        //修改内圆半径和外圆半径  百分比是相对于容器宽度来说的
                        radius: ['40%', '60%'],
                        label: {
                            //图形上的文字
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            //链接文字和图形的线
                            show: false
                        },
                        data: data.Sdata
                    }
                ]

            };

            myChart.setOption(option)

            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }
    })
})();

//饼形图模块2
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/right3',
        method: 'GET',
        success: (results) => {
            var data = results[0]
            $('.right-third').text(data.name)
            var myChart = echarts.init(document.querySelector('.pie-rt .chart'))
            var option = {
                color: data.color,
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    bottom: "0%",
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12"
                    }
                },
                series: [
                    {
                        name: data.Sname,
                        type: "pie",
                        radius: ["10%", "70%"],
                        center: ["50%", "50%"],
                        roseType: "radius",
                        // 图形的文字标签
                        label: {
                            fontSize: 10
                        },
                        // 链接图形和文字的线条
                        labelLine: {
                            // length 链接图形的线条
                            length: 6,
                            // length2 链接文字的线条
                            length2: 8
                        },
                        data: data.Sdata
                    }
                ]
            };

            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }
    })
})();

//中间信息模块
(function () {
    $.ajax({
        url: 'http://127.0.0.1:2818/middle',
        method: 'GET',
        success: (results) => {
            console.log('success');
            var data = results
            $('.no-hd li').eq(0).text(data.num[0])
            $('.no-hd li').eq(1).text(data.num[1])
            $('.no-bd li').eq(0).text(data.msg[0])
            $('.no-bd li').eq(1).text(data.msg[1])
            $('header').css('visibility', 'visible')
            $('.map .chart').css('visibility', 'visible')
        }
    })
})();

//模拟飞行路线地图模块
(function () {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028]
    };

    var XAData = [
        [{ name: "西安" }, { name: "拉萨", value: 100 }],
        [{ name: "西安" }, { name: "上海", value: 100 }],
        [{ name: "西安" }, { name: "广州", value: 100 }],
        [{ name: "西安" }, { name: "西宁", value: 100 }],
        [{ name: "西安" }, { name: "银川", value: 100 }]
    ];

    var XNData = [
        [{ name: "西宁" }, { name: "北京", value: 100 }],
        [{ name: "西宁" }, { name: "上海", value: 100 }],
        [{ name: "西宁" }, { name: "广州", value: 100 }],
        [{ name: "西宁" }, { name: "西安", value: 100 }],
        [{ name: "西宁" }, { name: "银川", value: 100 }]
    ];

    var YCData = [
        [{ name: "拉萨" }, { name: "潍坊", value: 100 }],
        [{ name: "拉萨" }, { name: "哈尔滨", value: 100 }],
        [{ name: "银川" }, { name: "上海", value: 100 }],
        [{ name: "银川" }, { name: "西安", value: 100 }],
        [{ name: "银川" }, { name: "西宁", value: 100 }]
    ];

    var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
    //var planePath = 'arrow';
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;
    };

    var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
    var series = [];
    [
        ["西安", XAData],
        ["西宁", XNData],
        ["银川", YCData]
    ].forEach(function (item, i) {
        series.push(
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: "red", //arrow箭头的颜色
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 2,
                symbol: ["none", "arrow"],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + " Top3",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    brushType: "stroke"
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}"
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    },
                    emphasis: {
                        areaColor: "#2B91B7"
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            }
        );
    });
    var option = {
        tooltip: {
            trigger: "item",
            formatter: function (params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return (
                        params.data.fromName +
                        ">" +
                        params.data.toName +
                        "<br />" +
                        params.data.value
                    );
                } else {
                    return params.name;
                }
            }
        },
        legend: {
            orient: "vertical",
            top: "bottom",
            left: "right",
            data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
            textStyle: {
                color: "#fff"
            },
            selectedMode: "multiple"
        },
        geo: {
            map: "china",
            label: {
                emphasis: {
                    show: true,
                    color: "#fff"
                }
            },
            // 把中国地图放大了1.2倍
            zoom: 1.2,
            //禁止拖动滚动
            roam: false,
            itemStyle: {
                normal: {
                    // 地图省份的背景颜色
                    areaColor: "rgba(20, 41, 87,0.6)",
                    borderColor: "#195BB9",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2B91B7"
                }
            }
        },
        series: series
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();

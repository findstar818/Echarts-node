var express = require('express')
var app = express()
//左1
app.get('/left1', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var data = [
        {
            name: '柱形图-就业行业',
            Xdata: ['旅游行业', '教育培训', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
            Sdata: [200, 300, 300, 900, 1500, 1200, 600]
        }
    ]
    res.send(data)
})

//右1
app.get('/right1', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var data = [
        {
            color: ['#1089E7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
            name: '柱形图-技能掌握',
            Ydata: [['HTML5', 'CSS3', 'javaScript', 'VUE', 'Node'], ['702', '350', '610', '793', '664']],
            Sdata: [70, 34, 60, 78, 69],
            indexData: [100, 100, 100, 100, 100]
        }
    ]
    res.send(data)
})

//左2
app.get('/yearData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var yearData = [
        
        {
            year: '2021',  // 年份
            data: [  // 两个数组是因为有两条线
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: '2022',  // 年份
            data: [  // 两个数组是因为有两条线
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        },
        {
            name:'柱形图-人员变化'
        }
    ];
    res.send(yearData)
})

//右2
app.get('/right2', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var data = [
        {
            name: '折线图-播放量',
            Xdata: [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"
            ],
            Sdata: [[
                30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40
            ], [
                130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20
            ]],
            Sname: ['邮件营销', '联盟广告']
        }
    ]
    res.send(data)
})

//左3
app.get('/left3', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var data = [
        {
            color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
            name: '饼形图-年龄分布',
            Sdata: [
                { value: 1, name: "0岁以下" },
                { value: 4, name: "20-29岁" },
                { value: 2, name: "30-39岁" },
                { value: 2, name: "40-49岁" },
                { value: 1, name: "50岁以上" }
            ],
            Sname: '年龄分布',

        }
    ]
    res.send(data)
})

//右3
app.get('/right3', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var data = [
        {
            color: ["#006cff", "#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],
            name: '饼形图-地区分布',
            Sdata: [
                { value: 20, name: "云南" },
                { value: 26, name: "北京" },
                { value: 24, name: "山东" },
                { value: 25, name: "河北" },
                { value: 20, name: "江苏" },
                { value: 25, name: "浙江" },
                { value: 30, name: "四川" },
                { value: 42, name: "湖北" }
            ],
            Sname: '地区分布',

        }
    ]
    res.send(data)
})

//中间
app.get('/middle',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    var data ={
        num:['125811','104563'],
        msg:['前端需求人数','市场供应人数']
    }
    res.send(data)
})

//定义错误中间件
app.use((err,req,res,next)=>{
    if(err) return res.send({
        err,
        status:1
    })
})

app.listen(2818, () => {
    console.log('the server running at http://127.0.0.1:2818');
})
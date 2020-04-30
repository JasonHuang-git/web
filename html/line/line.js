`use strict`

var myChart3 = echarts.init(document.getElementById('line'));//初始化折线图
var data = { areas:['A','B','C','D','E'],
              stats:[   {
                          name: 'A',
                          type: 'line',
                          showSymbol: false,
                          hoverAnimation: false,
                          data: [],
                          cache:[]
                        },
                        {
                              name: 'B',
                              type: 'line',
                              showSymbol: false,
                              hoverAnimation: false,
                              data: [],
                            cache:[]
                          },
                        {   name:'C',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            data: [],
                            cache:[]} ,
                        {   name:'D',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            data: [],
                            cache:[]},
			    {
                          name: 'E',
                          type: 'line',
                          showSymbol: false,
                          hoverAnimation: false,
                          data: [],
                          cache:[]
                        }
                        ] };

var date = [];//时间数据数组
var value_A = 1000;
var value_B = 2000;
var value_C = 3000;
var value_D = 4000;
var value_E = 5000;

function randomData_B() {
    var now = new Date();
    value_B = value_B + Math.random() * 50;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if(hours < 10)//对时分秒进行判断，返回值为一位数的将其补充为两位数，美观
        hours = "0"+hours;
    if(minutes < 10)
        minutes = "0"+minutes;
    if(seconds < 10)
        seconds = "0"+seconds;
    return {
        value: [ [hours,minutes,seconds].join(':'),
            Math.round(value_B)]
    }
}
function randomData_A() {
    var now = new Date();
    value_A = value_A + Math.random() * 100;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if(hours < 10)
        hours = "0"+hours;
    if(minutes < 10)
        minutes = "0"+minutes;
    if(seconds < 10)
        seconds = "0"+seconds;
    return {
        value: [ [hours,minutes,seconds].join(':'),
            Math.round(value_A)]
    }
}
function randomData_C() {
    var now = new Date();
    value_C = value_C + Math.random() * 30;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if(hours < 10)
        hours = "0"+hours;
    if(minutes < 10)
        minutes = "0"+minutes;
    if(seconds < 10)
        seconds = "0"+seconds;
    return {
        value: [ [hours,minutes,seconds].join(':'),
            Math.round(value_C)]
    }
}
function randomData_D() {
    var now = new Date();
    value_D = value_D + Math.random() * 60;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if(hours < 10)
        hours = "0"+hours;
    if(minutes < 10)
        minutes = "0"+minutes;
    if(seconds < 10)
        seconds = "0"+seconds;
    return {
        value: [ [hours,minutes,seconds].join(':'),
            Math.round(value_D)]
    }
}
function randomData_E() {
    var now = new Date();
    value_E = value_E + Math.random() * 80;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if(hours < 10)
        hours = "0"+hours;
    if(minutes < 10)
        minutes = "0"+minutes;
    if(seconds < 10)
        seconds = "0"+seconds;
    return {
        value: [ [hours,minutes,seconds].join(':'),
            Math.round(value_E)]
    }
}

var years;//当前时间年月日，用于展示当前日期
var months;
var days;

//函数获取当前日期，年月日
function getToday(){
    var now = new Date();
    years = now.getFullYear();
    months = now.getMonth() + 1;
    days = now.getDate();
}
getToday();
//折线图的option参数配置，x轴为当前时间（时分秒），y轴为随机值
option_line = {
    title: {
        text: '实时量'+'('+years+'年'+months+'月'+days+'日'+')',
        x:'center',
        textStyle: {//teststyle调整字体格式及大小
            "fontSize": 24
        }
    },
    tooltip: {
            trigger: 'axis'
    },
    legend: {
        data:['A', 'B','C','D','E'],
        x:'right',
        textStyle: {
            "fontSize": 18
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize:'18'
            },
        data:date
    }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                fontSize:'18'
            }
            },
        splitLine: {
            show: false
        }
    },
    series: data.stats

};

var time=14400;
var pre_time=14400;
var value = 14400;
function update(value) {

    getToday();
    if(value != null)//根据value值设置展示数据的条数
    {
        if (value == 0)
            time = 14400;
        else if(value == 1)
            time = 72000;
        else if(value == 2)
            time = 172800;
        else if(value == 3)
            time = 10;
    }
    if(data.stats.length>0 && data.stats[0].data.length > time)//如果大于展示区段的条数，则进行shift操作
    {
        var now_length = data.stats[0].data.length - time;//当前数组中数量
        if(pre_time>time){
            for(var i =0;i<now_length;i++){
                for(var j=0;j<data.stats.length;j++)
                    data.stats[j].data.shift();
                date.shift();
            }
        }
        else{
            for(var j=0;j<data.stats.length;j++)
                data.stats[j].data.shift();
            date.shift();
        }

    }
    pre_time = time;//记录前一次调整时选择的展示区段

    myChart3.setOption({//更新title，xAxis和series的数据
        title: {
            text: '实时数据量'+'('+years+'年'+months+'月'+days+'日'+')',
            x:'center',
            textStyle: {
                "fontSize": 24
            }
        },
        xAxis: {
            data: date
        },
        series:  data.stats
    });
};

function select_time(){
    value = $("#time").val();
    update(value);
}//前端提供展示区段的选择，传递到后端value值

//每500毫秒钟重复执行函数，更新数据并更新折线图
setInterval(function () {
    var _data_B = randomData_B();
    var _data_A = randomData_A();
    var _data_C = randomData_C();
    var _data_D = randomData_D();
    var _data_E = randomData_E();
    getToday();
    if(value != null)//根据value值设置展示数据的条数
    {
        if (value == 0)
            time = 14400;
        else if(value == 1)
            time = 72000;
        else if(value == 2)
            time = 172800;
        else if(value == 3)
            time = 10;
    }

    pre_time = time;//记录前一次调整时选择的展示区段
    data.stats[0].data.push(_data_B);//每一次数组里新增一条数据
    data.stats[1].data.push(_data_A);
    data.stats[2].data.push(_data_C);
    data.stats[3].data.push(_data_D);
    data.stats[4].data.push(_data_E);

    date.push(_data_B.value[0]);

    myChart3.setOption({//更新title，xAxis和series的数据
        title: {
            text: '实时量'+'('+years+'年'+months+'月'+days+'日'+')',
            x:'center',
            textStyle: {
                "fontSize": 24
            }
        },
        xAxis: {
            data: date
        },
        series: data.stats
    });
},500);

myChart3.setOption(option_line);

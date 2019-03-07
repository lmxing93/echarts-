	


this.dataSet = [

{"x":"类目1","y":30},
{"x":"类目2","y":40},
{"x":"类目3","y":60},
{"x":"类目4","y":80},
{"x":"类目5","y":100}


]



function initOpt(){
	let yAxisData = _yAxisData();
	let xData = _xAxisData();
	let {maxVal,exMax} = _dtOrder();
	const grayBarData = yAxisData.map(item=>exMax>0?exMax:100);
//		console.log(grayBarData,yAxisData);
    return {

      grid:{
        right:'5%',
        left:'5%',
        bottom:'5%',
        top:'5%',
        containLabel:true,
      },
    	yAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show:false
        },
        data: xData,
	    }, {
	        type: 'category',
	        axisLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            show:true,
	            inside: false,
	            color:"#ccc",
	            fontSize: 14,
	            fontFamily: 'Roboto-Regular',
	            formatter:function(val){
	                return  `${val}`
	            },
	        },
	        splitArea: {
	            show: false
	        },
	        splitLine: {
	            show: false
	        },
	        data: yAxisData,
	        
	    }],
      xAxis: {
	        type: 'value',
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false,
	           
	        },
	        splitLine: {
	            show: false,
	          
	        },
	        axisLabel: {
	            show: false,
	            
	        },
	    },
      series: [{
            name: '',
            type: 'bar',
            itemStyle: {
                normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(245,237,27,0.8)'  //243,235,27
                    }, {  
                    		offset: 0.6,
                        color: 'rgba(245,237,27,0.2)'  //243,235,27
                    }, {
                        offset: 1,
                        color: 'rgba(245,237,27,0)'
                    }]),
                    barBorderRadius: 10,
                    borderWidth: 0,
                },
                emphasis: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(245,237,27, 0.7)'
                }
            },
            zlevel: 2,
            barWidth: '13%',
            data: yAxisData,
            label: {
		            show: true,
		            position: [0, '-350%'],
	            	color:"#ccc",
	              	fontSize: 14,
	              	fontFamily: 'Roboto-Regular',
		            formatter:function(params){
		//                  	console.log(params);
		              return params.name;
		            }
                
            },
        },
        {
            name: '',
            type: 'bar',
            yAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
                normal: {
                    color: 'rgba(102,102,102,0.3)', //柱子
                    borderWidth: 0,
                    barBorderRadius: 5,
                    shadowBlur: {
                        shadowColor: 'rgba(255,255,255,0.31)',
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 2,
                    },
                }
            },
            label: {
                normal: {
                    show: false
                }
            },
            barWidth: '8%',
            data: grayBarData
        }
    	]
      
    };
}
		
function _xAxisData() {
   return this.dataSet && this.dataSet.map(item => item.x);
}
 
function _yAxisData() {
    return this.dataSet && this.dataSet.map(item => item.y);
}
 
function _dtOrder(){
		let data = this._yAxisData();
		let maxVal = Math.max.call(null,...data);
		let exMax = Math.ceil(maxVal*1.2);
		return {maxVal,exMax}
}


let option = initOpt();


setTimeout(function(){
	const myChart = echarts.init(document.getElementById("pie"));
	myChart.setOption(option)
},2000)


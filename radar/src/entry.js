	


const dataSorce = [
  	{"x":"类目1","y":485},
	{"x":"类目2","y":830},
	{"x":" 类目3","y":285}
 
]

function initOpt(){
	const { names, types, data, indicator } = _getData()
	const dataJson = dataSorce;
	const {dataSum} = _addSum();
    const color = [
      
      new this.echarts.graphic.LinearGradient(0, 0, 0, 1, 
				[
					{ offset: 0, color: 'rgba(245,104,27,0.8)' },  // 0% 处的颜色
					{ offset: 1, color: 'rgba(240,211,50,0.8)' } // 100% 处的颜色
				], 
			false),
     
    ];  
    const colorOpciaty = [
     
      new this.echarts.graphic.LinearGradient(0, 0, 0, 1, 
				[
					{ offset: 0, color: 'rgba(245,104,27,0.4)' },  // 0% 处的颜色
					{ offset: 1, color: 'rgba(240,211,50,0.4)' } // 100% 处的颜色
				], 
			false),
     
    ];


    return {
//  	backgroundColor:'#000',
    	   tooltip: {
	        show: false
	      },
	      legend: {
	        show: false
	      },
	     
	      radar: [{
	      	radius:'68%',
	      	center: ['50%', '60%'],
	      	shape: 'circle',
	        name: {
	        	formatter:(val,indicator)=>{
	        		return [`{a|${val}}`,`{b|${indicator.pre}%}`].join('\n')
	        	},
	        	
	        	rich:{
	        		a:{
	        			color:"#fff",
	        			fontSize: 14,
	        			align:"left",
	        			lineHeight:30,
	        		},
	        		b:{
	        			color:"#fff",
	        			fontSize: 18,
	        			align:"left",
	        			lineHeight:30,
	        			textBorderColor:"#f0d332",
	        			textShadowColor:"#f0d332",
	        			textShadowBlur:20
	        		}
	        	},
		        
		        padding: [3, 5],
		        
	        },
	        splitArea: {
	          show: false,
	          areaStyle:{
	          	color:['rgba(255,255,255,0.05)','rgba(255,255,255,0.05)','rgba(255,255,255,0.05)'],
		          shadowColor: 'rgba(240,211,50,1)',
		    			shadowBlur: 10,
	          }
	          
	        },
	        
	        splitLine: {
	          lineStyle: {
	          	width:1,
	      			color: "rgba(240,211,50,0.3)",
	      			shadowColor: 'rgba(240,211,50,1)',
	    				shadowBlur: 30,
	          }
	          
	        },
	        axisLine: {
	          lineStyle: {
	          	width:1,
	            color: "rgba(240,211,50,0.3)",
	            
	          }
	        },
	        splitNumber: 3,
	        indicator
	      }],
	      
	      series: [
	        {
	          name: "test_radar",
	          type: "radar",
	          symbolSize: 0,
	          data: types.map((item, i) => {
	            return {
	              name: item,
	              value: data[i],
	              lineStyle: { 
	              	color: color[i],
	              	shadowColor: 'rgba(240,211,50,1)',
	    						shadowBlur: 30,
	              },
	              areaStyle: { color: colorOpciaty[i]  }
	            }
	          })
	        }
	      ]
	    }
}
		
function _getData() {
	const {dataSum} = this._addSum();
	const dataObj = {};
	let max = dataSorce.y;
	dataSorce.forEach((item, i) => {
	  if (!item.z) {
	    item.z = 'one'
	  }
	  if (!dataObj[item.z]) {
	    dataObj[item.z] = {}
	  }
	  dataObj[item.z][item.x] = item.y
	  max = max > item.y ? max : item.y
	})

    const types = Object.keys(dataObj);
    const names = Object.keys(dataObj[types[0]])
    const data = types.map((item) => {
      return names.map(i => dataObj[item][i])
    })
    
    //自定义label数据
    const indicator = names.map((item,i)=> {
      return { name: item, max:parseInt(max*1.1),pre:parseInt((data[0][i]/dataSum)*100) }
    })
    return { names, types, data, indicator }
  
}

function  _addSum(){
  	let dataSum = 0,datay = [];
  	dataSorce && dataSorce.map((item,i)=>{
  			datay.push(item.y);
  			dataSum += parseInt(item.y)
  	})
  	
  	return {dataSum}
  }	


let option = initOpt();


setTimeout(function(){
	const myChart = echarts.init(document.getElementById("pie"));
	myChart.setOption(option)
},2000)


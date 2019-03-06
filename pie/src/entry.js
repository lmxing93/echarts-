	


const dataSorce = [
  {"name":"微信读书", "value": 356},
  {"name":"考拉阅读", "value": 283},
  {"name":"QQ阅读", "value": 283},
  {"name":"书籍阅读", "value": 236}
 
]

function initOpt(){
	let colors = _colors(),itemCol = _itemColor();
	
	console.log(dataSorce);
		return {
			
			color:colors,
			legend:{
				show:false
			},
			tooltip:{
				show:false,
				backgroundColor:'rgba(3,43,80,0.7)',
				textStyle:{
					color:'rgba(255,255,255,0.7)',
					fontSize:16
				},
				extraCssText:'text-align:left',
				formatter:function(params,m){
					let item = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${itemCol[params.dataIndex]};"></span>`;
					let	str = `${item} ${params.name}&nbsp;${params.value}`;
					return str
				}
			},
			series : [
				{
					name:'',
					type:'pie',
					hoverAnimation:false,
					radius: ['38%', '50%'],
					center: ['50%', '50%'],
					avoidLabelOverlap: true,
					label: {
						
						show: true,
						position: 'outside',
						formatter:function(params){
//							console.log(params);
							let nm = params.name,val = params.value;
//							per = Number(params.percent).toFixed(2) ;
							return params.dataIndex>1?[`{a1|${nm}}\n`,`\n{b1|${val}条}`]: [`{a|${nm}}\n`,`\n{b|${val}条}`];
							//return [`{a|${nm}}\n`,`\n{b|${val}条}`]
						},
						padding: [0, -8],
	                    height: 60,
	                    lineHeight:21,
	                  
						rich: {
							a: {
								color: "rgba(251,227,183,0.9)",
								fontSize: 14,
								padding:[0,0,0,-150],
								textBorderColor:'#fff',
								align: 'right',
								
							},
							b: {
								color: "#fff",
								fontSize: 12,
								padding:[0,0,0,-150],
								align: 'right',
							},
							a1: {
								color: "rgba(251,227,183,0.9)",
								fontSize: 14,
								align: 'left',
								padding:[0,-150,0,0],
								textBorderColor:'#fff',
							},
							b1: {
								color: "#fff",
								fontSize: 12,
								align: 'left',
								padding:[0,-150,0,0]
							}

							
						}
						
					},
					labelLine: {
						normal: {
							show: true,
							length:80,
//							length2: 15,
							length2:145,	
							lineStyle:{
								color: 'rgba(248,215,111,0.4)',
							}
						}
					},
					data:dataSorce
				},
				{
					name: '边框1',
					type: 'pie',
					hoverAnimation:false,
					radius:['73%', '74%'],
					center: ['50%', '50%'],
					labelLine:{
					  normal:{
						  show: false
					  }  
					},
					itemStyle:{
						normal:{
							color:new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
							[
								{offset: 0,color: 'rgba(255,255,255,1)'  }, // 1
								{offset: 1, color: 'rgba(255,255,255,0.1)' }
							], false),
							opacity:0.6
						}
					},
					data: [
						{
							value: 100,
							tooltip:{
								show:false
							}
						}
					]
				},
				{
					name: '边框2',
					type: 'pie',
					hoverAnimation:false,
					radius:['62%', '63%'],
					center: ['50%', '50%'],
					label: {
					  	show:false
					},
					labelLine:{
					  normal:{
						  show: false
					  }  
					},
					itemStyle:{
						normal:{
							color: 'rgba(137,177,225,0.5)',
							opacity:0.5
						}	
					},
					data: [
						{
							value: 100,
							tooltip:{
								show:false
							}
						}
					]
				},
				{
					name: '边框3',
					type: 'pie',
					hoverAnimation:false,
					radius:['50%', '57%'],
					center: ['50%', '50%'],
					label: {
					  	show:false
					},
					labelLine:{
					  normal:{
						  show: false
					  }  
					},
					itemStyle:{
						normal:{
							color: 'rgba(82,111,160,0.5)',
							borderWidth:0,
	                        borderColor:"rgba(82,111,160,0.5)" ,
							shadowBlur: 20,
							opacity:0.3
						}	
					},
					data: [
						{
							value: 100,
							tooltip:{
								show:false
							}
						}
					]
				}
			]
		}
}
		
	

function _itemColor(){
	return ['#f0d332','#31c1ef','#5a3ef4','#3e76f4']
}

function _colors() {
	return [
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: 'rgba(255,255,255,0.8)'  }, // 1
			{offset: 1, color: '#f0d332' }
		], false),
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: '#31c1ef'  }, //2
			{offset: 1, color: 'rgba(255,255,255,0.8)' } 
		], false),
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: '#5a3ef4'  }, //3
			{offset: 1, color: 'rgba(255,255,255,0.8)' } 
		], false),
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: 'rgba(255,255,255,0.8)'  }, //4
			{offset: 1, color: '#3e76f4' } 
		], false)
		
	];
}

let option = initOpt();


setTimeout(function(){
	const myChart = echarts.init(document.getElementById("pie"));
	myChart.setOption(option)
},2000)


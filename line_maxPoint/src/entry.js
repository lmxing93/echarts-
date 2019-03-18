	


const dataSorce = [
{"x":"10:00","y":40,"z":"A"},
{"x":"11:00","y":100,"z":"A"},
{"x":"12:00","y":62,"z":"A"},
{"x":"13:00","y":280,"z":"A"},
{"x":"14:00","y":350,"z":"A"},
{"x":"15:00","y":270,"z":"A"},
{"x":"16:00","y":220,"z":"A"},
{"x":"17:00","y":90,"z":"A"},
{"x":"10:00","y":140,"z":"B类"},
{"x":"11:00","y":167,"z":"B类"},
{"x":"12:00","y":152,"z":"B类"},
{"x":"13:00","y":204,"z":"B类"},
{"x":"14:00","y":50,"z":"B类"},
{"x":"15:00","y":179,"z":"B类"},
{"x":"16:00","y":105,"z":"B类"},
{"x":"17:00","y":119,"z":"B类"}
]

function initOpt(){
	let colorArr = _colors();
	let legData = _ledgData();
	let dt = _xAxisData();
	
//	let currFontSize = parseInt(this.props.axisLabelFontSize)//当前字体大小  缩略显示
//	let dyn = (this._yMaxData()).toString().length;
//	let ylabel = Math.floor(dyn/2)*currFontSize;
	//console.log(dyn);

	return {
		//backgroundColor:"#0C1D38",
		color: colorArr,
		legend: {				
			right:'4%',
			type:'scroll',
			show:true,
			itemWidth:12,
			itemHeight:12,
			data:legData
		},
		grid:{
			left:'5%',
			right:'5%',
			bottom:'5%',
			containLabel:true,
			
		},
		tooltip:{
			show:true,
			trigger: 'axis',
			backgroundColor:'rgba(3,43,80,0.7)',
			textStyle:{
				color:'rgba(255,255,255,0.7)',
				fontSize:16
			},
//				axisPointer:{
//					type:'none'
//				},
			extraCssText:'text-align:left',
			formatter:function(params){
				let str = '';
				params && params.map((item)=>{
					str += `${item.marker} ${item.seriesName}&nbsp;${item.value} <br/>`;
				})
				return str
			}
		},
		xAxis: [{
			type : 'category',
			data : dt,
			axisTick: {
				show: false,
				alignWithLabel: true
			},
			axisLabel: { 
				color: "#ccc",
				fontSize: 14,
				showMinLabel: true,
				showMaxLabel: true,
//				interval:0,
				formatter:(params,index)=>{
//					let echartsW= parseInt(this.container.style.width)*0.9 - ylabel-15;//echarts容器实际宽度
//					let itemWidth = parseInt(echartsW/dt.length);
//  				let fontNum = parseInt(itemWidth/currFontSize);
//					resultStr =params.length>=fontNum? params.slice(0,fontNum-1)+'...':params;
					let resultStr = params;
					return resultStr;

				},
				margin: 15,
				
			},
			axisLine: _axisLine()
		}],
		yAxis: [{
			type : 'value',
			axisLabel: { 
				color: "#ccc",
				fontSize: 14,
				formatter:(val)=>{
				    return val
				},
				margin: 15,
			},
			axisTick: {
				show: false,
				alignWithLabel: true
			},
			splitLine: { 
				show: true,
				lineStyle: {
					color: 'rgba(255,255,255,0.2)', //坐标轴线颜色
					width: 1
      			}
			},
			axisLine: _axisLine()
		}],
		series : _setSeriesArray()
	};
}

function _ledgend(){
		
	let legendDt =  new Set(dataSorce && dataSorce.map(item=>item.z));
	let _data = [];
	if(legendDt){
		for (let x of legendDt) { // 遍历Set
			_data.push(x)
		}
	}
	return _data;

}
function _ledgData(){
	
	let legendDt =  new Set(dataSorce && dataSorce.map(item=>item.z));
	let _lgdata = [],lgDt=[];
	if(legendDt){
		for (let x of legendDt) { // 遍历Set
			_lgdata.push(x)
		}
	}
	//console.log(_lgdata);
	_lgdata && _lgdata.forEach((item)=>{  
		
		lgDt.push({
			name: item,
			icon: 'circle',
			textStyle: {
				color: "#fff",
				fontSize:12
			}
		})
	});

	return lgDt;

}
function _setSeriesArray() {
	
	let _point = _icon(),
		areaSty = _areaStyleColor(),
		colors = _colors(),
		colg = colors.length;
	let dataKinds = _ledgend(),
		dataLg = (dataSorce).length,
		kinds = dataKinds.length;  //数据种类数n
	let _xData = _xAxisData();
	let result = [];  //n个数组
		
	let obj = {};
	dataSorce.forEach((item, i) => {
		!obj[item.z] ? obj[item.z] = [item] : obj[item.z].push(item);
	})	
	
	for(var i=0;i<kinds;i++){
		let _data = obj[dataKinds[i]],
			tempArr = [];
		for(var k=0;k<dataLg;k++){
			let _dt = _xData[k];
			_data.map((item)=>{
				if(item.x === _dt){
					tempArr.push(item.y)
				}
			})				
		}
		result.push(tempArr)
		
	}

	//最大值组合
	let	maxArr = [];
	result && result.map((item)=>{
		let tempArr = item.concat(),
			max =  tempArr.sort(_sortNumber).slice(0,1)+'';  //深拷贝
		maxArr.push(max);
	})

	//创建series
	let seriesArr = [];
	let _markPoint = _markPointData();
	result && result.map((item,ind)=>{
		let pth = ind%colg;
		seriesArr.push({
			name: dataKinds[ind],
			type:'line',
			data:item,
			symbolSize:0,
			markPoint:{
				symbol: `image://${_point[pth]}`,
				symbolSize:(value,params)=>{
					let val = params.data.coord[1] +'';
					let ratio = (maxArr.indexOf(val) === params.seriesIndex)? 30: 20;
					return ratio
				},
				label:{
					normal:{
						show:false
					}
				},
				data:_markPoint[ind]
			},
			lineStyle:{
				normal:{
					color: colors[ind%colg],
					shadowColor:colors[ind%colg],
					shadowBlur: 20,
					shadowOffsetX: 1,
					shadowOffsetY: 0,
					opacity:1
				}
				
			},
			areaStyle: {
				normal:{						
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0, color:areaSty[ind%colg][0]  // 0% 处的颜色
						},{
							offset: 1, color: areaSty[ind%colg][1] // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					}
				}
			}
		})
	})
	
	//console.log("seriesArr",seriesArr);
	return seriesArr;
	
}
//数组排序不去重
function _sortNumber(a,b){
	return b-a;
}
function _yMaxData(){
	let dty = dataSorce && dataSorce.map(item=>item.y);
	let tempArr = dty.concat(),
		max =  tempArr.sort(_sortNumber).slice(0,1);  //深拷贝
	 		
	return max
	//console.log(max);
}
function _markPointData(){
	let dataKinds = _ledgend(),
		dataLg = (dataSorce).length,
		kinds = dataKinds.length,
		_xData = _xAxisData(); //数据种类数n
	let arr = [],obj = {},result=[];
	
	dataSorce.forEach((item, i) => {
		!obj[item.z] ? obj[item.z] = [item] : obj[item.z].push(item);
	})	
	
	for(var i=0;i<kinds;i++){
		let _data = obj[dataKinds[i]],
			tempArr = [];
		for(var k=0;k<dataLg;k++){
			let _dt = _xData[k];
			_data.map((item)=>{
				if(item.x === _dt){
					tempArr.push({
						x:item.x,
						y:item.y
					})
				}
			})				
		}
		result.push(tempArr)
		
	}

	for(var i=0;i<kinds;i++){
		let temp = [];
		result[i] && result[i].map((item)=>{
			
		 	temp.push({
		 		name:'p',
		 		coord:[item.x,item.y]
		 	})
		})
		arr.push(temp);
	}
	
	return arr
	
}
function _xAxisData() {
	let xData =  new Set(dataSorce && dataSorce.map(item=>item.x));
	let _data = [];
	if(xData){
		for (let x of xData) { // 遍历Set
			_data.push(x)
		}
	}
	//console.log(_data);
	return _data;
	
}

function _axisLine() {
	return {
		show: false,
		lineStyle: {
			color: 'rgba(255,255,255,0.2)', //坐标轴线颜色
			width: 2
			
  		}
	}
}
function _icon(){
	const blue = 'data:image/png;base64,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';		
	const orange = 'data:image/png;base64,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';
	const green = 'data:image/png;base64,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';
	const purp = 'data:image/png;base64,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';
	const depRed = 'data:image/png;base64,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';
	const yellow = 'data:image/png;base64,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';
	const depOrg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAHSklEQVRogaWZS6xeUxTHf+d73b5utdVSV4JEq1QR9EVCO5BItRIRCSYiJIgwEGaVDhqPEDMDJAakCQbMSsS7ir6klJJSWq16tnpbbe/ru993DNZa91tnn33Od6/uZOc7e5+z1/6vtddery8ZvfkcTqMlp7MYSP/vwtoEvo2BPF3gsTYuZsYDPOnyXPS+G6hUv4/Nhd/mWhnwIpAh4KTg21hL3W8amfPflTJQBLwMXFLSY2tjAGPd1nQ7lULgRaB9rxQ8h9L3LQTaLpiLgc6BD4GHoCtuXHG/vofv/HoPAgfW//peiTASBV8m8VCSHmw1Mg6lHwIPAbcc4JYDZnOGwYMfax540WUMJVwNegWoA33aZwPTdA6gCZwEjgB/AL8BowrWeuIYsWbPHvTYc0xVYvrspVzTXgUmAwuBi4BTwJ/AHgU66oQzDZgJXA5cC/wAfA8MklW5VoDHpG0tpyqhtD1ge646wDXgQmAxIsnPFUSV7KlYGwBOAL8os/OAW4AdwD6yJ+xbzCwmQFqmKh6wga0hKrAcUYsvgX91booDfhZwptL6BzhMRy1Ggd1ArzI+F9gagLVuOHIMlKlKTKfrwEpgEvCpvp+s80uB1cCVCu6ozs/Szb4C3gG2I3o/oDSWACuATRHgnoEx0ACJBllFlsNLuQ5cg1y+rTruARYAD+r8OwrwOB3T2AZmKEOrkBN4AbkLw8rEUmV0i46byry/xGZtUiCtrlvQG5O0l7IBnwdcrKCrCno1sBZ4D3gFsRjoifQADe0t4CDwodJ6BFGx/QrkEHAZMAQcK5C6tZyqhG7bS34Soo87dKGBvhd4CrEmpjJ2gf3xmtRGkIv8M/CovntbJblT9/iNjm2P+YUE4p7OS9+kvhD4G7EMdWARcD/wBPAXcjGnAFMR0xfr9n6KrnkCeEBp1ZX2Yd0r5pUzDFTISjkWj9QQPd6rzz3AY8CrQL+exuSgG0gDamP/zXGl8RCiTjXgR8Qn1OlYqGgMVCHbYuD7EIcyqMRXIJdmq27Yo90zMCnCkH3jdX+bArxeaQ8hjqyvCLC1srDWeh/iqu34VgHv07E0jUzvnTO1et+Ti7l08QXUalX27j7Ufnn99vSPPf8q7bYy3tT1HwA3AR8rE38C5wIHysCHEg9BVxA73K/PDeT27yRrLsXyVKqN6tNvrWbFmiuZPXcmM2ZPZ8nKhZVn3rw16Z1rl9e6rfsaCQUauke/7hm7lBkdL2r20RmIqiTA+YiLP0U2QqwC1cptj17CefP6cpRmzJpeuW/9YjoWx0eUJ5FLeZ4b90aEmGllwG1hHTnaBHEk/eTvQgJUkkVL86CtzV90LtmT9L/HkCAsQVSoEQM7EeCxfLAemZPx8OAoRW14uBmhG9Icd+sGHMRp1HWzY4j+hWlXG2inW97bV0jl68/3k3Xb/nkmcpKp7jVClyy/DLiBOoE4kBS56dMRm2zebay3P9pwgM/e3ZUj9MOu/a0N678hGyFa/DFFaR7U8VTd02MYV7IcJrJHEImcQIKi3cBViA02s9ZEL13r2Xs2J9vuPFC55sYLqNWq6a4th9obX/yJtNVEJOkDqFEkOvxWaafIiR6NAM6MQ+CxD38HrkACohYSAd6BxBwGxiwFQDvd9Pq+1qbXf3F0DOSIAhxxTNwAvEbnNM5WRsLEOtNiqpLRWwXei3i/UeATZXi5grA+iHi+waAPBOMhB3657rFZQU9C1NICrVxU6IHHCjWe2yYSO89X4EPAc8DdiHn0YAdcP6Xdz3nwM4G7gOfpSP8iJF5pkr/IOeAhN6HE20hie5ZKvokc5YvAOp03oCdLur0f0DWPAy8hd2ZEJT0H+I5s4hAWiYCsjof1PF//GETyyyVIujUMbNQN1wJvIMc9rDTNoxLQaQPXAberpN/XNW3gat1jiGzWEy3ZxVI3H4dbnmlZkKVuW+iEuAuAh5HkeCOd1M1o+tRtNWIxnkdUwlK3ZZSnbl76UeBleWcNccUrkUu0g04xqIHkjWvIJssNOg7rK2VsOx0Lk+gpnkIuvem6t/Ve8lHg9uulHqunNMiWJ046xuyU5tApT/QjGY+pi0lymjJ7CIntR8gnyLkk2brpeFgC8HW8WIXpC6QgtAxJ6faSLQgdBH519LyeTwYuQS6oFYS8Q4rpN8Fzoee0jazoGPtmr4JbhFy4E0gScBQ5eguq6ogbn4UUf3oR/f5CmY1JOIxlcvY8cX9eleWesUptt6Jnj9IbVkaOIM7Mip5hrGPj1P2GKjIGPDSHuXIuHYl7AnYSdiotpC7o062whRcstBah5SiUdgi8G3gDG3rYMCmAfCgR2uEYwBjgWD4QBR5uFoI3UP7ihqCLJB51JBGgRaAzeIouZ1hktDlzKB6gzRWVij3dkAHIqqIfF4IuAu4/9CXelCwDnkHPSLdWJM2iSDAHugy4XxTTeT9OCr7pRjcGqitga+P5ZzkEGdtsPJIuo1s2F20T+S+/jPBEwU/kdKLtP+WlEpwrYU1IAAAAAElFTkSuQmCC';
	const depGreen = 'data:image/png;base64,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';
	const pink = 'data:image/png;base64,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';
	
	return [blue,orange,green,purp,depRed,yellow,depOrg,depGreen,pink]
}
function _colors(){
	return ['#327bfa','#f6973d','#17d8a1','#7a3ceb','#e40036','#ffde1d','#f85b2c','#1da349','#eb3d7e']
}
function _areaStyleColor(){
	
	return [ 
		['rgba(50,123,250,0.3)','rgba(119,166,248,0.1)'],
		['rgba(246,151,61,0.3)','rgba(255,197,142,0.1)'],
		['rgba(23,216,161,0.3)','rgba(185,255,235,0.1)'],
		['rgba(122,60,235,0.3)','rgba(182,145,249,0.1)'],
		['rgba(228,0,54,0.3)','rgba(249,118,149,0.1)'],
		['rgba(255,222,29,0.3)','rgba(255,242,165,0.1)'],
		['rgba(248,73,44,0.3)','rgba(254,161,145,0.1)'],
		['rgba(29,163,73,0.3)','rgba(57,209,107,0.1)'],
		['rgba(235,61,126,0.3)','rgba(253,151,189,0.1)']
		
	];
}
	
	



let option = initOpt();


setTimeout(function(){
	const myChart = echarts.init(document.getElementById("pie"));
	myChart.setOption(option)
},2000)


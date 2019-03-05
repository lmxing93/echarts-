this.yestSum = 0;
this.todaySum = 0;
this.dataSet = [];

function _requestData(callback){
	const url = '../src/demo.json';
    fetch(url, {}).then(
	    	(response)=>{
	    		if(response.ok){
	    			return response.json()
	    		}else{
	    			return Promise.reject({
    					status: response.status,
	        			statusText: response.statusText
	    			})
	    		}
	    	})
        .then((responseJsonData)=> {
            callback && callback(responseJsonData);
        }).catch((error)=> {
            console.log("getWatchHistory error " + error);
        });
}
function _formatNum(str){
	var newStr = "";
	var count = 0;
	 
	if(str.indexOf(".")==-1){
	    for(var i=str.length-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
			   newStr = str.charAt(i) + "," + newStr;
			}else{
			   newStr = str.charAt(i) + newStr;
			}
			count++;
	   }		  
	   str = newStr;
	   return str;
	}else{
	   for(var i = str.indexOf(".")-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
			   newStr = str.charAt(i) + "," + newStr;
			}else{
			   newStr = str.charAt(i) + newStr; 
			}
			count++;
	   }
	   str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
	   return str
	}
	
}

function initData(){
	_requestData((res)=>{
		console.log(res);
		let dataSet = [];
		this.yestSum = res.yest;
		this.todaySum = res.today;
		
		initNum();
		
		let _data = res.data;
		_data.map((item,i)=>{
			dataSet.push({
				"x":item.time,
				"y":item.yesterday,
				"z":"昨日访问量"
			},{
				"x":item.time,
				"y":item.today,
				"z":"实时访问量"
			})
		})
		//console.log(dataSet);
		this.dataSet = dataSet;
		console.log(this.dataSet);
		const myChart = echarts.init(document.getElementById("area_dub"));
		let option = initOpt();
		myChart.setOption(option)
		
	})

}

function initNum(){
	let yest = _formatNum(this.yestSum+'');
	let cur = _formatNum(this.todaySum+'') ;
	let _html = `<span class="txt1">昨日访问量</span><span class="num1">&nbsp;&nbsp;${yest}</span>
				<span class="txt2">实时访问量</span><span class="num2">&nbsp;&nbsp;${cur}</span>`;
	
	$('#numCont').html(_html);
}


function initOpt () {
		
	let colorArr = getColors();
	let legData = ledgData();
	let dt = xAxisData();


	return {
		color: colorArr,
		legend: {				
			right:'4%',
			type:'scroll',
			show:false,
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
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
	        },
			backgroundColor:'rgba(3,43,80,0.3)',
			textStyle:{
				color:'rgba(255,255,255,0.7)',
				fontSize:16
			},
			extraCssText:'text-align:left',
			formatter:function(params){
//				console.log(params);
				let str = '';
//				params && params.map((item)=>{
//					//item.marker
//					let markerStr = `<span style="display:inline-block; margin-right:5px;border-radius:10px;width:9px;height:9px; background:${item.color.colorStops[0].color}"></span>`
//					
//					str += `${markerStr} ${item.seriesName}&nbsp;${item.value} <br/>`;
//				})
				return str
			}
		},
		xAxis: [{
			type : 'category',
			data : dt,
			axisTick: {
				show: true,
				alignWithLabel: true
			},
			axisLabel: { 
				color: '#ccc',
				fontSize: 14,
				formatter:(params,index)=>{
					return params;
				},
				margin: 20,
				
			},
			axisLine: {
				show:true,
				lineStyle: {
					color: 'rgba(255,255,255,0.4)', //坐标轴线颜色
					width: 1
					
	      		}
			}
		}],
		yAxis: [{
			type : 'value',
			axisLabel: { 
				color: "#ccc",
				fontSize: 14,
				formatter:function(val){
				    return val
				},
				margin: 20,
			},
			axisTick: {
				show: false,
				alignWithLabel: true
			},
			splitLine: { 
				show: true,
				lineStyle: {
					color: 'rgba(255,255,255,0.2)', //坐标轴线颜色
					type:'dashed',
					width: 1
      			}
			},
			axisLine: {
				show:false
			}
		}],
		series : setSeriesArray()
	};
}

function ledgend(){
		
	let legendDt =  new Set(this.dataSet && this.dataSet.map(item=>item.z));
	let _data = [];
	if(legendDt){
		for (let x of legendDt) { // 遍历Set
			_data.push(x)
		}
	}
	return _data;

}
function ledgData(){
	
	let legendDt =  new Set(this.dataSet && this.dataSet.map(item=>item.z));
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
				color: '#ccc',
				fontSize:12
			}
		})
	});

	return lgDt;

}
function setSeriesArray() {
	
	let _point = icon(),
		areaSty = areaStyleColor(),
		colors = getColors(),
		colg = colors.length;
	let dataKinds = ledgend(),
		dataLg = (this.dataSet).length,
		kinds = dataKinds.length;  //数据种类数n
	let _xData = xAxisData();
	let result = [];  //n个数组
		
	let obj = {};
	this.dataSet.forEach((item, i) => {
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
			max =  tempArr.sort(sortNumber).slice(0,1)+'';  //深拷贝
		maxArr.push(max);
	})

	//创建series
	let seriesArr = [];
	let itemArr = icon();
	result && result.map((item,ind)=>{
		let pth = ind%colg;
		seriesArr.push({
			name: dataKinds[ind],
			type:'line',
			data:item,
			symbolSize:5,
			showSymbol:false,
//				symbol: `image://${_point[pth]}`,
//				symbol:"emptyCircle",
			lineStyle:{
				normal:{
					color: colors[ind%colg],
					shadowColor:colors[ind%colg],
//						shadowBlur: 20,
//						shadowOffsetX: 1,
//						shadowOffsetY: 0,
//						opacity:1
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
			},
			itemStyle: {
                emphasis: {
	                color: itemArr[ind%colg] ,
	                borderColor: areaSty[ind%colg][1],
	                // extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
	                borderWidth: 10
           	 	}
            },
		})
	})
	
	//console.log("seriesArr",seriesArr);
	return seriesArr;
	
}
//数组排序不去重
function sortNumber(a,b){
	return b-a;
}
function yMaxData(){
	let dty = this.dataSet && this.dataSet.map(item=>item.y);
	let tempArr = dty.concat(),
		max =  tempArr.sort(sortNumber).slice(0,1);  //深拷贝
	 		
	return max
	
}

function xAxisData() {
	let xData =  new Set(this.dataSet && this.dataSet.map(item=>item.x));
	let _data = [];
	if(xData){
		for (let x of xData) { // 遍历Set
			_data.push(x)
		}
	}
	//console.log(_data);
	return _data;
	
}
function icon(){

	return [
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: 'rgba(245,104,27,0.5)'  }, // 1
			{offset: 1, color: 'rgba(245,237,27,0.5)' }
		], false),
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: 'rgba(31,196,182,0.5)'  }, //2
			{offset: 1, color: 'rgba(30,204,247,0.5)' } 
		], false)
	];
}
function getColors(){
	return [
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: 'rgba(245,104,27,0.8)'  }, // 1
			{offset: 1, color: 'rgba(245,237,27,0.8)' }
		], false),
		new this.echarts.graphic.LinearGradient(1, 0, 0, 0, 
		[
			{offset: 0,color: 'rgba(31,196,182,0.8)'  }, //2
			{offset: 1, color: 'rgba(30,204,247,0.8)' } 
		], false)
	];
}
function areaStyleColor(){
	
	return [ 
		['rgba(245,104,27,0.1)','rgba(245,237,27,0.1)'],
		['rgba(31,196,182,0.1)','rgba(30,204,247,0.1)']
	
	];
}


initData();

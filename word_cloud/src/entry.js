	


const dataSorce = [
{"x":"兰州","y":"20"},
{"x":"杭州","y":"30"},
{"x":"南昌","y":"30"},
{"x":"大连","y":"40"},
{"x":"武汉","y":"40"},
{"x":"成都","y":"50"},
{"x":"青岛","y":"50"},
{"x":"重庆","y":"60"},
{"x":"济南","y":"60"},
{"x":"哈尔滨","y":"70"},
{"x":"沈阳","y":"70"},
{"x":"太原","y":"80"},
{"x":"广州","y":"80"},
{"x":"苏州","y":"90"},
{"x":"乌鲁木齐","y":"90"},
{"x":"北京","y":"100"},
{"x":"南京","y":"100"},
{"x":"厦门","y":"100"},
{"x":"郑州","y":"110"},
{"x":"南宁","y":"110"},
{"x":"石家庄","y":"150"},
{"x":"上海","y":"180"},
{"x":"深圳","y":"200"}
]

function initOpt(){
	return {
		tooltip: {
			show: false,
			backgroundColor: 'rgba(3,43,80,0.7)',
			textStyle: {
				fontSize: 16,
				color:'rgba(255,255,255,0.7)'
			},
			formatter: function (data) {
				return `<div style="display:inline-block;width:10px;height:10px;border-radius:50% ;background:${data.color}"></div> ${data.name}  ${data.value}`
			}
		},
		series: [{
			name: '词云',
			type: 'wordCloud',
			gridSize: 20,
			sizeRange: [15, 83],
			rotationRange: [-90, 90],
			rotationStep: 90,
			shape: 'rect',
			drawOutOfBound: false, //超出自动隐藏
			data: _getData(),
			width: '95%',
			height: '95%'
		}]
	};
}
		
function _getData() {
		const colors = _colors();
		const length = colors.length;
		return dataSorce.map((item, i) => {
			const color = colors[i % length]
			return {
				name: item.x, value: item.y,
				textStyle: {
					normal: {
						color
					}
				}
			}
		})	
		
	}	

function _colors() {
	//五色
	return ['#327bfa', '#f6973d', '#17d8a1', '#7a3ceb',  '#ffde1d']
}


let option = initOpt();


setTimeout(function(){
	const myChart = echarts.init(document.getElementById("pie"));
	myChart.setOption(option)
},2000)


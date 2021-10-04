const loadChart = () => {

	fetch('/api/trackers', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	  }).then(response =>
	  {
		  response.json().then(data => {
			console.log(data);
			JSC.chart('chartContainer', {
				type: 'spline',
				title_label_text: 'Weight',
				legend_position: 'Legend',
				xAxis: { scale_type: 'time' },
				series: [{
					name: 'Track Daily Weight',
					points: data,
				}, ],
			});

		  })

	   })
	}
	
loadChart();

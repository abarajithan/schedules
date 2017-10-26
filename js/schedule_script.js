
(function addRow(){
	var day;
	var dayArray = ["mon","tue","wed","thu","fri","sat","sun"];
	var index = 0;
	for (var i = 0; i < dayArray.length; i++) {
		day = dayArray[i];
		var template = '<div class="'+day+'-'+index+'">'+
						'<div class="picker">'+
							'<input type="text" id="'+day+'-start-datepicker-'+index+'">'+
						'</div>'+
						'<div class="picker">'+
							'<input type="text" id="'+day+'-end-datepicker-'+index+'">'+
						'</div>'+
						'<div class="picker">'+
							'<input type="text" class="custom-timepicker" id="'+day+'-start-timepicker-'+index+'" tabindex="-1">'+
						'</div>'+
						'<div>'+
							'<div class="end-time" id="end-time-'+day+'-'+index+'"></div>'+
						'</div>'+
						'<div class="remove_img">'+
							'<img day="'+day+'"id="remove-'+day+'-'+index+'" src="images/close.png">'+
						'</div>'+
						'<div class="add_img">'+
							'<img day="'+day+'"id="add_'+day+'_row" src="images/add_circle.png">'+
						'</div>'+
					'</div>';
			$("#"+day+"-td").append(template);		
			$("#"+day+"-start-datepicker-"+index ).datepicker({
				minDate: -30,
				changeMonth: true,
      			changeYear: true
			});
			$("#"+day+"-end-datepicker-"+index ).datepicker({
				minDate: -30,
				changeMonth: true,
      			changeYear: true
			});
			$("#"+day+"-start-timepicker-"+index ).timepicker({
				timeFormat: 'h:mm p',
			    interval: 60,
			    minTime: '8',
			    maxTime: '20',
			    dynamic: false,
			    dropdown: true,
			    scrollbar: true
			});
	}
})();


$('.add_img img').click(function(){
	var day = $(this).attr('day');
	var index = $("#"+$(this).attr('day')+"-td").children().length;
	var template = '<div class="'+day+'-'+index+'">'+
						'<div class="picker">'+
							'<input type="text" id="'+day+'-start-datepicker-'+index+'">'+
						'</div>'+
						'<div class="picker">'+
							'<input type="text" id="'+day+'-end-datepicker-'+index+'">'+
						'</div>'+
						'<div class="picker">'+
							'<input type="text" class="custom-timepicker" id="'+day+'-start-timepicker-'+index+'" tabindex="-1">'+
						'</div>'+
						'<div>'+
							'<div class="end-time" id="end-time-'+day+'-'+index+'"></div>'+
						'</div>'+
						'<div class="remove_img">'+
							'<img day="'+day+'"id="remove-'+day+'-'+index+'" src="images/close.png">'+
						'</div>'+
					'</div>';
			$("#"+day+"-td").append(template);		
			$("#"+day+"-start-datepicker-"+index ).datepicker();
			$("#"+day+"-end-datepicker-"+index ).datepicker();
			$("#"+day+"-start-timepicker-"+index ).timepicker();
});
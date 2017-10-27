
var timeOptions = {
			timeFormat: 'h:mm p',
		    interval: 60,
		    minTime: '8',
		    maxTime: '20',
		    dynamic: false,
		    dropdown: true,
		    scrollbar: true
		};
var dateOptions = {
			minDate: -60,
			changeMonth: true,
  			changeYear: true
		};
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
						'<div class="remove_img visibility-off">'+
							'<img x-id="'+day+'-'+index+'" day="'+day+'"id="remove-'+day+'-'+index+'" src="images/close.png">'+
						'</div>'+
						'<div class="add_img">'+
							'<img day="'+day+'"id="add_'+day+'_row" src="images/add_circle.png">'+
						'</div>'+
					'</div>';
			$("#"+day+"-td").append(template);		
			$("#"+day+"-start-datepicker-"+index ).datepicker(dateOptions);
			$("#"+day+"-end-datepicker-"+index ).datepicker(dateOptions);
			$("#"+day+"-start-timepicker-"+index ).timepicker(timeOptions);
	}
})();


$('body').on('click', '.add_img img',function(){
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
						'<div class="remove_img visibility-off">'+
							'<img x-id="'+day+'-'+index+'" day="'+day+'"id="remove-'+day+'-'+index+'" src="images/close.png">'+
						'</div>'+
					'</div>';
	$("#"+day+"-td").append(template);		
	$("#"+day+"-start-datepicker-"+index ).datepicker(dateOptions);
	$("#"+day+"-end-datepicker-"+index ).datepicker(dateOptions);
	$("#"+day+"-start-timepicker-"+index ).timepicker(timeOptions);
	if(index >= 1){
		$("#"+day+"-td .remove_img").removeClass('visibility-off');
		$("#"+day+"-td .remove_img").addClass('visibility-on');
	}
});

$('body').on('click', '.remove_img img', function() {
	var rowId = $(this).attr('x-id');
	var day = rowId.split('-')[0];
	var index = rowId.split('-')[1];
    $('.'+rowId).remove();
    var childrens = $("#"+day+"-td").children();
    for (var i = parseInt(index); i < childrens.length; i++) {
    	$(childrens[i]).attr('class',day+'-'+i);
    	$(childrens[i]).find('#'+day+'-start-datepicker-'+(i+1)).attr('id',day+'-start-datepicker-'+i);
    	$(childrens[i]).find('#'+day+'-end-datepicker-'+(i+1)).attr('id',day+'-end-datepicker-'+i);
    	$(childrens[i]).find('#'+day+'-start-timepicker-'+(i+1)).attr('id',day+'-start-timepicker-'+i);
    	$(childrens[i]).find('#end-time-'+day+'-'+(i+1)).attr('id','end-time-'+day+'-'+i);
    	$(childrens[i]).find('#remove-'+day+'-'+(i+1)).attr('id','remove-'+day+'-'+i).attr('x-id',day+'-'+i);
    	if(!i){
    		var addImgTemplate = '<div class="add_img">'+
									'<img day="'+day+'"id="add_'+day+'_row" src="images/add_circle.png">'+
								'</div>';
    		$(childrens[i]).find('.remove_img').after(addImgTemplate);
    	}
    }

    if(childrens.length == 1){
		$("#"+day+"-td .remove_img").removeClass('visibility-on');
		$("#"+day+"-td .remove_img").addClass('visibility-off');
	}
});

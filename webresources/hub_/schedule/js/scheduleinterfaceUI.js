
(function(){
var data = new Data();
var locationId,serviceId,enrollmentId,enrollmentStartDate;
var params = decodeURIComponent(window.location.search.slice(6)).split('&');
if(params.length == 4){
	locationId = params[0].split('=')[1];
	serviceId = params[1].split('=')[1];
	enrollmentId = params[2].split('=')[1];
	enrollmentStartDate = params[3].split('=')[1];
}

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
			minDate: new Date(enrollmentStartDate),
			changeMonth: true,
  			changeYear: true,
  			onSelect: function(dateText) {
		        getTimings(new Date(dateText))
		    }
		};
	var day;
	var dayArray = [
		{
			dayId : 1,
			dayValue : "Monday",
			dayCode :"mon"
		},
		{
			dayId : 2,
			dayValue : "Tuesday",
			dayCode :"tue"
		},
		{
			dayId : 3,
			dayValue : "Wednesday",
			dayCode :"wed"
		},
		{
			dayId : 4,
			dayValue : "Thursday",
			dayCode :"thu"
		},
		{
			dayId : 5,
			dayValue : "Friday",
			dayCode :"fri"
		},
		{
			dayId : 6,
			dayValue : "Saturday",
			dayCode :"sat"
		},
		{
			dayId : 7,
			dayValue : "Sunday",
			dayCode :"sun"
		}
	];
	var index = 0;
	for (var i = 0; i < dayArray.length; i++) {
		day = dayArray[i].dayCode;
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
							'<img x-id="'+day+'-'+index+'" day="'+day+'"id="remove-'+day+'-'+index+'" src="/webresources/hub_/schedule/images/close.png">'+
						'</div>'+
						'<div class="add_img">'+
							'<img day="'+day+'"id="add_'+day+'_row" src="/webresources/hub_/schedule/images/add_circle.png">'+
						'</div>'+
					'</div>';
			$("#"+day+"-td").append(template);		
			$("#"+day+"-start-datepicker-"+index ).datepicker(dateOptions);
			$("#"+day+"-end-datepicker-"+index ).datepicker(dateOptions);
			$("#"+day+"-start-timepicker-"+index ).timepicker(timeOptions);
	}

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
								'<img x-id="'+day+'-'+index+'" day="'+day+'"id="remove-'+day+'-'+index+'" src="/webresources/hub_/schedule/images/close.png">'+
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
	    	$("#"+day+"-start-datepicker-"+(i+1) ).datepicker("destroy");
			$("#"+day+"-end-datepicker-"+(i+1) ).datepicker("destroy");
			$("#"+day+"-start-timepicker-"+(i+1) ).timepicker("destroy");
	    	$(childrens[i]).attr('class',day+'-'+i);
	    	$(childrens[i]).find('#'+day+'-start-datepicker-'+(i+1)).attr('id',day+'-start-datepicker-'+i);
	    	$(childrens[i]).find('#'+day+'-end-datepicker-'+(i+1)).attr('id',day+'-end-datepicker-'+i);
	    	$(childrens[i]).find('#'+day+'-start-timepicker-'+(i+1)).attr('id',day+'-start-timepicker-'+i);
	    	$(childrens[i]).find('#end-time-'+day+'-'+(i+1)).attr('id','end-time-'+day+'-'+i);
	    	$(childrens[i]).find('#remove-'+day+'-'+(i+1)).attr('id','remove-'+day+'-'+i).attr('x-id',day+'-'+i);
	    	if(!i){
	    		var addImgTemplate = '<div class="add_img">'+
										'<img day="'+day+'"id="add_'+day+'_row" src="/webresources/hub_/schedule/images/add_circle.png">'+
									'</div>';
	    		$(childrens[i]).find('.remove_img').after(addImgTemplate);
	    	}
	    	$("#"+day+"-start-datepicker-"+i ).datepicker(dateOptions);
			$("#"+day+"-end-datepicker-"+i ).datepicker(dateOptions);
			$("#"+day+"-start-timepicker-"+i ).timepicker(timeOptions);
	    }
	    if(childrens.length == 1){
			$("#"+day+"-td .remove_img").removeClass('visibility-on');
			$("#"+day+"-td .remove_img").addClass('visibility-off');
		}
	});

	$('#saveBtn').on('click',function(){
		var saveObj = [];
		var obj = {
			"hub_days": "",
			"hub_effectivestartdate" : "",
			"hub_effectiveenddate" : "",
			"hub_endtime":"",
			"hub_starttime":"",
			"hub_enrollementid": ""
		};
		for (var i = 0; i < dayArray.length; i++) {
			var childrens = $("#"+dayArray[i].dayCode+"-td").children();
			for (var j = 0; j < childrens.length; j++) {
				
				var startDate = $(childrens[j]).find('#'+dayArray[i].dayCode+'-start-datepicker-'+j).val();
				if(startDate != '')
					startDate = moment(moment(startDate).format('MM/DD/YYYY')).format('YYYY-MM-DD')
				
				var endDate = $(childrens[j]).find('#'+dayArray[i].dayCode+'-end-datepicker-'+j).val();
				if(endDate != '')
					endDate = moment(moment(endDate).format('MM/DD/YYYY')).format('YYYY-MM-DD')

				var startTime = $(childrens[j]).find('#'+dayArray[i].dayCode+'-start-timepicker-'+j).val();
				startTime = convertToMinutes(startTime);
				
				var obj = {
					startDate : startDate,
					startTime : startTime,
					endDate : endDate,
					endTime : $(childrens[j]).find('#end-time-'+dayArray[i].dayCode+'-'+j).text()
				}
			}
		}
	});

	function convertToMinutes(timeString) {
        if (timeString != undefined) {
            if (timeString.split(' ')[1] == 'AM') {
                var hours = parseInt(moment(timeString, 'h:mm A').format('h'));
                var minutes = parseInt(moment(timeString, 'h:mm A').format('mm'));
                return (hours * 60) + minutes;
            }
            else {
                var hours = parseInt(moment(timeString, 'h:mm A').format('h'));
                hours = hours != 12 ? hours + 12 : hours;
                var minutes = parseInt(moment(timeString, 'h:mm A').format('mm'));
                return (hours * 60) + minutes;
            }
        }
    }

    function getTimings(date){
    	var timingData = data.getTimings(locationId,serviceId,enrollmentId,moment(date).format('YYYY-MM-DD'),getDayValue(date));
    }

    function getDayValue(date) {
        if (date != undefined) {
            switch (moment(date).format('dddd').toLowerCase()) {
                case 'monday':
                    return 1;
                    break;
                case 'tuesday':
                    return 2;
                    break;
                case 'wednesday':
                    return 3;
                    break;
                case 'thursday':
                    return 4;
                    break;
                case 'friday':
                    return 5;
                    break;
                case 'saturday':
                    return 6;
                    break;
                case 'sunday':
                    return 7;
                    break;
            }
        }
    }
})();

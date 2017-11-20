
$.fn.productStrengthShowcase=function(options){
	
	var $productStrengthShowcase=this;
	
	//Click Handler for Icon	
	$productStrengthShowcase.find(".pss-icon").click(function(){
		
		//Show Layer
		icon_id = $(this).attr("id");
		layer_id = icon_id.replace("_i_","_l_");


		//Check if Text Highlight is needed
		var text_background_color=$(this).data("text-background-color");
		var layer_title=$(this).data("title");
		var layer_desc=$(this).data("description");
		var layer_button_text=$(this).data('button-text');
		var layer_button_link=$(this).data('button-link');
		var statistic_count=$(this).data('statistic-count');
		var statistic_icon=$(this).data('statistic-icon');
		var statistic_check_color=$(this).data('statistic-check-color');
		var statistic_uncheck_color=$(this).data('statistic-uncheck-color');
		var statistic_background_color=$(this).data('statistic-background-color');
		var statistic_count_color=$(this).data('statistic-count-color');



		/*$layerTitleWrapper = $productStrengthShowcase.find("#pss_layer_title_wrapper");
		$layerDescriptionWrapper = $productStrengthShowcase.find("#pss_layer_desc_wrapper");
		$layerButtonWrapper = $productStrengthShowcase.find("#pss_layer_button_wrapper");
		$layerStatisticWrapper = $productStrengthShowcase.find("#pss_layer_statistic_wrapper");*/

		$layerTextWrapper = $productStrengthShowcase.find("#pss_layer_text_wrapper");
		$layerTextWrapper.hide();
		

		$productStrengthShowcase.find(".pss-layer-card").css("background-color",text_background_color);


		//$layerTitleWrapper.hide();
		//$layerDescriptionWrapper.hide();
		//$layerButtonWrapper.hide();

		$productStrengthShowcase.find(".pss-layer:visible").fadeOut(500,function() {
			
			$productStrengthShowcase.find("#"+layer_id).fadeIn(500,function() {

				//Show Layer Title				
				console.log("layer_title: "+layer_title);
				if(null!=layer_title) {
					$layerTitle = $layerTextWrapper.find("#pss_layer_title");
					$layerTitle.html(layer_title).show();
					//$layerTitleWrapper.fadeIn();
					/*if(textHighlight) {
						$layerTitle.addClass("pss-highlight");
					} else {
						$layerTitle.removeClass("pss-highlight");
					}*/
				} else {
					$layerTextWrapper.find("#pss_layer_title").hide();
				}


				//Show Layer Description
				console.log("layer_desc: "+layer_desc);
				if(null!=layer_desc) {
					$layerDesc = $layerTextWrapper.find("#pss_layer_desc");
					$layerDesc.html(layer_desc).show();
					//$layerDescriptionWrapper.fadeIn();
					/*if(textHighlight) {
						$layerDesc.addClass("pss-highlight");
					} else {
						$layerDesc.removeClass("pss-highlight");
					}*/

				} else {
					$layerTextWrapper.find("#pss_layer_desc").hide();
				}

				//Show Layer Statistics
				console.log("statistic_count: "+statistic_count);
				if(null!=statistic_count) {
					//statistic_count = parseInt(statistic_count);
					//$layerStatistic = $layerStatisticWrapper.find("#pss_layer_statistic");
					$layerStatistic = $layerTextWrapper.find("#pss_layer_statistic");
					$layerStatistic.html("").show().css("background-color",statistic_background_color);
					
					//new
					$layerStatistic.append("<div class='pss-layer-stat-icon'><i class='fa "+statistic_icon+"' style='color:"+statistic_check_color+";'></i></div>");

					$layerStatistic.append("<div class='pss-layer-stat-bar' style='background-color:"+statistic_uncheck_color+";'><div class='pss-layer-stat-bar-highlight' style='width:"+(statistic_count*10)+"%;background-color:"+statistic_check_color+";'></div></div>");

					$layerStatistic.append("<div class='pss-layer-stat-count' style='color:"+statistic_count_color+";'>"+statistic_count+"<sub>/10</sub></div>");

					/*for(var i=0; i<statistic_count; i++) {
						$layerStatistic.append("<i class='fa "+statistic_icon+"' style='color:"+statistic_check_color+"'></i>");
					}
					for(var i=statistic_count; i<10; i++) {
						$layerStatistic.append("<i class='fa "+statistic_icon+"' style='color:"+statistic_uncheck_color+"'></i>");
					}*/
					//$layerStatisticWrapper.fadeIn();
				} else {
					$layerTextWrapper.find("#pss_layer_statistic").hide();
				}


				//Show Layer Buttons
				console.log("layer_button: "+layer_button_text);
				if(null!=layer_button_text) {

					$layerTextWrapper.find("#pss_layer_button").html(layer_button_text+"<i class='fa fa-caret-right'></i>").show();

					if(null!=layer_button_link) {
						$layerTextWrapper.find("#pss_layer_button_link").attr("href",layer_button_link);
					} else {
						$layerTextWrapper.find("#pss_layer_button_link").attr("href","");
					}
					
					//$layerButtonWrapper.fadeIn();

				} else {
					$layerTextWrapper.find("#pss_layer_button").hide();
				}


				$layerTextWrapper.fadeIn();
			


			});	
		
		});




		//Update Icon
		var icon_highlight_color=$(this).data('icon-highlight-color');
		$productStrengthShowcase.find(".pss-icon").removeClass("selected").find(".pss-dots,.pss-hover-icon").remove();
		$(this).addClass("selected").append("<div class='pss-dots'></div>").append("<div class='pss-hover-icon' style='color:"+icon_highlight_color+";'><i class='fa fa-caret-up'></i></div>");
		

		//Update Alignment
		var layer_alignment=$(this).data('align');
		if(layer_alignment=="right") {
			$productStrengthShowcase.removeClass("pss-left-align").addClass("pss-right-align");
		} else if(layer_alignment=="left") {
			$productStrengthShowcase.removeClass("pss-right-align").addClass("pss-left-align");
		} else {
			$productStrengthShowcase.removeClass("pss-left-align").removeClass("pss-right-align")
		}

		//Update Color
		var layer_text_color=$(this).data('text-color');

		
		if(null!=layer_text_color) {
			$productStrengthShowcase.find("#pss_layer_text_wrapper").css("color",layer_text_color);
			$productStrengthShowcase.find("#pss_layer_button").css("color",layer_text_color).css("box-shadow","inset 1px 1px 15px 0px "+layer_text_color);
			//$productStrengthShowcase.find(".pss-icon-box").css("background-color",layer_text_color);
			
		} else {
			$productStrengthShowcase.find("#pss_layer_text_wrapper").css("color","#ffffff");
			$productStrengthShowcase.find("#pss_layer_button").css("color","#ffffff");
			//$productStrengthShowcase.find(".pss-icon-box").css("background-color","#ffffff");
		}

		/*if(null!=button_background_color) {
			$productStrengthShowcase.find("#pss_layer_button").css("background-color",button_background_color);
		} else {
			$productStrengthShowcase.find("#pss_layer_button").css("background-color","rgba(0,0,0,0.3)");
		}*/

		/*if(null!=icon_highlight_color) {
			$productStrengthShowcase.find(".pss-icon.selected").css("background-color",icon_highlight_color);
		} else {
			$productStrengthShowcase.find(".pss-icon.selected").css("background-color","#000");			
		}*/

		

	});


	var pss_count = 1;
	var $firstLayer = null;

	$productStrengthShowcase.find(".pss-icon").each(function(i,v) {

		//Show All Icons & Images
		icon=$(v).data("icon");
		image=$(v).data('image');

		$(v).attr("id","pss_i_"+pss_count);

		$(v).append("<div class='pss-icon-thumbnail-wrapper'><div class='pss-icon-thumbnail' style='background-image:url("+icon+");'></div></div>");
		//.css("background-image","url("+icon+")");
		$productStrengthShowcase.append("<img class='pss-layer' id='pss_l_"+pss_count+"' src='"+image+"'>");

		pss_count++;

		//Find Selected Image
		selected=$(v).data("selected");
		console.log(selected);

		if(selected){
			$firstLayer = $(v);
		}

		//$productStrengthShowcase.append("<img class='loader-image' src='"+$(v).data("image")+"'>");

	});	


	$productStrengthShowcase.on("mouseenter",".pss-icon.selected", function(){
		$(this).find(".pss-hover-icon").toggleClass("pss-rotate");
	});

	$productStrengthShowcase.on("mouseleave",".pss-icon.selected", function(){
		$(this).find(".pss-hover-icon").toggleClass("pss-rotate");
	});


	//Adding Layer Title and Description
	$productStrengthShowcase.find(".pss-icon").wrapAll("<div class='pss-icon-wrapper' />").wrapAll("<div class='pss-icon-box' />");

	$productStrengthShowcase.append("<div id='pss_layer_text_wrapper'> <div class='pss-layer-card'> <div id='pss_layer_title'></div><div id='pss_layer_desc'></div><div id='pss_layer_statistic'></div><a id='pss_layer_button_link' href='' target='_blank'><button id='pss_layer_button'></button></a> </div> </div>");	



	

	$productStrengthShowcase.css("width" , options.width);
	$productStrengthShowcase.css("max-height" , options.maxHeight);

	//Load the first slide
	$firstLayer.click();


	//Set Icon sizes
	var iconMargin,iconWidth,sliderSize;

	$productStrengthShowcase.find(".pss-icon").css("width",options.iconSize).css("height",options.iconSize);
	$productStrengthShowcase.find(".pss-icon-box").css("height",options.iconSize);



	//Set Pointer position on Icons
	if(options.iconSize.indexOf("px")!=-1) {
		iconWidth = options.iconSize.substring(0,options.iconSize.length);
	} else {
		iconWidth = options.iconSize;
	}

	iconWidth = parseInt(iconWidth,10);	

	console.log("iconWidth:"+iconWidth);

	var pointerLeft = (iconWidth / 2) - 7;

	//var custom_styles = ".selected:after{left:"+pointerLeft+"px;}";
	var custom_styles = ".pss-hover-icon{left:"+pointerLeft+"px;}";

	$("head").append("<style class='pss-added-styles'>"+custom_styles+"</style>");

	
};
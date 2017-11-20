
var insertHoverButton = function($slide) {
	
	slide_new_price = $slide.data("new-price");
	slide_discount = $slide.data("discount");
	slide_old_price = $slide.data("old-price");

	slide_description = $slide.data("description");
	slide_text_background_color = $slide.data("text-background-color");
	slide_text_color = $slide.data("text-color");
	slide_link = $slide.data("link");

	if(null!=slide_new_price) {
		slide_title = "<div class='ds-title-wrapper'><u><div class='ds-new-price'>"+slide_new_price+"</div><div class='ds-offer-wrapper'><div class='ds-offer'>"+slide_discount+"</div><div class='ds-old-price'>"+slide_old_price+"</div></div></u></div>";
	} else {
		slide_title = "";
	}

	if(null!=slide_description) {
		slide_description = "<span class='ds-description-wrapper'>"+slide_description+"</span>";
	} else {
		slide_description = "";
	}


	//$slide.addClass("ds-slide-hover").append("<a class='ds-button-link' href='"+button_link+"'><div class='ds-button' style='color:"+button_icon_color+"; background-color:"+button_background_color+";'><i class='fa "+button_icon+"'></i></div>");
	$slide.append("<a target='_blank' class='ds-button-link' href='"+slide_link+"'><div class='ds-button' style='color:"+slide_text_color+"; background-color:"+slide_text_background_color+";'>"+slide_title+slide_description+"</div>");
};

$.fn.discountShowcase=function(options){
	
	var $showcaseContainer=this;

	if(!options.useAutomaticSettings) {
		options.mode = "custom";
	}
	
	//Click Handler for Slides	
	$showcaseContainer.find(".ds-slide").click(function(){


		$slideWrapper = $showcaseContainer.find(".ds-slide-wrapper");
		$slideWrapper.find(".ds-slide").removeClass("ds-"+options.mode+"-left-to-left-slide").removeClass("ds-"+options.mode+"-left-slide").removeClass("ds-"+options.mode+"-right-slide").removeClass("ds-"+options.mode+"-right-to-right-slide").removeClass("ds-center-slide").removeClass("ds-"+options.mode+"-right-most-slide").removeClass("ds-"+options.mode+"-left-most-slide");

		$centerSlide = $(this);
		$centerSlide.addClass("ds-center-slide");


		//NEW

		$previousSlide = $centerSlide;
		$nextSlide = $centerSlide;
		var iteration = 1;

		while(1) {
			
			$nextSlide = $nextSlide.next(".ds-slide");
			if(null==$nextSlide || $nextSlide.length==0) {
				$nextSlide = $slideWrapper.find(".ds-slide").first();
			}

			if($nextSlide.is("[class*='ds-"+options.mode+"']")) {
				break;
			} else {
				if(iteration==1) {
					$nextSlide.addClass("ds-"+options.mode+"-right-slide");
				} else if(iteration==2) {
					$nextSlide.addClass("ds-"+options.mode+"-right-to-right-slide");
				} else {
					$nextSlide.addClass("ds-"+options.mode+"-right-most-slide");
				}
				
			}


			$previousSlide = $previousSlide.prev(".ds-slide");
			if(null==$previousSlide || $previousSlide.length==0) {
				$previousSlide = $slideWrapper.find(".ds-slide").last();
			}

			if($previousSlide.is("[class*='ds-"+options.mode+"']")) {
				break;
			} else {
				if(iteration==1) {
					$previousSlide.addClass("ds-"+options.mode+"-left-slide");
				} else if(iteration==2) {
					$previousSlide.addClass("ds-"+options.mode+"-left-to-left-slide");
				} else {
					$previousSlide.addClass("ds-"+options.mode+"-left-most-slide");
				}
				
			}
			
			iteration++;

			
		}

		//select the proper control 
		slide_id = $(this).attr("id");
		control_id = slide_id.replace("_s_","_c_");
		$showcaseContainer.find(".selected").removeClass("selected");
		$showcaseContainer.find("#"+control_id).addClass("selected");

		/*
		slide_title = $centerSlide.data("title");
		slide_description = $centerSlide.data("description");
		$showcaseContainer.find('.ds-small-title-span').html(slide_title);
		$showcaseContainer.find('.ds-small-description').html(slide_description);
		*/
		

	});
		


	/*
	$showcaseContainer.on("mouseenter", ".ds-center-slide", function(){
		if($(this).hasClass("ds-slide-hover")) {
			return;
		} else {
			showHoverButton($(this));
		}
	});

	$showcaseContainer.on("mousemove", ".ds-center-slide", function(){
		if($(this).hasClass("ds-slide-hover")) {
			return;
		} else {
			showHoverButton($(this));
		}
	});

	$showcaseContainer.on("mouseleave", ".ds-center-slide", function(){

		$(this).removeClass("ds-slide-hover").find(".ds-button-link").empty().remove();

	});
	*/





	/*
	//add a title and description holder for Mobile mode 
	$showcaseContainer.append("<div class='ds-text-wrapper'><div class='ds-small-title'><span class='ds-small-title-span'></span></div><div class='ds-small-description'></div></div>");
	*/	
	


	var ds_count = 1;
	var $firstSlide = null;

	$showcaseContainer.find(".ds-slide").each(function(i,v) {

		//TODO: Add handle and slide id like below
		//slideId = "ds_slide_"+count;
		//handleId = "ds_handle_"+count;

		//Show All Images
		image=$(v).data('image');
		$(v).css("background-image","url("+image+")");
		$(v).attr("id","ds_s_"+ds_count);


		//Show Controls
		$showcaseContainer.append("<div class='ds-control' id='ds_c_"+ds_count+"' ></div>");
		ds_count++;

		//Find Selected Image
		selected=$(v).data("selected");
		console.log("selected: "+selected);

		if(selected){
			$firstSlide = $(v);
		}

		//$iconSlider.append("<img class='loader-image' src='"+$(v).data("image")+"'>");

		//added new permanent hover layers
		insertHoverButton($(v));

	});	



	//Click Handler for Slides	
	$showcaseContainer.find(".ds-control").click(function(){
		//select the proper slide 
		control_id = $(this).attr("id");
		slide_id = control_id.replace("_c_","_s_");
		console.log(slide_id);
		$showcaseContainer.find("#"+slide_id).click();

	});




	//Adding Layer Title and Description
	$showcaseContainer.find(".ds-slide").wrapAll("<div class='ds-slide-wrapper' />");
	$showcaseContainer.find(".ds-control").wrapAll("<div class='ds-control-wrapper' />");
	$showcaseContainer.find(".ds-slide-wrapper").append("<div class='ds-slide-description'></div>");
	//$iconSlider.append("<div id='is_layer_text_wrapper'><div id='is_layer_title'></div><div id='is_layer_desc'></div><div id='is_layer_statistic'></div><a id='is_layer_button_link' href='' target='_blank'><button id='is_layer_button'></button></a></div>");	


	

	$showcaseContainer.css("width" , options.width);

	//Load the first slide
	$firstSlide.click();


	
	var custom_styles = "";

	if(options.useParallaxEffect) {
		custom_styles +=".ds-concave-right-slide {background-position: right center;} .ds-concave-left-slide {background-position: left center;} .ds-concave-right-to-right-slide {background-position: right center;} .ds-concave-left-to-left-slide {background-position: left center;} .ds-convex-right-slide {background-position: right center;} .ds-convex-left-slide {background-position: left center;} .ds-convex-right-to-right-slide {background-position: right center;} .ds-convex-left-to-left-slide {background-position: left center;}";
	}

	if(options.useShadows) {
		//custom_styles += ".ds-slide {box-shadow: 0 3px 10px rgba(0,0,0,.23),0 3px 10px rgba(0,0,0,.16);}";
		custom_styles += ".ds-slide { box-shadow: 0px 10px 20px rgba(0,0,0,0.3);}";
	}

	

	//var slideWidth = parseInt(options.slideWidth);

	custom_styles += ".ds-slide,.ds-slide-wrapper {width: "+options.slideWidth+"px; height: "+options.slideHeight+"px;} ";

	//3 slide view

	if(options.useAutomaticSettings) {


		//concave
		custom_styles += ".ds-concave-right-slide {transform: translateX("+(options.slideWidth-50)+"px) translateZ(-300px) rotateY(-45deg);}";
		custom_styles += ".ds-concave-left-slide {transform: translateX(-"+(options.slideWidth-50)+"px) translateZ(-300px) rotateY(45deg);}";
		custom_styles += ".ds-concave-right-most-slide,.ds-concave-right-to-right-slide {transform: translateX("+(options.slideWidth+50)+"px) translateZ(-400px) rotateY(-45deg);}";
		custom_styles += ".ds-concave-left-most-slide,.ds-concave-left-to-left-slide {transform: translateX(-"+(options.slideWidth+50)+"px) translateZ(-400px) rotateY(45deg);}";


		//prefixed transforms
		custom_styles += ".ds-concave-right-slide {-webkit-transform: translateX("+(options.slideWidth-50)+"px) translateZ(-300px) rotateY(-45deg);}";
		custom_styles += ".ds-concave-left-slide {-webkit-transform: translateX(-"+(options.slideWidth-50)+"px) translateZ(-300px) rotateY(45deg);}";
		custom_styles += ".ds-concave-right-most-slide,.ds-concave-right-to-right-slide {-webkit-transform: translateX("+(options.slideWidth+50)+"px) translateZ(-400px) rotateY(-45deg);}";
		custom_styles += ".ds-concave-left-most-slide,.ds-concave-left-to-left-slide {-webkit-transform: translateX(-"+(options.slideWidth+50)+"px) translateZ(-400px) rotateY(45deg);}";


		//convex
		custom_styles += ".ds-convex-right-slide {transform: translateX("+(options.slideWidth-20)+"px) translateZ(-300px) rotateY(25deg);}"
		custom_styles += ".ds-convex-left-slide {transform: translateX(-"+(options.slideWidth-20)+"px) translateZ(-300px) rotateY(-25deg);}"
		custom_styles += ".ds-convex-right-most-slide,.ds-convex-right-to-right-slide {transform: translateX("+(options.slideWidth+100)+"px) translateZ(-400px) rotateY(25deg);}"
		custom_styles += ".ds-convex-left-most-slide,.ds-convex-left-to-left-slide {transform: translateX(-"+(options.slideWidth+100)+"px) translateZ(-400px) rotateY(-25deg);}"

		//prefixed transforms
		custom_styles += ".ds-convex-right-slide {-webkit-transform: translateX("+(options.slideWidth-20)+"px) translateZ(-300px) rotateY(25deg);}"
		custom_styles += ".ds-convex-left-slide {-webkit-transform: translateX(-"+(options.slideWidth-20)+"px) translateZ(-300px) rotateY(-25deg);}"
		custom_styles += ".ds-convex-right-most-slide,.ds-convex-right-to-right-slide {-webkit-transform: translateX("+(options.slideWidth+100)+"px) translateZ(-400px) rotateY(25deg);}"
		custom_styles += ".ds-convex-left-most-slide,.ds-convex-left-to-left-slide {-webkit-transform: translateX(-"+(options.slideWidth+100)+"px) translateZ(-400px) rotateY(-25deg);}"



		console.log(custom_styles);

		//5 slide view
		if(options.visibleSlides==5) {
			custom_styles += ".ds-concave-right-most-slide {transform: translateX("+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-concave-right-to-right-slide {transform: translateX("+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";
			custom_styles += ".ds-concave-left-most-slide {transform: translateX(-"+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-concave-left-to-left-slide {transform: translateX(-"+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";

			custom_styles += ".ds-convex-right-most-slide {transform: translateX("+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-convex-right-to-right-slide {transform: translateX("+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";
			custom_styles += ".ds-convex-left-most-slide {transform: translateX(-"+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-convex-left-to-left-slide {transform: translateX(-"+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";

			//prefixed transforms
			custom_styles += ".ds-concave-right-most-slide {-webkit-transform: translateX("+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-concave-right-to-right-slide {-webkit-transform: translateX("+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";
			custom_styles += ".ds-concave-left-most-slide {-webkit-transform: translateX(-"+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-concave-left-to-left-slide {-webkit-transform: translateX(-"+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";

			custom_styles += ".ds-convex-right-most-slide {-webkit-transform: translateX("+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-convex-right-to-right-slide {-webkit-transform: translateX("+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";
			custom_styles += ".ds-convex-left-most-slide {-webkit-transform: translateX(-"+(options.slideWidth+options.slideWidth-50)+"px) translateZ(-500px);} .ds-convex-left-to-left-slide {-webkit-transform: translateX(-"+(options.slideWidth+options.slideWidth-150)+"px) translateZ(-500px);opacity: 1;visibility: visible;}";
		}

	} else {

		options.mode = "custom";
		//center
		custom_styles += ".ds-center-slide {transform: translateX("+options.centerSlideTranslateX+"px) translateY("+options.centerSlideTranslateY+"px) translateZ("+options.centerSlideTranslateZ+"px) rotateX("+options.centerSlideRotateX+"deg) rotateY("+options.centerSlideRotateY+"deg) rotateZ("+options.centerSlideRotateZ+"deg);}";

		//right
		custom_styles += ".ds-custom-right-slide {transform: translateX("+options.lrSlideTranslateX+"px) translateY("+options.lrSlideTranslateY+"px) translateZ("+options.lrSlideTranslateZ+"px) rotateX("+options.lrSlideRotateX+"deg) rotateY("+options.lrSlideRotateY+"deg) rotateZ("+options.lrSlideRotateZ+"deg);}";

		//left
		custom_styles += ".ds-custom-left-slide {transform: translateX("+(-options.lrSlideTranslateX)+"px) translateY("+options.lrSlideTranslateY+"px) translateZ("+options.lrSlideTranslateZ+"px) rotateX("+options.lrSlideRotateX+"deg) rotateY("+(-options.lrSlideRotateY)+"deg) rotateZ("+(-options.lrSlideRotateZ)+"deg);}";

		//right to right
		custom_styles += ".ds-custom-right-to-right-slide {transform: translateX("+options.llrrSlideTranslateX+"px) translateY("+options.llrrSlideTranslateY+"px) translateZ("+options.llrrSlideTranslateZ+"px) rotateX("+options.llrrSlideRotateX+"deg) rotateY("+options.llrrSlideRotateY+"deg) rotateZ("+options.llrrSlideRotateZ+"deg);}";

		//left to left
		custom_styles += ".ds-custom-left-to-left-slide {transform: translateX("+(-options.llrrSlideTranslateX)+"px) translateY("+options.llrrSlideTranslateY+"px) translateZ("+options.llrrSlideTranslateZ+"px) rotateX("+options.llrrSlideRotateX+"deg) rotateY("+(-options.llrrSlideRotateY)+"deg) rotateZ("+(-options.llrrSlideRotateZ)+"deg);}";

		//right most
		custom_styles += ".ds-custom-right-most-slide {transform: translateX("+options.lmSlideTranslateX+"px) translateY("+options.lmSlideTranslateY+"px) translateZ("+options.lmSlideTranslateZ+"px) rotateX("+options.lmSlideRotateX+"deg) rotateY("+options.lmSlideRotateY+"deg) rotateZ("+options.lmSlideRotateZ+"deg);}";

		//left most
		custom_styles += ".ds-custom-left-most-slide {transform: translateX("+(-options.lmSlideTranslateX)+"px) translateY("+options.lmSlideTranslateY+"px) translateZ("+options.lmSlideTranslateZ+"px) rotateX("+options.lmSlideRotateX+"deg) rotateY("+(-options.lmSlideRotateY)+"deg) rotateZ("+(-options.lmSlideRotateZ)+"deg);}";


		console.log(custom_styles);

		//5 slide view
		if(options.visibleSlides==5) {
			custom_styles += ".ds-custom-right-to-right-slide {opacity: 1;visibility: visible;}";
			custom_styles += ".ds-custom-left-to-left-slide {opacity: 1;visibility: visible;}";
		}

	}

	if(options.backgroundColor) {
		custom_styles += ".discount-showcase {background-color: "+options.backgroundColor+";}";
	}

	if(!options.showControls) {
		custom_styles += ".ds-control-wrapper {display:none;}";
	}
	custom_styles += ".ds-control {box-shadow: inset 0 0 10px "+options.controlShadowColor+"; }";
	custom_styles += ".ds-control.selected {background-color: "+options.controlActiveBackgroundColor+";}";
	custom_styles += ".ds-control-wrapper {box-shadow: inset 0 0 10px "+options.controlBoxShadowColor+";}";


	custom_styles += ".ds-slide {transition: all "+options.slideSpeed+" ease-in-out;}";
	custom_styles += ".ds-slide {-webkit-transition: all "+options.slideSpeed+" ease-in-out;}";
	custom_styles += ".discount-showcase {padding-top: "+options.topSpacing+"px;}";
	custom_styles += ".discount-showcase {padding-bottom: "+options.bottomSpacing+"px;}";

	custom_styles += ".ds-text-wrapper {max-width: "+options.slideWidth+"px;}";
	
	$("head").append("<style class='discount-showcase-added-styles'>"+custom_styles+"</style>");

	
};
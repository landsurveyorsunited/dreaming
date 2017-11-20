var animationFlag = false;

$.fn.limitedProductsShowcase=function(options){

	var $limitedProductsShowcase=$(".limited-products-showcase");
	var note = $limitedProductsShowcase.data("note");

	//Adding Layer Title and Description
	$limitedProductsShowcase.find(".lps-slide").wrapAll("<div class='lps-slide-wrapper' />");
	$limitedProductsShowcase.prepend("<div class='lps-handle-wrapper'><div class='lps-handle-section'></div></div>");
	$limitedProductsShowcase.prepend("<div class='lps-text-wrapper'><div class='lps-text-section'><div class='lps-title'></div><div class='lps-description'></div><a class='lps-link'><div class='lps-button'></div></a><div class='lps-note'>"+note+"</div></div></div>");
	//$limitedProductsShowcase.find(".lps-control").wrapAll("<div class='lps-control-wrapper' />");

	
	var count = 1;
	var firstSlideNumber;
	//var slideCount = $(".testimony-showcase").find(".tt-slide").length;
	//init slide
	$limitedProductsShowcase.find(".lps-slide").each(function() {
		
		slideId = "lps_slide_"+count;
		handleId = "lps_handle_"+count;
		$(this).attr("id",slideId);
		$(this).data("slide-number",count);

		image = $(this).data("image");
		
		$(this).css("background-image","url("+image+")");
		$(this).data("slide-number",count);
		
		
		$limitedProductsShowcase.find(".lps-handle-section").append("<div id='"+handleId+"' class='lps-handle' data-slide-number='"+count+"'></div>");
			


		selected = $(this).data("selected");
		console.log("selected:"+selected);
		//console.log("imageId:"+imageId);
		if(selected) {
			firstSlideNumber = count;
		}

		count++;

	});


	//decide the first and last slides
	var totalSlides = $limitedProductsShowcase.find(".lps-slide").length;
	temporaryFirstSlideNumber = ((firstSlideNumber-1)<=0)?totalSlides:(firstSlideNumber-1);
	temporaryLastSlideNumber = ((temporaryFirstSlideNumber-1)<=0)?totalSlides:(temporaryFirstSlideNumber-1);
	$limitedProductsShowcase.find("#lps_slide_"+temporaryFirstSlideNumber).addClass("lps-first-slide");	
	$limitedProductsShowcase.find("#lps_slide_"+temporaryLastSlideNumber).addClass("lps-last-slide");
	showSlide(firstSlideNumber,$limitedProductsShowcase);


	$limitedProductsShowcase.find(".lps-slide").click(function() {
		slideNumber = $(this).data("slide-number");
		showSlide(slideNumber,$limitedProductsShowcase);
	});




	$limitedProductsShowcase.find(".lps-handle").click(function() {

		slideNumber = $(this).data("slide-number");		
		showSlide(slideNumber,$limitedProductsShowcase);

	});


}




	function showSlide(slideNumber,$limitedProductsShowcase) {

		if(animationFlag) {
			return;
		} else {
			animationFlag = true;	
		}
		

		$currentSlide = $("#lps_slide_"+slideNumber);

		//if first slide is clicked, make the next slide as the clicked slide
		if($currentSlide.hasClass("lps-first-slide")) {
			$currentSlide = $currentSlide.next();
			if(null==$currentSlide || $currentSlide.length==0) {
				$currentSlide = $limitedProductsShowcase.find(".lps-slide").first();
			}
			slideNumber = $currentSlide.data("slide-number");
		}

		$currentSlide.addClass("lps-current-slide");
		$firstSlide = $limitedProductsShowcase.find(".lps-first-slide");
		$lastSlide = $limitedProductsShowcase.find(".lps-last-slide");

		console.log("$currentSlide:",$currentSlide);
		console.log("$firstSlide:",$firstSlide);
		console.log("$lastSlide:",$lastSlide);

		//$limitedProductsShowcase.find(".lps-selected").removeClass("lps-selected");
		//$currentSlide.addClass("lps-selected");		

		


		var startingDepth = 0;
		var startingIndex = 100;
		

		$currentSlide.css("transform","rotateY(-25deg) translateY(300px) translateZ("+startingDepth+"px)");
		$currentSlide.css("z-index",startingIndex);
		$currentSlide.data("depth",startingDepth);

		var $nextSlide = $currentSlide;
		var $previousSlide; 

		var depthInterval = 200;
		var indexInterval = 2;


		var depth = startingDepth - depthInterval;
		var index = startingIndex - indexInterval;

		while(1) {
			
			if($nextSlide.hasClass("lps-last-slide")) {
				break;
			}

			$nextSlide = $nextSlide.next();
			if(null==$nextSlide || $nextSlide.length==0) {
				$nextSlide = $limitedProductsShowcase.find(".lps-slide").first();
			}

			$nextSlide.css("transform","rotateY(-25deg) translateY(300px) translateZ("+depth+"px)");
			$nextSlide.css("z-index",index);
			$nextSlide.data("depth",depth);
			depth -= depthInterval;
			index -= indexInterval;

			/*if($nextSlide.hasClass("lps-last-slide")) {
				break;
			}*/

		}

		var totalSlides = $limitedProductsShowcase.find(".lps-slide").length;
		var forwardDeepDepth = startingDepth + depthInterval;
		var backwardDeepDepth = startingDepth - (totalSlides)*depthInterval;

		while(1) {
			
			$nextSlide = $nextSlide.next();
			if(null==$nextSlide || $nextSlide.length==0) {
				$nextSlide = $limitedProductsShowcase.find(".lps-slide").first();
			}

			if($nextSlide.hasClass("lps-current-slide")) {
				break;
			}


			animateFrontSlide($nextSlide,depth,index,forwardDeepDepth,backwardDeepDepth,depthInterval);

			
			depth -= depthInterval;
			index -= indexInterval;	

			

		}


		
		$firstSlide.removeClass("lps-first-slide");
		$lastSlide.removeClass("lps-last-slide");
		
		$currentSlide.addClass("lps-first-slide").removeClass("lps-current-slide");
		$previousSlide = $currentSlide.prev();
		if(null==$previousSlide || $previousSlide.length==0) {
			$previousSlide = $limitedProductsShowcase.find(".lps-slide").last();
		}
		$previousSlide.addClass("lps-last-slide");

		



		//Display text for current slide

		title = $currentSlide.data("title");
		image = $currentSlide.data("image");
		description = $currentSlide.data("description");
		buttonText = $currentSlide.data("button-text");
		buttonLink = $currentSlide.data("button-link");
		
		description = description.replace("[h]","<span>").replace("[h]","</span>");;


		$limitedProductsShowcase.find(".lps-title").html(title);
		$limitedProductsShowcase.find(".lps-description").html(description);
		$limitedProductsShowcase.find(".lps-button").html(buttonText);
		$limitedProductsShowcase.find(".lps-link").attr("href",buttonLink);


		//select the right handle
		handleId = "lps_handle_"+slideNumber;
		$limitedProductsShowcase.find(".lps-handle").removeClass("selected");
		$limitedProductsShowcase.find("#"+handleId).addClass("selected");

		//display background image for mobile mode
		$limitedProductsShowcase.find(".lps-text-wrapper").css("background-image","url("+image+")");		
		

	}


	function animateFrontSlide($slide,depth,index,forwardDeepDepth,backwardDeepDepth,depthInterval) {

		//var deepDepth = 200;

		currentDepth = $slide.data("depth");
		forwardDeepDepth = currentDepth + 2*depthInterval;
		backwardDeepDepth = depth - 2*depthInterval;



		console.log("currentDepth:"+currentDepth);
		console.log("forwardDeepDepth:"+forwardDeepDepth);
		console.log("backwardDeepDepth:"+backwardDeepDepth);

		$slide.css({
			"opacity":"0",
			"transform":"rotateY(-25deg) translateY(300px) translateZ("+(forwardDeepDepth)+"px)",
			"z-index":index
		});

		window.setTimeout(function(){

			$slide.css({
				"transition":"none",
				"transform":"rotateY(-25deg) translateY(300px) translateZ("+(backwardDeepDepth)+"px)",
			});

		},500);
/*

		window.setTimeout(function(){

			$slide.css({
				"opacity":"1",
			});

		},2000);
*/

		window.setTimeout(function(){

			$slide.css({
				"transition":"all 1s",
				"transform":"rotateY(-25deg) translateY(300px) translateZ("+depth+"px)",
				"opacity":"1",
			});

			animationFlag = false;

		},700);

		$slide.data("depth",depth);

	}

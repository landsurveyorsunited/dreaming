
//var switchTimer;
var cardInAction = false,tsTimer;
//var isAnimating = false;

$.fn.doubleImageShowcase=function(options){

	var $doubleImageShowcase=this;

	$doubleImageShowcase.append("<div class='dis-image-section'><div class='dis-image-right-handle'></div></div><div class='dis-data-section'><div class='dis-data-image'></div></div>");

	$doubleImageShowcase.find(".dis-data-section").append("<div class='dis-nav'><div class='dis-prev'><i class='fa fa-caret-left'></i></div><div class='dis-next'><i class='fa fa-caret-right'></i></div></div>");
	
	$doubleImageShowcase.find(".dis-data-section").append("<div class='dis-data-wrapper'><div class='dis-text'><div class='dis-title'></div><div class='dis-description'></div></div> <div class='dis-cards'></div> <div class='dis-button'></div> </div>");

	


	var count = 1;
	//init slide
	$doubleImageShowcase.find(".dis-slide").each(function() {
		
		slideId = "dis_slide_"+count;

		$(this).attr("id",slideId);

		for(i=1;i<=3;i++) {
			image = $(this).data("image"+i);
			imageId = "dis_image"+i+"_slide"+count;
			$doubleImageShowcase.find(".dis-image-section").append("<img src='"+image+"' class='dis-hidden dis-image dis-image-horizontal' id='"+imageId+"' />")
		}

		selected = $(this).data("selected");
		console.log("selected:"+selected);
		//console.log("imageId:"+imageId);
		if(selected) {

			showSlide(count,$doubleImageShowcase);

		}

		count++;

	});



	imageSectionWidth = $doubleImageShowcase.find(".dis-image-section").width();
	//images loaded
	$doubleImageShowcase.find(".dis-image").load(function() {

		console.log("image loaded");

		width = $(this).width();

		console.log(width,imageSectionWidth);

		if(width<imageSectionWidth) {
			$(this).removeClass("dis-image-horizontal").addClass("dis-image-vertical");
		}

	});


	$doubleImageShowcase.on("click",".dis-card",function() {
		
		if(null!=tsTimer) {
			clearTimeout(tsTimer);
		}

		$card = $(this);

		showItem($card,$doubleImageShowcase);
		

	});

	$doubleImageShowcase.on("mouseenter",".dis-card",function() {
		

		if(null!=tsTimer) {
			clearTimeout(tsTimer);
		}

		$card = $(this);

		tsTimer = window.setTimeout(function() {

			showItem($card,$doubleImageShowcase);     		

        },300);


		
		//clearTimeout(switchTimer);
		//switchTimer = setTimeout(function(){

			
			//display text span on the thumbnail
			//$doubleImageShowcase.find(".dis-card-image span").removeClass("dis-span-visible");
			//$(this).find("span").addClass("dis-span-visible");

		//},300);
		
	});



	$doubleImageShowcase.find(".dis-next").click(function() {
		slideId = $doubleImageShowcase.find(".dis-selected").attr("id");
		slideNumber = slideId.split("_")[2];
		slideNumber = parseInt(slideNumber) + 1;
		totalSlides = $doubleImageShowcase.find(".dis-slide").length;
		if(slideNumber > totalSlides) {
			slideNumber = 1;
		}
		showSlide(slideNumber,$doubleImageShowcase);
	});

	$doubleImageShowcase.find(".dis-prev").click(function() {
		slideId = $doubleImageShowcase.find(".dis-selected").attr("id");
		slideNumber = slideId.split("_")[2];
		slideNumber = parseInt(slideNumber) - 1;
		totalSlides = $doubleImageShowcase.find(".dis-slide").length;
		if(slideNumber < 1) {
			slideNumber = totalSlides;
		}
		showSlide(slideNumber,$doubleImageShowcase);
	});



}


	function showItem($card,$doubleImageShowcase) {
		
		console.log("$card",$card);

		if(!cardInAction) {
			imageId = $card.data("image-id");
			$image = $doubleImageShowcase.find("#"+imageId);
			snippet = $card.find("span").text();
			
			if($image.hasClass("dis-visible")) {
				return;
			}

			cardInAction = true;

			$doubleImageShowcase.find(".dis-visible").fadeOut(600,function(){
				$(this).addClass("dis-hidden").removeClass("dis-visible");
			});

			$image.fadeIn(600,function(){
				console.log("snippet:"+snippet);
				$doubleImageShowcase.find(".dis-image-right-handle").html(snippet);
				$(this).removeClass("dis-hidden").addClass("dis-visible");
				cardInAction = false;	
			});

			imageSource = $image.attr("src");
			console.log("imageSource:"+imageSource);
			$doubleImageShowcase.find(".dis-data-image").css("background-image","url("+imageSource+")");
		}

	}


	//image animations
	/*
	$doubleImageShowcase.find(".dis-image-left-handle").mouseenter(function() {
		//if(!isAnimating) {
			isAnimating = true;
			$doubleImageShowcase.find("img.dis-visible").animate({"left":"+=20px"},function(){
				isAnimating = false;
			});
		//}
	});

	$doubleImageShowcase.find(".dis-image-left-handle").mouseleave(function() {
		//if(!isAnimating) {
			isAnimating = true;
			$doubleImageShowcase.find("img.dis-visible").animate({"left":"-=20px"},function(){
				isAnimating = false;
			});
		//}
	});

	$doubleImageShowcase.find(".dis-image-right-handle").mouseenter(function() {
		//if(!isAnimating) {
			isAnimating = true;
			$doubleImageShowcase.find("img.dis-visible").animate({"left":"-=20px"},function(){
				isAnimating = false;
			});
		//}
	});

	$doubleImageShowcase.find(".dis-image-right-handle").mouseleave(function() {
		//if(!isAnimating) {
			isAnimating = true;
			$doubleImageShowcase.find("img.dis-visible").animate({"left":"+=20px"},function(){
				isAnimating = false;
			});
		//}
	});
	*/


/*
	$(".dis-image-section").mouseenter(function(){

		$(".dis-data-section").addClass("grey-blur");

	});

	$(".dis-image-section").mouseleave(function(){

		$(".dis-data-section").removeClass("grey-blur");

	});
*/

	function showSlide(slideNumber,$doubleImageShowcase) {

		$slide = $("#dis_slide_"+slideNumber);

		$doubleImageShowcase.find(".dis-selected").removeClass("dis-selected");
		$slide.addClass("dis-selected");
		
		$doubleImageShowcase.find(".dis-visible").fadeOut(600,function(){
			$(this).addClass("dis-hidden").removeClass("dis-visible");
		});

		$image = $doubleImageShowcase.find("#dis_image1_slide"+slideNumber);

		$image.fadeIn(600,function(){
			$(this).removeClass("dis-hidden").addClass("dis-visible");	
		});

		imageSource = $image.attr("src");
		console.log("imageSource:"+imageSource);
		$doubleImageShowcase.find(".dis-data-image").css("background-image","url("+imageSource+")");

		$doubleImageShowcase.find(".dis-data-wrapper").fadeOut(300,function(){

			title = $slide.data("title");
			description = $slide.data("description");
			image1 = $slide.data("image1");
			image2 = $slide.data("image2");
			image3 = $slide.data("image3");
			snippet1 = $slide.data("snippet1");
			snippet2 = $slide.data("snippet2");
			snippet3 = $slide.data("snippet3");
			backgroundColor = $slide.data("background-color");
			textColor = $slide.data("text-color");
			iconColor = $slide.data("icon-color");
			buttonPrimaryText = $slide.data("button-primary-text");
			buttonPrimaryLink = $slide.data("button-primary-link");
			buttonPrimaryIcon = $slide.data("button-primary-icon");
			buttonSecondaryText = $slide.data("button-secondary-text");
			buttonSecondaryLink = $slide.data("button-secondary-link");
			buttonSecondaryIcon = $slide.data("button-secondary-icon");

			titleColor = $slide.data("title-color");

			
			$doubleImageShowcase.find(".dis-data-wrapper,.dis-title").css('color',titleColor);

			$doubleImageShowcase.find(".dis-title").html(title);
			$doubleImageShowcase.find(".dis-description").html(description);

			$doubleImageShowcase.find(".dis-cards").empty();
			$doubleImageShowcase.find(".dis-cards").append("<div class='dis-card' data-image-id='dis_image1_slide"+slideNumber+"'><div class='dis-card-image' style='background-image:url("+image1+");'><span>"+snippet1+"</span></div></div>");
			//<div class='dis-card-text'>"+snippet1+"</div>

			if(null!=image2) {
				$doubleImageShowcase.find(".dis-cards").append("<div class='dis-card' data-image-id='dis_image2_slide"+slideNumber+"'><div class='dis-card-image' style='background-image:url("+image2+");'><span>"+snippet2+"</span></div></div>");
			}

			if(null!=image3) {
				$doubleImageShowcase.find(".dis-cards").append("<div class='dis-card' data-image-id='dis_image3_slide"+slideNumber+"'><div class='dis-card-image' style='background-image:url("+image3+");'><span>"+snippet3+"</span></div></div>");
			}

			$doubleImageShowcase.find(".dis-data-wrapper").fadeIn(300);
			
			$doubleImageShowcase.find(".dis-data-section").css({"background-color":backgroundColor,"color":textColor});
			$doubleImageShowcase.find(".dis-prev,.dis-next,.dis-button i").css({"color":iconColor});

			console.log("buttonPrimaryText:"+buttonPrimaryText);


			if(buttonPrimaryIcon!=null) {
				buttonPrimaryIconHtml = "<i class='fa "+buttonPrimaryIcon+"'></i>";
			} else {
				buttonPrimaryIconHtml = "";	
			}		

			if(buttonSecondaryIcon!=null) {
				buttonSecondaryIconHtml = "<i class='fa "+buttonSecondaryIcon+"'></i>";
			} else {
				buttonSecondaryIconHtml = "";	
			}		

			if(null!=buttonPrimaryText) {
				buttonPrimaryTextHtml = "<a class='dis-primary-link' target='_blank' href='"+buttonPrimaryLink+"'><span class='dis-primary-text'>"+buttonPrimaryIconHtml+buttonPrimaryText+"</span>";
			} else {
				buttonPrimaryTextHtml = "";
			}

			if(null!=buttonSecondaryText) {
				buttonSecondaryTextHtml = "<a class='dis-secondary-link' target='_blank' href='"+buttonSecondaryLink+"'><span class='dis-secondary-text'>"+buttonSecondaryText+buttonSecondaryIconHtml+"</span>";
			} else {
				buttonSecondaryTextHtml = "";
			}

			

			if(buttonPrimaryTextHtml!="") {
				$doubleImageShowcase.find(".dis-button").html(buttonPrimaryTextHtml+buttonSecondaryTextHtml).css("display","inline-block");
			} else {
				$doubleImageShowcase.find(".dis-button").html("").css("display","none");
			}

		});		
		
		

	}

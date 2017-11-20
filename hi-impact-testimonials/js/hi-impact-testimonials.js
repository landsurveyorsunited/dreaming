
$.fn.hiImpactTestimonials=function(options){
	
	var $hiImpactTestimonials=this;

	$hiImpactTestimonials.append("<div class='hit-image-wrapper'><div class='hit-image-section'></div></div><div class='hit-data-wrapper'><div class='hit-data-section'></div></div><div class='hit-handle-wrapper'><div class='hit-handle-section'></div></div>");

	$hiImpactTestimonials.find(".hit-data-section").append("<div class='hit-rating-section'></div><div class='hit-review-section'></div><div class='hit-user-section'></div>");

	
	$hiImpactTestimonials.find(".hit-handle-section").html();

	var count = 1;
	var firstHandle;
	//var slideCount = $hiImpactTestimonials.find(".hit-slide").length;
	//init slide
	$hiImpactTestimonials.find(".hit-slide").each(function() {
		
		slideId = "hit_slide_"+count;
		handleId = "hit_handle_"+count;
		$(this).attr("id",slideId);

		rating = $(this).data("rating");
		
		
		$hiImpactTestimonials.find(".hit-handle-section").append("<div id='"+handleId+"' class='hit-handle' data-slide-number='"+count+"'><div class='hit-handle-inner'><span>"+rating+"<sub>/5</sub></span></div></div><br/>");
			


		selected = $(this).data("selected");
		console.log("selected:"+selected);
		//console.log("imageId:"+imageId);
		if(selected) {
			firstHandle = "#"+handleId;
		}

		count++;

	});


	$hiImpactTestimonials.find(".hit-handle").click(function() {

		slideNumber = $(this).data("slide-number");
		
		$hiImpactTestimonials.find(".hit-handle.selected").removeClass("selected");
		$(this).addClass("selected");
		
		showSlide(slideNumber,$hiImpactTestimonials);

	});


	
	$hiImpactTestimonials.find(firstHandle).click();


}


function showSlide(slideNumber,$hiImpactTestimonials) {

	$slide = $("#hit_slide_"+slideNumber);

	$hiImpactTestimonials.find(".hit-selected").removeClass("hit-selected");
	$slide.addClass("hit-selected");		

	rating = $slide.data("rating");
	review = $slide.data("review");
	userName = $slide.data("user-name");
	userImage = $slide.data("user-image");
	userCompany = $slide.data("user-company");


	$hiImpactTestimonials.find(".hit-image-section").fadeOut(300,function(){ 
		$(this).html("<img src='"+userImage+"'>").fadeIn(300);
	});

	$hiImpactTestimonials.find(".hit-data-section").fadeOut(300,function(){

		var ratingCounter = 1;
		starRating = Math.floor(rating);
		console.log("starRating:"+starRating);

		$hiImpactTestimonials.find(".hit-rating-section").html("");

		while(ratingCounter <= starRating) {
			$hiImpactTestimonials.find(".hit-rating-section").append("<i class='fa fa-star'></i>");
			 ratingCounter++;
		};

		if(rating > starRating) {
			$hiImpactTestimonials.find(".hit-rating-section").append("<i class='fa fa-star-half-o'></i>");
			ratingCounter++;
		}

		while(ratingCounter <= 5) {
			$hiImpactTestimonials.find(".hit-rating-section").append("<i class='fa fa-star-o'></i>");
			ratingCounter++;
		};

		review = review.replace("[h]","<span>").replace("[h]","</span>");;

		$hiImpactTestimonials.find(".hit-review-section").html("<i class='fa fa-quote-left'></i>"+review);

		$hiImpactTestimonials.find(".hit-user-section").html("<span class='hit-username'><i class='fa fa-user'></i>"+userName+"</span><span class='hit-user-company'><i class='fa fa-circle'></i>"+userCompany+"</span>");
		
		


		

		$hiImpactTestimonials.find(".hit-data-section").fadeIn(300);
	});		
	
	

}
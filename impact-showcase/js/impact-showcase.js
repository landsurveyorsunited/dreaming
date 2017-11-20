
var focusTimer;
var isFocusTimerOn;

var centerX,centerY,centerYRelativePage,maximumDistance,offsetTop;
var delta,f=0;

$.fn.impactShowcase=function(options){
	
	var $impactShowcase=this;

	//set dimentions
	$impactShowcase.css("width" , options.width);
	$impactShowcase.css("height" , options.height);



	//Adding Layer Title and Description
	title=$impactShowcase.data("title");
	description=$impactShowcase.data("description");
	image=$impactShowcase.data("image");
	link=$impactShowcase.data("link");

	

	$impactShowcase.append("<div class='focus-zoom'><div class='focus-wrapper'><a target='_blank' href='"+link+"'><div class='focus-button'><div class='focus-title'>"+title+"</div><div class='focus-description'>"+description+"</div></div></a></div></div>");	

	$impactShowcase.append("<div class='focus-eye'><i class='fa fa-paw'></i></div>");	

	$impactShowcase.find(".focus-zoom").css("background-image","url("+image+")");



	////console.log($(".impact-showcase").height());


	calculateDimensions($impactShowcase);

	
		
	//touch condition - modernizr
	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch || options.touchMode) {
		
		//click animation
		$impactShowcase.find(".focus-eye").css("display","inline-block");

		$impactShowcase.find(".focus-eye,.focus-button").click(function(i,v) {

			$impactShowcase.unbind("mousemove");
			$impactShowcase.find(".focus-eye").fadeOut();

			
			focusTimer = window.setInterval(function(){
				delta = 600 - f*6;
				//console.log("delta:"+delta);
				if(delta<=0) {
					clearInterval(focusTimer);
				}
				doFocus((centerX+delta),centerYRelativePage,centerX,centerY,centerYRelativePage,maximumDistance,$impactShowcase,options);
			    //$impactShowcase.find(".focus-zoom").css({"filter":"none","-webkit-filter":"none"});
			    f+=8;
			    
			}, 30);		
			
			
		});	


	} else {

		//mousemove animation
		$impactShowcase.mousemove(function(e) {
			if(isFocusTimerOn) {
				return;
			}

		    focusTimer = window.setTimeout(function(){
			    doFocus(e.pageX,e.pageY,centerX,centerY,centerYRelativePage,maximumDistance,$impactShowcase,options); 
			    isFocusTimerOn = false;
			}, 50);
		    
		    isFocusTimerOn = true;
		});
	
	}

	

	//Load the initial state
	doFocus((centerX+600),centerYRelativePage,centerX,centerY,centerYRelativePage,maximumDistance,$impactShowcase,options); 


	$(window).resize(function(){
		calculateDimensions($impactShowcase);
	});


	//var custom_styles = ".selected:after{left:"+pointerLeft+"px;}";
	//$("head").append("<style class='icon-slider-added-styles'>"+custom_styles+"</style>");

	
};


function calculateDimensions($impactShowcase) {

	offsetTop = $impactShowcase.offset().top;

	centerX = parseInt($impactShowcase.width()/2);
	centerY = parseInt($impactShowcase.height()/2);

	centerYRelativePage = centerY + offsetTop;

	maximumDistance = centerY>centerX?centerY:centerX;

	//console.log(centerX+"  "+centerY);
	//console.log("offsetTop: "+offsetTop);

}


function doFocus(pageX,pageY,centerX,centerY,centerYRelativePage,maximumDistance,$impactShowcase,options) {
		
		

		//e.clientX
		//e.clientY
		filterString="";
		filterList = options.filter;
		$focusZoom = $impactShowcase.find(".focus-zoom");
		distance = Math.sqrt((pageX-centerX)*(pageX-centerX) + (pageY-centerYRelativePage)*(pageY-centerYRelativePage));

		//console.log("distance: "+distance);

		//ZOOM
		if(filterList.indexOf("zoom")!=-1) {
			d=(distance<100)?100:distance;
			zoom = 1+(1/d);
			$focusZoom.css("transform","scale("+zoom+","+zoom+")");
		}
		
		//BLUR
		if(filterList.indexOf("blur")!=-1) {
			d=(distance<150)?0:distance;
			//console.log("options.blurMaximum:"+options.blurMaximum);
			if(options.blurMaximum==0) {
				blur = (d/100);
			} else {
				blur = (options.blurMaximum) + (options.blurMaximum)*(d - maximumDistance)/maximumDistance;	
			}	
			//console.log("blur: "+blur);
			filterString += "blur("+blur+"px) ";
		}

		//GRAY
		if(filterList.indexOf("gray")!=-1) {
			//console.log("maximumDistance: "+maximumDistance);
			d=(distance<50)?0:distance;
			grayscale = (d/maximumDistance)*100;
			if(grayscale>100)grayscale=100;
			//console.log("grayscale: "+grayscale);
			filterString += "grayscale("+grayscale+"%) ";
		}

		//HUE
		if(filterList.indexOf("hue")!=-1) {
			d=(distance<50)?0:distance;
			hueRotate = (d/maximumDistance)*360;
			//if(hueRotate>360)hueRotate=360;
			//console.log("hueRotate: "+hueRotate);
			filterString += "hue-rotate("+hueRotate+"deg) ";
		}

		//SEPIA
		if(filterList.indexOf("sepia")!=-1) {
			//console.log("maximumDistance: "+maximumDistance);
			d=(distance<50)?0:distance;
			sepia = (d/maximumDistance)*100;
			if(sepia>100)sepia=100;
			//console.log("sepia: "+sepia);
			filterString += "sepia("+sepia+"%) ";
		}

		//BRIGHTNESS		
		if(filterList.indexOf("brightness")!=-1) {
			//console.log("maximumDistance: "+maximumDistance);
			//d=(distance<150)?0:distance;
			brightness = options.brightnessMinimum - (options.brightnessMaximum - options.brightnessMinimum)*(distance - maximumDistance)/maximumDistance;
			//console.log("brightness: "+brightness);
			filterString += "brightness("+brightness+"%) ";
		}

		//SATURATE
		if(filterList.indexOf("saturate")!=-1) {
			//console.log("maximumDistance: "+maximumDistance);
			//d=(distance<150)?0:distance;		
			saturate = options.saturationMinimum - ((options.saturationMaximum - options.saturationMinimum)*(distance - maximumDistance)/maximumDistance);
			if(saturate<0)saturate=0;
			//console.log("saturate: "+saturate);
			filterString += "saturate("+saturate+"%) ";
		}

		//OPACITY		
		if(filterList.indexOf("opacity")!=-1) {
			//console.log("maximumDistance: "+maximumDistance);
			//d=(distance<150)?0:distance;
			opacity = options.opacityMinimum - (options.opacityMaximum - options.opacityMinimum)*(distance - maximumDistance)/maximumDistance;
			//if(opacity>100)opacity=100;
			//console.log("opacity: "+opacity);
			filterString += "opacity("+opacity+"%) ";
		}


		//console.log("filterString: "+filterString);

		$focusZoom.css("-webkit-filter",filterString);
		$focusZoom.css("filter",filterString);
		


}
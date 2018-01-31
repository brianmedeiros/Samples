//Loading several videos from Brightcove for play in a custom mobile media player

var landing = (function() {
	var locals = {},
		exports = {
			player1 : [],
			player2 : [],
			player3 : [],
			player4 : [],
		    APIModules : [],
		    videoPlayer1 : [], 
		    videoPlayer2 : [], 
		    videoPlayer3 : [],
		    videoPlayer4 : []
		    };


	exports.init = function() {
		//start Brightcove
		brightcove.createExperiences();
		
		//start products
		//Nav open or close
		
			$('#pNavMenue').click(function() {
				if ($(this).attr('class') == "open") {
					$(this).removeClass("open");
					$('.pNavItems').animate({
						height : "25px"
					}, 200, function() {
						$(".pNavItem").removeClass('show');
					});
				} else {
					$(this).addClass('open');
					$('.pNavItems').animate({
						height : "105px"
					}, 200, function() {
						$(".pNavItem").addClass('show');
					});
				}
			});

			
			
			
			//set up vid carousle
			$('.vidcarousel').jcarousel();
			$('.vidcarousel').on('jcarousel:animateend', function(event, carousel) {
				
				//pause vids
				if(typeof videoPlayer1 !== 'undefined'){videoPlayer1.pause();}
				if(typeof videoPlayer2 !== 'undefined'){videoPlayer2.pause();}
				if(typeof videoPlayer3 !== 'undefined'){videoPlayer3.pause();}
				if(typeof videoPlayer4 !== 'undefined'){videoPlayer4.pause();}
				
			    navT = "#"+carousel._target[0].id + "Nav";
			    $('.carouselNavItemVid').removeClass('active');
			    $(navT).addClass('active');
			});
			
			$('.jcarousel').jcarousel();
			
			$('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
			
	};
	
	exports.productNav = function(id){
		var target = "#product" + id;
		var targetMenue = "#product" + id + "Nav";
		$('.contestProduct').removeClass("active");
		$('.pNavItem').removeClass("active");
		$(targetMenue).addClass("active");
		$(target).addClass("active");
		$('#pNavMenue').trigger("click");
	};
	
	
	exports.vidNav = function(newTarget){
		$('.vidcarousel').jcarousel('scroll', newTarget);
		return false;
	};
	
	//set up videos to be handled
	exports.onTemplateLoad1 = function(experienceID){
     player1 = brightcove.api.getExperience(experienceID);
     APIModules = brightcove.api.modules.APIModules;
     videoPlayer1 = player1.getModule(APIModules.VIDEO_PLAYER);
    };
    exports.onTemplateLoad2 = function(experienceID){
     player2 = brightcove.api.getExperience(experienceID);
     APIModules = brightcove.api.modules.APIModules;
     videoPlayer2 = player2.getModule(APIModules.VIDEO_PLAYER);
    };
    exports.onTemplateLoad3 = function(experienceID){
     player3 = brightcove.api.getExperience(experienceID);
     APIModules = brightcove.api.modules.APIModules;
     videoPlayer3 = player3.getModule(APIModules.VIDEO_PLAYER);
    };
    exports.onTemplateLoad4 = function(experienceID){
     player4 = brightcove.api.getExperience(experienceID);
     APIModules = brightcove.api.modules.APIModules;
     videoPlayer4 = player4.getModule(APIModules.VIDEO_PLAYER);
    };
	

	return exports;
}());

$(document).ready(landing.init);
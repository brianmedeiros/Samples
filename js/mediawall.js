var MediaWall = (function(){
	var locals = {
			posts : [],
			videos : [],
			videoListHolder : [],
			wallCards : 0
		},
		exports = {},
		logger = Logger('MediaWall');

	exports.init = function(config) {		
		locals.config = config;
		locals.container = $("#mediaWall");			
		locals.initOwl();
	};

	exports.processPosts = function(posts) {
		/* 
			filter out tweets that dont have an image
		*/
		posts = posts.filter(function(post) {
			if (locals.config.sideWall) {
				var images = Utils.getImages(post);
				if (post.type !== 'twitter') {
					return locals.isNewPost(post);
				}
				if (images.length > 0) {
					return locals.isNewPost(post);
				}
				return false;
			}
			return locals.isNewPost(post);
		});

		locals.sortAndTrimArray(posts);

		locals.posts = posts.concat(locals.posts);
		locals.sortAndTrimArray(locals.posts);

		locals.refresh(posts);
	};

	

	locals.sortAndTrimArray = function(arr) {
		arr.sort(function(b,a) {
			return a.created_time > b.created_time;
		});

		if (arr.length > locals.config.apiLimit) {
			arr.splice(0, (arr.length - locals.config.apiLimit));
		}
	};

	locals.isNewPost = function(post) {
		var existing, length = locals.posts.length, i;
		for(i = 0; i < length; i++) {
			existing = locals.posts[i];
			if (existing.id === post.id) {
				return false;
			}
		}
		if (locals.posts.length > 0) {
			return post.created_time >= locals.posts[length -1].created_time;	
		}
		return true;
	};

	locals.initOwl = function() {
		locals.owl = locals.container.owlCarousel({
			items : 3,
			itemsDesktop : false,
			itemsDesktopSmall : false,
			itemsTablet : false,
			autoPlay : locals.config.postsDelay * 1000,
			pagination : false,
			responsive : false,
			itemsMobile : false,
			afterAction : locals.afterUpdate
		}).data('owlCarousel');

		locals.addLeftAndRightFillers();	
	};

	locals.addLeftAndRightFillers = function() {
		locals.owl.addItem('<div class="item filler"></div>');
		locals.owl.addItem('<div class="item filler"></div>');
	};

	locals.processTweet = function(post) {
		var image;
		if (post.emod_images && post.emod_images.length > 0) {
			image = post.emod_images[0].fullSize;
		} else {
			image = 'images/'+ locals.config.brand + "/blank_tweet.jpg";
		}
		return [
			'<div class="item">',
				'<div class="mwCard">',
					'<img src="',image,'" class="mwCardImg" />',
					'<div class="mwCardUser">@',post.user.screen_name,'</div>',
					'<div class="mwCardText">',Utils.highlightHashtags(post.text, locals.config.hashtags),'</div>',
					'<div class="mwCardDate">',moment(post.created_time).fromNow(),'</div>',
					'<div class="mwCardTwitter"></div>',
				'</div>',
			'</div>'
		].join('');
	};

	locals.processInstagram = function(post) {
		var text = (post.caption) ? post.caption.text : "";
		text = text + " ";//???
		text = Utils.highlightHashtags(text, locals.config.hashtags);

		return [
			'<div class="item">',
				'<div class="mwCard">',
					'<img src="',post.images.standard_resolution.url,'" class="mwCardImg" alt=""/>',
					'<div class="mwCardUser">@',post.user.username,'</div>',
					'<div class="mwCardText">',text,'</div>',
					'<div class="mwCardDate">',moment(post.created_time).fromNow(),'</div>',
					'<div class="mwCardInstagram"></div>',
				'</div>',
			'</div>'
		].join('');
	};

	locals.processVideo = function(video) {
		return [
			'<div class="item video" data-src="',video.path,'">',
				'<div class="mwCard">',
					'<div class="mwCardText">',
					'Want to see you and your friends on the wall?<br/><br/>',
					'Make a video of your own at The Macallan Slo Mo Booth.',
					'</div>',
					'<div class="mwCardVideo"></div>',
				'</div>',
			'</div>'
		].join('');
	};



	locals.refresh = function(posts) {
		$.each(posts, function(index, post) {
			var html;
			switch(post.type) {
				case 'instagram':
					html = locals.processInstagram(post);
					break;
				case 'twitter':
					html = locals.processTweet(post);
					break;
				case 'video':
					html = locals.processVideo(post);
					$(html).find('video').bind("ended", function() {
						owl.trigger('owl.next');
					});
					break;
			}
			
			locals.owl.addItem(html, locals.owl.itemsAmount - 1);
		});	
	};

	locals.addOrGetVideo = function(item, fn) {
		var video;
		if (item.hasClass('video') && item.data('src')) {
			if (item.find('video').length > 0) {
				video = item.find('video').get(0);
			} else {
				video = $([
					'<video width="100%" preload="none" loop">',
						'<source src="',item.data('src'),'" type="video/mp4">',
					'</video>'
				].join(''));
				item.find('.mwCard').prepend(video);
				video = video.get(0);
			}
			fn(video);
		}
	};

	locals.unloadIfHasVideo = function(item) {
		var video = item.find('video');
		if (video.length > 0) {
			logger.debug('removing video');
			video.remove();
		}
	};

	locals.stopIfHasVideo = function(item) {
		locals.addOrGetVideo(item, function(video) {
			logger.log('stop video');
			if (video.paused === false) {
				video.pause();	
			}
		});
	};

	locals.playIfHasVideo = function(item) {
		locals.addOrGetVideo(item, function(video) {
			video.load();
			video.play();
		});
	};

	locals.loadVideo = function(item) {
		locals.addOrGetVideo(item, function(video) {
			video.load();
		});
	};

	locals.removeOldItems = function() {
		var diff, owl = locals.owl;
		if (owl.itemsAmount > (locals.config.apiLimit + 2)) {
			diff = owl.itemsAmount - (locals.config.apiLimit + 2);
			for(var i = 0; i < diff; i++) {
				owl.removeItem(1);
			}
		}
	};

	
	
	//update the new target card to have the larger class
	locals.afterUpdate = function() {
		var owl = locals.owl,
			items = $('.item'),
			target = items.removeClass('itemSelect').eq(owl.currentItem + 1),
			previous;

		if (owl.currentItem === 0) {
			/*
				calling removeItem() causes the carousel to reset, 
				so we need to avoid calling it until we're back at the beginning
			*/
			locals.removeOldItems();
		}

		items.removeClass('visible');
		$.each(owl.visibleItems, function(index, item) {
			items.eq(item).addClass('visible');
		});		

		target.addClass('itemSelect');
		
		if (owl.prevItem !== owl.currentItem) {
			previous = items.eq(owl.prevItem + 1);
			locals.stopIfHasVideo(previous);
			locals.unloadIfHasVideo(items.eq(owl.prevItem));
		}

		locals.playIfHasVideo(target);
		locals.loadVideo(items.eq(owl.currentItem + 2));
	}


	return exports;
}());
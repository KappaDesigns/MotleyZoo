import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/about.scss';
import $ from 'jquery';
import axios from 'axios';

const youtubeURL = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCvou9yaekveOZsyzGQljrNA&maxResults=8&key=AIzaSyB3Z7lmRzaqRwPzoVtzks2ZaSQKABmMGQM';

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	animate,
	animateOpacity,
	animateTranslateY,
} from './common';



const headerSizeRatio = window.innerHeight / 2;
const scrollRatio = 4;

$(document).ready(() => {
	const $siteTitle = $('.sub-page-title');
	const $siteDesc = $('.page-desc');
	const $navbar = $('.nav-bar');
	const $backgroundImage = $('.animal-image');
	const $employeeContainer = $('.our-people');
	const $sponsorContainer = $('.sponsors-container');
	const $sponsors = $('.sponsor');
	const $videoContainer = $('.video-container');
	const $livestreamContainer = $('.livestream-container');
	const $flexButtons = $('.flex-btns');
	sizeSponsorImages($sponsors);

	handleHeaderAnimations($siteTitle, $siteDesc, $navbar, $backgroundImage);
	addSponsorListeners($sponsors);
	displayYoutubeVideos($videoContainer, () => {
		$(window).scroll(() => {
			let scrollBottom = $(window).scrollTop() + window.innerHeight;
			animateContainer($employeeContainer, scrollBottom, '.employee', (child) => {
				animateOpacity(child, 1, '1s');
				animateTranslateY(child, '100px', '1.5s');
			});
		});
	});
	handleVideoView($flexButtons, $videoContainer, $livestreamContainer);

	$(window).scroll(() => {
		let scrollBottom = $(window).scrollTop() + window.innerHeight;
		handleNavbarPosition($navbar, headerSizeRatio);

		animateContainer($sponsorContainer, scrollBottom, '.sponsor', (child) => {
			animateOpacity(child, 1, '1s');
		});
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
		sizeSponsorImages($sponsors);
		addSponsorListeners($sponsors);
	});
});

function handleVideoView(flexButtons, videoContainer, livestreamContainer) {
	const [ btn1, btn2 ] = Array.from(flexButtons.children());
	$(btn1).click(() => {
		$(btn2).removeClass('active');
		$(btn1).addClass('active');
		livestreamContainer.slideUp(500);
		setTimeout(function () {
			videoContainer.slideDown(500);
		}, 500);
	});
	$(btn2).click(() => {
		$(btn1).removeClass('active');
		$(btn2).addClass('active');
		videoContainer.slideUp(500);
		setTimeout(function () {
			livestreamContainer.slideDown(500);
		}, 500);
	});
}

function addSponsorListeners(sponsors) {
	if (window.innerWidth > 960) {
		addDesktopSponsorListeners(sponsors);
	} else {
		addMobileSponsorListeners(sponsors);
	}
}

function addMobileSponsorListeners(sponsors) {
	let secondClick = false;
	sponsors.click((e) => {
		let $overlay = $(e.target).find('.overlay');
		if ($overlay.is('p')) {
			$overlay = $overlay.parent();
		}
		if (!secondClick) {
			showSponsor(e);
		} else {
			let sponsors = Array.from($('.sponsor'));
			sponsors.forEach((sponsor) => {
				hideSponsor({
					target: sponsor,
				});
			});
			gotoSponsor(e);
		}
	});
}

function addDesktopSponsorListeners(sponsors) {
	sponsors.mouseenter(showSponsor);
	sponsors.mouseleave(hideSponsor);
	sponsors.click(gotoSponsor);
}

function gotoSponsor(e) {
	console.log(e);
	let elem = $(e.target);
	while(elem.prop('class') != 'sponsor') {
		elem = elem.parent();
	}
	let url = elem.data('link');
	window.location.href = url;
}

function hideSponsor(e) {
	let $overlay = $(e.target);
	let cls = $overlay.prop('class');
	if (cls == 'sponsor') {
		$overlay = $(e.target).find('.overlay');
	} else if (cls != 'overlay') {
		$overlay = $(e.target).parent();
	}
	$overlay.hide();
	animateOpacity($overlay, 0, '0.5s');
	animate($overlay, 'margin-top', '0px', '0.5s');
	return $overlay;
}

function showSponsor(e) {
	let $overlay = $(e.target).find('.overlay');
	if ($overlay.is('p')) {
		$overlay = $overlay.parent();
	}
	$overlay.show();
	animateOpacity($overlay, 1, '0.5s');
	animate($overlay, 'margin-top', -($overlay.height()), '0.5s');
}

function animateContainer(container, scrollBottom, selector, animations) {
	let y = container.offset().top;
	let height = container.height();
	const scrollTrigger = y + height / scrollRatio;

	if (scrollBottom > scrollTrigger) {
		let children = Array.from($(selector));
		children.forEach((child) => {
			animations(child);
		});
	}
}

function handleHeaderAnimations(siteTitle, siteDesc, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleSiteTitleAnimation(siteDesc);
	handleNavbarAnimation(navbar);
}

function sizeSponsorImages($sponsors) {
	let sponsors = Array.from($sponsors);

	sponsors.forEach((sponsor) => {
		let url = $(sponsor).css('background-image').substring(5, $(sponsor).css('background-image').length);
		url = url.substring(0, url.length - 2);
		let img = new Image();
		img.src = url;

		$(img).one('load', function () {
			let width = img.width;
			let height = img.height;
			$(sponsor).css({
				'padding-top': height / width * $(sponsor).width(),
			});
			$(sponsor).find('.overlay').css({
				'height': height / width * $(sponsor).width(),
			});
		});
	});
}

function displayYoutubeVideos($videoContainer, next) {
	axios.get(youtubeURL)
		.then((res) => {
			return res.data;
		})
		.then((data) => {
			return data.items.reduce((x, res) => {
				x.push({
					id: res.id.videoId,
					title: res.snippet.title,
					thumbnail: res.snippet.thumbnails.high.url,
				});
				return x;
			}, []);
		})
		.then((videos) => {
			let str = videos.reduce((x, video, i) => {
				return x + `<div data-id="${video.id}" id="video-${i+1}" class="video">`+
											`<h6 class="title">${video.title}</h6>`+
											`<img src="${video.thumbnail}" class="thumbnail"/>`+
											'<img src="../public/imgs/youtube.svg" alt="play icon" class="icon"/>'+
										'</div>';
			}, '');
			str += '<div class="btn-container">'+
								'<a href="../about/our_pets" class="motley-btn-main">See All Pets</a>'+
							'</div>';
			$videoContainer.append(str);
			let timer = setInterval(function () {
				if (Array.from($videoContainer.children()).length > 0) {
					clearInterval(timer);
					addLoadHandlers($videoContainer);
					next();
				}
			}, 10);
		});
}

function addLoadHandlers(container) {
	let videos = Array.from(container.children());
	videos = videos.slice(0,-1);
	videos.forEach((video) => {
		$(video).click((e) => {
			let $target = $(e.target);
			while ($target.prop('class') != 'video') {
				$target = $target.parent();
			}
			let id = $target.data('id');
			let $thumbnail = $target.find('.thumbnail');
			let height = $thumbnail.height();
			let width = $thumbnail.width();
			let html = `<iframe style="background-color: black" height="${height}" width="${width}" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
			$thumbnail.remove();
			$target.find('.icon').remove();
			$target.append(html);
		});
	});
}

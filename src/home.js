import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import './css/home.scss';
import $ from 'jquery';
import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';

const mobileAnimationWidth = 720;
const transitionHeight = 2;

$(document).ready(() => {
	const $backgroundImage = $('.image-overlay');
	const $siteTitle = $('.site-title');
	const $navbar = $('.nav-bar');
	const $animationContainer = $('.animation-container');

	let hasColorChanged = false;

	handleJumbotronAnimations(
		$backgroundImage,
		$siteTitle,
		$navbar
	);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, window.innerHeight);
		animateAboutUs($animationContainer);
		if (!hasColorChanged) {
			hasColorChanged = handleJumbotronColor($siteTitle);
		}
	});
});

function handleJumbotronColor(siteTitle) {
	if ($(window).scrollTop() >= 0 && $(window).scrollTop() <= window.innerHeight) {
		siteTitle.css({
			'transition':'color 2s ease-in-out',
			'color':'rgb(73, 39, 0)',
		});
	}
	return true;
}

function animateAboutUs(container) {
	let elems = Array.from(container.find('.animation-part'));
	let values = elems.map((ele) => {
		return $(ele).offset().top + $(ele).height() / transitionHeight;
	});
	if (window.innerWidth < mobileAnimationWidth) {
		handleMobileAnimation(elems, values);
	} else {
		handleDesktopAnimation(elems, values);
	}
}

function handleDesktopAnimation(elems, values) {
	let scrollBottom = $(window).scrollTop() + window.innerHeight;
	values.forEach((val, i) => {
		animateOpacity(elems[i], val, scrollBottom);
	});
}

function handleMobileAnimation(elems, values) {
	let scrollBottom = $(window).scrollTop() + window.innerHeight;
	values.forEach((val, i) => {
		animateOpacity(elems[i], val, scrollBottom);
	});
}

function animateOpacity(elem, val, scrollBottom) {
	if (scrollBottom > val) {
		$(elem).css({
			'transition': 'opacity 1s ease-in-out',
			'opacity': 1,
		});
	} else  {
		$(elem).css({
			'transition': 'opacity 1s ease-in-out',
			'opacity': 0,
		});
	}
}

function handleJumbotronAnimations(backgroundImage, siteTitle, navbar) {
	handleNavbarAnimation(navbar);
	handleSiteTitleAnimation(siteTitle);
	handleBackgroundAnimation(backgroundImage);
}

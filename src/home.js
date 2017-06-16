import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import './css/home.scss';
import $ from 'jquery';
import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	animateOpacity,
	animate,
} from './common';

//general const to remove magic numbers
const mobileAnimationWidth = 720;
const transitionHeight = 2;

// once all html has loaded begin animations
// ensures that all elements are mounted
$(document).ready(() => {
	const $backgroundImage = $('.animal-image');
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

	$(window).resize(() => {
		handleNavbarPosition($navbar, window.innerHeight);
	});
});

// animates the jumbotron color on scroll
function handleJumbotronColor(siteTitle) {
	if ($(window).scrollTop() >= 0 && $(window).scrollTop() <= window.innerHeight) {
		animate(siteTitle, 'color', 'rgb(73, 39, 0)', 2);
	}
	return true;
}

// animates about us based of if mobile or desktop animation
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

//desktop animation for about us section
function handleDesktopAnimation(elems, values) {
	let scrollBottom = $(window).scrollTop() + window.innerHeight;
	values.forEach((val, i) => {
		if (scrollBottom > val) {
			animateOpacity(elems[i], 1, 1);
		} else {
			animateOpacity(elems[i], 0, 1);
		}
	});
}

//mobile animation for about us section
function handleMobileAnimation(elems, values) {
	let scrollBottom = $(window).scrollTop() + window.innerHeight;
	values.forEach((val, i) => {
		if (scrollBottom > val) {
			animateOpacity(elems[i], 1, 1);
		} else {
			animateOpacity(elems[i], 0, 1);
		}
	});
}

// handles all animations within the jumbotron
function handleJumbotronAnimations(backgroundImage, siteTitle, navbar) {
	handleNavbarAnimation(navbar);
	handleSiteTitleAnimation(siteTitle);
	handleBackgroundAnimation(backgroundImage);
}

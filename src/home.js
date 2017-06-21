import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/home.scss';

import $ from 'jquery';

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	animateOpacity,
	animateTranslateY,
	animate,
} from './common';

// once all html has loaded begin animations
// ensures that all elements are mounted
$(document).ready(() => {
	const $backgroundImage = $('.animal-image');
	const $siteTitle = $('.site-title');
	const $navbar = $('.nav-bar');

	let hasColorChanged = false;

	handleJumbotronAnimations(
		$backgroundImage,
		$siteTitle,
		$navbar
	);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, window.innerHeight);
		animateAboutUs();

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
function animateAboutUs() {
	let before = $('.before').find('img');
	let after = $('.after').find('img');
	let scrollBottom = $(window).scrollTop() + window.innerHeight;
	if (scrollBottom > after.offset().top + after.height()) {
		animateTranslateY(after.parent(), '0px', 2);
		animateOpacity(after.parent(), 1, 2);
	}
	if (scrollBottom > before.offset().top + before.height()) {
		animateOpacity(before.parent(), 1, 2);
		animateTranslateY(before.parent(), '0px', 2);
	}
}

// handles all animations within the jumbotron
function handleJumbotronAnimations(backgroundImage, siteTitle, navbar) {
	handleNavbarAnimation(navbar);
	handleSiteTitleAnimation(siteTitle);
	handleBackgroundAnimation(backgroundImage);
}

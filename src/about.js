import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/about.scss';
import $ from 'jquery';

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
	sizeSponsorImages($sponsors);

	handleHeaderAnimations($siteTitle, $siteDesc, $navbar, $backgroundImage);
	addSponsorListeners($sponsors);

	$(window).scroll(() => {
		let scrollBottom = $(window).scrollTop() + window.innerHeight;
		handleNavbarPosition($navbar, headerSizeRatio);

		animateContainer($employeeContainer, scrollBottom, '.employee', (child) => {
			animateOpacity(child, 1, 1);
			animateTranslateY(child, '100px', 1.5);
		});

		animateContainer($sponsorContainer, scrollBottom, '.sponsor', (child) => {
			animateOpacity(child, 1, 1);
		});
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
		sizeSponsorImages($sponsors);
		addSponsorListeners($sponsors);
	});
});

function addSponsorListeners(sponsors) {
	const $overlays = $('.overlay');
	animateOpacity($overlays, 0, 0.5);
	animate($overlays, 'margin-top', 0, 0.5);
	if (window.innerWidth > 960) {
		addDesktopSponsorListeners(sponsors);
	} else {
		addMobileSponsorListeners(sponsors);
	}
}

function addMobileSponsorListeners(sponsors) {
	sponsors.click((e) => {
		const $overlays = $('.overlay');
		animateOpacity($overlays, 0, 0.5);
		animate($overlays, 'margin-top', 0, 0.5);

		let $overlay = $(e.target).find('.overlay');
		animateOpacity($overlay, 1, 0.5);
		animate($overlay, 'margin-top', -($overlay.height()), 0.5);
	});
}

function addDesktopSponsorListeners(sponsors) {
	sponsors.mouseenter((e) => {
		let $overlay = $(e.target).find('.overlay');
		animateOpacity($overlay, 1, 0.5);
		animate($overlay, 'margin-top', -($overlay.height()), 0.5);
	});
	sponsors.mouseleave((e) => {
		let $overlay = $(e.target);
		if ($overlay.prop('class') == 'sponsor') {
			$overlay = $(e.target).find('.overlay');
		} else {
			$overlay = $(e.target).parent();
		}
		animateOpacity($overlay, 0, 0.5);
		animate($overlay, 'margin-top', 0, 0.5);
	});
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

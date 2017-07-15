import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/events.scss';
import $ from 'jquery';
import moment from 'moment';

const headerSizeRatio = window.innerHeight / 2;

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';

$(document).ready(() => {
	const $siteTitle = $('.sub-page-title');
	const $navbar = $('.nav-bar');
	const $backgroundImage = $('.animal-image');
	handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);
	displayDate();

	$(window).scroll(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});
});

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}

function displayDate() {
	fakeRequest();
	let date = moment().format('MMMM do YYYY');
	console.log(date);
	$('.date').text(date);
}

function fakeRequest() {
	console.log('fake request');
}

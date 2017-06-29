import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/nunu.scss'; // NAME OF YOUR PAGE HERE. MAKE SURE IT IS AN SCSS FILE.
import $ from 'jquery';

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';


$(document).ready(() => {
	const $backgroundImage = $('.animal-image'); //animal-image class
	const $siteTitle = $('.sub-page-title'); //site-title class
	// const $siteDesc = $('.page-dec'); if you have a page desc
	const $navbar = $('.nav-bar'); //navbar class

	//if you do not have a site desc use this
	handleJumbotronAnimations($backgroundImage, $siteTitle, $navbar);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, window.innerHeight);
	});
	$(window).resize(() => {
		handleNavbarPosition($navbar, window.innerHeight);
	});
});

//If you dont have a page desc
function handleJumbotronAnimations(backgroundImage, siteTitle, navbar) {
	handleNavbarAnimation(navbar);
	handleSiteTitleAnimation(siteTitle);
	handleBackgroundAnimation(backgroundImage);
}

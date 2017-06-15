import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import './css/about.scss';
import $ from 'jquery';
import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';

$(document).ready(() => {
	let $siteTitle = $('.page-title');
	let $siteDesc = $('.page-desc');
	let $navbar = $('.nav-bar');
	let $backgroundImage = $('.animal-image');

	handleHeaderAnimations($siteTitle, $siteDesc, $navbar, $backgroundImage);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, window.innerHeight / 2);
	});
});


function handleHeaderAnimations(siteTitle, siteDesc, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleSiteTitleAnimation(siteDesc);
	handleNavbarAnimation(navbar);
}

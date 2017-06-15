import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import './css/about.scss';
import $ from 'jquery';
import { handleSiteTitleAnimation, handleNavbarAnimation, handleBackgroundAnimation } from './common';

$(document).ready(() => {
	let $siteTitle = $('.page-title');
	let $siteDesc = $('.page-desc');
	let $navbar = $('.nav-bar');
	let $backgroundImage = $('.animal-image');

	handleHeaderAnimations($siteTitle, $siteDesc, $navbar, $backgroundImage);
});


function handleHeaderAnimations(siteTitle, siteDesc, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleSiteTitleAnimation(siteDesc);
	handleNavbarAnimation(navbar);
}

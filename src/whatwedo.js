import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/whatwedo.scss';
import $ from 'jquery';

const headerSizeRatio = window.innerHeight;

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';

const $siteTitle = $('.site-title');
const $navbar = $('.nav-bar');
const $backgroundImage = $('.animal-image');

handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);

$(window).scroll(() => {
	handleNavbarPosition($navbar, headerSizeRatio);
});

$(window).resize(() => {
	handleNavbarPosition($navbar, headerSizeRatio);
});

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}
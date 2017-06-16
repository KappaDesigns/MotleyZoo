import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import './css/about.scss';
import $ from 'jquery';
import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	animateOpacity,
	animateTranslateY,
} from './common';

const headerSizeRatio = window.innerHeight / 2;
const employeeScrollRatio = 4;

$(document).ready(() => {
	let $siteTitle = $('.sub-page-title');
	let $siteDesc = $('.page-desc');
	let $navbar = $('.nav-bar');
	let $backgroundImage = $('.animal-image');
	let $employeeContainer = $('.our-people');

	handleHeaderAnimations($siteTitle, $siteDesc, $navbar, $backgroundImage);

	$(window).scroll(() => {
		let scrollBottom = $(window).scrollTop() + window.innerHeight;
		handleNavbarPosition($navbar, headerSizeRatio);
		animateEmployees($employeeContainer, scrollBottom);
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});
});

function animateEmployees(employeeContainer, scrollBottom) {
	let y = employeeContainer.offset().top;
	let height = employeeContainer.height();
	const scrollTrigger = y + height / employeeScrollRatio;

	if (scrollBottom > scrollTrigger) {
		let employees = Array.from($('.employee'));
		employees.forEach((employee) => {
			animateOpacity(employee, 1, 1);
			animateTranslateY(employee, '100px', 1.5);
		});
	}
}

function handleHeaderAnimations(siteTitle, siteDesc, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleSiteTitleAnimation(siteDesc);
	handleNavbarAnimation(navbar);
}

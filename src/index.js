import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import $ from 'jquery';

let $backgroundImage = $('.image-overlay');
let $siteTitle = $('.site-title');
let $navbar = $('.nav-bar');

$(document).ready(() => {
	$backgroundImage.css({
		'transition': 'opacity 2s ease-in-out',
		'opacity': 1,
	});
	$siteTitle.css({
		'transition': 'opacity 2s ease-in-out, transform 2s ease-in-out',
		'transform': 'translateY(50px)',
		'opacity': 1,
	});
	$navbar.css({
		'transition':'opacity 0.5s ease-in-out',
		'opacity': 1,
	});

	$(window).scroll(() => {
		if ($(window).scrollTop() > window.innerHeight - 55) {
			$navbar.css({
				'position': 'fixed',
				'top': 55,
			});
		} else {
			$navbar.css({
				'position': 'static',
			});
		}
	});
});

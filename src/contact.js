import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/contact.scss';
import $ from 'jquery';

const headerSizeRatio = window.innerHeight / 2;

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	animate,
} from './common';

$(document).ready(() => {
	const $siteTitle = $('.sub-page-title');
	const $navbar = $('.nav-bar');
	const $backgroundImage = $('.animal-image');
	const $categorySelector = $('.category-selector');
	handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);
	handleCategoryDropdown($categorySelector);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$(window).resize(() => {
		handleCategoryDropdown($categorySelector);
		handleNavbarPosition($navbar, headerSizeRatio);
	});
});

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}

function handleCategoryDropdown(categorySelector) {
	if (window.innerWidth > 960) {
		handleDesktopCategoryDropdown(categorySelector);
	} else {
		console.log('call');
		handleMobileCategoryDropdown(categorySelector);
	}
}

function handleDesktopCategoryDropdown(categorySelector) {
	const $text = categorySelector.find('.category-data');
	const $list = categorySelector.find('.category-list');
	const $categories = $list.find('li');
	categorySelector.mouseenter(() => {
		$list.css({
			display: 'block',
		});
		animate($list, 'max-height', '100vh', '0.5s');
	});
	categorySelector.mouseleave(() => {
		$list.css({
			display: 'none',
		});
		animate($list, 'max-height', '0', '0.5s');
	});
	$categories.click((e) => {
		$list.css({
			display: 'none',
		});
		animate($list, 'max-height', '0', '0.5s');
		let text = $(e.target).text();
		$text.text(text);
	});
}

function handleMobileCategoryDropdown(categorySelector) {
	const $text = categorySelector.find('.category-data');
	const $list = categorySelector.find('.category-list');
	categorySelector.click(() => {
		$list.show();
		setTimeout(function () {
			animate($list, 'max-height', '100vh', '0.5s');
		}, 10);
	});
	$('body').click((e) => {
		if ($(e.target).prop('class') == 'category') {
			animate($list, 'max-height', '0', '0.5s');
			setTimeout(() => {
				$list.hide();
			}, 500);
			let text = $(e.target).text();
			$text.text(text);
		}
	});
}

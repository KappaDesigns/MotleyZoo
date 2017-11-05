import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/involvement.scss';
import $ from 'jquery';

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	getPets,
} from './common';

const headerSizeRatio = window.innerHeight;

const $siteTitle = $('.site-title');
const $navbar = $('.nav-bar');
const $backgroundImage = $('.animal-image');
const carousel = $('.carousel-container');

handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);
getPets((data) => {
	addCarouselScrollHandler(carousel);
	stopLoadingAnimation(carousel);
	createSlides(carousel, data);
});

$(window).scroll(() => {
	handleNavbarPosition($navbar, headerSizeRatio);
});

$(window).resize(() => {
	addCarouselScrollHandler(carousel);
	handleNavbarPosition($navbar, headerSizeRatio);
});

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}

function createSlides(carousel, animalData) {
	let width = 0;
	shuffle(animalData);
	let html = animalData.reduce((x, animal) => {
		if (animal.hasOwnProperty('animalPictures') && animal.animalPictures.length > 0) {
			width += 310;
			return x += `<div class="slide" style="background-image:url('${animal.animalPictures[0].urlSecureFullsize}');"></div>`;
		}
	}, '');
	carousel.width(width);
	carousel.append(html);
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
  
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function stopLoadingAnimation(carousel) {
	carousel.css('justify-content', 'flex-start');
	$('.loader').remove();
}

function addCarouselScrollHandler(carousel) {
	if (window.innerWidth > 960) {
		addCarouselDragHandler(carousel);
	}
}

function addCarouselDragHandler(carousel) {
	const scrollContainer = $('.scroll-container');
	let state = {
		clicked: false,
		clickX: 0,
	};
	carousel.mousedown((e) => {
		state.clicked = true;
		state.clickX = e.clientX;
	});
	$(window).mousemove((e) => {
		if (state.clicked) {
			let dist = state.clickX - e.clientX;
			let scrollX = scrollContainer.scrollLeft();
			scrollContainer.scrollLeft(scrollX + dist / 12);
		}
	});
	carousel.mouseup(() => {
		state.clicked = false;
	});
	carousel.mouseleave(() => {
		state.clicked = false;
	});
}

import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/events.scss';
import $ from 'jquery';
import moment from 'moment';

const headerSizeRatio = window.innerHeight;

const state = {
	index: 0,
};

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';

$(document).ready(() => {
	const $siteTitle = $('.site-title');
	const $navbar = $('.nav-bar');
	const $backgroundImage = $('.animal-image');

	handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);
	displayDate();

	$(window).scroll(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
		if (window.innerWidth > 780) {
			hideCarousel();
		} else {
			showCarousel();
		}
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
	$('.date').text(date);
}

function fakeRequest() {
	console.log('fake request');
	state.events = Array.from($('.featured-event'));
	handleCarousel(state.events);
	if (window.innerWidth > 780) {
		hideCarousel();
	}
}

function handleCarousel(events) {
	const $dots = $('.dot-control');

	initControls(events, $dots);
	displaySlide.call(state, $dots);
	initListeners.call(state, $dots);
}

function displaySlide(dots) {
	if (this.index == this.events.length) {
		this.index = 0;
	}
	if (this.index < 0) {
		this.index = this.events.length - 1;
	}
	$(this.events).hide();
	$(this.events[this.index]).show();
	dots.find('.dot').removeClass('active');
	dots.find(`#dot-${this.index}`).addClass('active');
}

function initControls(events, dots) {
	let html = events.reduce((x, elem, i) => {
		return x + `<li class="dot" id="dot-${i}"></li>`;
	}, '');
	dots.append(html);
	$('.controls').css({
		display: 'flex',
	});
}

function initListeners($dots) {
	let $next = $('.next');
	let $prev = $('.prev');
	let dots = Array.from($dots.find('.dot'));

	$next.click(() => {
		this.index++;
		displaySlide.call(this, $dots);
	});

	$prev.click(() => {
		this.index--;
		displaySlide.call(this,  $dots);
	});

	dots.forEach((dot) => {
		$(dot).click(() => {
			this.index = $(dot).prop('id').substring(4,5);
			displaySlide.call(this, $dots);
		});
	});
}

function hideCarousel() {
	$('.controls').css({
		display: 'none',
	});
	$('.featured-event').show();
}

function showCarousel() {
	$('.controls').css({
		display: 'flex',
	});
	const $dots = $('.dot-control');
	displaySlide.call(state, $dots);
}

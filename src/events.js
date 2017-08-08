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
	displayEvents();

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

function displayEvents() {
	$.ajax({
		url: 'http://localhost:3000/api/event',
		method: 'GET',
		crossDomain: true,
		success: (events) => {
			state.events = events;
			renderEvents();
			handleCarousel(state.events);
			if (window.innerWidth > 780) {
				hideCarousel();
			}
		},
	});
}

function renderEvents() {
	let featured = state.events.filter((event) => {
		event.featured = true;
		return event.featured;
	});
	displayFeaturedEvents(featured);
	displayAllEvents();
}


function displayFeaturedEvents(events) {
	let components = events.reduce((x, event, i) => {
		return x + `<div data-event-id="${i}" class="featured-event event" id="event-${i}"><h3 class="event-title">${event.title}</h3><div class="date-container"><span class="date">${moment(event.date).format('MM DD YYYY')}</span></div></div>`;
	}, '');
	$('.featured-event-row').append(components);
	events.forEach((event, i) => {
		$('.featured-event-row').find(`#event-${i}`).css({
			'background-image': `url('${event.src}')`,
		});
	});
}

function displayAllEvents() {
	let components = state.events.reduce((x, event, i) => {
		let html = `<div data-event-id="0" class="event" background id="event-${i}"><div class="event-header"><span class="day">${moment(event.date).format('D')}</span><h3 class="event-title">${event.title}</h3></div><p class="event-desc">${event.desc}</p><div class="date-container"><span class="date">${moment(event.date).format('MM DD YYYY')}</span></div></div>`;
		return x + html;
	}, '');
	$('.main-event-row').append(components);
	state.events.forEach((event, i) => {
		$('.main-event-row').find(`#event-${i}`).css({
			'background-image': `url('${event.src}')`,
		});
	});
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

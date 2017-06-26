import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/involvement.scss';
import $ from 'jquery';
import axios from 'axios';

const petangoURL = 'https://crossorigin.me/http://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=All&sex=A&agegroup=All&onhold=A&orderby=ID&colnum=3&AuthKey=4blm62x1v45atcg3s05c1f5jclaov1j8p6n50d85jve44b6bp8';

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
} from './common';

const headerSizeRatio = window.innerHeight / 2;

$(document).ready(() => {
	const $siteTitle = $('.sub-page-title');
	const $navbar = $('.nav-bar');
	const $backgroundImage = $('.animal-image');
	handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);
	getPets();

	$(window).scroll(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});
});

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}

function getPets() {
	axios.get(petangoURL)
		.then((res) => {
			return res.data;
		})
		.then((html) => {
			return Array.from($($(html)[20]).find('.list-table').find('tbody').find('tr'));
		})
		.then((rows) => {
			return rows.reduce((x, row) => {
				const cells = Array.from($(row).find('td'));
				cells.forEach((cell) => {
					x.push(cell);
				});
				return x;
			}, []);
		})
		.then((cells) => {
			return cells.filter((cell) => {
				return $(cell).children().length > 0;
			});
		})
		.then((cells) => {
			return cells.reduce((x, cell) => {
				x.push({
					name: $(cell).find('.list-animal-name').text(),
					species: $(cell).find('.list-anima-species').text(),
					sex: $(cell).find('.list-animal-sexSN').text(),
					breed: $(cell).find('.list-animal-breed').text(),
					age: $(cell).find('.list-animal-age').text(),
					img: $(cell).find('img').prop('src'),
				});
				return x;
			}, []);
		})
		.then((data) => {
			createSlides(data);
		});
}

function createSlides(animalData) {
	const carousel = $('.carousel-container');
	let width = 0;
	let html = animalData.reduce((x, animal) => {
		width += 310;
		return x += `<div class="slide" style="background-image:url('${animal.img}');">${animal.name}</div>`;
	}, '');
	carousel.width(width);
	carousel.append(html);
}

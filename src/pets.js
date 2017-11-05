import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/pets.scss';
import $ from 'jquery';
import is from 'is-js';

const headerSizeRatio = window.innerHeight;

import {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	getPets,
} from './common';

const $siteTitle = $('.site-title');
const $navbar = $('.nav-bar');
const $backgroundImage = $('.animal-image');
const $searchInput = $('.search-input');
const $selected = $('.selected');
const $reset = $('.motley-btn-main');
const $container = $('.pet-wrapper');

let filters = {
	name: '',
	color: '',
	age: '',
	species: '',
	size: '',
};

handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);
getPets((data) => {
	setDropDownValues(data, filters, $container);
	displayPets(data, $container);
	$('.loader, .loader-text').remove();
	$('.disabled').removeClass('disabled'); 

	$searchInput.keyup((e) => {
		filters.name = e.target.value;
		hidePets(data, filters, $container);
	});
	
	$reset.click(() => {
		$searchInput.val('');
		$('#age').parent().find('.selected').text('Choose Age');
		$('#species').parent().find('.selected').text('Choose Species');
		$('#color').parent().find('.selected').text('Choose Color');
		$('#size').parent().find('.selected').text('Choose Size');
		filters.name = '';
		filters.color = '';
		filters.age = '';
		filters.species = '';
		filters.size = '';
		hidePets(data, filters, $container);
	});

	$selected.click((e) => {
		let ref = $('.active');
		let id = '';
		if (ref) {
			ref.slideUp();
			ref.removeClass('active');
			id = ref.prop('id');
		}
		let options = $(e.target).parent().find('.dropdown-options');
		if (id != options.prop('id')) {
			options.addClass('active');
			options.slideDown();
		}
	});
});

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

function setDropDownValues(data, filters, container) {
	let obj = {
		species: [],
		color: [],
		age: [],
		size: [],
	};
	data.forEach((x) => {
		console.log(x);
		if (obj.species.indexOf(x.animalSpecies) == -1) {
			obj.species.push(x.animalSpecies);
		}
		if (obj.color.indexOf(x.animalColor) == -1) {
			obj.color.push(x.animalColor);
		}
		if (obj.age.indexOf(x.animalGeneralAge) == -1) {
			obj.age.push(x.animalGeneralAge);
		}
		if (obj.size.indexOf(x.animalGeneralSizePotential) == -1) {
			obj.size.push(x.animalGeneralSizePotential);	
		}
	});
	for (let key in obj) {
		let components = obj[key].reduce((x, value) => {
			return x + `<li class="dropdown-option">${capitalize(value)}</li>`;
		}, '');
		components += '<li class="dropdown-option">None</li>';
		$(`#${key}`).append(components);
	}
	$('.dropdown-options').click((e) => {
		let text = e.target.innerText;
		let menu = $(e.target).parent();
		let selected = menu.parent().find('.selected');
		let value = text;
		if (text == 'None') {
			value = '';
			text = `Choose ${capitalize(menu.prop('id'))}`;
		}
		filters[menu.prop('id')] = value;
		console.log(filters);
		selected.text(text);
		menu.slideUp();
		hidePets(data, filters, container);
	});
}

function filterPets(pets, filters) {
	let petsToHide = pets.filter((pet) => {
		console.log(pet.animalSpecies.toLowerCase(), filters.species.toLowerCase());
		return !pet.animalName.toLowerCase().includes(filters.name.toLowerCase()) ||
				!pet.animalColor.toLowerCase().includes(filters.color.toLowerCase()) ||
				!pet.animalSpecies.toLowerCase().includes(filters.species.toLowerCase()) ||
				!pet.animalGeneralSizePotential.toLowerCase().includes(filters.size.toLowerCase()) ||
				!pet.animalGeneralAge.toLowerCase().includes(filters.age.toLowerCase());
	});
	return petsToHide.map((x) => {
		return x.animalName;
	});
}

function hidePets(data, filters, container) {
	let pets = filterPets(data, filters);
	if (pets.length == data.length) {
		container.find('.none').remove();
		container.append('<h1 class="none">No Pets Match These Filters  <i class="fa fa-paw fa-2x" aria-hidden="true"></i></h1>');
	}
	data.forEach((pet) => {	
		let html = container.find(`[data-name=${pet.animalName.toLowerCase().split(' ').join('-').replace(')', '').replace('(', '').replace('\'', '').replace('.', '')}]`);
		if (pets.indexOf(pet.animalName) != -1) {
			html.css({
				opacity: 0,
			});
			setTimeout(() => {
				html.hide();
			}, 500);
		} else {
			container.find('.none').remove();
			html.show();
			html.css({
				opacity: 1,
			});
		}
	});
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

function capitalize(string) {
	if (is.string(string)) {
		return string.substring(0,1).toUpperCase() + string.substring(1,string.length).toLowerCase();
	}
	return string;
}

function displayPets(pets, container) {
	shuffle(pets);
	container.empty();
	let components = pets.reduce((x, pet) => {
		return x + createPet(pet);
	}, '');
	container.append(components);
}

function createPet(data) {
	return `<div class="pet" style="background-image: url('${ data.animalPictures && data.animalPictures.length > 0 ? data.animalPictures[0].urlSecureFullsize : 'http://via.placeholder.com/300x300'}')" data-name='${data.animalName.toLowerCase().split(' ').join('-').replace(')', '').replace('(', '').replace('\'', '').replace('.', '')}'><div class="data"><h1 class="name">${capitalize(data.animalName)}</h1></div></div>`;
}
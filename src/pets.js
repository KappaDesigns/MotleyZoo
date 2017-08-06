import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/pets.scss';
import $ from 'jquery';
import is from 'is-js';


const fakeData = [
	{
		name: 'dog1',
		breed: 'dog',
		color: 'black',
		age: 1,
		size: 'small',
	},
	{
		name: 'dog2',
		breed: 'dog',
		color: 'yellow',
		age: 2,
		size: 'medium',
	},
	{
		name: 'dog3',
		breed: 'dog',
		color: 'red',
		age: 3,
		size: 'large',
	},
	{
		name: 'dog4',
		breed: 'dog',
		color: 'white',
		age: 4,
		size: 'giant',
	},
	{
		name: 'cat1',
		breed: 'cat',
		color: 'black',
		age: 1,
		size: 'small',
	},
	{
		name: 'cat2',
		breed: 'cat',
		color: 'yellow',
		age: 1,
		size: 'medium',
	},
	{
		name: 'cat3',
		breed: 'cat',
		color: 'red',
		age: 3,
		size: 'large',
	},
	{
		name: 'cat4',
		breed: 'cat',
		color: 'white',
		age: 4,
		size: 'giant',
	},
	{
		name: 'bunny1',
		breed: 'rabbit',
		color: 'black',
		age: 1,
		size: 'small',
	},
	{
		name: 'bunny2',
		breed: 'rabbit',
		color: 'yellow',
		age: 1,
		size: 'medium',
	},
	{
		name: 'bunny3',
		breed: 'rabbit',
		color: 'red',
		age: 3,
		size: 'large',
	},
	{
		name: 'bunny4',
		breed: 'rabbit',
		color: 'white',
		age: 4,
		size: 'giant',
	},
	{
		name: 'fish1',
		breed: 'fish',
		color: 'black',
		age: 1,
		size: 'small',
	},
	{
		name: 'fish2',
		breed: 'fish',
		color: 'yellow',
		age: 1,
		size: 'medium',
	},
	{
		name: 'fish3',
		breed: 'fish',
		color: 'red',
		age: 3,
		size: 'large',
	},
	{
		name: 'fish4',
		breed: 'fish',
		color: 'white',
		age: 4,
		size: 'giant',
	},
];

const headerSizeRatio = window.innerHeight;

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
	const $searchInput = $('.search-input');
	const $selected = $('.selected');
	const $reset = $('.motley-btn-main');

	let filters = {
		name: '',
		color: '',
		age: Infinity,
		breed: '',
		size: '',
	};

	setDropDownValues(fakeData, filters);
	displayPets(fakeData, filters);
	handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$searchInput.keyup((e) => {
		filters.name = e.target.value;
		displayPets(fakeData, filters);
	});

	$reset.click(() => {
		$searchInput.val('');
		$('#age').parent().find('.selected').text('Choose Age');
		$('#breed').parent().find('.selected').text('Choose Breed');
		$('#color'.parent()).find('.selected').text('Choose Color');
		$('#size').parent().find('.selected').text('Choose Size');
		filters.name = '';
		filters.color = '';
		filters.age = Infinity;
		filters.breed = '';
		filters.size = '';
		displayPets(fakeData, filters);
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

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}

function setDropDownValues(data, filters) {
	let obj = {
		breed: [],
		color: [],
		age: [],
		size: [],
	};
	data.forEach((x) => {
		if (obj.breed.indexOf(x.breed) == -1) {
			obj.breed.push(x.breed);
		}
		if (obj.color.indexOf(x.color) == -1) {
			obj.color.push(x.color);
		}
		if (obj.age.indexOf(x.age) == -1) {
			obj.age.push(x.age);
		}
		if (obj.size.indexOf(x.size) == -1) {
			obj.size.push(x.size);	
		}
	});
	for (let key in obj) {
		let components = obj[key].reduce((x, value) => {
			let plural = key == 'age' && value > 1 ? 's' : '';
			let postfix = key == 'age' ? `Year${plural} Old` : '';
			let prefix = key == 'age' ? 'Less Than' : '';
			return x + `<li class="dropdown-option">${prefix} ${capitalize(value)} ${postfix}</li>`;
		}, '');
		components += '<li class="dropdown-option">None</li>';
		$(`#${key}`).append(components);
	}
	setTimeout(() => {
		$('.dropdown-options').click((e) => {
			let text = e.target.innerText;
			let menu = $(e.target).parent();
			let selected = menu.parent().find('.selected');
			let value = text;

			if (text.includes('Less Than') && menu.prop('id') == 'age') {
				value = text.split(' ')[2];
			}
			if (text == 'None') {
				value = menu.prop('id') == 'age' ? Infinity : '';
				text = `Choose ${capitalize(menu.prop('id'))}`;
			}
			filters[menu.prop('id')] = value;
			selected.text(text);
			menu.slideUp();
			displayPets(data, filters);
		});
	}, 200);
}

function filterPets(pets, filters) {
	return pets.filter((pet) => {
		return pet.name.includes(filters.name.toLowerCase()) &&
				pet.color.includes(filters.color.toLowerCase()) &&
				pet.breed.includes(filters.breed.toLowerCase()) &&
				pet.size.includes(filters.size.toLowerCase()) && 
				pet.age <= filters.age;
	});
}

function capitalize(string) {
	if (is.string(string)) {
		return string.substring(0,1).toUpperCase() + string.substring(1,string.length);
	}
	return string;
}

function displayPets(data, filters) {
	$('.pet-container').empty();
	let pets = filterPets(data, filters);
	let components = pets.reduce((x, pet) => {
		return x + createPet(pet);
	}, '');
	$('.pet-container').append(components);
}

function createPet(data) {
	return `<div class="pet"><div class="data"><h1 class="name">${data.name}</h1><h6 class="breed">${data.breed}</h6><h6 class="color">${data.color}</h6><h6 class="age">${data.age}</h6><h6 class="size">${data.size}</h6></div></div>`;
}
import './navbar';
import './css/bootstrap/bootstrap.min.css';
import './css/pets.scss';
import $ from 'jquery';


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
		color: 'red',
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
		color: 'red',
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
		color: 'red',
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

	let filters = {
		name: '',
		color: '',
		age: Infinity,
		breed: '',
		size: '',
	};

	handleHeaderAnimations($siteTitle, $navbar, $backgroundImage);

	$(window).scroll(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$(window).resize(() => {
		handleNavbarPosition($navbar, headerSizeRatio);
	});

	$searchInput.keyup((e) => {
		filters.name = e.target.value;
		console.log(filters);
		displayPets(fakeData, filters);
	});
	
});

function handleHeaderAnimations(siteTitle, navbar, backgroundImage) {
	handleBackgroundAnimation(backgroundImage);
	handleSiteTitleAnimation(siteTitle);
	handleNavbarAnimation(navbar);
}

function filterPets(pets, filters) {
	return pets.filter((pet) => {
		return pet.name.includes(filters.name) &&
				pet.color.includes(filters.color) &&
				pet.breed.includes(filters.breed) &&
				pet.size.includes(filters.size) && 
				pet.age <= filters.age;
	});
}

function displayPets(data, filters) {
	$('.pet-container').empty();
	let pets = filterPets(data, filters);
	let components = pets.reduce((x, pet) => {
		return x + '\n' + JSON.stringify(pet);
	}, '');
	$('.pet-container').append(components);
}
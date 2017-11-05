import $ from 'jquery';
import axios from 'axios';
const rescueGroupsUrl = 'https://api.rescuegroups.org/http/';
const rescueGroupApiKey = 'punkDGhl';
const rescureGroupsJSONString = `{"apikey":"${rescueGroupApiKey}","objectType":"animals","objectAction":"publicSearch","search":{"resultStart": "0", "resultLimit": "100", "resultSort": "animalID","resultOrder": "desc","filters":[{"fieldName": "animalStatus","operation": "equals","criteria": "Available"},{"fieldName": "animalOrgID", "operation": "equals", "criteria":"4850"}],"fields":["animalID","animalOrgID","animalActivityLevel","animalAdoptedDate","animalAdoptionFee","animalAgeString","animalAltered","animalAvailableDate","animalBirthdate","animalBirthdateExact","animalBreed","animalCoatLength","animalColor","animalColorID","animalColorDetails","animalCourtesy","animalDeclawed","animalDescription","animalDescriptionPlain","animalDistinguishingMarks","animalEarType","animalEnergyLevel","animalExerciseNeeds","animalEyeColor","animalFence","animalFound","animalFoundDate","animalFoundPostalcode","animalGeneralAge","animalGeneralSizePotential","animalGroomingNeeds","animalHousetrained","animalIndoorOutdoor","animalKillDate","animalKillReason","animalLocation","animalLocationCoordinates","animalLocationDistance","animalLocationCitystate","animalMicrochipped","animalMixedBreed","animalName","animalSpecialneeds","animalSpecialneedsDescription","animalNeedsFoster","animalNewPeople","animalNotHousetrainedReason","animalObedienceTraining","animalOKWithAdults","animalOKWithCats","animalOKWithDogs","animalOKWithKids","animalOwnerExperience","animalPattern","animalPatternID","animalAdoptionPending","animalPrimaryBreed","animalPrimaryBreedID","animalRescueID","animalSearchString","animalSecondaryBreed","animalSecondaryBreedID","animalSex","animalShedding","animalSizeCurrent","animalSizePotential","animalSizeUOM","animalSpecies","animalSpeciesID","animalSponsorable","animalSponsors","animalSponsorshipDetails","animalSponsorshipMinimum","animalStatus","animalStatusID","animalSummary","animalTailType","animalThumbnailUrl","animalUptodate","animalUpdatedDate","animalUrl","animalVocal","animalYardRequired","animalAffectionate","animalApartment","animalCratetrained","animalDrools","animalEagerToPlease","animalEscapes","animalEventempered","animalFetches","animalGentle","animalGoodInCar","animalGoofy","animalHasAllergies","animalHearingImpaired","animalHypoallergenic","animalIndependent","animalIntelligent","animalLap","animalLeashtrained","animalNeedsCompanionAnimal","animalNoCold","animalNoFemaleDogs","animalNoHeat","animalNoLargeDogs","animalNoMaleDogs","animalNoSmallDogs","animalObedient","animalOKForSeniors","animalOKWithFarmAnimals","animalOlderKidsOnly","animalOngoingMedical","animalPlayful","animalPlaysToys","animalPredatory","animalProtective","animalSightImpaired","animalSkittish","animalSpecialDiet","animalSwims","animalTimid","fosterEmail","fosterFirstname","fosterLastname","fosterName","fosterPhoneCell","fosterPhoneHome","fosterSalutation","locationAddress","locationCity","locationCountry","locationUrl","locationName","locationPhone","locationState","locationPostalcode","animalPictures","animalVideos","animalVideoUrls"]}}`;

//removing magic numbers from handling navbar animation
const navbarDisplacement = 40;
const navbarMobileWidth = 780;
const navbarZ = 58008;

//navbar css when fixed after scrolling past point
const navbarFixedCSS = {
	'position': 'fixed',
	'z-index': navbarZ,
	'top': navbarDisplacement,
};

//navbar css when static
const navbarStaticCSS = {
	'position': 'static',
};

const $donate = $('.motley-donate-btn');
handleDonateButton($donate);
$(window).resize(() => {
	handleDonateButton($donate);
});

//handle donation button click events
function handleDonateButton(donateButton) {
	if (window.innerWidth > 768) {
		donateButton.click(() => {
			let path = window.location.pathname.split('/')[2] == 'MotleyZoo' ?
				window.location.host + '/MotleyZoo' :
				window.location.host;
			window.location.href = 'http://' + path + '/donate';
		});
	} else {
		donateButton.click(() => {
			if (donateButton.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
				let path = window.location.pathname.split('/')[2] == 'MotleyZoo' ?
					window.location.host + '/MotleyZoo' :
					window.location.host;
				window.location.href = 'http://' + path + '/donate';
			} else {
				animate(donateButton, 'transform', 'translateX(0)', '0.5s');
			}
		});
	}
}

//animate site title in header
function handleSiteTitleAnimation(siteTitle) {
	animateOpacity(siteTitle, 1, '2s');
	animateTranslateY(siteTitle, '50px', '2s');
}

//animate navbar in header
function handleNavbarAnimation(navbar) {
	animateOpacity(navbar, 1, '0.5s');
}

//animate animal image in header
function handleBackgroundAnimation(backgroundImage) {
	animateOpacity(backgroundImage, 1, '2s');
}

//animate navbar when scrolling
function handleNavbarPosition(navbar, bottom) {
	if (window.innerWidth > navbarMobileWidth) {
		let navbarTop = bottom - navbar.height();
		if ($(window).scrollTop() > navbarTop) {
			navbar.css(navbarFixedCSS);
		} else {
			navbar.css(navbarStaticCSS);
		}
	} else {
		navbar.css(navbarStaticCSS);
	}
}

// ANIMATION FUNCTIONS

// animate any element through a given propery and value,
// a transition is created based of the duration passed.
// a transition type can be passed in through an options
// object on the property transitionType
function animate(elem, property, value, duration, options) {
	let transitionType = 'ease-in-out';
	let delay = '0s';
	if (options) {
		if (options.hasOwnProperty('transitionType')) {
			transitionType = options.transitionType;
		}
	}

	let transitions = getTransition(elem);
	let transitionObj = createTransitionObj(property, duration, transitionType, delay);
	addTransition(transitions, transitionObj);

	let css = {};
	css[property] = value;
	css['transition'] = getTransitionStr(transitions),
	$(elem).css(css);
}

function addTransition(transitions, obj) {
	let found = false;
	transitions.forEach((transition) => {
		if (transition.name == obj.name) {
			found = true;
			transition = obj;
		}
	});
	if (!found) {
		transitions.push(obj);
	}
}

//function to simplify animating opacity
function animateOpacity(elem, opacity, duration) {
	animate(elem, 'opacity', opacity, duration);
}

// simplifies animation of translatingY in css
function animateTranslateY(elem, dY, duration) {
	animate(elem, 'transform', `translateY(${dY})`, duration);
}

// returns a string that is compossed of transitions
// passed through a transitions array
function getTransitionStr(transitions) {
	let str = transitions.reduce((x, transition) => {
		// console.log(transition);
		return x + `${transition.name} ${transition.duration} ${transition.effect} ${transition.delay}, `;
	}, '');
	return str.substring(0, str.length - 2);
}

// returns an array of all transitions on an element
function getTransition(elem) {
	let transitions = $(elem).css('transition') ;
	if (!transitions || transitions == 'all 0s ease 0s') {
		transitions = [];
	}
	if (transitions && transitions.length > 0) {
		transitions = transitions.split(', ');
	}
	let data = transitions.map((transition) => {
		transition = transition.split(' ');
		return createTransitionObj(transition);
	});
	return data;
}

function createTransitionObj(parts) {
	let a = parts;
	let params = Array.from(arguments);
	if (params.length > 1) {
		a = params;
	}
	return {
		name: a[0],
		duration: a[1] !== undefined ? a[1] : '0s',
		effect: a[2] !== undefined ? a[2] : 'linear',
		delay: a[3] !== undefined ? a[3] : '0s',
	};
}

//api call to petangoURL

function getPets(next) {
	axios.post(rescueGroupsUrl, rescureGroupsJSONString)
		.then((res) => {
			let data = [];
			for (let x in res.data.data) {
				data.push(res.data.data[x]);
			}
			return next(data);
		});
}

//export all common funcs
export {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
	animateOpacity,
	animateTranslateY,
	animate,
	getPets,
};

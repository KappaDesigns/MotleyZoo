import $ from 'jquery';
import axios from 'axios';
const petangoURL = 'https://crossorigin.me/http://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=All&sex=A&agegroup=All&onhold=A&orderby=ID&colnum=3&AuthKey=4blm62x1v45atcg3s05c1f5jclaov1j8p6n50d85jve44b6bp8';

//removing magic numbers from handling navbar animation
const navbarDisplacement = 55;
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

$(document).ready(() => {
	const $donate = $('.motley-donate-btn');
	handleDonateButton($donate);
	$(window).resize(() => {
		handleDonateButton($donate);
	});
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
			next(data);
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

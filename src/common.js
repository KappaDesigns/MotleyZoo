import $ from 'jquery';
import './navbar';

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

//animate site title in header
function handleSiteTitleAnimation(siteTitle) {
	animateOpacity(siteTitle, 1, 2);
	animateTranslateY(siteTitle, '50px', 2);
}

//animate navbar in header
function handleNavbarAnimation(navbar) {
	animateOpacity(navbar, 1, 0.5);
}

//animate animal image in header
function handleBackgroundAnimation(backgroundImage) {
	animateOpacity(backgroundImage, 1, 2);
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
	if (options) {
		transitionType = options.transitionType;
	}

	let transitions = getTransition(elem);
	addTransition(`${property} ${duration}s ${transitionType}`, transitions);

	let css = {};
	css['transition'] = getTransitionStr(transitions),
	css[property] = value;

	$(elem).css(css);
}

function addTransition(str, transitions) {
	let check = transitions.filter((transition) => {
		return transition == str;
	});
	if (check.length == 0) {
		transitions.push(str);
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
	return transitions.reduce((str, transition, i) => {
		return str +=
		i > 0 ?
			', ' + transition :
			transition;
	}, '');
}

// returns an array of all transitions on an element
function getTransition(elem) {
	let transitions = $(elem).css('transition');
	if (transitions && transitions.length > 0) {
		return transitions.split(',');
	}
	return [];
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
};

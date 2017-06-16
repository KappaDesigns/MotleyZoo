import $ from 'jquery';

const subMenuEntries = [
	{
		link: 'about',
		subPaths: ['What We Do', 'People', 'Rescues', 'Sponsors'],
	},
	{
		link: 'involvement',
		subPaths: ['What We Do', 'People', 'Rescues'],
	},
	{
		link: 'events',
		subPaths: ['What We Do', 'People'],
	},
	{
		link: 'resources',
		subPaths: ['What We Do'],
	},
	{
		link: 'contact',
		subPaths: [],
	},
];

//removing magic numbers from handling navbar animation
const navbarDisplacement = 55;
const navbarMobileWidth = 660;
const navbarZ = 58008;
const navbarSubMenuLinks = createSubMenuMap(subMenuEntries);
console.log(navbarSubMenuLinks);

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
	const $navLinks = $('.nav-link');
	$navLinks.mouseenter((e) => {
		let $child = $(e.target);
		let $subBar = $('.sub-bar');
		displaySubmenu($child, $subBar);
	});
	$navLinks.mouseleave(() => {
		let $subBar = $('.sub-bar');
		hideSubmenu($subBar);
	});
});

//COMMON ANIMATION HANDLERS

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

function displaySubmenu(mainLink, subBar) {
	let path = mainLink.data('link');
	let links = navbarSubMenuLinks.get(path);
	if (links && links.length != 0) {
		// let components = getNavbarComponents(path, links);
		// let componentString = stringifyComponents(components);
		animateOpacity(subBar, 1, 1);
		animate(subBar, 'height', '55px', 1, {
			transitionType: 'linear',
		});
	}
}

function hideSubmenu(subBar) {
	animateOpacity(subBar, 0, 1);
	animate(subBar, 'height', '0', 1, {
		transitionType: 'linear',
	});
}

function getNavbarComponents(path, links) {
	return links.map((link, i) => {
		return (
			`<a href="/${path}/${link}" id="nav-link-${i+1}" class="nav-link"><i class="fa fa-paw nav-icon" aria-hidden="true"></i>${link}</a>`
		);
	});
}

function stringifyComponents(components) {

}

function createSubMenuMap(subMenuMap) {
	let map = new Map();

	subMenuMap.forEach((entry) => {
		map.set(entry.link, entry.subPaths);
	});

	return map;
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
	transitions.push(`${property} ${duration}s ${transitionType}`);

	let css = {};
	css['transition'] = getTransitionStr(transitions),
	css[property] = value;

	$(elem).css(css);
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
	if ($(elem).css('transition').length > 0) {
		return $(elem).css('transition').split(',');
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

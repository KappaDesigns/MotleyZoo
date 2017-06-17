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

$(document).ready(() => {
	const navbarSubMenuLinks = createSubMenuMap(subMenuEntries);
	const $navLinks = $('.nav-link');
	const $navbar = $('.nav-bar');
	if (window.innerWidth > navbarMobileWidth) {
		handleNavbarDesktop($navLinks, $navbar, navbarSubMenuLinks);
	} else {
		handleNavbarMobile($navLinks, navbarSubMenuLinks);
	}
	$(window).resize(() => {
		$('.active').removeClass('active');
		$('.sub-bar').remove();
		$navLinks.unbind('click').unbind('mouseenter');
		if (window.innerWidth > navbarMobileWidth) {
			handleNavbarDesktop($navLinks, $navbar, navbarSubMenuLinks);
		} else {
			handleNavbarMobile($navLinks, navbarSubMenuLinks);
		}
	});
});

function handleNavbarMobile(navLinks, navbarSubMenuLinks) {
	navLinks.click((e) => {
		$('.active').removeClass('active');
		e.preventDefault();
		let $child = $(e.target);
		$child.addClass('active');
		let subBar = $('.sub-bar');
		if (subMenuExists(subBar)) {
			hideSubmenu(subBar, true);
			rebindClick(subBar, navbarSubMenuLinks);
		}
		setTimeout(function () {
			displaySubmenu($child, $child, navbarSubMenuLinks, true);
		}, 100);
	});
}

function rebindClick(subBar, navbarSubMenuLinks) {
	subBar.parent().on('click', (e) => {
		$('.active').removeClass('active');
		e.preventDefault();
		let $child = $(e.target);
		$child.addClass('active');
		let subBar = $('.sub-bar');
		if (subMenuExists(subBar)) {
			hideSubmenu(subBar, true);
			rebindClick(subBar, navbarSubMenuLinks);
		}
		setTimeout(function () {
			displaySubmenu($child, $child, navbarSubMenuLinks, true);
		}, 100);
	});
}

function handleNavbarDesktop(navLinks, navbar, navbarSubMenuLinks) {
	navLinks.mouseenter((e) => {
		let $child = $(e.target);
		let subBar = $('.sub-bar');
		if (subMenuExists(subBar)) {
			hideSubmenu(subBar, false);
		}
		setTimeout(function () {
			displaySubmenu($child, navbar, navbarSubMenuLinks, false);
		}, 100);
	});
}

function displaySubmenu(mainLink, appendEle, linkMap, isMobile) {
	let componentString = getSubmenu(mainLink, linkMap);
	appendSubmenu(appendEle, componentString, (subBar) => {
		if (isMobile) {
			addMobileLeaveListener(appendEle);
			animateSubMenu(subBar, 'auto', isMobile);
		} else {
			addLeaveListener(subBar);
			animateSubMenu(subBar, 55, isMobile);
		}
	});
}

function addMobileLeaveListener(appendEle) {
	appendEle.unbind('click');
}

function getSubmenu(mainLink, linkMap) {
	let path = mainLink.data('link');
	let links = linkMap.get(path);
	if (links && links.length != 0) {
		let components = getNavbarComponents(path, links);
		return `<div class="sub-bar">${stringifyComponents(components)}</div>`;
	}
}

function appendSubmenu(ele, componentString, next) {
	if (componentString) {
		ele.append(componentString);
		let interval = setInterval(() => {
			let subBar = $('.sub-bar');
			if (subMenuExists(subBar)) {
				clearInterval(interval);
				next(subBar);
			}
		}, 10);
	}
}

function animateSubMenu(subBar, height, isMobile) {
	let time = isMobile ? 1000 : 500;
	let opacityTime = isMobile ? 2 : 1;
	animateOpacity(subBar, 1, time / opacityTime / 1000);
	animate(subBar, 'height', height, time / 1000, {
		transitionType: 'linear',
	});
}

function addLeaveListener(subBar) {
	subBar.mouseleave((e) => {
		let $target = $(e.target);
		if ($target.is('div')) {
			hideSubmenu($(e.target));
		}
	});
}

function hideSubmenu(subBar, isMobile) {
	let time = isMobile ? 750 : 100;
	animateOpacity(subBar, 0, time / 1000);
	animate(subBar, 'height', '0', 1, {
		transitionType: 'linear',
	});
	setTimeout(() => {
		subBar.remove();
	}, time / 1000);

}

function subMenuExists(subBar) {
	return Array.from(subBar).length == 0 ? false : true;
}

function getNavbarComponents(path, links) {
	return links.map((link, i) => {
		return (
			`<a href="${getLink(path, link)}" id="nav-link-${i+1}" class="nav-link"><i class="fa fa-paw nav-icon" aria-hidden="true"></i>${link}</a>`
		);
	});
}

function getLink(path, link) {
	path = path.toLowerCase();
	link = link.toLowerCase();
	link = link.replace(/\s+/g, '-');
	return `/${path}/${link}`;
}

function stringifyComponents(components) {
	return components.reduce((string, component) => {
		return string + component;
	});
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

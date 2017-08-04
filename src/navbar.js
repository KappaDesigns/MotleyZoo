import $ from 'jquery';
import './css/components/navbar.scss';

import {
	animateOpacity,
	animate,
} from './common';

const subMenuEntries = [{
	link: 'about',
	subPaths: ['What We Do', 'People', 'Sponsors'],
},
{
	link: 'involvement',
	subPaths: ['Individual', 'Coorporate'],
},
{
	link: 'resources',
	subPaths: ['What We Do'],
},
];

const navbarMobileWidth = 768;
const tabletWidth = 1024;

$(document).ready(() => {
	const navbarSubMenuLinks = createSubMenuMap(subMenuEntries);
	const $navLinks = $('.nav-link');
	const $navbar = $('.nav-bar');
	applyNavbarHandler($navLinks, $navbar, navbarSubMenuLinks);

	$(window).resize(() => {
		$('.active').removeClass('active');
		$('.sub-bar').remove();
		$navLinks.unbind('click').unbind('mouseenter');

		applyNavbarHandler($navLinks, $navbar, navbarSubMenuLinks);
	});
});

function applyNavbarHandler($navLinks, $navbar, navbarSubMenuLinks) {
	if (window.innerWidth > tabletWidth) {
		handleNavbarDesktop($navLinks, $navbar, navbarSubMenuLinks);
	} else if (window.innerWidth >= navbarMobileWidth && window.innerWidth <= tabletWidth) {
		handleNavbarTablet($navLinks, $navbar, navbarSubMenuLinks);
	} else {
		handleNavbarMobile($navLinks, navbarSubMenuLinks);
	}
}

function handleNavbarMobile(navLinks, navbarSubMenuLinks) {
	navLinks.click((e) => {
		let $child = ensureIsNavlink($(e.target));
		let subBar = $('.sub-bar');

		$('.active').removeClass('active');
		$child.addClass('active');

		if (shouldPreventDefault($child, navbarSubMenuLinks)) {
			e.preventDefault();
		}

		if (subMenuExists(subBar)) {
			hideSubmenu(subBar, true);
		}

		setTimeout(function() {
			displaySubmenu($child, $child, navbarSubMenuLinks, true);
		}, 100);
	});
}



function shouldPreventDefault(child, navbarSubMenuLinks) {
	let key = child.data('link');
	let array = navbarSubMenuLinks.get(key);
	if (array) {
		return array.length > 0;
	}
	return false;
}

function handleNavbarDesktop(navLinks, navbar, navbarSubMenuLinks) {
	navLinks.mouseenter((e) => {
		let $child = ensureIsNavlink($(e.target));
		let subBar = $('.sub-bar');
		if (subMenuExists(subBar)) {
			hideSubmenu(subBar, false);
		}
		setTimeout(function() {
			displaySubmenu($child, navbar, navbarSubMenuLinks, false);
		}, 100);
	});

	$(document).mousemove((e) => {
		let subBar = $('.sub-bar');
		let $target = $(e.target);
		if ($target.is('i')) {
			$target = $target.parent();
		}
		let cls = $target.prop('class');
		if (cls == 'nav-link') {
			$target = $target.parent();
		}
		cls = $target.prop('class');
		if (Array.from(subBar).length > 0) {
			if (cls != 'main-bar' && cls != 'sub-bar') {
				hideSubmenu(subBar, false);
			}
		}
	});
}

function handleNavbarTablet(navLinks, navbar, navbarSubMenuLinks) {
	navLinks.click((e) => {
		let $child = ensureIsNavlink($(e.target));
		let subBar = $('.sub-bar');
		if (shouldPreventDefault($child, navbarSubMenuLinks)) {
			e.preventDefault();
		}
		if (subMenuExists(subBar)) {
			hideSubmenu(subBar, false);
		}
		setTimeout(function() {
			displaySubmenu($child, navbar, navbarSubMenuLinks, null);
		}, 100);
	});
}

function displaySubmenu(mainLink, appendEle, linkMap, isMobile) {
	let componentString = getSubmenu(mainLink, linkMap, isMobile);
	appendSubmenu(appendEle, componentString, (subBar) => {
		if (isMobile === null) {
			animateSubMenu(subBar, 40, false);
		} else if (isMobile) {
			animateSubMenu(subBar, 'auto', isMobile);
		} else {
			addLeaveListener(subBar);
			animateSubMenu(subBar, 40, isMobile);
		}
	});
}

function getSubmenu(mainLink, linkMap, isMobile) {
	let path = mainLink.data('link');
	let links = linkMap.get(path);
	if (links && links.length != 0) {
		let components = getNavbarComponents(path, links);
		console.log(components);
		return `<div class="sub-bar">${getHeadPathLink(isMobile, path)}${stringifyComponents(components)}</div>`;
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
	let heightTime = isMobile ? 1 : 2;
	animateOpacity(subBar, 1, `${time / opacityTime / 1000}s`);
	animate(subBar, 'height', height, `${time / heightTime / 1000}s`, {
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
	animateOpacity(subBar, 0, `${time / 1000}s`);
	animate(subBar, 'height', '0', '1s', {
		transitionType: 'linear',
	});
	setTimeout(() => {
		$('.sub-bar').remove();
	}, time / 1000);

}

function subMenuExists(subBar) {
	return Array.from(subBar).length == 0 ? false : true;
}

function getNavbarComponents(path, links) {
	return links.map((link, i) => {
		return (
			`<a href="${getLink(path, link)}" id="nav-link-${i+1}" class="nav-link"> ${link}</a>`
		);
	});
}

function getLink(path, link) {
	path = path.toLowerCase();
	link = link.toLowerCase();
	link = link.replace(/\s+/g, '-');
	return `../${link}`;
}

function getHeadPathLink(isMobile, path) {
	if (isMobile || isMobile === null) {
		let text = path;
		path = path.toLowerCase();
		path = path.replace(/\s+/g, '-');
		return `<a href="${path}" id="nav-link-${0}" class="nav-link"> ${text}</a>`;
	}
	return '';
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

function ensureIsNavlink(elem) {
	if (elem.is('i')) {
		return elem.parent();
	}
	return elem;
}
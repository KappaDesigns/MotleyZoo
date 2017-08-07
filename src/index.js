import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import jQuery from 'jquery';

const mobileAnimationWidth = 720;
const navbarDisplacement = 55;
const mobileTransitionHeight = 1;
const desktopTransitionHeight = 1;

jQuery(document).ready(() => {
	const $backgroundImage = jQuery('.image-overlay');
	const $siteTitle = jQuery('.site-title');
	const $navbar = jQuery('.nav-bar');
	const $animationContainer = jQuery('.animation-container');


	handleJumbotronAnimations(
		$backgroundImage,
		$siteTitle,
		$navbar
	);

	jQuery(window).scroll(() => {
		handleNavbarPosition($navbar);
		animateAboutUs($animationContainer);
	});
});

function animateAboutUs(container) {
	if (window.innerWidth < mobileAnimationWidth) {
		let elems = Array.from(container.find('.animation-part'));
		let values = elems.map((ele) => {
			return jQuery(ele).offset().top + jQuery(ele).height() / mobileTransitionHeight;
		});
		handleMobileAnimation(elems, values);
	} else {
		let elems = Array.from(container.find('.animation-part'));
		let values = elems.map((ele) => {
			return jQuery(ele).offset().top + jQuery(ele).height() / desktopTransitionHeight;
		});
		handleDesktopAnimation(elems, values);
	}
}

function handleDesktopAnimation(elems, values) {
	let scrollBottom = jQuery(window).scrollTop() + window.innerHeight;
	values.forEach((val, i) => {
		const id = `#animation-${i + 1}`;
		animateOpacity(elems[i], val, scrollBottom);
		if (scrollBottom > val) {
			handleFowardAnimation(id, i);
		} else if (scrollBottom <= window.innerHeight + 100) {
			handleResetAnimation(id, i);
		}
	});
}

function handleFowardAnimation(id, i) {
	switch (i) {
	case 0:
		jQuery(id).css({
			'transition': 'transform 2s ease-in-out',
			'transform': 'translateY(0px)',
		});
		break;
	case 1:
		jQuery(id).css({
			'transition': 'transform 2s ease-in-out',
			'transform': 'translateX(0vw)',
		});
		break;
	case 2:
		jQuery(id).css({
			'transition': 'transform 2s ease-in-out',
			'transform': 'translateY(0px)',
		});
		break;
	case 3:
		jQuery(id).css({
			'transition': 'transform 2s ease-in-out',
			'transform': 'translateY(100px)',
		});
		break;
	default:
		break;
	}
}

function handleResetAnimation(id, i) {
	switch (i) {
	case 0:
		jQuery(id).css({
			'transform': 'translateY(-300px)',
		});
		break;
	case 1:
		jQuery(id).css({
			'transform': 'translateX(-30vw)',
		});
		break;
	case 2:
		jQuery(id).css({
			'transform': 'translateY(300px)',
		});
		break;
	case 3:
		jQuery(id).css({
			'transform': 'translateY(300px)',
		});
		break;
	default:
		break;
	}
}

function handleMobileAnimation(elems, values) {
	let scrollBottom = jQuery(window).scrollTop() + window.innerHeight;
	values.forEach((val, i) => {
		animateOpacity(elems[i], val, scrollBottom);
	});
}

function animateOpacity(elem, val, scrollBottom) {
	if (scrollBottom > val) {
		jQuery(elem).css({
			'transition': 'opacity 1s ease-in-out',
			'opacity': 1,
		});
	} else  {
		jQuery(elem).css({
			'transition': 'opacity 1s ease-in-out',
			'opacity': 0,
		});
	}
}

function handleJumbotronAnimations(backgroundImage, siteTitle, navbar) {
	backgroundImage.css({
		'transition': 'opacity 2s ease-in-out',
		'opacity': 1,
	});
	siteTitle.css({
		'transition': 'opacity 2s ease-in-out, transform 2s ease-in-out',
		'transform': 'translateY(50px)',
		'opacity': 1,
	});
	navbar.css({
		'transition':'opacity 0.5s ease-in-out',
		'opacity': 1,
	});
}

function handleNavbarPosition(navbar) {
	if (window.innerHeight > 660) {
		if (jQuery(window).scrollTop() > window.innerHeight - navbar.height()) {
			navbar.css({
				'position': 'fixed',
				'z-index': 58008,
				'top': navbarDisplacement,
			});
		} else {
			navbar.css({
				'position': 'static',
			});
		}
	}
}

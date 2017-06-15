import $ from 'jquery';

const navbarDisplacement = 55;

function handleSiteTitleAnimation(siteTitle) {
	siteTitle.css({
		'transition': 'opacity 2s ease-in-out, transform 2s ease-in-out',
		'transform': 'translateY(50px)',
		'opacity': 1,
	});
}

function handleNavbarAnimation(navbar) {
	navbar.css({
		'transition':'opacity 0.5s ease-in-out',
		'opacity': 1,
	});
}

function handleBackgroundAnimation(backgroundImage) {
	backgroundImage.css({
		'transition': 'opacity 2s ease-in-out',
		'opacity': 1,
	});
}

function handleNavbarPosition(navbar, bottom) {
	if (window.innerWidth > 660) {
		if ($(window).scrollTop() > bottom - navbar.height()) {
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

export {
	handleSiteTitleAnimation,
	handleNavbarAnimation,
	handleBackgroundAnimation,
	handleNavbarPosition,
};

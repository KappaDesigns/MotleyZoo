// import $ from 'jquery';

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

export { handleSiteTitleAnimation, handleNavbarAnimation, handleBackgroundAnimation };

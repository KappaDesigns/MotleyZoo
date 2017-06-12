function createComponent(text) {
	const element = document.createElement('div');
	element.innerHTML = text;
	return element;
}
document.body.appendChild(createComponent('hello world'));

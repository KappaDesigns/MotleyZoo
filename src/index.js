import './css/bootstrap/grid.min.css';
import './css/index.scss';

function createComponent(text) {
	const element = document.createElement('div');
	element.innerHTML = text;
	element.className = 'test-component';
	return element;
}
document.body.appendChild(createComponent('hello world'));

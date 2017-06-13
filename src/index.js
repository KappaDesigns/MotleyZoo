import './css/bootstrap/bootstrap.min.css';
import './css/index.scss';
import $ from 'jquery';

function createComponent(text) {
	$('.classy');
	const element = document.createElement('div');
	element.innerHTML = text;
	return element;
}
document.body.appendChild(createComponent('hello world'));

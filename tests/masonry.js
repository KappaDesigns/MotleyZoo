class rect {
	constructor(width,height) {
		this.width = width;
		this.height = height;
	}
}

let rects = [new rect(10,10), new rect(30,20), new rect(25,30), new rect(15,40)];
let containerWidth = 40;

rects.forEach((rect) => {
	console.log(rect);
})

let order = [];
let appended = [];
let colRectData = [];
let col = [];

while(append.length != rects.length) {
	let rect = findNextRect();

	appended.push(rect);
}

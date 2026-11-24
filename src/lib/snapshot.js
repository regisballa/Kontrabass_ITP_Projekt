// Bild speichern: Die 3D-Szene meldet hier eine Funktion an, die ein PNG-Bild macht.
let makeImage = null;

export function setImageMaker(fn) {
	makeImage = fn;
}

export function saveImage(filename) {
	if (!makeImage) return;
	const link = document.createElement('a');
	link.href = makeImage();
	link.download = filename;
	link.click();
}
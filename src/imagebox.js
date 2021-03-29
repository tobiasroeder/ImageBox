/*
	ImageBox v1.3.0
	(c) Tobias Roeder
	tobiasroeder.github.io/imagebox/license
*/

// ImageBox
const imagebox = {
	init: () => {
		// display imagebox info
		if (imagebox.settings.info) console.log('%cImageBox v1.3.0\nhttps://tobiasroeder.github.io/imagebox', 'color:#39c');
		// imagebox keycontrols
		if (imagebox.settings.keyControls) {
			window.onkeyup = (event) => {
				if (document.body.classList.contains('imagebox')) {
					switch (event.keyCode) {
						case 27: // Esc
							imagebox.close();
							break;

						case 37: // left arrow
							{
								let controlLeft = document.querySelector('.ib-control-left');
								if (controlLeft) controlLeft.click();
							}
							break;

						case 39: // right arrow
							{
								let controlRight = document.querySelector('.ib-control-right');
								if (controlRight) controlRight.click();
							}
							break;
					}
				}
			};
		}

		imagebox.finder();
	},
	galleryNames: [],
	galleries: [],
	finder: () => {
		let ibElmts = document.querySelectorAll('img[data-imagebox]');

		ibElmts.forEach(ibElmt => {
			let dataImagebox = ibElmt.dataset.imagebox;

			ibElmt.setAttribute('onclick', 'imagebox.open(this)');

			if (dataImagebox === '') return
			if (!imagebox.galleryNames.includes(dataImagebox)) imagebox.galleryNames.push(dataImagebox);
		});

		imagebox.galleryNames.forEach(galleryName => {
			let elmts = document.querySelectorAll(`[data-imagebox="${galleryName}"]`);

			imagebox.galleries.push(elmts);
		});

		imagebox.galleries.forEach((gallery, galleryIndex) => {
			gallery.forEach((image, imageIndex) => {
				image.setAttribute('data-imagebox-image-index', imageIndex);
				image.setAttribute('data-imagebox-gallery-index', galleryIndex);
			});
		});
	},
	settings: {
		info: false,
		swipeToChange: true,
		swipeToClose: true,
		keyControls: true,
		closeEverywhere: true,
	},
	options: ({
		info = false,
		swipeToChange = true,
		swipeToClose = true,
		keyControls = true,
		closeEverywhere = true,
	}) => {
		// set settings
		imagebox.settings.info = info;
		imagebox.settings.swipeToChange = swipeToChange;
		imagebox.settings.swipeToClose = swipeToClose;
		imagebox.settings.keyControls = keyControls;
		imagebox.settings.closeEverywhere = closeEverywhere;
	},
	open: (elmt) => {
		let isGallery = true,
			dataImagebox = elmt.dataset.imagebox;

		if (dataImagebox === 'image' || dataImagebox === '') isGallery = false;

		// some letiables
		let imageSrc = null;

		// add imagebox class to the body
		document.body.classList.add('imagebox');

		// create imagebox block + id if the element doesn't exist yet
		if (document.querySelector('#imagebox') == null) {
			let ib = document.createElement('div');
			ib.setAttribute('id', 'imagebox');
			ib.setAttribute('class', 'ib-remove');
			document.body.appendChild(ib);
		}

		// define the src
		imageSrc = elmt.dataset.imageboxSrc ?? elmt.src;

		let imgbox = document.querySelector('#imagebox');

		// gallery
		let galleryControl = '',
			galleryInfo = '',
			galleryPlaceholderImage = '',
			closeEverywhere = '';

		if (isGallery) {
			let dataImageboxImageIndex = parseInt(elmt.dataset.imageboxImageIndex),
				dataImageboxGalleryIndex = parseInt(elmt.dataset.imageboxGalleryIndex),
				imgGalleryLength = imagebox.galleries[dataImageboxGalleryIndex].length,
				prevDisabled = '',
				nextDisabled = '';

			// disable button
			// imagebox index == the first one
			if (dataImageboxImageIndex == 0) {
				prevDisabled = 'disabled';
			}

			// imagebox index == the last one
			if (dataImageboxImageIndex == imgGalleryLength - 1) {
				nextDisabled = 'disabled';
			}

			// create control for gallery
			galleryControl = `<div class="ib-control">
					<div class="ib-control-left" onclick="imagebox.prev(${dataImageboxImageIndex}, ${dataImageboxGalleryIndex})" ${prevDisabled}></div>
					<div class="ib-control-right" onclick="imagebox.next(${dataImageboxImageIndex}, ${dataImageboxGalleryIndex})" ${nextDisabled}></div>
				</div>`;

			// create info eg. '2/7' for gallery
			galleryInfo = `<div class="ib-indexes">
					<span class="ib-current-index">${dataImageboxImageIndex + 1}</span> / <span class="ib-last-index">${imgGalleryLength}</span>
				</div>`;

			// create next image placeholder
			galleryPlaceholderImage = '<img src="" class="ib-image ib-image-next ib-hidden">';
		} else {
			if (imagebox.settings.closeEverywhere) closeEverywhere = ' onclick="imagebox.close(this)"';
		}

		// fill the imagebox element
		imgbox.innerHTML = `<div class="ib-loading"></div>
			<div class="ib-content"${closeEverywhere}>
				<div class="ib-topbar">${galleryInfo}
					<div class="ib-buttons">
						<div class="ib-close ib-button" onclick="imagebox.close()"></div>
					</div>
				</div>
				${galleryControl}
				<div class="ib-image-wrapper">
					<img src="${imageSrc}" class="ib-image ib-image-current">
					${galleryPlaceholderImage}
				</div>
				<div class="ib-caption">Lorem Ipsum</div>
			</div>`;

		// data imagebox caption
		imagebox.caption(elmt);

		// display imagebox
		imagebox.fade.in(imgbox);

		// hide loading circle if image is loaded
		document.querySelector('#imagebox .ib-image').onload = () => {
			document.querySelector('#imagebox .ib-loading').style.opacity = '0';
			document.querySelector('#imagebox .ib-image-wrapper').style.opacity = '1';
		};

		// activate swipe control
		imagebox.swipe(document.querySelector('#imagebox .ib-content'), isGallery);
	},
	close: () => {
		// remove imagebox class from the body + hide imagebox
		document.body.classList.remove('imagebox');
		let imgbox = document.querySelector('#imagebox');
		imgbox.classList.remove('ib-remove');

		// only fade the imagebox out
		imagebox.fade.out(imgbox);
	},
	change: (imageIndex, galleryIndex, direction) => {
		let imgboxLoading = document.querySelector('#imagebox .ib-loading'),
			imgGalleryLength = imagebox.galleries[galleryIndex].length,
			nextElmt = document.querySelector(`img[data-imagebox-image-index='${imageIndex}'][data-imagebox-gallery-index='${galleryIndex}']`),
			controlLeft = document.querySelector('#imagebox .ib-control-left'),
			controlRight = document.querySelector('#imagebox .ib-control-right'),
			currentIndex = document.querySelector('#imagebox .ib-current-index');

		// display the loading circle
		imgboxLoading.style.opacity = '1';

		// check if the control button has to be disabled
		// prev()
		if (direction == 'prev') {
			if (imageIndex == 0) controlLeft.setAttribute('disabled', '');
			controlRight.removeAttribute('disabled');
		}

		// next()
		if (direction == 'next') {
			if (imageIndex == (imgGalleryLength - 1)) controlRight.setAttribute('disabled', '');
			controlLeft.removeAttribute('disabled');
		}

		controlLeft.setAttribute('onclick', `imagebox.prev(${imageIndex}, ${galleryIndex})`);
		controlRight.setAttribute('onclick', `imagebox.next(${imageIndex}, ${galleryIndex})`);
		currentIndex.innerText = (imageIndex + 1);

		let nextImg = document.querySelector('#imagebox .ib-image-next'),
			currentImg = document.querySelector('#imagebox .ib-image-current');

		currentImg.classList.add('ibFadeOut');

		nextImg.src = nextElmt.dataset.imageboxSrc ?? nextElmt.src;
		imagebox.caption(nextElmt);

		nextImg.onload = () => {
			nextImg.classList.add('ibFadeIn');
			imgboxLoading.style.opacity = 0;

			setTimeout(() => {
				currentImg.className = 'ib-image ib-hidden ib-image-next';
				currentImg.src = '';
				nextImg.className = 'ib-image ib-image-current';
			}, 600);
		}
	},
	prev: (imageIndex, galleryIndex) => {
		if (imageIndex == 0) return;
		imageIndex = (imageIndex <= 0 ? imageIndex = 0 : imageIndex - 1);

		imagebox.change(imageIndex, galleryIndex, 'prev');
	},
	next: (imageIndex, galleryIndex) => {
		let imgGalleryLength = imagebox.galleries[galleryIndex].length - 1;
		if (imageIndex == imgGalleryLength) return;
		imageIndex = (imageIndex >= imgGalleryLength ? imageIndex = imgGalleryLength : imageIndex + 1);

		imagebox.change(imageIndex, galleryIndex, 'next');
	},
	caption: elmt => {
		let dataCaption = elmt.getAttribute('data-imagebox-caption'),
			imageboxCaption = document.querySelector('#imagebox .ib-caption');

		imageboxCaption.textContent = dataCaption;

		// a little feature for the caption
		// if {loc} is there, add the location class
		if (dataCaption) {
			if (dataCaption.indexOf('{loc}') > -1) {
				imageboxCaption.classList.add('location');
				dataCaption = dataCaption.replace(/{loc}/, '');
				imageboxCaption.textContent = dataCaption;
			} else {
				imageboxCaption.classList.remove('location');
			}

			// display the background of the description
			imageboxCaption.style.display = 'block';
		} else {
			imageboxCaption.style.display = 'none';
		}
	},
	swipe: (elmt, isGallery) => {
		if (!elmt) return;
		// swipe gesture (mobile)
		elmt.ontouchstart = event => {
			// console.log(event)
			let startPointX = event.layerX,
				startPointY = event.layerY;

			elmt.ontouchend = event => {
				let endPointX = event.layerX,
					pointDifferenceX = startPointX - endPointX,
					endPointY = event.layerY,
					pointDifferenceY = startPointY - endPointY,
					tenPercentWidth = window.innerWidth / 10,
					tenPercentHeight = window.innerHeight / 10;

				// close
				if (imagebox.settings.swipeToClose) {
					if (pointDifferenceY >= tenPercentHeight || pointDifferenceY <= (-tenPercentHeight)) imagebox.close()
				}
				// gallery
				if (isGallery) {
					// change
					if (imagebox.settings.swipeToChange) {
						// next
						if (pointDifferenceX >= tenPercentWidth) document.querySelector('#imagebox .ib-control-right').click();
						// prev
						if (pointDifferenceX <= (-tenPercentWidth)) document.querySelector('#imagebox .ib-control-left').click();
					}
				}
			}
		}
	},
	fade: {
		duration: .1,
		out: (elmt, getRemoved = false, callback) => {
			elmt.style.opacity = 1;
			(function fade() {
				let val = parseFloat(elmt.style.opacity);
				if (!((val -= imagebox.fade.duration) < 0)) {
					elmt.style.opacity = val;
					requestAnimationFrame(fade);
				} else {
					if (callback) callback();
					if (getRemoved) document.querySelector('#imagebox .ib-image-wrapper').removeChild(elmt);
					elmt.style.display = 'none';
				}
			})();
		},
		in: (elmt, callback) => {
			elmt.style.opacity = 0;
			elmt.style.display = 'block';
			(function fade() {
				let val = parseFloat(elmt.style.opacity);
				if (!((val += imagebox.fade.duration) > 1)) {
					elmt.style.opacity = val;
					requestAnimationFrame(fade);
				} else {
					if (callback) callback();
				}
			})();
		}
	}
}


// initialize imagebox
window.onload = imagebox.init;
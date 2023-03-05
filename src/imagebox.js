/*
	ImageBox v1.3.1
	(c) Tobias Roeder
	tobiasroeder.github.io/imagebox/license
*/

// ImageBox
const imagebox = {
	init(autoload = '') {
		// Disable auto initialization
		if (!this.settings.autoInit && autoload === 'autoload') return;

		// display imagebox info
		if (this.settings.info) console.log('%cImageBox v1.3.1\nhttps://tobiasroeder.github.io/imagebox', 'color:#39c');

		// imagebox keycontrols
		if (this.settings.keyControls) {
			window.onkeyup = event => {
				if (document.body.classList.contains('imagebox')) {
					switch (event.code) {
						case 'Escape':
							this.close();
							break;

						case 'ArrowLeft':
							{
								let controlLeft = document.querySelector('.ib-control-left');
								if (controlLeft) controlLeft.click();
							}
							break;

						case 'ArrowRight':
							{
								let controlRight = document.querySelector('.ib-control-right');
								if (controlRight) controlRight.click();
							}
							break;
					}
				}
			};
		}

		this.finder();
	},
	galleryNames: [],
	galleries: [],
	finder() {
		let ibElmts = document.querySelectorAll('img[data-imagebox]');

		if (this.galleries.length > 0) this.galleries = [];

		ibElmts.forEach(ibElmt => {
			let dataImagebox = ibElmt.dataset.imagebox;

			ibElmt.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();

				imagebox.open(this);
			});

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
		htmlCaption: false,
		autoInit: true,
	},
	options({
		info = false,
		swipeToChange = true,
		swipeToClose = true,
		keyControls = true,
		closeEverywhere = true,
		htmlCaption = false,
		autoInit = true,
	}) {
		// set settings
		this.settings.info = info;
		this.settings.swipeToChange = swipeToChange;
		this.settings.swipeToClose = swipeToClose;
		this.settings.keyControls = keyControls;
		this.settings.closeEverywhere = closeEverywhere;
		this.settings.htmlCaption = htmlCaption;
		this.settings.autoInit = autoInit;
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
		let galleryControl = null;
		let galleryInfo = null;
		let galleryPlaceholderImage = null;
		let dataImageboxImageIndex = null;
		let dataImageboxGalleryIndex = null;
		let imgGalleryLength = null;
		let prevDisabled = null;
		let nextDisabled = null;

		if (isGallery) {
			dataImageboxImageIndex = parseInt(elmt.dataset.imageboxImageIndex);
			dataImageboxGalleryIndex = parseInt(elmt.dataset.imageboxGalleryIndex);
			imgGalleryLength = imagebox.galleries[dataImageboxGalleryIndex].length;

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
					<div class="ib-control-left" ${prevDisabled}></div>
					<div class="ib-control-right" ${nextDisabled}></div>
				</div>`;

			// create info eg. '2/7' for gallery
			galleryInfo = `<div class="ib-indexes">
					<span class="ib-current-index">${dataImageboxImageIndex + 1}</span> / <span class="ib-last-index">${imgGalleryLength}</span>
				</div>`;

			// create next image placeholder
			galleryPlaceholderImage = '<img src="" class="ib-image ib-image-next ib-hidden">';
		}

		// fill the imagebox element
		imgbox.innerHTML = `<div class="ib-loading"></div>
			<div class="ib-content">
				<div class="ib-topbar">${galleryInfo}
					<div class="ib-buttons">
						<div class="ib-close ib-button"></div>
					</div>
				</div>
				${galleryControl}
				<div class="ib-image-wrapper">
					<img src="${imageSrc}" class="ib-image ib-image-current">
					${galleryPlaceholderImage}
				</div>
				<div class="ib-caption"></div>
			</div>`;

		if (isGallery) {
			imgbox.querySelector('.ib-control-left').addEventListener('click', event => {
				event.preventDefault();
				event.stopPropagation();

				imagebox.prev(dataImageboxImageIndex--, dataImageboxGalleryIndex);
			});

			imgbox.querySelector('.ib-control-right').addEventListener('click', event => {
				event.preventDefault();
				event.stopPropagation();

				imagebox.next(dataImageboxImageIndex++, dataImageboxGalleryIndex);
			});
		} else {
			if (imagebox.settings.closeEverywhere) {
				imgbox.querySelector('.ib-content').addEventListener('click', () => {
					imagebox.close();
				});
			}
		}

		imgbox.querySelector('.ib-close').addEventListener('click', () => {
			imagebox.close();
		});

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
	caption(elmt) {
		let dataCaption = elmt.getAttribute('data-imagebox-caption');
		let imageboxCaption = document.querySelector('#imagebox .ib-caption');

		if (this.settings.htmlCaption) {
			imageboxCaption.innerHTML = dataCaption;
		} else {
			imageboxCaption.textContent = dataCaption;
		}

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
window.addEventListener('load', function() {
	imagebox.init('autoload');
});
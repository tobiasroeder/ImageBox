// ======================================================
// ImageBox IE v1.2.0
//
// Creative Commons Attribution 4.0 International License
// https://tobiasroeder.github.io/imagebox/license
//
// https://github.com/tobiasroeder/imagebox
// Copyright 2020 ImageBox
//
// ======================================================

function imageboxInit() {
    window.onkeydown = function(event) {
        if (document.body.classList.contains('imagebox')) {
            switch (event.key) {
                case 'Esc':
                    imageboxClose();
                    break;
            }
        }
    };

    imageboxFinder();
}


function imageboxFinder() {
    var ibElmts = document.querySelectorAll('img[data-imagebox]'),
        ibElmtsLength = 0,
        ibElmtsGalleryLength = 0;

    for (var i = 0; i < ibElmts.length; i++) {
        ibElmts[i].setAttribute('onclick', 'imageboxOpen(this)');
        if (ibElmts[i].dataset.imagebox == 'gallery') ibElmts[i].setAttribute('data-imagebox-index', (ibElmtsGalleryLength++));

        // count the elements
        ibElmtsLength++;
    }

    return ibElmtsGalleryLength;
}


function imageboxOpen(elmt) {
    if (elmt) var dataImagebox = elmt.getAttribute('data-imagebox');

    if (dataImagebox == 'image' || dataImagebox == '' || dataImagebox == 'gallery') {
        // some variables
        var imageSrc = null;

        // add imagebox class to the body
		document.body.classList.add('imagebox');

        // create imagebox block + id if the element doesn't exist yet
		if (document.querySelector('#imagebox') == null) {
            var ib = document.createElement('div');
    		ib.setAttribute('id', 'imagebox');
    		ib.setAttribute('class', 'ib-remove');
    		document.body.appendChild(ib);
		}

        // define the src
        imageSrc = (elmt.getAttribute('data-imagebox-src') != null ? elmt.getAttribute('data-imagebox-src') : elmt.getAttribute('src'));

        var imgbox = document.querySelector('#imagebox'),
            imgboxCaption = document.querySelector('.ib-caption');

        // check the caption
        // if (elmt.getAttribute('data-imagebox-caption') != null) imgboxCaption.style.display = 'block';

        // gallery
		var galleryControl = '',
			galleryInfo = '',
            closeEverywhere = '';

		if (dataImagebox == 'gallery') {

			var dataImageboxIndex = Number(elmt.getAttribute('data-imagebox-index')),
				imgGalleryLength = imageboxFinder() - 1,
				prevDisabled = '',
				nextDisabled = '';

			// disable button
			// imagebox index == the first one
			if (dataImageboxIndex == 0) {
				prevDisabled = 'disabled';
			}

			// imagebox index == the last one
			if (dataImageboxIndex == imgGalleryLength) {
				nextDisabled = 'disabled';
			}

			// create control for gallery
			galleryControl = '<div class="ib-control">'+
			'<div class="ib-control-left" onclick="imageboxPrev(' + dataImageboxIndex + ')"' + prevDisabled + '></div>'+
			'<div class="ib-control-right" onclick="imageboxNext(' + dataImageboxIndex + ')"' + nextDisabled + '></div>'+
			'</div>';

			// create info eg. '2/7' for gallery
			galleryInfo = '<div class="ib-indexes">'+
				'<span class="ib-current-index">'+
				(dataImageboxIndex + 1)+
				'</span> / <span class="ib-last-index">'+
				(imgGalleryLength + 1)+
				'</span></div>';

		} else {
            closeEverywhere = ' onclick="imageboxClose(this)"';
		}

        // fill the imagebox element
		imgbox.innerHTML = '<div class="ib-loading"></div>'+
            '<div class="ib-content"'+closeEverywhere+'>'+
                '<div class="ib-topbar">'+
                    galleryInfo+
                    '<div class="ib-buttons"><div class="ib-close ib-btn" onclick="imageboxClose()"></div></div>'+
                '</div>'+
                galleryControl+
                '<div class="ib-image-wrapper">'+
                    '<img src="' + imageSrc + '" class="ib-image">'+
                '</div>'+
                '<div class="ib-caption">Lorem Ipsum</div>'+
            '</div>';

        // data imagebox caption
		imageboxCaption(elmt);

        // display imagebox
		imgbox.style.opacity = 0;
		imgbox.style.display = 'block';
		(function fade() {
			var val = parseFloat(imgbox.style.opacity);
			if (!((val += 0.1) > 1)) {
				imgbox.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();

        // hide loading circle if image is loaded
        document.querySelector('.ib-image').onload = function() {
			document.querySelector('.ib-loading').style.opacity = '0';
			document.querySelector('.ib-image-wrapper').style.opacity = '1';
		};
    }
}


function imageboxClose() {
    // remove imagebox class from the body + hide imagebox
	document.body.classList.remove('imagebox');
	var imgbox = document.querySelector('#imagebox');
    imgbox.classList.remove('ib-remove');

	// only fade the imagebox out
    imgbox.style.opacity = 1;
	(function fade() {
		var val = parseFloat(imgbox.style.opacity);
		if (!((val -= 0.1) < 0)) {
			imgbox.style.opacity = val;
			requestAnimationFrame(fade);
		} else {
			imgbox.style.display = 'none';
		}
	})();
	// return true;

    // display loading circle and hide ib-image element
    document.querySelector('.ib-image').onload = function() {
		document.querySelector('.ib-loading').style.opacity = '1';
		document.querySelector('.ib-image').style.opacity = '0';
	};
}


function imageboxSwitch(pcn, index, direction) {
    var imgboxLoading = document.querySelector('.ib-loading'),
		imgboxImage = document.querySelector('.ib-image'),
        imgGalleryLength = imageboxFinder() - 1,
		el = document.querySelector('img[data-imagebox-index="'+pcn+'"]'),
		cl = document.querySelector('.ib-control-left'),
		cr = document.querySelector('.ib-control-right'),
		infoNbr = document.querySelector('.ib-current-index'),
		description = document.querySelector('.ib-description'),
		imgSrc;

    // display the loading circle and hide the the imagebox image
    imgboxLoading.style.opacity = '1';
	imgboxImage.style.opacity = '0';

	// select the default src if imagebox src is undefined
	if (el.dataset.imageboxSrc == undefined) {
		imgSrc = el.src;
	} else {
		imgSrc = el.dataset.imageboxSrc;
	}

	// check if the control button has to be disabled
	// prev()
	if (direction == 'prev') {
		if (index == 1) {
			cl.setAttribute('disabled', '');
        }

		cr.removeAttribute('disabled');
	}

	// next()
	if (direction == 'next') {
		if (index == (imgGalleryLength - 1)) {
			cr.setAttribute('disabled', '');
		}

        cl.removeAttribute('disabled');
	}

	// check caption
	imageboxCaption(el);

	imgboxImage.src = imgSrc;
	cl.setAttribute('onclick', 'imageboxPrev('+pcn+')');
	cr.setAttribute('onclick', 'imageboxNext('+pcn+')');
	infoNbr.innerHTML = (pcn + 1);

	imgboxImage.onload = function(){
		imgboxLoading.style.opacity = '0';
		imgboxImage.style.opacity = '1';
	};
}


function imageboxPrev(i) {
    var pcn = (i <= 0 ? i = 0 : i - 1);
    imageboxSwitch(pcn, i, 'prev');
}


function imageboxNext(i) {
    var imgGalleryLength = imageboxFinder() - 1,
        pcn = (i >= imgGalleryLength ? i = imgGalleryLength : i + 1);

    imageboxSwitch(pcn, i, 'next');
}


function imageboxCaption(elmt) {
	var dataCaption = elmt.getAttribute('data-imagebox-caption'),
	   imageboxCaption = document.querySelector('.ib-caption');

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
}


// find all image tags which are imagebox declared
window.onload = imageboxInit();

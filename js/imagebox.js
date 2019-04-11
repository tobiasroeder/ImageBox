// ======================================================
// ImageBox v1.1.0
//
// Creative Commons Attribution 4.0 International License
// https://tobiasroeder.github.io/imagebox/license
//
// https://github.com/tobiasroeder/imagebox
// Copyright 2018 ImageBox
//
// ======================================================

	
console.log('ImageBox v1.1.0\nhttp://tobiasroeder.github.io/imagebox');


// fadeOut (fade.js)
function fadeOut(el) {
	el.style.opacity = 1;
	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val -= .1) < 0)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
	return true;
}


// fadeIn (fade.js)
function fadeIn(el, display) {
	el.style.opacity = 0;
	el.style.display = display || "block";
	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}


// data imagebox description
function dataImageboxDescription(e) {
	dataDescription = e.getAttribute('data-imagebox-description');
	var imageboxDescription = document.getElementsByClassName('ib-description')[0];
	imageboxDescription.textContent = dataDescription;

	// a little feature for the description
	// if {loc} is there, add the location class
	if (dataDescription) {
		if (dataDescription.indexOf('{loc}') > -1) {
			imageboxDescription.classList.add('location');
			dataDescription = dataDescription.replace(/{loc}/, '');
			imageboxDescription.textContent = dataDescription;
		} else {
			imageboxDescription.classList.remove('location');
		}


		// display the background of the description
		imageboxDescription.style.display = 'block';
	} else {
		imageboxDescription.style.display = 'none';
	}
}


// mobile detection
function imageboxMobileDetection(i) {
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
		detectswipe(document.getElementsByClassName('ib-content')[0], i);
	}
}


// imagebox swipe to the next image
function detectswipe(el, imgIndex) {

	swipe_det = new Object();
	swipe_det.sX = 0;
	swipe_det.sY = 0;
	swipe_det.eX = 0;
	swipe_det.eY = 0;

	var min_x = 20;  //min x swipe for horizontal swipe
	var max_x = 40;  //max x difference for vertical swipe
	var min_y = 40;  //min y swipe for vertical swipe
	var max_y = 50;  //max y difference for horizontal swipe
	var direc = '';

	el.addEventListener('touchstart', function(e) {
		var t = e.touches[0];
		swipe_det.sX = t.screenX; 
		swipe_det.sY = t.screenY;
	}, false);

	el.addEventListener('touchmove', function(e) {
		e.preventDefault();
		var t = e.touches[0];
		swipe_det.eX = t.screenX; 
		swipe_det.eY = t.screenY;    
	}, false);

	el.addEventListener('touchend', function(e) {

		//horizontal detection
		if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
			if(swipe_det.eX > swipe_det.sX) direc = 'r';
			else direc = 'l';
		}

		//vertical detection
		if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
			if(swipe_det.eY > swipe_det.sY) direc = 'd';
			else direc = 'u';
		}

		if (direc != "") {

			if (direc == 'l') {
				var imgGalleryLength = imageboxFinder() - 1;
				imageboxNext((imgIndex >= imgGalleryLength ? imgIndex = imgGalleryLength : imgIndex++));
			}

			if (direc == 'r') {
				imageboxPrev((imgIndex <= 0 ? imgIndex = 0 : imgIndex--));
			}

			/*if (direc == 'u' || direc == 'd') {
				closeImagebox();
			}*/

		}

		direc = '';

	},false);  
}


// find all imgs with the data attribute data-imagebox and add the onclick stuff
// and find all data-imagebox gallery and add an unique index
function imageboxFinder() {

	// data-imagebox
	var imgs = document.querySelectorAll('img[data-imagebox]');

	for (var i = 0; i < imgs.length; i++) {
		imgs[i].setAttribute('onclick','imagebox(this)');
	}

	// data-imagebox = gallery
	var imgGallery = document.querySelectorAll('img[data-imagebox="gallery"]');
	for (var j = 0; j < imgGallery.length; j++) {
		imgGallery[j].setAttribute('data-imagebox-index',j);
	}

	return imgGallery.length;

}

imageboxFinder();


// imagebox
function imagebox(e) {

	// get attribute as variable
	var dataImagebox = e.getAttribute('data-imagebox');

	if (dataImagebox == 'image' || dataImagebox == '' || dataImagebox == 'gallery') {

		// add imagebox class to the body
		document.body.classList.add('imagebox');

		// create imagebox block + id
		var ib = document.createElement('div');
		ib.setAttribute('id', 'imagebox');
		ib.setAttribute('class', 'ib-remove');
		document.body.appendChild(ib);

		// gallery
		var galleryControl,
			galleryInfo;

		if (dataImagebox == 'gallery') {

			var dataImageboxIndex = Number(e.getAttribute('data-imagebox-index')),
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

			// create info '2/7' for gallery
			galleryInfo = '<div class="ib-infobar">'+
				'<span class="ib-current-index">'+
				(dataImageboxIndex + 1)+
				'</span> / <span class="ib-count-index">'+
				(imgGalleryLength + 1)+
				'</span></div>';

		} else {
			galleryControl = '';
			galleryInfo = '';
		}

		// create content into the imagebox
		var imgbox = document.getElementById("imagebox");
		imgbox.innerHTML = '<div class="ib-background"></div>'+
			'<div class="ib-content">'+
			'<div class="ib-loading"></div>'+
			galleryInfo+
			'<div class="ib-toolbar">'+
			'<div class="ib-close" onclick="closeImagebox()"></div>'+
			'</div>'+
			galleryControl+
			'<div class="ib-image"></div>'+
			'<div class="ib-description"></div>'+
			'</div>';

		// fade imagebox in
		fadeIn(imgbox);

		// source from the image + load image
		var dataImageSource = e.getAttribute('data-imagebox-src'),
			imgSource;

		// select the image to display in the imagebox
		if (dataImageSource == null) {
			imgSource = e.src;
		} else {
			imgSource = dataImageSource;
		}

		// write the <img> line
		var imgboxImage = document.getElementsByClassName('ib-image')[0];
		imgboxImage.innerHTML = '<img src="' + imgSource + '" class="ib-img">';

		// data imagebox description
		dataImageboxDescription(e);

		// close the imagebox on click the imagebox content function
		if (dataImagebox != 'gallery') {
			var imgboxContent = document.getElementsByClassName('ib-content')[0];
			imgboxContent.addEventListener('click', function() {
				closeImagebox();
			});
		}
	
		// hide loading circle if image is loaded
		var imgboxLoading = document.getElementsByClassName('ib-loading')[0];
		
		document.getElementsByClassName('ib-img')[0].onload = function(){
			imgboxLoading.style.opacity = '0';
			imgboxImage.style.opacity = '1';
		};
		
		if (dataImagebox == 'gallery') {
			// swipe control on mobile devices
			imageboxMobileDetection(dataImageboxIndex);
		}

	}

}


// one function which switch between previous and the next image
function switchImagebox(pcn, i, pos) {
	
	var imgboxLoading = document.getElementsByClassName('ib-loading')[0],
		imgboxImage = document.getElementsByClassName('ib-image')[0];
	
	imgboxLoading.style.opacity = '1';
	imgboxImage.style.opacity = '0';
	
	var imgGalleryLength = imageboxFinder() - 1,
		el = document.querySelectorAll('img[data-imagebox-index="'+pcn+'"]')[0],
		cl = document.getElementsByClassName('ib-control-left')[0],
		cr = document.getElementsByClassName('ib-control-right')[0],
		infoNbr = document.getElementsByClassName('ib-current-index')[0],
		description = document.getElementsByClassName('ib-description')[0],
		imgSrc;

	// select the default src if imagebox src is undefined
	if (el.dataset.imageboxSrc == undefined) {
		imgSrc = el.src; 
	} else {
		imgSrc = el.dataset.imageboxSrc;
	}

	// check if the control button has to be disabled
	// prev()
	if (pos == 'prev') {
		if (i == 1) {
			cl.setAttribute('disabled', '');
		} else {
			cr.removeAttribute('disabled');
		}
	}

	// next()
	if (pos == 'next') {
		if (i == (imgGalleryLength - 1)) {
			cr.setAttribute('disabled', '');
		} else {
			cl.removeAttribute('disabled');
		}
	}

	// check description
	dataImageboxDescription(el);
	
	document.getElementsByClassName('ib-img')[0].src = imgSrc;
	cl.setAttribute('onclick', 'imageboxPrev('+pcn+')');
	cr.setAttribute('onclick', 'imageboxNext('+pcn+')');
	infoNbr.innerHTML = (pcn + 1);
	
	document.getElementsByClassName('ib-img')[0].onload = function(){
		imgboxLoading.style.opacity = '0';
		imgboxImage.style.opacity = '1';
	};
	
}


// previous image from imagebox gallery
function imageboxPrev(i) {
	
	var pcn = (i <= 0 ? i = 0 : i - 1);
	switchImagebox(pcn, i, 'prev');
	imageboxMobileDetection(pcn);

}


// next image from imagebox gallery
function imageboxNext(i) {

	var imgGalleryLength = imageboxFinder() - 1,
		pcn = (i >= imgGalleryLength ? i = imgGalleryLength : i + 1);
	switchImagebox(pcn, i, 'next');
	imageboxMobileDetection(pcn);
}


// close the imagebox
function closeImagebox() {
	
	// remove imagebox class to the body
	document.body.classList.remove('imagebox');

	// fade imagebox out
	var imgbox = document.getElementById('imagebox');
	fadeOut(imgbox);

	// remove imagebox after 500ms
	if (imgbox.classList.contains('ib-remove')) {
		setTimeout(function() {
			imgbox.remove();
		}, 500);
	}
}
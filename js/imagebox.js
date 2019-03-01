// ======================================================
// ImageBox v1.0.3
//
// Creative Commons Attribution 4.0 International License
// https://tobiasroeder.github.io/imagebox/license
//
// https://github.com/tobiasroeder/imagebox
// Copyright 2019 ImageBox
//
// ======================================================

// fadeOut (fade.js)
function fadeOut(el) {
	el.style.opacity = 1;
	(function fade() {
		if ((el.style.opacity -= .05) < 0) {
			el.style.display = "none";
		}
		else {
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


// imagebox
function imagebox(e) {

	// get attribute as variable
	var dataImagebox = e.getAttribute("data-imagebox");

	if (dataImagebox == "image" || dataImagebox == "") {
		
		// add imagebox class to the body
		document.body.classList.add("imagebox");

		// create imagebox block + id
		var ib = document.createElement("div");
		ib.setAttribute("id", "imagebox");
		ib.setAttribute("class", "ib-remove");
		document.body.appendChild(ib);

		// create content into the imagebox
		var imgbox = document.getElementById("imagebox");
		imgbox.innerHTML = '<div class="ib-background"></div>'+
			'<div class="ib-content">'+
			'<div class="ib-toolbar">'+
			'<div class="ib-close" onclick="closeImagebox()"></div>'+
			'</div>'+
			'<div class="ib-image"></div>'+
			'<div class="ib-description"></div>'+
			'</div>';

		// fade imagebox in
		fadeIn(imgbox);

		// source from the image + load image
		var dataImageSource = e.getAttribute("data-imagebox-src"),
			imgSource;

		// select the image to display in the imagebox
		if (dataImageSource == null) {
			imgSource = e.src;
		} else {
			imgSource = dataImageSource;
		}

		// write the <img> line
		var imgboxImage = document.getElementsByClassName("ib-image")[0];
		imgboxImage.innerHTML = '<img src="' + imgSource + '">';

		// data imagebox description
		dataDescription = e.getAttribute("data-imagebox-description");
		var imageboxDescription = document.getElementsByClassName("ib-description")[0];
		imageboxDescription.textContent = dataDescription;
		
		// a little feature for the description
		// if {loc} is there, add the location class
		if (dataDescription.indexOf("{loc}") > -1) {
			imageboxDescription.classList.add('location');
			dataDescription = dataDescription.replace(/{loc}/, '');
			imageboxDescription.textContent = dataDescription;
		}

		// close the imagebox on click the imagebox content function
		var imgboxContent = document.getElementsByClassName("ib-content")[0];
		imgboxContent.addEventListener("click", function() {
			closeImagebox();
		});

	}

}

function closeImagebox() {
	// remove imagebox class to the body
	document.body.classList.remove("imagebox");

	// fade imagebox out
	var imgbox = document.getElementById("imagebox");
	fadeOut(imgbox);

	// remove imagebox after 500ms
	if (imgbox.classList.contains("ib-remove")) {
		setTimeout(function() {
			imgbox.remove();
		}, 500);
	}
}
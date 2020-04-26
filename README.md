# ImageBox Documentation

[Documentation for 1.1.0](https://tobiasroeder.github.io/imagebox/1.1.0)<br>
There are some difference between 1.1.0 and 1.2.0 [view Release](https://github.com/tobiasroeder/imagebox/releases/tag/1.2.0)

**Include this files:**
```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.min.css">
<script src="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.min.js"></script>
```
**OR:**
```html
<script src="https://tobiasroeder.github.io/imagebox/addimagebox.js"></script>
```
> (this file will include the newest version from all files which are needed)

---

**If  IE support is needed:**
```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.min.css">
<script src="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.ie.min.js"></script>
```
**OR:**
```html
<script src="https://tobiasroeder.github.io/imagebox/addimagebox.js" data-addimagebox="ie"></script>
```

---

**How it works:**

add to the `<img>` tag the following attributes:

- `data-imagebox`  _(single image)_
- `data-imagebox="gallery"` _(gallery)_
- `data-imagebox-src="img_big.jpg"` _(voluntary, else it use the src attribute)_
- `data-imagebox-caption="Lorem ipsum"`

**Small feature for the caption:**

`data-imagebox-caption="{loc} Lorem ipsum"` _the {loc} will display an small location icon in the beginning_

**addImageBox:**

add to the `<script>` tag the following attribute:

- `data-addimagebox-version="1.0.0"` _optional, otherwise it will use the newest version_

**Options:**
 ``` javascript
// imagebox.js
imagebox.options({
	 info: true;	// or false
});

// imagebox.ie.js (only Edge Browser)
imageboxOptions({
	 info: true;	// or false
});
```

---

**Example:**

single image
```html
<img src="img_small.jpg" data-imagebox data-imagebox-src="img_big.jpg" data-imagebox-caption="Lorem ipsum">
```
gallery
```html
<img src="img_small.jpg" data-imagebox="gallery" data-imagebox-src="img_big.jpg" data-imagebox-caption="Lorem ipsum">
```
addimagebox
```html
<script src="https://tobiasroeder.github.io/imagebox/addimagebox.js" data-addimagebox="ie" data-addimagebox-version="1.0.4"></script>
```

---

**Tested in:**

|imagebox.js|Safari|Safari iOS|Firefox|Opera|
|:--|:--|:--|:--|:--|
||13.0.5|13.3.1|74.0|67.0.3575.79|
|**imagebox.ie.js**|**IE11**|**Edge**|
||11.726.16299.0|41.16299.726.0|


---

**Difference between imagebox.js and imagebox.ie.js:**

In imagebox.js is the imagebox an object with init, finder, options, open, close, switch, prev, next and caption methods. The IE11 and Edge Browser doesn't support objects, thats why each method is a single function. In the imagebox.ie.js the imageboxOptions function was removed because it only caused problems.<br>
With ImageBox v1.2.0 it's possible to close the imagebox with the 'Esc' button, but in imagebox.js it's checked with `event.code == 'Escape'` and in imagebox.ie.js with `event.key == 'Esc'`.

---

Full example here: https://tobiasroeder.github.io/imagebox#example.  
[Try it Yourself](https://codepen.io/tobiasroeder/full/wZeBNL)

# ImageBox Documentation

**Include this files:**
```html
<link rel="stylesheet" type="text/css" href="https://tobiasroeder.github.io/imagebox/{version}/imagebox.min.css">
<script src="https://tobiasroeder.github.io/imagebox/{version}/imagebox.min.js"></script>
```
**OR:**
```html
<script src="https://tobiasroeder.github.io/imagebox/addimagebox.js"></script>
```
(this file will include the newest version from all files which are needed)

---

**How it works:**

add to the `<img>` tag the following attributes:

- `data-imagebox`  _(single image)_
- `data-imagebox="gallery"` _(gallery)_
- `data-imagebox-src="img_big.jpg"` _(voluntary, else it use the src attribute)_
- `data-imagebox-description="Lorem ipsum"`

**Small feature for the description:**

`data-imagebox-description="{loc} Lorem ipsum"` _the {loc} will display an small location icon in the beginning_

**addImageBox:**

add to the `<script>` tag the following attribute:

- `data-addimagebox-version="1.0.0"` _optional, otherwise it will use the newest version_

---

**Example:**

minimal (single image)
```html
<img src="img_small.jpg" data-imagebox>
```
maximal (single image)
```html
<img src="img_small.jpg" data-imagebox data-imagebox-src="img_big.jpg" data-imagebox-description="Lorem ipsum">
```
minimal (gallery)
```html
<img src="img_small.jpg" data-imagebox="gallery">
```
maximal (gallery)
```html
<img src="img_small.jpg" data-imagebox="gallery" data-imagebox-src="img_big.jpg" data-imagebox-description="Lorem ipsum">
```
addimagebox
```html
<script src="https://tobiasroeder.github.io/imagebox/addimagebox.js" data-addimagebox-version="1.0.4"></script>
```

---

Full example here: https://tobiasroeder.github.io/imagebox#example.  
[Try it Yourself](https://codepen.io/tobiasroeder/full/wZeBNL)

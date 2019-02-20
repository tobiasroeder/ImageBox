# ImageBox Documentation

**Include this files:**
```html
<link rel="stylesheet" href="https://tobiasroeder.github.io/imagebox/{version}/imagebox.min.css">
<script src="https://tobiasroeder.github.io/imagebox/{version}/imagebox.min.js"></script>
```
**OR:**
```html
<script src="https://tobiasroeder.github.io/imagebox/addimagebox.js"></script>
```
(this file will include the newest version from all files which are needed)

---

**How to works:**
add to the `<img>` tag the following attributes:

- `onclick="imagebox('open', this);"`
- `data-imagebox="image"`
- `data-imagebox-src="img_big.jpg"` _(voluntary, else it use the src attribute)_
- `data-imagebox-description="Lorem ipsum"`

---

**Example:**
```html
<img src="img_small.jpg" onclick="imagebox('open', this);" data-imagebox="image" data-imagebox-src="img_big.jpg" data-imagebox-description="Lorem ipsum">
```
Full example here: https://tobiasroeder.github.io/imagebox#example.

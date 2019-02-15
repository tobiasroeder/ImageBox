# ImageBox

**Include this files:**
https://tobiasroeder.github.io/imagebox/{version}/imagebox.min.css
https://tobiasroeder.github.io/imagebox/{version}/imagebox.min.js
**OR:**
https://tobiasroeder.github.io/imagebox/addimagebox.js (this file will include the newest version from all files which are needed)

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
Full example here: https://tobiasroeder.github.io/imagebox/documentation#example.

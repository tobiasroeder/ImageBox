# ImageBox Documentation

[![](https://img.shields.io/github/v/release/tobiasroeder/ImageBox?style=flat-square&label=Release)](https://github.com/tobiasroeder/ImageBox/releases/tag/1.3.2)
[![](https://img.shields.io/github/issues/tobiasroeder/ImageBox?style=flat-square&label=Issues)](https://github.com/tobiasroeder/ImageBox/issues)
[![](https://img.shields.io/github/license/tobiasroeder/ImageBox?style=flat-square&label=License)](https://github.com/tobiasroeder/ImageBox/blob/master/LICENSE)
[![](https://data.jsdelivr.com/v1/package/gh/tobiasroeder/ImageBox/badge)](https://www.jsdelivr.com/package/gh/tobiasroeder/ImageBox)

---

### Include this files:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.3.2/dist/imagebox.min.css">
<script src="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.3.2/dist/imagebox.min.js"></script>
```
---

### If IE support is needed:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.min.css">
<script src="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.ie.min.js"></script>
```
> Currently only version 1.2.0 is available.
> _Since 1.3.0 is the support dropped._

---

### How it works:

add to the `<img>` tag the following attributes:

- `data-imagebox` _(single image)_
- `data-imagebox="gallery"` _(gallery)_
- `data-imagebox-src="img_big.jpg"` _(voluntary, else it use the src attribute)_
- `data-imagebox-caption="Lorem ipsum"`

### Small feature for the caption:

- `data-imagebox-caption="{loc} Lorem ipsum"` _(the {loc} will display a small location icon in the beginning)_

### Multiple galleries:

- `data-imagebox="gallery-ID"` _(each image with this attribute and this name is bundled to a gallery)_

### Options:

Parameter | Type | Default | Info
--- | --- | --- | ---
info | bool | false | Display an info about the ImageBox in the console.
swipeToChange | bool | true | Change between images in the gallery with a simple swipe (right/left).
swipeToClose | bool | true | Close the ImageBox (single image/gallery) (top/down).
keyControls | bool | true | `Esc` close ImageBox, `ArrowLeft` previous image, `ArrowRight` next image.
closeEverywhere | bool | true | Close the ImageBox everywhere (only single image).
htmlCaption | bool | false | Enable the ability to render HTML code in the caption.
autoInit | bool | true | Decide if the ImageBox will be automatically initialized.

#### Example:

```javascript
// not available in imagebox.ie.js (IE)
imagebox.options({
  info: false,
  swipeToChange: true,
  swipeToClose: true,
  keyControls: true,
  closeEverywhere: true,
  htmlCaption: false,
  autoInit: true
});
```

---

### Examples:

single image

```html
<img src="img_small.jpg" data-imagebox data-imagebox-src="img_big.jpg" data-imagebox-caption="Lorem ipsum">
```

gallery

```html
<img src="img_small.jpg" data-imagebox="gallery" data-imagebox-src="img_big.jpg" data-imagebox-caption="Lorem ipsum">
```

multiple galleries

```html
<!-- Gallery 1 -->
<img src="img/san-francisco.jpg" alt="San Francisco" data-imagebox="g1">
<img src="img/new-york.jpg" alt="New York" data-imagebox="g1">

<!-- Gallery 2 -->
<img src="img/seattle.jpg" alt="Seattle" data-imagebox="g2">
<img src="img/detroit.jpg" alt="Detroit" data-imagebox="g2">
```

---

### Live example:

An live example can be found on CodePen. You can also play there with the ImageBox around.
- [https://codepen.io/tobiasroeder/pen/wZeBNL](https://codepen.io/tobiasroeder/pen/wZeBNL)

---

### Tested in:

Browser | Version | Known Issues
--- | --- | ---
Safari | 17.3.1 |
Safari (iOS) | 17.4.1 |
Chrome | 123.0.6312.87 (arm64) |
Opera | 109.0.5097.35 (arm64) |
Firefox | 124.0.1 (64-Bit) |
Microsoft Edge | 123.0.2420.65 (arm64) |
Arc | 1.36.0 |

> imagebox.css & imagebox.js (v1.3.2)

---

### [Try it yourself](https://codepen.io/tobiasroeder/pen/wZeBNL)

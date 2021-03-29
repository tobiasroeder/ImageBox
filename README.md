## Documentation

ImageBox latest version [1.3.0](https://github.com/tobiasroeder/imagebox/releases/tag/1.3.0)

***

### Include this files:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.3.0/dist/imagebox.min.css">
<script src="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.3.0/dist/imagebox.min.js"></script>
```
***

### If IE support is needed:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.min.css">
<script src="https://cdn.jsdelivr.net/gh/tobiasroeder/imagebox@1.2.0/dist/imagebox.ie.min.js"></script>
```
> Currently only version 1.2.0 available

***

### How it works:

add to the `<img>` tag the following attributes:

- `data-imagebox` _(single image)_
- `data-imagebox="gallery"` _(gallery)_
- `data-imagebox-src="img_big.jpg"` _(voluntary, else it use the src attribute)_
- `data-imagebox-caption="Lorem ipsum"`

### Small feature for the caption:

- `data-imagebox-caption="{loc} Lorem ipsum"` _(the {loc} will display an small location icon in the beginning)_

### Multiple galleries:

- `data-imagebox="gallery-ID"` _(each image with this attribute and this name is bundled to a gallery)_

### Options:

Parameter | Type | Default | Info
--- | --- | --- | ---
info | bool | false | Display an info about the ImageBox in the console
swipeToChange | bool | true | Change between images in the gallery with a simple swipe (right/left)
swipeToClose | bool | true | Close the ImageBox (single image/gallery) (top/down)
keyControls | bool | true | `Esc` close ImageBox, `ArrowLeft` previous image, `ArrowRight` next image
closeEverywhere | bool | true | Close the ImageBox everywhere (only single image)

#### Example:

```javascript
// not available in imagebox.ie.js (Edge and IE)
imagebox.options({
  info: false,
  swipeToChange: true,
  swipeToClose: true,
  keyControls: true,
  closeEverywhere: true
});
```

***

### Examples:

single image

```html
<img src="img_small.jpg" data-imagebox data-imagebox-src="img_big.jpg" data-imagebox-caption="Lorem ipsum">
```

gallery

```html
<img src="img_small.jpg" data-imagebox="gallery" data-imagebox-src="img_big.jpg" data-imagebox-caption="Lorem ipsum">
```

multiple gallery

```html
<!-- Gallery 1 -->
<img src="img/san-francisco.jpg" alt="San Francisco" data-imagebox="g1">
<img src="img/new-york.jpg" alt="New York" data-imagebox="g1">

<!-- Gallery 2 -->
<img src="img/seattle.jpg" alt="Seattle" data-imagebox="g2">
<img src="img/detroit.jpg" alt="Detroit" data-imagebox="g2">
```

***

### Live example:

An live example can be found on CodePen. You can also play there with the ImageBox around.
- [https://codepen.io/tobiasroeder/pen/wZeBNL](https://codepen.io/tobiasroeder/pen/wZeBNL)

***

### Tested in:

Browser | Version | Known Issues
--- | --- | ---
Safari | 14.0.3 | 
Safari (iOS) | 14.0 | 
Chrome | 89.0.4389.90 | 
Opera | 75.0.3969.93 | 
Firefox | 87.0 | 
Chrome (Android) | 80.0.3987.162 | [#11](https://github.com/tobiasroeder/ImageBox/issues/11)
Samsung Internet | 13.2.3.2 | [#11](https://github.com/tobiasroeder/ImageBox/issues/11)

> imagebox.css & imagebox.js (v1.3.0)

***

### [Try it yourself](https://codepen.io/tobiasroeder/pen/wZeBNL)

var works = document.querySelector("#works")
var h = Hammer(works)
works.addEventListener("click", function(ev) {
  if(debug) console.log('click')
  ev.preventDefault();
}, false);

var debug = window.location.host.match(/local/)

var figure = function(element) {
  var e = element
  while(e.parentNode.nodeName != 'BODY') {
    if(e.nodeName == 'FIGURE') break
    e = e.parentNode
  }
  return e
}

var touched = function(f) {
  if(debug) console.log(event, event.type) && (window.e = event)
  event.preventDefault()
  fig = new Figure(event.target)
  if(f != undefined) f(fig)
}

// Creates a Figure wrapping one of the <figures>
//   element: the <figure> element or any of it's child nodes
//   returns:
function Figure(element) {
  this.element = figure(element)
}

Figure.prototype.open = function() {
  Figure.closeOthers()
  history.pushState({}, '', '#' + this.element.getAttribute('id'))
  this.element.classList.add('open')
}
Figure.prototype.close = function() {
  this.element.classList.remove('open')
}
Figure.closeOthers = function() {
  history.replaceState({}, '', '');
  [].forEach.call(document.querySelectorAll("figure.open"), function(fig) {
    console.log(this.element, fig)
    if(fig != this.element) (new Figure(fig)).close()
  })
}

h.on("touch", function(event) {
  touched(function(fig) { fig.open() })
});

h.on("pinchin", function(event) {
  touched(function() { fig.close() })
});

h.on("pinchout", function(event) {
  touched(function(fig) { fig.open() })
});

function swapInBigImages() {
  [].forEach.call(document.querySelectorAll("figure img"), function(img) {
    img.setAttribute('src', img.getAttribute('src').replace('/small/', '/big/'))
  })
}

window.addEventListener('load', function(e) {
  // http://stackoverflow.com/questions/12556593/determining-a-page-is-outdated-on-github-pages
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      console.log('reloading from new app cache');
      window.applicationCache.swapCache();
      window.location.reload();
    }
  }, false);

  if(window.innerWidth > 1024) swapInBigImages()
}, false);

var myPresentation = function() {
  var wrapper = null;
  var defClass = null;
  var slides = null;
  var slidesNum = null;
  var nextButton = document.createElement('a');
  var prevButton = document.createElement('a');
  var currentSlide = parseInt(window.location.hash.replace('#', '') || 0);

  function config(_params) {
    var params = _params || {};
    wrapper = params.wrapper || document.getElementById('slideShow');
    slides = params.slides || wrapper.getElementsByClassName('slide');
    slidesNum = slides.length;
    defClass = params.defClass || 'slide';    
  }

  function init() {
    if (!wrapper) {
      config();
    }
    document.body.appendChild(nextButton);
    document.body.appendChild(prevButton);
    nextButton.className = 'next nav-button';
    prevButton.className = 'prev nav-button';

    cb_addEventListener(nextButton, 'click', stepTo, 1);
    cb_addEventListener(prevButton, 'click', stepTo, -1);
    cb_addEventListener(document, 'keyup', keyUpEv);
    showSlide(currentSlide);
    checkButtons()
  }

  function stepTo(n) {
    if (slides[currentSlide + n]) {
      showSlide(currentSlide += n);
      window.location.hash = currentSlide;
      checkButtons();
    }    
    return false;
  }

  function checkButtons() {    
    if (currentSlide === 0) {
      prevButton.className += ' hidden';
    }
    else if (currentSlide === slidesNum - 1) {
      nextButton.className += ' hidden';
    }
    else {
      nextButton.className = nextButton.className.replace(' hidden', '');
      prevButton.className = prevButton.className.replace(' hidden', '');
    }
  }

  function keyUpEv() {
    if (event.keyCode === 37) {
      stepTo(-1);
    }
    else if (event.keyCode === 39) {
      stepTo(1);
    }
  }

  function showSlide(step) {
    var i = slidesNum;
    if (-1 < step && step < i) {
      while(i--) {
        slides[i].className = defClass;
      }
      slides[step].className += ' current';

      if (step > 0) {
        slides[step-1].className += ' prev';
      }
      if (step + 1 < slidesNum) {
        slides[step+1].className += ' next';
      }     
    }
    else {
      return false;
    }
  }

  return {
    config: config,
    init: init
  };
}();

/**
* Cross-browser Event Listener
**/

function cb_addEventListener(obj, evt, fnc, args) {
  if (obj && obj.addEventListener) {
      obj.addEventListener(evt, function() {
        fnc(args);
      }, false);
      return true;
  } 
  else if (obj && obj.attachEvent) {
      return obj.attachEvent('on' + evt, function() {
        fnc(args);
      });
  }
  return false;
};

myPresentation.init('slideShow');
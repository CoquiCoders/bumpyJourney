var cssTransitionEnd = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';
var animateWithCss = function(element, effect, operation, callback) {
  if (operation == 'show') {
    $(element).show();
  }
  $(element).one(cssTransitionEnd, function(e) {
    $(element).removeClass('animated').removeClass(effect);
    if (operation == 'hide') {
      $(element).hide();
    }
    callback();
  });
  $(element).addClass('animated ' + effect);
};

var spinner = {
  el: '',
  options: {
    spinDuration: 1000
  },
  init: function(elemClass) {
    this.el = element = $(elemClass);
    var spinner = this;
    var hash = window.location.hash;
    if (hash == '#card') {
      spinner.showRandomCard();
    }
    else {
      spinner.showSpinner();
    }
    window.onhashchange = function() {
      if (window.location.hash == '#card') {
        spinner.showRandomCard();
      }
      else if (window.location.hash == '' || window.location.hash == '#') {
        spinner.showSpinner();
      }
    }
  },

  showSpinner: function() {
    var spinner = this;
    animateWithCss(this.el, 'fadeIn', 'show', function() {
    });
    // Bind click to spinner.
    element.on('click',  function() {
      spinner.spinStart(spinner.options.spinDuration, spinner.spinStop);
    });
  },

  spinStart: function(duration, endSpinCallback) {
    var duration = duration || this.options.spinDuration;
    var element = this.el;
    var spinner = this;
    element.removeClass('spin');
    element.addClass('spin');
    setTimeout(function(){
      endSpinCallback(spinner);
    }, duration);
  },
  hideSpinner: function() {
    var spinner = this;
    animateWithCss(element, 'fadeOut', 'hide', function() {
      window.location.hash = '#card';
    });
  },
  spinStop: function(context) {
    var spinner = context || this;
    element = spinner.el;
    element.removeClass('spin');
    spinner.hideSpinner();
  },
  hideRandomCard: function(callback) {
    var cardElement = $('.card-wrapper .card');
    animateWithCss(cardElement, 'fadeOut', 'hide', function() {
      $(cardElement).html();
      if (callback) {
        callback();
      }
    });
  },
  showRandomCard: function() {
    var spinner = this;
    var randomIndex = _.random(0, [cardData.general.length] -1);
    var randomCard = _.extend(
      { cardBgColor: 'white', cardTextColor: 'black' },
      cardData.general[randomIndex]
    );
    var cardContent = _.template($('#card-template').html(), randomCard);
    var cardElement = $('.card-wrapper .card');
    $(cardElement).html(cardContent);
    animateWithCss(cardElement, 'fadeIn', 'show', function() {
      // Bind buttons.
      var random = 'random-' + _.random(0, 9999999);
      $('.card .go-again').addClass(random);
      $('.card .go-again.' + random).one('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        spinner.hideRandomCard(function() {
          window.location.hash = '';
        });
      });
     setTimeout(function() {
        $('.card .go-again.' + random).click();
      }, 10000);
    });
  }
};

$(document).ready(function() {
  spinner.init('.elem');
});

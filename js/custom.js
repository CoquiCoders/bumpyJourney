var cssTransitionEnd = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';
var animateWithCss = function(element, effect, operation, callback) {
  if (operation == 'show') {
    $(element).show();
  }
  $(element).one(cssTransitionEnd, function(e) {
    console.log('transition complete');
    console.log(e);
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
    console.log('init');
    var spinner = this;
    var hash = window.location.hash;
    if (hash == '#card') {
      console.log('init call show random');
      spinner.showRandomCard();
    }
    else {
      spinner.showSpinner();
    }
    window.onhashchange = function() {
      console.log('hash')
      console.log(window.location.hash);
      if (window.location.hash == '#card') {
        console.log('hash call show random');
        spinner.showRandomCard();
      }
      else if (window.location.hash == '' || window.location.hash == '#') {
        console.log('hash call show spinner');
        spinner.showSpinner();
      }
    }
  },

  showSpinner: function() {
    var spinner = this;
    animateWithCss(this.el, 'fadeIn', 'show', function() {
      console.log('fadein spinner');
      console.log('show spinner.');
    });
    // Bind click to spinner.
    element.on('click',  function() {
      console.log('spin click');
      spinner.spinStart(spinner.options.spinDuration, spinner.spinStop);
    });
  },

  spinStart: function(duration, endSpinCallback) {
    console.log('spinStart');
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
    console.log('spinStop');
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
    console.log('card showin');
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
      $('.card .go-again').click(function() {
        event.preventDefault();
        console.log('callback exe');
        event.stopPropagation();
        spinner.hideRandomCard();
        window.location.hash = '';
      });
    });
  }
};

$(document).ready(function() {
  spinner.init('.elem');
});

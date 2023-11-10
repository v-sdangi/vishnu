$(document).ready(() => {

  'use strict';

  var $root = $('html, body');

  $('a[href^="#"]').click(function () {
    $root.animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 250);

    return false;
  });

})

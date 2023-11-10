$(document).ready(() => {

  'use strict';

  // Configuration that should only be ran once globally.
  var init = function () {

    // Check if IE, do not enable the sticky sidebars
    if(!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
      /**
       * Sticky Sidebars
       */
      var hasStickySidebar = document.querySelector('[data-sticky-sidebar-sidebar]');
      // Putting stickySidebar initilization in data check as its causing a javascript error otherwise.
      
      if (hasStickySidebar !== null) {
        var $toolbar = $('#toolbar-bar');
        var topSpacing = 0;

        if ($toolbar.length >= 1) {
          topSpacing = 80;
        }

        var sidebar = new StickySidebar('[data-sticky-sidebar-sidebar]', {
          topSpacing: topSpacing,
          bottomSpacing: 20,
          containerSelector: '[data-sticky-sidebar-container]',
          innerWrapperSelector: '[data-sticky-sidebar-inner]',
          minWidth: 767
        });

        // Issue with sticky sidebar busting when image styles need to be
        // generated so we will update the dimensions on sticky sidebar after
        // images are loaded or when the loading of all assests is complete.
        $(window).on('load', function() {
          sidebar.updateSticky();
        });
      }
    }
  };

  try {
    if (Drupal && Drupal.behaviors) {
      Drupal.behaviors.webpackStickySidebar = {
        attach: function attach(context, settings) {
          init(settings);
        }
      };
    } else {
      init();
    }
  } catch (e) {
    init();
  }

})

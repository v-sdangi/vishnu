(function ($) {

  'use strict';
  // Configuration that should only be ran once globally.

    var $header = $('#menu-mobile-header-content');
    $header.remove();


    // Mobile Menu - MMENU
    var $mobileMenu = $('#menu-mobile');
    if ($mobileMenu.length > 0) {
      var menu = new Mmenu("#menu-mobile", {
        extensions: [
          "position-right",
          "border-none",
          "fullscreen"
        ],
        navbar: {
          add: true,
          title: 'Menu',
        },
        navbars: [
          {
            'position': 'top',
            'content': '<div class="m-menu-mobile__header"> <img class="mm-menu-logo" src="/svg/logo-mobile.svg" alt="Home"> <div class="mm-menu-mobile__search-close-group"> <div class="m-menu-mobile__search"> <a href="/search.html" class="m-menu-mobile__btn-search"> <i class="fas fa-search" data-fa-transform="" data-fa-mask=""></i> <span class="u-visually--hidden">Search site</span></a> </div> <div class="m-menu-mobile__close"> <button data-mobile-menu-close class="m-menu-mobile__btn-close"> <i class="fas fa-times" data-fa-transform="" data-fa-mask=""></i> <span class="u-visually--hidden">Close Menu</span> </button> </div> </div> </div>'
          }
        ],
        slidingSubmenus: true,
        keyboardNavigation: {
          enable: true
        },
        scrollBugFix:{
          fix: true
        },
          offCanvas: {
              position: "right",
              zposition: "front"
          }
      }, {
          offCanvas: {
              pageNodeType: "form"
          }
      })

      const api = menu.API;

      $('[data-mobile-menu-close]').click(function(e) {
        api.close();
      });

      // Open the active mmenu panel.
      // Find active menu item in secondary menu items and below.
      var $activeMenuItem = $('a.is-active', $mobileMenu).last();
      // If there is at least a level 2 active menu item then open the mmenu
      // panel to that level.
      if ($activeMenuItem.length > 0) {
        var activePanelId = $activeMenuItem.parents('.mm-panel').attr('id');
        const activePanel = document.querySelector('#' + activePanelId);
        api.openPanel(activePanel);
      }

      // Add labels into the tab start and end buttons that mmmenu uses
      // to keep a user tabbing through the menu as if gives an a11y
      // error on wave. Screen readers will not read this text as it has
      // the properties of aria-hidden=true and role=presentation.
      // https://github.com/FrDH/mmenu-js/issues/642
      $('button.mm-tabstart').text('Menu start tab');
      $('button.mm-tabend').text('Menu end tab');

      // On resize close the mmenu if the screen is larger then 899px.
      $(window).on("resize", function() {
        if (window.matchMedia("(min-width: 900px)").matches) {
          api.close();
        }
      });
    }
  

})(jQuery);


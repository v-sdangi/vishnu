$(document).ready(() => {
  $(".footer__column-open").on('click', e => {
    e.preventDefault();
    let isMobileScreen = window.matchMedia("(max-width: 600px)").matches;

    if (isMobileScreen) {
      let $this = $(e.target);
      let $parent = $this.closest('.footer__column-nav');
      let $expandArea = $parent.find(".m-menu-footer");

      $('.m-menu-footer').slideUp();
      $('.footer__column-nav').removeClass('footer__column-nav--expanded');
      if (!$expandArea.is(":visible")) {
        $parent.addClass('footer__column-nav--expanded');
        $expandArea.slideDown(300);
      }
    }

  });
})


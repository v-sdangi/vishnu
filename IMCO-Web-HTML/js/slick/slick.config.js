$(document).ready(() => {

  'use strict';

  $('.m-carousel__wrapper').each(function() {

    var dots = $(this).find('.slick-slider__dots-and-arrows'),
        prevArrow = $(this).find('.slick-prev'),
        nextArrow = $(this).find('.slick-next'),
        nextArrow = $(this).find('.slick-next'),
        carouselWrapper = $(this).find('.m-carousel');
    
    carouselWrapper.slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      appendDots: dots,
      prevArrow: prevArrow,
      nextArrow: nextArrow,
    });
  });

  // Card.
  $('.m-card-carousel__wrapper').each(function() {

    var dots = $(this).find('.slick-slider__dots-and-arrows'),
        prevArrow = $(this).find('.slick-prev'),
        nextArrow = $(this).find('.slick-next'),
        nextArrow = $(this).find('.slick-next'),
        carouselWrapper = $(this).find('.m-card-carousel');
    
    carouselWrapper.slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      appendDots: dots,
      prevArrow: prevArrow,
      nextArrow: nextArrow,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  });


  // Research Card.
  $('.m-research-card-carousel__wrapper').each(function() {

    var dots = $(this).find('.slick-slider__dots-and-arrows'),
        prevArrow = $(this).find('.slick-prev'),
        nextArrow = $(this).find('.slick-next'),
        nextArrow = $(this).find('.slick-next'),
        carouselWrapper = $(this).find('.m-research-card-carousel');
    
    carouselWrapper.slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      appendDots: dots,
      prevArrow: prevArrow,
      nextArrow: nextArrow,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  });


})
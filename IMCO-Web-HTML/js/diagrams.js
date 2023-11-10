$(document).ready(() => {

  'use strict';

  // Pie-charts.
  $(".m-pie-charts__list-item, .pie-charts-sector").hover(function() {
    var hoveredElement = $(this);

    hoveredElement.removeClass("hover");

    $(".m-pie-charts__list-item, .pie-charts-sector").addClass("hover");

    $('[data-name='+ hoveredElement.attr("data-name") +']').toggleClass("active");
  }).mouseleave(function() {
    $(".m-pie-charts__list-item, .pie-charts-sector").removeClass("hover");
  });


  // Bar-graph.
  $(".m-bar-graph__list-item, .bar-graph-sector").hover(function() {
    var hoveredElement = $(this);

    hoveredElement.removeClass("hover");

    $(".m-bar-graph__list-item, .bar-graph-sector").addClass("hover");

    $('[data-name='+ hoveredElement.attr("data-name") +']').toggleClass("active");
  }).mouseleave(function() {
    $(".m-bar-graph__list-item, .bar-graph-sector").removeClass("hover");
  });


  // Map.
  function resetMap() {
    $('.map__region-active').removeClass("map__region-active--hover");
    $('.map__list-item').removeClass("hover");
  }
  
  function hoverStateMap() {
    $('.map__region-active[data-region='+ hoveredElement.attr("data-region") +']').addClass("map__region-active--hover");
    $('.map__list-item[data-region='+ hoveredElement.attr("data-region") +']').addClass("hover");
  }

  var hoveredElement;

  $(".map__list-item").hover(function() {
    hoveredElement = $(this);

    resetMap();
    hoverStateMap()

  }).mouseleave(function() {
    resetMap();
  });

  $(".map__region").hover(function() {
    hoveredElement = $(this);

    resetMap();
    hoverStateMap()
  });

  $(".map-svg").hover(function() {
    resetMap();
  });

  $(".map__region-active").mouseleave(function() {
    resetMap();
  });
})


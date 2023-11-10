$(document).ready(() => {

  'use strict';

  // Plugin info
  var pluginName = 'accordion',
      dataKey    = 'plugin_' + pluginName;

  // Default options
  // var defaults = {

  // }

  /**
   * The plugin constructor.
   * 
   * @param {object} element
   * The accordion element
   * @param {oject} options
   * Object of options to pass to the plugin.
   */
  var Plugin = function(element, options) {
    // If there is no element exit.
    if (element.length == 0) {
      return;
    }

    this.element = element;

    this.options = {
      speed: 200,
    };

    this.init(options);
  };

  // Public methods.
  Plugin.prototype = {

    /**
     * Initialization
     * 
     * @param {object} options
     * Object of options to pass to the plugin.
     */
    init: function(options) {
      // Merge default options with user options.
      $.extend(this.options, options);
      var speed = this.options.speed;
      // Top level element of the accordion.
      var $accordion = this.element;
      var $accordionItems = $('[data-accordion-component=item]', $accordion);
      var $accordionToggle = $('[data-accordion-component=toggle]', $accordion);
      

      var n = 1;
      $accordionItems.each(function() {
        var $accordionItem = $(this);
        // Add starting accordian state.
        // @todo only if none are set.
        $accordionItem.attr('data-accordion-state', 'collapsed');
        // label for accordion.
        var $label = $accordionItem.find('[data-accordion-component=label]');
        // Add aria.
        $label.attr({
          'aria-expanded': false,
          'aria-controls': 'collapsible-' + n,
          'tabindex': '0',
          'role':'button'
        });

        // Content for accordion.
        var $content = $accordionItem.find('[data-accordion-component=content]');
        // Add aria.
        $content.attr({
          'id': 'collapsible-' + n,
          'role': 'region',
          'aria-hidden': true,
          'data-accordion-state': 'collapsed'
        });

        $label.on('click', {accordionItem: $accordionItem, content: $content, speed: speed }, _clickAccordion);

        n++;
      });

      // Expand / collapse all.
      $accordionToggle.on('click', _toggleAll);
    },

    /**
     * Remove the accordions javascript.
     */
    destroy: function() {
      var $accordionItems = this.element;

      $accordionItems.each(function() {
        var $accordionItem = $(this);
        $accordionItems.removeAttr('data-accordion-state');
        // label for accordion.
        var $label = $accordionItem.find('[data-accordion-component=label]');
        $label.removeAttr('aria-expanded aria-controls tabindex role');
        // Content for accordion.
        var $content = $accordionItem.find('[data-accordion-component=content]');
        $content.removeAttr('id role aria-hidden data-accordion-state style');
        // Unbind clickAccordion event.
        $label.off('click', _clickAccordion);
      });

      this.element.removeData(dataKey);
    }
  };

  // Private functions.

  /**
   * Toggle all the accordions either open or closed.
   * 
   * @param {object} e
   * The event object
   */
  function _toggleAll(e) {
    var $btn = $(this);
    var state = $btn.attr('data-accordion-state');
    var $btnText = $btn.find('.text');
    var $accordionItems = $btn.parents('[data-accordion-component=items]');
    // Update accordion values based off of the action, either expand or collapse.
    // @todo include Drupal so we can translate
    var modifiedState = state == 'expanded' ? 'collapsed' : 'expanded',
        btnName = state == 'expanded' ? 'Expand All' : 'Close All';

    $btn.attr({ 'data-accordion-state': modifiedState, 'name': btnName });
    $btnText.html(btnName);

    // Animate the accordion items base off of the action.
    var $accordionItem = $('[data-accordion-component=item]', $accordionItems),
        $accordionLabels = $('[data-accordion-component=label]', $accordionItems),
        $accordionContent = $('[data-accordion-component=content]', $accordionItems);

    var ariaHidden = state == 'expanded' ? false : true,
        ariaExpanded = state == 'expanded' ? true : false,
        accordionState = state == 'expanded' ? 'collapsed' : 'expanded';

    if (state == 'expanded') {
      $accordionContent.slideUp(200);
    } else {
      $accordionContent.slideDown(200);
    }

    $accordionContent.attr('aria-hidden', ariaHidden);
    $accordionLabels.attr({ 'aria-expanded': ariaExpanded});
    $accordionItem.attr('data-accordion-state', accordionState);
  }

  /**
   * Click event on an accordion.
   */
  function _clickAccordion(e) {
    e.preventDefault();
    var $label = $(this);
    var speed = e.data.speed;
    var $accordionItem = e.data.accordionItem;
    var $content = e.data.content;
    var state = $accordionItem.attr('data-accordion-state');

    // If the accordion is closed open it.
    if (state == 'collapsed') {
      $content.slideDown(speed);

      // Update aria.
      $content.attr('aria-hidden', 'false');
      $label.attr({'aria-expanded': true});
      // Update state.
      $accordionItem.attr('data-accordion-state', 'expanded');
    }
    // If the accordion is open close it.
    else {
      $content
          .slideUp(speed)
          .attr('aria-hidden', 'true');
      $label.attr({'aria-expanded': false});
      // Set the state to closed.
      $accordionItem.attr('data-accordion-state', 'collapsed');
    }

    // We need to update the expand button if we expand all items manually we
    // should update the button to close all and visa-versa.
    var expanded = $label.attr('aria-expanded'),
        $accordionGroup = $label.parents('[data-accordion-component=items]'),
        // $currentAccordion = $label.parent('[data-accordion-component=item]'),
        $accordions = $('[data-accordion-component=item]', $accordionGroup);

    // Flag to track if we need to update the expand all.
    // We don't need to do anything unless all accordion items are in the same
    // state either all closed or all open.
    var update = true;
    // Loop through each accordion in a group excluding the currently selected
    // accordion.
    var listState = '';
    $accordions.each(function () {
      var $accordion = $(this);
      var state = $accordion.attr('data-accordion-state');
      // Check each accordion items state if there is still at least one accordion
      // that is in the closed state when we expand one then no need to update.
      // Likewise for an accordion item that we are collapsing.
      if (expanded == 'false' && state != 'collapsed') {
        update = false;
        return;
      }
      else if (expanded == 'true' && state != 'expanded') {
        update = false;
        return;
      }

      // Only need to use this variable if our flag update is true which will
      // mean that all accordions are in the same state. We want to record what
      // state all the list items are in so we can determine if we need to set
      // the toogle all button to expand all or collapse all.
      listState = state;
    });

    // If we found that all items in a group are either opened or closed toggle
    // the expand all button.
    if (update == true) {

      var $btn = $('[data-accordion-component=toggle]', $accordionGroup);
      var btnState = $btn.attr('data-accordion-state');

      if (btnState != listState) {
        var $btnText = $btn.find('.text');
        var modifiedState = btnState == 'expanded' ? 'collapsed' : 'expanded';
        var btnName = btnState == 'expanded' ? 'Expand All' : 'Close All';

        $btn.attr({'data-accordion-state': modifiedState, 'name': btnName});
        $btnText.html(btnName);
      }
    }
  }

  /*
   * Plugin wrapper, preventing against multiple instantiations and
   * return plugin instance.
   */
  $.fn[pluginName] = function (options) {
    var plugin = this.data(dataKey);

    // has plugin instantiated ?
    if (plugin instanceof Plugin) {
        // if have options arguments, call plugin.init() again
        if (typeof options !== 'undefined') {
            plugin.init(options);
        }
    } else {
        plugin = new Plugin(this, options);
        this.data(dataKey, plugin);
    }

    return plugin;
  };

  $('.m-accordion').accordion();

})

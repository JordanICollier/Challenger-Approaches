window.SmashBros = {};

(function() {

  function GameInputObserver($el) {
    this.$el = $el;
  }

  GameInputObserver.prototype.addObservers = function() {
    this.$el.on('click', function(event) {
      event.preventDefault();
    });
  }

  jQuery(document).on('ready', function() {
    $("[data-game]").each(function() {
      new GameInputObserver($(this)).addObservers()
    });
  });

})();

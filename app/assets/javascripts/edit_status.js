(function() {

  SmashBros.WhatsUpListener = WhatsUpListener;

  function WhatsUpListener(options) {
    this.$el = options.$el;
    this.addObservers();
  }

  WhatsUpListener.prototype.addObservers = function() {
    var _this = this;
    this.$el.click(function(e) {
      e.preventDefault();
      $(this).siblings('.status').hide();
      $(this).siblings('form').find('input').show().focus();
      $('#user_form').submit(_this.addUpdateUser.bind(_this));
    });
  };

  WhatsUpListener.prototype.userId = function() {
    return window.location.href.match(/users\/(\d)/)[1];
  };

  WhatsUpListener.prototype.addUpdateUser = function(event) {
    event.preventDefault();
    var whatsUp = $('#user_form input').val();

    $.ajax('/users/'+this.userId(), {
      dataType: 'json',
      type: 'put',
      data: {
        id: this.userId(),
        user: { "whats_up": whatsUp }
      },
      success: this.showUpdateStatus.bind(this, whatsUp),
      error: function() { console.log('luke no'); }
    });
  };

  WhatsUpListener.prototype.showUpdateStatus = function(newValue) {
    this.$el.siblings('form').find('input').hide();
    this.$el.siblings('.status').text(newValue).fadeIn();
  };




  //{}

  $(document).on('ready', function() {
    new WhatsUpListener({ $el: $('[data-edit="whats-up"]') });
  });
})();

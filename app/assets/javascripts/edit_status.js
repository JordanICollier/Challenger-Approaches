(function() {


  function WhatsUpListener(options) {
    this.$el = options.$el;
    this.addObservers();
  }

  WhatsUpListener.prototype.addObservers = function() {
    this.$el.click(function(e) {
      e.preventDefault();
      $(this).siblings('.status').hide();
      $(this).siblings('form').find('input').show();
      $('#user_form').submit(function(e) {
        e.preventDefault();
        var whatsUp = $('#user_form input').val();
        var userId  = window.location.href.match(/users\/()\d/)[1];

        $.ajax('/users/'+userId, {
          dataType: 'json',
          type: 'put',
          data: {
            id: userId,
            users: { "whats_up": whatsUp }
          },
          success: function() { console.log('lol yes'); },
          error: function() { console.log('luke no'); }
        })
      })
    });
  }




  //{}

  $(document).on('ready', function() {
    new WhatsUpListener({ $el: $('[data-edit="whats-up"]') });
  })
})();

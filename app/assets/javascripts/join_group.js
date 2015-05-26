(function() {

  function JoinMe($el) {
    this.$el = $el;
    this.groupId = this.$el.data('groupId');
  }

  _.extend(JoinMe.prototype, {
    joinGroup: function() {
      $.ajax({
        url: '/group_users',
        dataType: 'JSON',
        type: 'POST',
        data: {
          group_user: { group_id: this.groupId }
        },
        success: (function(_this) {
          return function() {
            _this.$el.text('Joined');
            _this.$el.attr('disabled', true);
          };
        })(this),
        error: function(e) {
          console.log('yeah dun goofed '+e);
        }
      });
    }

  });


  $(function() {
    $joinMe = $('.join-me');

    if ($joinMe.length === 0) return;

    $('.container').on('click', '.join-me', function() {
      new JoinMe($(this)).joinGroup();
    });

  });
})();

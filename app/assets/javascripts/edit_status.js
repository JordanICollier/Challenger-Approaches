function thing() {

  var thing = {
  };
}

thing();

new thing();
// {}

$(document).on('ready', function() {
  $('[data-edit="whats-up"]').click(function(e) {
    e.preventDefault();

    $(this).siblings('.status').hide();
    $(this).siblings('input').show();
  });
});

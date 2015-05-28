(function() {

  var GeoLocator = {

    addObservers: function() {
      $('.geo-form').on('click', '[type="submit"]', this.submitForm);
    },

    fetchCoordinates: function(json) {

      var userLocation = $('[class$="location"]').val();

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: userLocation }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          GeoLocator.createLocation(results[0], json);
        } else {
          console.log('failed hard', status, results);
        }
      });

    },

    submitForm: function(e) {
      e.preventDefault();
      console.log('getting calculated')
      $form = $(this).parents('form');

      $.ajax({
        url: $form.attr('action'),
        method: $form.attr('method'),
        type: 'JSON',
        processData: false,
        contentType: false,
        data: new FormData($form[0]),
        success: GeoLocator.fetchCoordinates
      });
    },

    createLocation: function(json, resourceJson) {
      var resourceIds = { users: { user_id: resourceJson.id}, groups: { group_id: resourceJson.id } };
      var type = GeoLocator.type();

      var resourceData = resourceIds[type];

      var locationJson = _.extend({
        lat: json.geometry.location.A,
        long: json.geometry.location.F,
        formatted_address: json.formatted_address
      }, resourceData);

      $.ajax({
        url: '/locations',
        method: 'POST',
        type: 'JSON',
        data: {
          location: locationJson
        },
        success: GeoLocator.redirectToUser
      });
    },

    supportedRedirects: {
      users: function() { return "/users/" + SmashBros.WhatsUpListener.prototype.userId.call(); },
      groups: function() { return "/groups"; }
    },

    type: function() {
      // return 'users' or 'groups'
      return window.location.href.match(/\/(\w+)\//)[1];
    },

    redirectToUser: function() {
      window.location = GeoLocator.supportedRedirects[GeoLocator.type()].call();
    }
  };

  $(function() {
    GeoLocator.addObservers();
  });

})();

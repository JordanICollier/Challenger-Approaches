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

      $.ajax({
        url: '/groups',
        method: 'POST',
        type: 'JSON',
        processData: false,
        contentType: false,
        data: new FormData($('.geo-form')[0]),
        success: GeoLocator.fetchCoordinates
      });
    },

    createLocation: function(json, groupJson) {
      debugger
      $.ajax({
        url: '/locations',
        method: 'POST',
        type: 'JSON',
        data: {
          location: {
            lat: json.geometry.location.A,
            long: json.geometry.location.F,
            formatted_address: json.formatted_address,
            group_id: groupJson.id
          }
        },
        success: GeoLocator.redirectToUser
      });
    },

    supportedRedirects: {
      users: function() { return "/users/" + SmashBros.WhatsUpListener.prototype.userId.call(); },
      groups: function() { return "/groups"; }
    },

    redirectToUser: function() {
      var type = window.location.href.match(/\/(\w+)\//)[1];
      window.location = GeoLocator.supportedRedirects[type].call();
    }
  };

  $(function() {
    GeoLocator.addObservers();
  });

})();

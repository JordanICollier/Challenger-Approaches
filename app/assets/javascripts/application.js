// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require handlebars
//= require_tree ./templates
//= require bootstrap-sprockets
//= require minivents
//= require turbolinks
//= require underscore
//= require smash_bros
//= require edit_status
//= require edit_user
//= require geo_locator
//= require join_group
//= require find_groups


$(function(){
  $('#nav').affix({
      offset: {
        top: $('header').height()
      }
  });
});

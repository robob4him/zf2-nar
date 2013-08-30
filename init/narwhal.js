!function ($) {
  $(function(){
    var $window = $(window);
    var $body   = $(document.body);

  });
}(window.jQuery);

var acl = {
  expand: function() {
    $('.acl-column').removeClass('col-md-4').removeClass('col-md-push-4').addClass('col-md-12');
    $('.navigation-column').removeClass('col-md-pull-4').removeClass('col-md-4').addClass('col-md-6');
    $('.route-column').removeClass('col-md-4').addClass('col-md-6');
    $('.acl-col').removeClass('col-md-12').addClass('col-md-4');
    $('#acl-expand').hide();
    $('#acl-collapse').show();
  },
  collapse: function() {
    $('.acl-column').addClass('col-md-4').addClass('col-md-push-4').removeClass('col-md-12');
    $('.navigation-column').addClass('col-md-pull-4').addClass('col-md-4').removeClass('col-md-6');
    $('.route-column').addClass('col-md-4').removeClass('col-md-6');
    $('.acl-col').addClass('col-md-12').removeClass('col-md-4');
    $('#acl-collapse').hide();
    $('#acl-expand').show();
  },

}

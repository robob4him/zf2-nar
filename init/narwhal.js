!function ($) {
  $(function(){
    var $window = $(window);
    var $body   = $(document.body);
  });
}(window.jQuery);

var acl = {
  resources: [],
  roles: [],
  rules: [],
  _init: function() {
    $.ajax({
      url: 'development_GssAuthorize-rules.dat',
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        acl.rules = data;
      }
    });
    $.ajax({
      url: 'development_GssAuthorize-roles.dat',
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        acl.roles = data;
      }
    });
    $.ajax({
      url: 'development_GssAuthorize-resources.dat',
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        acl.resources = data;
      }
    });
  },
  _build: function(resources, roles, rules) {
    this._build-resources(resources);
    this._build-roles(roles);
    this._build-rules(rules);
  },
  _build-resources: function(resources) {
    for(id in resources) {
      $panel = $('#resource-template').clone().removeAttr('id');
      $panel.find('.nar-res-group').text(resources[id]);
      $panel.find('#resource-X').attr('id', 'resource-' + id);
      $panel.find('.panel-heading').attr('data-target', '#resource-' + id);
      $panel.appendTo($('.resource-panel-group'));
    } 
  },
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

};

var navigation = {
  navs: {},
  _init: function() {
    $.ajax({
      url: 'development_GssNavigation-navs.dat',
      type: 'get',
      datatype: 'json',
      async: false,
      success: function(data) {
        navigation.navs = data;
      }
    });
  },
  _build: function(data) {
    for(id in data) {
      $panel = $('#navigation-template').clone().removeAttr('id');
      $panel.find('.nar-nav-name').text(data.id.name);
      $panel.find('#navigation-X').attr('id', 'navigation-' + name);
      $panel.find('.panel-heading').attr('data-target', '#navigation-' + name);
      if (data.id.group) {
        $panel.find('.nar-nav-group')
          .text(data.id.group)
          .removeClass('btn-default')
          .addClass('btn-primary');
      }
    }
  },
};

var routing = {
  routes: {},
  _init: function() {
    $.ajax({
      url: 'development_GssRoute-routes.dat',
      type: 'get',
      datatype: 'json',
      async: false,
      success: function(data) {
        routing.routes = data;
      }
    });
  },
  _build: function(data) {
    for(name in data) {
      $panel = $('#route-template').clone().removeAttr('id');
      $panel.find('.nar-route-name').text(name);
      $panel.find('#route-X').attr('id', 'route-' + name);
      $panel.find('.panel-heading').attr('data-target', '#route-' + name);
      options = data[name].options;
      if (options.defaults.__NAMESPACE__) {
        $panel.find('.nar-route-namespace')
          .text(options.defaults.__NAMESPACE__)
          .removeClass('btn-default')
          .addClass('btn-primary');
      }
      if (options.defaults.controller) {
        $panel.find('.nar-route-controller')
          .text(options.defaults.controller)
          .removeClass('btn-default')
          .addClass('btn-primary');
      }
      $panel.appendTo($('.route-panel-group'));
    }
  },
};

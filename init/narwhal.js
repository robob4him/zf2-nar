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
    this._build_resources(resources);
    this._build_roles(roles);
    this._build_rules(rules);
  },
  _build_resources: function(resources) {
    for(var id in resources) {
      var $panel = $('#resource-template').clone().removeAttr('id');
      $panel.find('.nar-res-group').text(resources[id]);
      $panel.find('#resource-X').attr('id', 'resource-' + id);
      $panel.find('.panel-heading').attr('data-target', '#resource-' + id);
      $panel.appendTo($('.resource-panel-group'));
    } 
  },
  _build_roles: function(roles, parent) {
    for(var id in roles) {
      var $panel = $('#role-template').clone().removeAttr('id');
      $panel.find('.nar-rol-group').text(roles.id);
      $panel.find('#role-X').attr('id', 'role-' + id);
      $panel.find('.panel-heading').attr('data-target', '#role-' + id);
      $panel.appendTo($('.role-panel-group'));
      for(var iid in roles.id) {
         
        if (0 < roles.id.length) {
          this._build_roles(roles.id, id);
        }
      }
    }
  },
  _build_rules: function(rules) {
    for(var id in rules) {
      console.log(id);
    }
  },
  expand: function() {
    $('.acl-column').removeClass('col-md-4').removeClass('col-md-push-4').addClass('col-md-12');
    $('.navigation-column').removeClass('col-md-pull-4').removeClass('col-md-4').addClass('col-md-6');
    $('.route-column').removeClass('col-md-4').addClass('col-md-6');
    $('.acl-col').removeClass('col-md-12').addClass('col-md-6');
    $('#acl-expand').hide();
    $('#acl-collapse').show();
  },
  collapse: function() {
    $('.acl-column').addClass('col-md-4').addClass('col-md-push-4').removeClass('col-md-12');
    $('.navigation-column').addClass('col-md-pull-4').addClass('col-md-4').removeClass('col-md-6');
    $('.route-column').addClass('col-md-4').removeClass('col-md-6');
    $('.acl-col').addClass('col-md-12').removeClass('col-md-6');
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
    for(var id in data) {
      var $panel = $('#navigation-template').clone().removeAttr('id');
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
    for(var name in data) {
      var $panel = $('#route-template').clone().removeAttr('id');
      $panel.find('.nar-route-name').text(name);
      $panel.find('#route-X').attr('id', 'route-' + name);
      $panel.find('.panel-heading').attr('data-target', '#route-' + name);
      var options = data[name].options;
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

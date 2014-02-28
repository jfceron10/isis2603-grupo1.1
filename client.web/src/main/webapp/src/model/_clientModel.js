define([], function() {
    App.Model._ClientModel = Backbone.Model.extend({
        defaults: {
 
		 'name' : ''
 ,  
		 'lastname' : ''
 ,
                 'cc' : ''
 ,
                 'birthDate' : ''
        },
        getDisplay: function(name) {
         return this.get(name);
        },
        initialize:function(parameters){
            this.on('invalid',function(error){
                Backbone.trigger('user-model-error', {error: error});
            });
        },
 
        validate: function(attrs, options) {
            if (this.lastName == '') {
                return "You must set a value in Attribute";
            }
            if (this.name == '') {
                return "You must set a value in Attribute";
            }
            if (this.cc == '') {
                return "You must set a value in Attribute";
            }
            if (this.birthDate == '') {
                return "You must set a value in Attribute";
            }
            
        }
    });

    App.Model._ClientList = Backbone.Collection.extend({
        model: App.Model._ClientModel,
        initialize: function() {
        }

    });
    return App.Model._ClientModel;
});
  
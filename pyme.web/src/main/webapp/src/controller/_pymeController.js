define(['model/pymeModel', 'delegate/_pymeDelegate'], function(pymeModel) {
    App.Controller._PymeController = Backbone.View.extend({
        initialize: function(options) {
            this.searchTemplate = _.template($('#pymeSearch').html() + $('#pymeList').html());
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#pyme').html());
            this.listTemplate = _.template($('#pymeList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
		this.componentId = options.componentId;
            }
            var self = this;
            Backbone.on(this.componentId + '-' + 'pyme-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'pyme-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'pyme-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'pyme-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-pyme-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'pyme-save', function(params) {
                self.save(params);
            });
            
            Backbone.on(this.componentId + '-' + 'toolbar-search', function(params) {
                self.search(params);
            });
            Backbone.on(this.componentId + '-pyme-search', function(params) {
                self.pymeSearch(params);
            });
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-pyme-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-pyme-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-pyme-create', {view: this});
                this.currentPymeModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-pyme-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-pyme-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-pyme-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-pyme-list', {view: this, data: data});
                var self = this;
				if(!this.pymeModelList){
                 this.pymeModelList = new this.listModelClass();
				}
                this.pymeModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-pyme-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'pyme-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-pyme-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-pyme-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-pyme-edit', {view: this, id: id, data: data});
                if (this.pymeModelList) {
                    this.currentPymeModel = this.pymeModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-pyme-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentPymeModel = new this.modelClass({id: id});
                    this.currentPymeModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-pyme-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'pyme-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-pyme-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-pyme-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-pyme-delete', {view: this, id: id});
                var deleteModel;
                if (this.pymeModelList) {
                    deleteModel = this.pymeModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-pyme-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'pyme-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-pymeForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-pyme-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-pyme-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-pyme-save', {view: this, model : model});
                this.currentPymeModel.set(model);
                this.currentPymeModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-pyme-save', {model: self.currentPymeModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'pyme-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({pymes: self.pymeModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({pyme: self.currentPymeModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        },
        
        search: function() {
            this.currentPymeModel = new App.Model.PymeModel();
            this.pymeModelList = new this.listModelClass();
            this._renderSearch();
        },
        pymeSearch: function(params) {
            var self = this;
            var model = $('#' + this.componentId + '-pymeSearch').serializeObject();
            this.currentPymeModel.set(model);
            App.Delegate.PymeDelegate.search(self.currentPymeModel, function(data) {
                self.pymeModelList = new App.Model.PymeList();
                _.each(data, function(d) {
                    var model = new App.Model.PymeModel(d);
                    self.pymeModelList.models.push(model);
                });
                self._renderSearch(params);
            }, function(data) {
                Backbone.trigger(self.componentId + '-' + 'error', {event: 'pyme-search', view: self, id: '', data: data, error: {textResponse: 'Error in pyme search'}});
            });
        },
 
        _renderSearch: function(params) {
 
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.searchTemplate({componentId: self.componentId,
                    pymes: self.pymeModelList.models,
                    pyme: self.currentPymeModel,
                    showEdit: false,
                    showDelete: false
                }));
                self.$el.slideDown("fast");
            });
        },
    });
    return App.Controller._PymeController;
});
define(["jquery","underscore","backbonesrc"],function(e,t,n){function i(e){this.sw_keys=e.switcher.key.split(" "),this.sw_views=e.switcher.views,this.currentView=null,this.sw_currentResource=null,t.extend(this,e),this._init()}var t=this._,r=this.Backbone;if(!t||!r||!JSON)throw new Error("Some modules are not loaded");i.prototype={_init:function(){this._parseOptions(),t.each(this.sw_keys,this._addListener,this),this.listenToOnce(this,"after:initialize",this._start)},_addListener:function(e){this.listenTo(this.model,"change:"+e,this._handleResource)},_start:function(){this._handleResource(this.model,this.model.get(this.sw_keys))},_parseOptions:function(){this.switcher.options&&this.switcher.options.target?this.$target=this.$(this.switcher.options.target):this.$target=this.$el},_handleResource:function(e,t){this.sw_currentResource=t,this.currentView&&this.currentView.stopListening(),this._renderResource()},_renderResource:function(){this.currentView&&(this.currentView.$el.removeClass(this.switcher.transition.cssIn),this.currentView.remove()),this._render()},_render:function(){this.currentView=new this.sw_views[this.sw_currentResource]({model:this.model}),this.$target.append(this.currentView.el),this.trigger("after:render"),this.$target.addClass(this.switcher.transition.cssIn)}};var s=function(){r.trigger("extend:View",{key:"switcher",extension:i,initialize:function(){this.trigger("after:initialize")}})};return{beam:s}});
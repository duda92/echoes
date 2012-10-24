define([
	'jquery',
	'underscore',
	'backbone',
	'views/player_app',
	'safe'
], function($, _, Backbone, PlayerApp, s) {
   
    var AppRouter = Backbone.Router.extend({

		routes: {
			'': 'showExplore',
			'explore': 'showExplore',
			'history': 'showHistory',

			'searches/:feedType/:query': 'search',
			'play/:mediaId': 'playMedia'
		},

		initialize: function() {
			this.appView = new PlayerApp();
		},

		showExplore: function() {
			this.appView.renderExplore();
			this.markNav('explore');
		},

		showHistory: function() {
			this.appView.renderHistory();
			this.markNav('history');
		},

		search: function(feedType, query) {
			this.appView.query(query);
		},

		playMedia: function(mediaId) {
			this.appView.query(false, {ignore: true});
			this.appView.play(mediaId);
		},

		// TODO: should be from a View
		markNav: function(route) {
			$("#library-nav").find('li').removeClass('active')
				.end()
				.find("a[href^='#" + route + "']").parent().addClass('active');
		}
	});
   
    return AppRouter;
});
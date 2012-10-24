define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
	var YoutubePlayer = Backbone.View.extend({
		el: '#youtube-player-container',

		events: {
			'click .hide-player': 'hide',
			'click .show-player': 'show',
			'click .pause': 'pause',
			'click .play': 'playVideo',
			'click .volume-down': 'decreaseVolume',
			'click .volume-up': 'increaseVolume'
		},

		initialize: function() {
			window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
			var res = require(['http://www.youtube.com/iframe_api?&ghost='], function(){});
		},

		createPlayer: function(){
			this.player = new YT.Player('player', {
				height: '270',
				width: '350',
				playlist: '',
				playerVars: { 'autoplay': 1, 'enablejsapi': 1 },
				events: {
					'onReady': $.proxy(this.onPlayerReady, this),
					'onStateChange': $.proxy(this.onPlayerStateChange, this)
				}
			});
		},
		
		onPlayerReady: function(){
			if (this.queue) {
				this.play(this.queue);
			}
		},

		onPlayerStateChange: function(ev){
			if (ev.data === YT.PlayerState.PAUSED) {
				this.toggleNowPlaying(false);
			}

			if (ev.data === YT.PlayerState.PLAYING) {
				this.toggleNowPlaying(true);
			}
		},

		play: function(mediaData) {
			if (!this.player || !this.player.loadVideoById) {
				this.show();
				this.queue = mediaData;
				return;
			}
			this.playMedia(mediaData);
			this.$el.addClass('yt-playing');
			this.show();
		},

		/**
		 * plays a single video or a playlist
		 * @param  {json} mediaData - youtube api item result
		 */
		playMedia: function(mediaData) {
			var mediaId = _.isObject(mediaData) ? mediaData.id : mediaData;
			// 'size' attribute is the amount of videos in a playlist
			if (mediaData.size) {
				this.player.loadPlaylist({
					list: mediaId,
					playlist: 'playlist',
					suggestedQuality: 'large'
				});
			} else {
				this.player.loadVideoById(mediaId);
			}
		},

		playPlaylist: function(mediaData) {
			player.loadPlaylist(mediaData);
		},

		pause: function(ev) {
			ev.preventDefault();
			this.player.pauseVideo();
		},

		playVideo: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.playVideo();
		},

		decreaseVolume: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.setVolume(this.player.getVolume() - 5);
		},

		increaseVolume: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.setVolume(this.player.getVolume() + 5);
		},

		toggleNowPlaying: function(show){
			this.$el.toggleClass('yt-playing', show);
		},

		show: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.$el.addClass('show-youtube-player');
		},

		hide: function(ev) {
			ev.preventDefault();
			this.$el.removeClass('show-youtube-player');
		}
	});

	return YoutubePlayer;
});
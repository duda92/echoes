define(["jquery","underscore","backbone","views/youtube_item","collections/youtube_search_results"],function(e,t,n,r,i){var s=n.View.extend({tagName:"ul",className:"clearfix unstyled ux-maker youtube-items-container",view:{type:r,collection:i,events:{"play-media":"playMedia"}},initialize:function(){this.listenTo(this.model.youtube,"change:data",this.updateCollection),this.listenTo(this.model.youtube,"change:query change:preset change:duration",this.reset),this.listenTo(this.collection,"change:isFavorite",this.favoriteMedia),this.listenTo(n,"app:load-more",this.handleLoadMore),this.$el.addClass("transition-out"),this.model.youtube.set("feedType","videos"),this.model.youtube.set({startIndex:1}),this.model.youtube.fetch()},playMedia:function(e){this.model.playMedia({type:"video",mediaId:e.id}),this.updateState(e,!0)},handleLoadMore:function(e){this.model.youtube.fetchNext()},updateCollection:function(e,t){t&&(this.$el.hide(),this.collection.add(t.items),this.$el.show().addClass("transition-in").removeClass("transition-out"))},reset:function(){this.collection.reset()},updateState:function(e,t){t&&this.collection.savePlayed(e)},favoriteMedia:function(e,t){var n=this.model.youtube.profile.getFavoritesId();this.model.youtube.playlists.insert(n,e.id)}});return s});
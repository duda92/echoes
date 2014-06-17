define(["jquery","underscore","backbone","views/media_search","views/youtube_player","views/content_layout","modules/feed-filter/feed-filter","modules/user-playlists/user-playlists","modules/user-profile/user-profile","views/facebook/facebook_like_view","views/youtube/PlaylistsViewer","modules/sidebar/sidebar-view","views/Loader","views/infinite_scroller","views/google/gplus-share","modules/presets/presets.view","modules/duration/duration.view","modules/updates/updates-view"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g){var y=n.View.extend({el:".container-main",initialize:function(){this.addStyle(),this.views={searchBar:new r({model:this.model.youtube}),youtubePlayer:new i({model:this.model}),contentView:new s({model:this.model}),searchFeedFilter:o.create(this.model),userPlaylists:u.create(this.model,this.model.youtube.playlists),userProfile:a.create(this.model),facebookLikeView:new f({model:this.model}),gplusShare:new d({model:this.model,el:"#gp-share"}),sidebarToggle:c.create(this.model),loader:new h({model:this.model}),playlistsViewer:new l({model:this.model}),infiniteScroll:new p({el:this.$el,model:this.model}),presetsView:new v({model:this.model}),durationView:new m({model:this.model}),updates:g.create(this.model)}},setSize:function(){this.$el.height(t().getPortviewSize().height+10)},addStyle:function(){var n=t().addFeatures(),r=t().isFullScreen(),i=[];t().hasHiddenScroll()||i.push("styled-scrollbar"),n&&n.length&&i.push("ios"),r&&i.push("full-screen-app"),e("html").addClass(i.join(" "))}});return y});
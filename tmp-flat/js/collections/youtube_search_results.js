define(["underscore","backbone","models/youtube_item"],function(e,t,n){var r=t.Collection.extend({model:n,played:null,initialize:function(){this.listenTo(this,"reset",this.updatePlayedId)},savePlayed:function(e){var t;if(this.played===e.id)return;t=this.get(this.played),t&&t.set({isPlaying:!1}),this.played=e.id},updatePlayedId:function(){var e=this.get(this.played);e&&e.set({isPlaying:!0})}});return r});
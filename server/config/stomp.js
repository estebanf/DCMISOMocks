'use strict';

export default function(stomp,config){
	var client = new stomp.Stomp(config);
	client.connect();
	client.on('connected',function(){
		require('../api/batch/batch.controller').registerStompClient(client);
	}); 
}
function Load(container, url, target){

	$(container).load(url+' '+ target, function(){

		//callback function if i want to call some scripts after the load
		console.log('load successful');
	});
}
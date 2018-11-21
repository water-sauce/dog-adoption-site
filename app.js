$.getJSON( "./assets/data/dogs.json", function( json ) {
	console.log( json );
    console.log( "JSON Data received, name is " + json.name);
});
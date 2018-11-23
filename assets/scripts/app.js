// if adding pagination and limiting the # of dogs
// const DOGS_PER_PAGE = 12;

// expand the image
function expandImg( img ){
	// attach image to the overlay
	let expanded_img = document.getElementById( 'expanded-image' ),
		expanded_img_wrapper = document.getElementById( 'expanded-image-wrapper' );
		// since button does not have the src, change to a data attribute to be able to get the image
		expanded_img.src = img.srcElement.getAttribute( 'data-pull' );
		expanded_img.setAttribute( 'alt', img.srcElement.alt + ' (expanded image)' );
		expanded_img_wrapper.classList.add( 'expand' );
		// prevent scroll when open
		document.getElementsByTagName("body")[0].setAttribute( 'style', 'overflow:hidden' );
}

// close the image
function closeExpandedImg(){
	let expanded_img_wrapper = document.getElementById( 'expanded-image-wrapper' ),
		// remove the dog image from the div
		expanded_img = document.getElementById( 'expanded-image' );
		expanded_img.src = '';
		expanded_img.setAttribute( 'alt', '' );
		expanded_img_wrapper.classList.remove( 'expand' );
		// enable page scroll after close
		document.getElementsByTagName("body")[0].setAttribute( 'style', '' );
}

function createFilters( dog_arr, arr_name ){
	let gallery_filter = document.getElementById( 'image-gallery-filters' ),
		filter_list = document.getElementById( 'filter-list' ),
		filter_name = document.createElement( 'h4' );

	dog_arr = dog_arr.flat().reduce(function(dog, type){
		if ( !dog[type] ){
			dog[type] = 0;
		}
		dog[type]++;
		return dog;
	}, {});

	// console.log( arr_name );
	console.log( dog_arr );

	Object.keys( dog_arr ).forEach( function( key ) {
		let checkbox = document.createElement( 'input' ),
			name = document.createElement( 'p' );

		checkbox.setAttribute( 'type', 'checkbox' );
		checkbox.setAttribute( 'data-set', key );
	    // console.log( key, dog_arr[ key ] );
	    filter_list.appendChild( checkbox );
	});

	filter_name.innerHTML = arr_name;
	filter_list.appendChild( filter_name );

	// <li>
	// 	<h4>Example</h4>
	// 	<a>+</a>
	// 	<div class="filter-checkbox" id="">
	// 		<input type="checkbox" name="chihuahua" />
	// 		<p>Chihuahua <span></span></p>
	// 	</div>
	// </li>
	// for ( var i = 0; i < breed_arr.length; i++ ){

	// }

    // console.log(breed_arr);
}

// this function creates the image gallery for the dogs and lazy loads the images
function createGallery( dogs ){

	let gallery_div = document.getElementById( 'image-gallery' ),
		total_dogs = document.getElementById( 'total-dogs-showing' ),
		breed_arr = [],
		gender_arr = [],
		age_arr = [];
		
	total_dogs.innerHTML = dogs.length;

	dogs.map( function( dog, index ){
		breed_arr.push( dog.breed );
		gender_arr.push( dog.sex );
		age_arr.push( dog.age );

		// mapping over the array and creating HTML elements through the loop
		let card = document.createElement( "figure" ),
			image = document.createElement( "img" ),
			image_wrapper = document.createElement( "div" ),
			image_expander = document.createElement( "img" ),
			name = document.createTextNode( dog.name ),
			name_holder = document.createElement( "h4" ),
			breed = dog.breed.toString(),
			breed_wrapper = document.createElement( "p" ),
			info_h5 = document.createElement( "h5" ),
			age = document.createTextNode( dog.age ),
			gender = document.createTextNode( ' ' + dog.sex ),
			read_more = document.createElement( "a" ),
			info_wrapper = document.createElement( "figcaption" ),
			description_wrapper = document.createElement( "p" ),
			description = document.createTextNode( dog.description );
			
		// add the image
		image.setAttribute( 'data-src', dog.image );
		image.setAttribute( 'alt', dog.name + ' | located in San Francisco | ' + dog.description );
		image.classList.add( 'lazyload' );
		image_wrapper.classList.add( 'image-wrapper' );
		image_expander.setAttribute( 'src', './assets/images/custom/expand-btn.png' );
		image_expander.setAttribute( 'data-pull', dog.image );
		image_expander.setAttribute( 'alt', 'Expand image');
		image_expander.classList.add( 'image-expander');
		// add the image expand button and have the event listener on it
		image_expander.addEventListener( 'click', expandImg.bind( this ) );
		image_wrapper.appendChild( image );
		image_wrapper.appendChild( image_expander );
		card.appendChild( image_wrapper );

		// add the name of the dog
		name_holder.appendChild( name );
		name_holder.classList.add( 'dog-name' );
		info_wrapper.appendChild( name_holder );

		// add the age and gender of the dog
		info_h5.appendChild( age );
		info_h5.appendChild( gender );
		info_h5.classList.add( 'capitalize' );
		info_wrapper.appendChild( info_h5 );

		// add the dog breed
		breed = breed.split(",").join(", ");
		breed_wrapper.innerHTML = breed;
		breed_wrapper.classList.add( 'capitalize' );
		info_h5.appendChild( breed_wrapper );

		// add the description of the dog
		description_wrapper.appendChild( description );
		description_wrapper.classList.add( 'description' );
		info_wrapper.appendChild( description_wrapper );

		// add the link to the dog page
		read_more.innerHTML = "Learn More";
		read_more.classList.add( "button", "button-read-more" );
		info_wrapper.appendChild( read_more );

		// add all the image cards to the gallery div
		card.appendChild( info_wrapper );
		card.classList.add( 'card' );
		gallery_div.appendChild( card );
	})


	createFilters( breed_arr, 'Breed' );
	createFilters( gender_arr, 'Gender' );
	createFilters( age_arr, 'Age' );

}

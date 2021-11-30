import config from '../../lib/config';
import Helpers from '../../lib/Helpers';
import Bootstrap from '../../lib/Bootstrap';

export default class Page {

	/**
	 * render - Display the Page
	 *
	 * @param  {String} slug The slug of the page to display
	 */
	static render( slug ) {

		let single = config.wp.pages()
			.slug( slug )
			.embed()
			.then( pages => {
				if ( pages[0] ) {
					Helpers.doHeader( pages[0].title.rendered );
					if ( 701 === pages[0].id ) {
						return Page.homeTemplate( pages[0] );
					} else {
						return Page.template( pages[0] );
					}

				} else {
					return Page.template( config.page404 );
				}
			} )
			.catch( err => {
			//	console.log( `Error: ${err}` );
				console.log( err );
			} );
		return single;
	}

	/**
	 * template - the Page template
	 *
	 * @param  {Object} content Page content object
	 * @return {void} Not meant to return
	 */
	static template( content ) {

		let
			articleEl 	= document.createElement( 'article' ),
			theContent 	= Helpers.contentInContainer( content.content.rendered );

/*
		var myLoop = function (array, callback, scope) {
			for (var i = 0; i < array.length; i++) {
				callback.call(scope, i, array[i]); // passes back stuff we need
			}
		};

		// Usage:
		// optionally change the scope as final parameter too, like ECMA5
		var myNodeList = theContent.childNodes ;
		myLoop(myNodeList, function (index, value) {
			if (value.nodeType != 3 ) {
			//	console.log(value);
			}
		});
*/
		theContent.className = 'entry-content';
		articleEl.className = 's-gutenberg';
		articleEl.appendChild( theContent );


		return articleEl;

	}
	/**
	 * template - the Page template
	 *
	 * @param  {Object} content Page content object
	 * @return {void} Not meant to return
	 */
	static homeTemplate( content ) {

		let
			articleEl 	= Bootstrap.container( 'article' ),
			row = Bootstrap.row(),
			col = Bootstrap.col( 'col-md-9 mx-auto' ),
			theContent 	= content.content.rendered;

		col.innerHTML = theContent;
		row.appendChild( col );
		articleEl.appendChild( row );

		return articleEl;

	}

}

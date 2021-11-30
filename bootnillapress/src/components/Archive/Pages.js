import config from '../../lib/config';
import Router from '../../lib/Router';

export default class ArchivePages {

	/**
	 * render - Display archive list of Movies
	 *
	 */
	static render() {
		config.wp.pages()
			.perPage( 50 )
			.embed()
			.then( pages => {
				pages.map( content => {
					ArchivePages.template( content );
				} );
			} )
			.catch( err => {
			//	console.log( `Error: ${err}` );
				console.log( err );
			} );
	}


	static template( content ) {
		console.log(content);
		let
			articleEl 	= document.createElement( 'article' ),
			titleEl 		= document.createElement( 'h2' ),
			titleLinkEl	= document.createElement( 'a' ),
//			excerptEl 	= document.createElement( 'div' ),
			theTitle 		= content.title.rendered;
//			theExcerpt 	= content.excerpt.rendered,
//			theImg			= '';

//		if ( content._embedded[ 'wp:featuredmedia' ] ) {
//			theImg = document.createElement( 'img' );
//			theImg.classList.add( 'img-fluid' );
//			theImg.src = content._embedded[ 'wp:featuredmedia' ][0].source_url;
//		}

		titleLinkEl.innerHTML = theTitle;
		titleLinkEl.href = Router.makeHashFromLink( content );
		titleEl.appendChild( titleLinkEl );

//			excerptEl.innerHTML = theExcerpt;

		articleEl.appendChild( titleEl );
//		if ( theImg ) articleEl.appendChild( theImg );
//		articleEl.appendChild( excerptEl );
		config.siteMain.appendChild( articleEl );

	}

}

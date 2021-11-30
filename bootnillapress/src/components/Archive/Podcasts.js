import config from '../../lib/config';
import Router from '../../lib/Router';
import Helpers from '../../lib/Helpers';
import Components from '../../lib/Components';
import Bootstrap from '../../lib/Bootstrap';
// import WPAPI from 'wpapi';

export default class Podcasts {

	/**
	 * render - Display Podcasts list of card_groups
	 *
	 */
	static render() {

        let frag = document.createDocumentFragment(),
            introContainer = Bootstrap.container(),
            introRow = Bootstrap.row(),
            introCol = Bootstrap.col( 'col-12 col-lg-9 mx-auto' ),
            //		menuCol = Bootstrap.col( 'col-12' ),
            container = Bootstrap.container( 'section', 'container-fluid'),
            row = Bootstrap.cardDeck(),
            buttonDiv = document.createElement( 'div' ),
            loadButton = Bootstrap.button( 'Load More' );

        Helpers.doHeader( 'Podcast Episodes' );

        introRow.appendChild( introCol );
        introContainer.appendChild( introRow );
        config.siteMain.appendChild( introContainer );

        loadButton.id = "load-more";
        loadButton.classList.add( 'mx-auto');
        loadButton.classList.add( 'my-4');
        loadButton.onclick = function(e){Podcasts.loadMore(e,loadButton);};
        loadButton.setAttribute( 'cat', 'all' );
        loadButton.setAttribute( 'pag', 0 );

        buttonDiv.className = 'w-100 text-center';
        buttonDiv.appendChild( loadButton );

				row.classList.add( 'no-gutters' );
				row.classList.add( 'justify-content-center' );
        row.id = "posts-row";

        let x = config.bt.posts()
        .perPage( 12 )
				.categories( 140 )
        .embed()
        .then( posts => {
            posts.map( post => {
						//		frag.appendChild( Podcasts.card( post ) );
								frag.appendChild( Podcasts.theCard( post ) );
            } );
        } )
        .then( function() {
            row.appendChild( frag );
            container.appendChild( row );
            container.appendChild(buttonDiv);

            return container;
        } )
        .catch( err => {
            console.log( err );
        } );
        return x;
        //	return container;

	}


  static card( content ){
		let col = Bootstrap.col( 'col-sm-6 col-md-4 col-lg-4 col-xl-3' );
		col.appendChild( Podcasts.theCard( content ) );
		return col;
	}

    static theCard( content ) {
			let
				theTitle 	= content.title.rendered,
				link = Router.makeHashFromLink( content ),
				theImg		= ( content._embedded[ 'wp:featuredmedia' ] ) ? content._embedded[ 'wp:featuredmedia' ][0].source_url : '',
				theContent = document.createElement('div');

			theContent.innerHTML = content.content.rendered;
			let
				podcast = theContent.getElementsByClassName( 'player_container' ),
				fileLink = podcast[0].getElementsByClassName( 'button-download' ),
				iTunesLink = podcast[0].getElementsByClassName( 'button-itunes' ),
				file = fileLink[0].href,
				iTunes = iTunesLink[0].href;


			let card = Components.cardStyle03 ( theTitle, content.excerpt.rendered, theImg, link, file, iTunes );

			card.classList.add( 'podcast' );
			return card;
	}

  static loadMore(e,loadButton) {
		loadButton.innerHTML = 'Load More <i class="fa fa-spinner fa-spin fa-pulse fa-fw"></i>';
		let row = document.getElementById( "posts-row" ),
				moreButton = document.getElementById( 'load-more' ),
				nav = 2,
				pag = moreButton.getAttribute( 'pag' );

		if ( pag > 0 ) {
			nav = parseInt(pag) + 1;
		}

		/*
		if ( xlug[2] ) {
			nav = parseInt(xlug[2]) + 1;
		}
		if (history.pushState) {
			window.history.pushState( '', "Blog", '#/blog/'+nav );
		} else {
			document.location.href = '#/blog/'+nav;
		}
		*/
		console.log('Page: '+nav);

			config.bt.posts()
				.categories( 140 )
				.perPage( 12 )
				.page( nav )
				.embed()
				.then( posts => {
					posts.map( content => {
						row.appendChild( Podcasts.theCard( content ) );
					});
				} )
				.then(()=>{
					loadButton.innerHTML = 'Load More';
				})
				.catch( err => {
					Podcasts.loadMoreButtonText( 1 );

					console.log( err );
				} );

			moreButton.setAttribute( 'pag', nav );

	}

	static loadMoreButtonText( allPostsLoaded = false ) {
		let moreButton = document.getElementById( 'load-more' );

		moreButton.innerHTML = 'Load More';

		if ( allPostsLoaded ) {
			moreButton.innerHTML = 'All Posts Loaded!';
			moreButton.setAttribute( 'lod', 1 );
		} else {
			moreButton.innerHTML = 'Load More';
		}

	}


}

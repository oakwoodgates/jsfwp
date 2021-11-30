import config from '../../lib/config';
import Router from '../../lib/Router';
import Bootstrap from '../../lib/Bootstrap';
import Components from '../../lib/Components';
import Helpers from '../../lib/Helpers';

export default class Archive {

	/**
	 * render - Display listing of Archive
	 *
	 */
	static render( pageNumber ) {


		let frag = document.createDocumentFragment(),
			introContainer = Bootstrap.container(),
			introRow = Bootstrap.row(),
			introCol = Bootstrap.col( 'col-12 col-lg-9 mx-auto mb-3 text-center' ),
	//		menuCol = Bootstrap.col( 'col-12' ),
			container = Bootstrap.container( 'section', 'container-fluid px-0'),
			row = Bootstrap.row(),
			buttonDiv = document.createElement( 'div' ),
			loadButton = Bootstrap.button( 'Load More', 'button', 'success' );

		Helpers.doHeader( 'Biddy Tarot Blog' );

		introCol.innerHTML = '<h2 class="h3 text-success mb-3">Learn to read Tarot from the heart and not the book!</h2><p>Featuring tutorials for Tarot reading techniques, learning the Tarot card meanings, interviews with Tarot experts, Tarot deck reviews and much, much more!</p>';
		introRow.appendChild( introCol );
		introContainer.appendChild( introRow );
		config.siteMain.appendChild( introContainer );

		container.appendChild( Archive.menu() );

		loadButton.id = "load-more";
		loadButton.classList.add( 'mx-auto');
		loadButton.classList.add( 'my-4');
		loadButton.onclick = function(e){Archive.loadMore(e,loadButton);};
		loadButton.setAttribute( 'cat', 'all' );
		loadButton.setAttribute( 'pag', 0 );

		buttonDiv.className = 'w-100 text-center';
		buttonDiv.appendChild( loadButton );

		row.classList.add( 'no-gutters' );
		row.id = "posts-row";

		let x = config.bt.posts()
			.excludeCategories( 140 )
			.perPage( 12 )
			.page( pageNumber )
			.embed()
			.then( posts => {
				posts.map( post => {
					frag.appendChild( Archive.card( post ) );
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

	static menu() {
		let
		//	frag = document.createDocumentFragment(),
			navbar = document.createElement( 'nav' ),
			ul = document.createElement( 'ul' ),
			allA = document.createElement( 'a' ),
			h4 = document.createElement( 'h4' );

		navbar.className = 'navbar navbar-expand navbar-dark bg-success flex-column pt-3 text-uppercase';

		h4.innerHTML = 'Sort by Category';
		h4.className = 'text-center w-100 text-light text-uppercase';
		navbar.appendChild(h4);
		allA.href = 'javascript:void(0)';
		allA.innerHTML = 'All';
		allA.className = 'nav-link nav-item active';
		allA.onclick = function(e){Archive.swapPostGrid( e, 'all', allA );};
		ul.appendChild(allA);
		ul.className = 'navbar-nav nav justify-content-center text-light mx-auto text-center flex-column flex-sm-row';
		ul.id = 'blog-cat-nav';

		config.bt.categories()
			.param( 'exclude', [140, 93])
			.perPage( 20 )
			.then( cats => {
				cats.map( c => {
					if ( c.count > 0 ) {
						let l = document.createElement( 'li' ),
							a = document.createElement( 'a' ),
							t = document.createTextNode( c.name );
						a.href = 'javascript:void(0)';
						a.appendChild( t );
						a.className = 'nav-link';
						l.className = 'nav-item';
						a.onclick = function(e){Archive.swapPostGrid( e, c.id, a );};
				//		l.appendChild(a);
						ul.appendChild(a);
				//		frag.appendChild(a);
					}

				} );
			} )
			.catch( err => {
				console.log( err );
			} );

	//	console.log(frag);
		navbar.appendChild(ul);
	//	div.appendChild(frag);
		return navbar;

	}

	static card( content ){
		let col = Bootstrap.col( 'col-sm-6 col-md-6 col-lg-4 col-xl-3' );
		col.appendChild( Archive.theCard( content ) );
		return col;
	}

	static theCard( content ) {
		let
			theTitle 	= content.title.rendered,
			link = Router.makeHashFromLink( content ),
			theImg		= '';

		if ( content._embedded[ 'wp:featuredmedia' ] ) {
			theImg = content._embedded[ 'wp:featuredmedia' ][0].source_url;
		}

		let card = Components.cardStyle02 ( theTitle, theImg, link );

		card.classList.add( content.type );
		return card;
	}

	static swapPostGrid( e, id, a ) {
		e.preventDefault();

		let
			row = document.getElementById( 'posts-row' ),
			moreButton = document.getElementById( 'load-more' ),
			frag = document.createDocumentFragment(),
			linkWrap = document.getElementById( 'blog-cat-nav' ),
			x = '',
			activeLink = linkWrap.getElementsByClassName( 'active' );


		Archive.loadMoreButtonText();
		moreButton.setAttribute( 'cat', id );
		moreButton.setAttribute( 'pag', 0 );

		if (activeLink[0]){
			activeLink[0].classList.remove( 'active' );
		}

		a.classList.add( 'active' );

		//	if (history.pushState) {
		//		window.history.pushState( '', "Blog", '#/blog/' );
		//	} else {
		//		document.location.href = '#/blog/';
		//	}
		Helpers.fade(row);

		if ( parseInt(id) > 0 ) {
			x = config.bt.posts()
				.categories( id )
				.perPage( 12 )
				.embed()
					.then( posts => {
						posts.map( content => {
					//		frag.appendChild( Archive.card( content ) );
							row.appendChild( Archive.card( content ) );
						} );
					} )
					.then( function() {
					//	row.appendChild( frag );
					} ).then ( function() {
						Helpers.unfade(row);
					})
					.catch( err => {
						Archive.loadMoreButtonText( 1 );
						console.log( err );
					} );

		} else {
			x = config.bt.posts()
				.excludeCategories( 140 )
				.perPage( 12 )
				.embed()
				.then( posts => {
					posts.map( content => {
						frag.appendChild( Archive.card( content ) );
					} );
				} )
				.then( function() {
					row.appendChild( frag );
				} ).then ( function() {
					Helpers.unfade(row);
				})
				.catch( err => {
					Archive.loadMoreButtonText( 1 );

					console.log( err );
				} );
		}
		x.then(()=>{
		});

	}

	static loadMore( e, moreButton ) {
		let row = document.getElementById( "posts-row" ),
	//		moreButton = document.getElementById( 'load-more' ),
//			slug = Router.getSlug(),
//			xlug = slug.split( '/' ),
			nav = 2,
			cat = moreButton.getAttribute( 'cat' ),
			pag = moreButton.getAttribute( 'pag' );

		moreButton.innerHTML = 'Load More <i class="fa fa-spinner fa-spin fa-pulse fa-fw"></i>';

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
		if ( parseInt( cat ) > 0 ) {
			config.bt.posts()
				.categories( cat )
				.perPage( 12 )
				.page( nav )
				.embed()
					.then( posts => {
						posts.map( content => {
							row.appendChild( Archive.card( content ) );
						} );
					} )
					.then(()=>{
							moreButton.innerHTML = 'Load More';
						})
					.catch( err => {
						Archive.loadMoreButtonText( 1 );
						console.log( err );
					} );
		} else {
			config.bt.posts()
				.perPage( 12 )
				.excludeCategories( 140 )
				.page( nav )
				.embed()
				.then( posts => {
					posts.map( content => {
						row.appendChild( Archive.card( content ) );
					} );
				} )
				.then(()=>{
						moreButton.innerHTML = 'Load More';
					})
				.catch( err => {
					Archive.loadMoreButtonText( 1 );

					console.log( err );
				} );
		}
		moreButton.setAttribute( 'pag', nav );

	}

	static loadMoreButtonText( allPostsLoaded = false ) {
		let moreButton = document.getElementById( 'load-more' );

	//	moreButton.innerHTML = 'Load More';

		if ( allPostsLoaded ) {
		//	console.log('loaded');
			moreButton.innerHTML = 'All Posts Loaded!';
			moreButton.setAttribute( 'lod', 1 );
		} else {
			moreButton.innerHTML = 'Load More';
		}

	}



}

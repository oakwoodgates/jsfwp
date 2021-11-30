import config from '../../lib/config';
import Router from '../../lib/Router';
import Helpers from '../../lib/Helpers';
import Components from '../../lib/Components';
// import WPAPI from 'wpapi';

export default class CardGroup {

	/**
	 * render - Display archive list of card_groups
	 *
	 */
	static render( xlug ) {
	//	let mainEl = config.siteMain;
		let mainEl = document.createDocumentFragment();

		config.wp.cards = config.wp.registerRoute( 'wp/v2', '/cards/(?P<slug>)' );
		config.wp.card_groups = config.wp.registerRoute( 'wp/v2', '/card_groups/(?P<slug>)' );

		let x = config.wp.card_groups()
			.slug( xlug[2] )
			.embed()
			.then( card_groups => {
				card_groups.map( content => {
					Helpers.doHeader( content.name, content.acf.tagline2 );
					mainEl.appendChild( CardGroup.archiveBody( content ) );
					mainEl.appendChild( Helpers.jumbotron( "ad 1", "yeah") );
					if ( 'undefined' !== typeof(content.acf.chars) ) {
						mainEl.appendChild( CardGroup.charsSection( content.acf.chars ) );
					}

					mainEl.appendChild( CardGroup.archiveJumbotronAd1( "Ad Two Banner", "awesome stuff here") );

					let
						currentCat 		= card_groups[0],
						sectionEl 		= document.createElement( 'section' ),
						sectionTitleEl 	= document.createElement( 'h2' ),
						sectionLeadEl 	= document.createElement( 'p' ),
						sectionTitle 	= document.createTextNode( content.name + " - Tarot Card Meanings" ),
						sectionLead 	= document.createTextNode( 'Click on each Tarot card below to find out more about its Tarot card meaning, including the upright and reversed Tarot card meanings.' ),
						cardRow 		= document.createElement( 'div' );

					cardRow.classList.add( 'row' );
					sectionEl.classList.add( 'container' );

					sectionTitleEl.appendChild( sectionTitle );
					sectionLeadEl.appendChild( sectionLead );
					sectionEl.appendChild( sectionTitleEl );
					sectionEl.appendChild( sectionLeadEl );
					sectionEl.appendChild( cardRow );

					mainEl.appendChild( sectionEl );

					let cardsP = config.wp.cards().perPage( 50 ).param( 'card_groups', [ currentCat.id ])
					.then( cards => {
						cards.map( content => {
								cardRow.appendChild( CardGroup.singleCard( content ) );
						} );
					} );

					return cardsP;
				} );

				return mainEl;
			} );

		return x;
	}




	static archiveHeader( content ) {
		return Components.jumbotronHeader01( content.name, content.acf.tagline2 );
	}

	static archiveBody( content ) {
		let
			el 		= document.createElement( 'div' ),
			text 	= content.acf.lib_desc;

		if (text) {
			el.classList.add( 'container' );
			el.innerHTML = text;
		}



		return el;
	}



	static singleCard( content ) {
		let
			cardCol		= document.createElement('article'),
			card		= document.createElement('a'),
			cardImg 	= document.createElement('img'),
			cardBody 	= document.createElement('div'),
			cardTitle	= document.createElement('h5'),
			innerRow 	= document.createElement('div'),
			imgCol 		= document.createElement('div'),
			textCol 	= document.createElement('div'),
			imgSrc 		= 'https://cardapp.howfluid.com/wp-content/uploads/cards/'+config.cardStyle+'/'+content.acf.tcm_img_name+'.jpg',
			upDiv = document.createElement('div'),
			rxDiv = document.createElement('div'),
			upLi1 = document.createElement('div'),
			rxLi1 = document.createElement('div'),
			upLi2 = document.createElement('div'),
			rxLi2 = document.createElement('div'),
			upText 	= document.createTextNode( content.acf.upright_keywords ),
			rxText 	= document.createTextNode( content.acf.reversed_keywords ),
			up 	= document.createTextNode( 'UP:' ),
			rx 	= document.createTextNode( 'RX:' );

		cardCol.classList.add( 'col-lg-6', 'mb-4', 'd-flex' );
		card.classList.add( 'card', 'no-hover-underline', 'box-shadow', 'flex-row', 'w-100', 'text-uppercase' );
		cardBody.classList.add( 'card-body' );
		cardTitle.classList.add( 'card-title' );
		innerRow.classList.add( 'row', 'no-gutters', 'align-self-stretch', 'w-100' );
		imgCol.classList.add( 'col-md-4', 'col-3' );
		textCol.classList.add( 'col-md-8', 'col-9' );

		if ( 'v3' === config.cardStyle ) {
			card.classList.add( 'text-warning', 'bg-primary' );
		} else {
			card.classList.add( 'text-teal', 'bg-dark');
		}

		card.href = Router.makeHashFromLink( content );
		imgCol.style.background = "#000 url("+imgSrc+") no-repeat 20% 15%/cover";

		cardImg.src = imgSrc;
		cardTitle.innerHTML = content.title.rendered;


		upDiv.classList.add( 'media' );
		upLi1.classList.add( 'font-weight-bold', 'mr-2' );
//		upLi2.classList.add( 'list-inline-item' );
		upLi1.appendChild(up);
		upLi2.appendChild(upText);
		upDiv.appendChild(upLi1);
		upDiv.appendChild(upLi2);

		rxDiv.classList.add( 'media' );
		rxLi1.classList.add( 'font-weight-bold', 'mr-2' );
//		rxLi2.classList.add( 'list-inline-item' );
		rxLi1.appendChild(rx);
		rxLi2.appendChild(rxText);
		rxDiv.appendChild(rxLi1);
		rxDiv.appendChild(rxLi2);

		cardBody.appendChild( cardTitle );
		cardBody.appendChild( upDiv );
		cardBody.appendChild( rxDiv );

		textCol.appendChild( cardBody );

		innerRow.appendChild( imgCol );
		innerRow.appendChild( textCol );
		card.appendChild(innerRow);
		cardCol.appendChild(card);

		return cardCol;

	}



	static archiveJumbotronAd1( theTitleText, theLeadText ) {
		let
		jumbotron = document.createElement( 'section' ),
		innerContainer = document.createElement( 'div' ),
		titleEl = document.createElement( 'h1' ),
		leadEl = document.createElement( 'p' ),
		buttonEl = document.createElement( 'a' ),
		titleText = document.createTextNode( theTitleText ),
		leadText = document.createTextNode( theLeadText );

		jumbotron.classList.add( 'jumbotron', 'jumbotron-fluid', 'text-center', 'text-uppercase', 'bg-primary', 'bg-primary-radial-dark' );
		titleEl.classList.add( 'display-2', 'text-teal' );
		leadEl.classList.add( 'lead', 'text-teal' );
		innerContainer.classList.add( 'container' );
		buttonEl.classList.add( 'btn', 'btn-outline-teal' );
		buttonEl.href = 'javascript:void(0);';
		buttonEl.innerHTML = 'Learn More';

		titleEl.appendChild( titleText );
		leadEl.appendChild( leadText );
		innerContainer.appendChild( titleEl );
		innerContainer.appendChild( leadEl );
		innerContainer.appendChild( buttonEl );
		jumbotron.appendChild( innerContainer );

		return jumbotron;
	}



	static charsSection( chars ) {
		let container = document.createElement( 'div' );

		container.classList.add( 'container' );
		chars.forEach(function( char ) {
			if ( char.title ) {
				let
				charTitleEl = document.createElement( 'h3' ),
				charTitle = document.createTextNode( char.title );

				charTitleEl.appendChild( charTitle );
				container.appendChild( charTitleEl );
			}
			if ( char.content ) {
				let
				charContentEl = document.createElement( 'div' );

				charContentEl.innerHTML = char.content;
				container.appendChild( charContentEl );
			}

		} );
		return container;
	}

}

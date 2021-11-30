import Bootstrap from './Bootstrap';
import config from './config';

export default class Components {

	static cardStyle01 ( title, text = '', imgSrc = '', link = '' ) {

		let
			card 		= (link) ? document.createElement('a') : document.createElement('div'),
			cardImg 	= document.createElement('img'),
			cardBody 	= document.createElement('div'),
			cardTitle 	= document.createElement('h5');

		if ( link ) {
			card.href = link;
		}

		if ( imgSrc ) {
			cardImg.src = imgSrc;
			cardImg.className = 'card-img-top';
			card.appendChild( cardImg );
		}

		cardTitle.innerHTML = title;
		cardTitle.className = 'card-title';

		card.className = 'card';
		cardBody.className = 'card-body';
	//	console.log(cardTitle.innerHTML);

	//	cardBody.appendChild( cardTitle );
	//	cardBody.appendChild( cardText );

		cardBody.innerHTML = cardTitle.outerHTML + text;

		card.appendChild( cardBody );

		return card;

	}

	static cardStyle02( title, imgSrc = '', link = '' ) {
		let
			card 		= (link) ? document.createElement('a') : document.createElement('div'),
			cardImg 	= document.createElement('img'),
			cardBody 	= document.createElement('div'),
			cardTitle 	= document.createElement('h5');

		if ( link ) {
			card.href = link;
		}

		if ( imgSrc ) {
			cardImg.src = imgSrc;
			cardImg.className = 'card-img-top';
			card.appendChild( cardImg );
		}

		cardTitle.innerHTML = title;
		cardTitle.className = 'card-title text-center m-0 align-self-center w-100';

		card.className = 'card hc-d hc-bg border-0';
		cardBody.className = 'card-body d-none w-100 h-100 position-absolute hc-d-flex hc-bg-primary';

		cardBody.innerHTML = cardTitle.outerHTML;

		card.appendChild( cardBody );

		return card;
	}

	// a card for listing single podcasts with a player function
	static cardStyle03 ( title, text = '', imgSrc = '', postLink = '', mp3 = '', iTunes = '' ) {

		let
			card 		= document.createElement('div'),
			cardImg 	= document.createElement('img'),
			cardBody 	= document.createElement('div'),
			cardTitle 	= document.createElement('h5'),
			cardFooter = document.createElement( 'div' ),
			audioPlayer = config.player;


		if ( imgSrc ) {
			cardImg.src = imgSrc;
			cardImg.className = 'card-img-top';
			card.appendChild( cardImg );
		}

		cardTitle.innerHTML = title;
		cardTitle.className = 'card-title';

		card.className = 'card mb-5';
		cardBody.className = 'card-body';
	//	console.log(cardTitle.innerHTML);

	//	cardBody.appendChild( cardTitle );
	//	cardBody.appendChild( cardText );

		cardBody.innerHTML = cardTitle.outerHTML + text;

		cardFooter.className = 'card-footer px-0 py-0';

		let cbc = 'btn btn-light flex-fill btn-sm';
		let bg = document.createElement( 'div' ),
				b1 = document.createElement('a'),
				b2 = document.createElement('a'),
				b3 = document.createElement('a');

		bg.className = 'btn-group justify-content-center d-flex';
		b1.className = cbc+' play-button bnla_podcast_set';
		b2.className = cbc+' border-left';
		b3.className = cbc+' border-left';
		b1.innerHTML = 'Play';
		b2.innerHTML = 'Read';
		b3.innerHTML = 'iTunes';

		b2.href = postLink;
		b3.href = iTunes;

		b1.onclick = function() {
			if ( this.classList.contains( 'bnla_podcast_set' ) ) {
				let audioWrapper = document.getElementById('audio-player');
				audioWrapper.classList.remove('d-none');
				this.classList.remove( 'bnla_podcast_set' );
				this.innerHTML = 'Pause';

				audioPlayer.src = mp3;
				audioPlayer.play();
				config.siteFooter.classList.add('pb-5');
				audioPlayer.container.classList.add('show_player');

				let playingPlayers = document.getElementsByClassName( 'bnla_podcast_playing' );

				if ( playingPlayers.length > 0 ) {
					let pp = playingPlayers[0];
					pp.classList.add( 'bnla_podcast_set' );
					pp.classList.remove( 'bnla_podcast_playing' );
					pp.innerHTML = "Play";
				} else {
					let pausedPlayers = document.getElementsByClassName( 'bnla_podcast_paused' );
					if ( pausedPlayers.length > 0 ) {
						pausedPlayers[0].classList.add( 'bnla_podcast_set' );
						pausedPlayers[0].classList.remove( 'bnla_podcast_paused' );
				//		pausedPlayers[0].innerHTML = 'Play';
					}
				}

				this.classList.add( 'bnla_podcast_playing' );

			} else if ( this.classList.contains( 'bnla_podcast_paused' ) ) {

				this.classList.remove( 'bnla_podcast_paused' );
				this.classList.add( 'bnla_podcast_playing' );
				this.innerHTML = 'Pause';

				audioPlayer.play();

			} else if ( this.classList.contains( 'bnla_podcast_playing' ) ) {
				this.classList.remove( 'bnla_podcast_playing' );
				this.classList.add( 'bnla_podcast_paused' );
				this.innerHTML = 'Play';

				audioPlayer.pause();

			}
		};

		bg.appendChild(b1);
		bg.appendChild(b2);
		bg.appendChild(b3);
		cardFooter.appendChild(bg);
		card.appendChild( cardBody );
		card.appendChild( cardFooter );

		card.dataset.mp3 = mp3;

		return card;

	}

	// for colored cards
	static cardStyle04 ( header, title, text, classes ) {

		let
			card 		= document.createElement('div'),
			cardBody 	= document.createElement('div'),
			cardHeader = document.createElement( 'div' );
//			bodyText 	= document.createTextNode( text );

		cardBody.classList.add( 'card-body' );
		cardHeader.classList.add( 'card-header', 'h6' );
		if(title) {
			let cardTitle = document.createElement('h5');
			cardTitle.innerHTML = title;
			cardTitle.classList.add( 'card-title' );
			cardBody.appendChild( cardTitle );
		}
		if(classes){
			card.className = classes;
		}
		card.classList.add( 'card', 'mb-4', 'text-white' );
		cardHeader.innerHTML = header;
//		cardBody.appendChild( bodyText );
		cardBody.innerHTML = text;
		card.appendChild( cardHeader );
		card.appendChild( cardBody );

		return card;

	}

	static cardStyle05(){
		let
		imgSrc = 'https://cardapp.howfluid.com/wp-content/uploads/cards/'+config.cardStyle+'/'+'ace_cups.jpg',
		card 		= document.createElement('div'),
		cardImg 	= document.createElement('img'),
		cardHeader = document.createElement( 'div' ),
		cardBody = document.createElement( 'div' ),
		cardFooter = document.createElement( 'div' );

		cardImg.src = imgSrc;

		card.classList.add( 'card', 'text-center', 'text-uppercase' );
		cardImg.classList.add( 'cod-hide' );
		cardHeader.classList.add( 'card-header', 'font-weight-bold' );
		cardBody.classList.add( 'card-body' );
		cardFooter.classList.add( 'card-footer' );

		cardBody.appendChild( cardImg );
		card.appendChild( cardHeader );
		card.appendChild( cardBody );
		card.appendChild( cardFooter );

		return card;

	}

	static inlineSignupForm01( title = '', buttonText = 'Sign Up' ){
		let
			signupForm = document.createElement( 'form' ),
	//		ctaEl = document.createElement( 'h3' ),
			ctaText = document.createTextNode( title ),
	//		formWrap = document.createElement( 'div' ),
			formGroup = document.createElement( 'div' ),
			formLabel = document.createElement( 'label' ),
			formInput = document.createElement( 'input' ),
			button = document.createElement( 'button' ),
			buttonTextNode = document.createTextNode( buttonText );

		button.appendChild( buttonTextNode );

		signupForm.classList.add( 'form-inline', 'justify-content-center', 'mb-0' );
		formGroup.classList.add( 'form-group', 'mb-2', 'mx-2' );
		formLabel.classList.add( 'h4', 'mr-sm-3', 'text-center' );
		formInput.classList.add( 'form-control', 'form-control-sm' );
		button.classList.add( 'btn', 'btn-primary', 'btn-sm', 'mb-2', 'mx-2' );

		formInput.setAttribute( 'type', 'text' );

//		ctaEl.appendChild( ctaText );
		formLabel.appendChild( ctaText );
		formGroup.appendChild( formLabel );
		formGroup.appendChild( formInput );
//		signupForm.appendChild( ctaEl );
		signupForm.appendChild( formGroup );
		signupForm.appendChild( button );
//		formWrap.appendChild(signupForm);
		return signupForm;
		//	return formWrap;
	}



	// page header jumbotron for most pages
	static jumbotronHeader01( theTitleText, theLeadText ) {
		let
			jumbotron = document.createElement( 'section' ),
			innerContainer = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText );

		jumbotron.className = 'jumbotron jumbotron-fluid bg-primary text-white';
		jumbotron.id = 'jumbotron-header-01';
		titleEl.className = 'display-1 text-uppercase text-white';
		innerContainer.className = 'container text-center my-3';


		titleEl.appendChild( titleText );
		innerContainer.appendChild( titleEl );

		if ( theLeadText ) {
			innerContainer.appendChild( document.createElement( 'hr' ) );
			leadEl.classList.add( 'lead' );
			leadEl.appendChild( leadText );
			innerContainer.appendChild( leadEl );
		}

		jumbotron.appendChild( innerContainer );

		return jumbotron;
	}


	static jumbotronCTA01( theTitleText, theLeadText, titleSize = 'display-4' ) {
		let
			jumbotron = document.createElement( 'div' ),
			container = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText ),
			button = document.createElement( 'a' ),
			buttonText = document.createTextNode( 'Learn more' );

		jumbotron.classList.add( 'jumbotron' );
		titleEl.classList.add( titleSize );
		button.classList.add( 'btn', 'btn-primary', 'btn-lg' );
		container.classList.add( 'container' );
		button.href = '#';

		titleEl.appendChild( titleText );
		button.appendChild( buttonText );
		jumbotron.appendChild( titleEl );

		if ( theLeadText ) {
			leadEl.classList.add( 'lead' );
			jumbotron.appendChild( document.createElement( 'hr' ) );
			leadEl.appendChild( leadText );
			jumbotron.appendChild( leadEl );
		}

		jumbotron.appendChild( button );

		container.appendChild( jumbotron );
		return container;
	}

	static jumbotronCTA02( theTitleText, theLeadText, titleSize = 'display-4' ) {
		let
			jumbotron = document.createElement( 'div' ),
			container = document.createElement( 'div' ),
			row = document.createElement( 'div' ),
			col1 = document.createElement( 'div' ),
			col2 = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText ),
			img = document.createElement( 'img' ),
			button = document.createElement( 'a' ),
			buttonText = document.createTextNode( 'Learn more' );

		jumbotron.classList.add( 'jumbotron' );
		titleEl.classList.add( titleSize );
		button.classList.add( 'btn', 'btn-primary', 'btn-lg' );
		container.classList.add( 'container' );
		row.classList.add( 'row', 'align-items-center' );
		col1.classList.add( 'col-sm-8' );
		col2.classList.add( 'col-sm-4' );
		button.href = '#';
		img.src = 'https://www.biddytarot.com/wp-content/uploads/2017/07/Free-Optin-preview-7-Steps-to-Read-Tarot-for-Yourself.jpg';

		titleEl.appendChild( titleText );
		button.appendChild( buttonText );

		col1.appendChild( titleEl );

		if ( theLeadText ) {
			leadEl.classList.add( 'lead' );
			col1.appendChild( document.createElement( 'hr' ) );
			leadEl.appendChild( leadText );
			col1.appendChild( leadEl );
		}

		col1.appendChild( button );
		col2.appendChild( img );

		row.appendChild( col1 );
		row.appendChild( col2 );
		jumbotron.appendChild( row );

		container.appendChild( jumbotron );
		return container;
	}


	static jumbotronCTA03( theTitleText, theLeadText, titleSize = 'display-4' ) {
		let
			jumbotron = document.createElement( 'div' ),
			container = document.createElement( 'div' ),
			row = document.createElement( 'div' ),
			col1 = document.createElement( 'div' ),
			col2 = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			otherEl = document.createElement( 'p' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText ),
			otherText = document.createTextNode( 'It uses utility classes for typography and spacing to space content out within the larger container.' ),
			img = document.createElement( 'img' ),
			button = document.createElement( 'a' ),
			buttonText = document.createTextNode( 'Learn more' );

		jumbotron.classList.add( 'jumbotron' );
		titleEl.classList.add( titleSize );
		button.classList.add( 'btn', 'btn-primary', 'btn-lg' );
		container.classList.add( 'container' );
		row.classList.add( 'row', 'align-items-center' );
		col1.classList.add( 'col-sm-8' );
		col2.classList.add( 'col-sm-4' );
		button.href = '#';
		img.src = 'https://www.biddytarot.com/wp-content/uploads/2017/07/Free-Optin-preview-7-Steps-to-Read-Tarot-for-Yourself.jpg';

		titleEl.appendChild( titleText );
		otherEl.appendChild( otherText );
		button.appendChild( buttonText );

		col1.appendChild( titleEl );

		if ( theLeadText ) {
			leadEl.classList.add( 'lead' );
			leadEl.appendChild( leadText );
			col1.appendChild( leadEl );
			col1.appendChild( document.createElement( 'hr' ) );
		}
		col1.appendChild( otherEl );
		col1.appendChild( button );
		col2.appendChild( img );

		row.appendChild( col1 );
		row.appendChild( col2 );
		jumbotron.appendChild( row );

		container.appendChild( jumbotron );
		return container;
	}

	// after page, above footer ad callout
	static jumbotronCTA04( theTitleText, theLeadText = '', vertImgSrc, additionalText = '' ) {
		let
			jumbotron = document.createElement( 'div' ),
			container = document.createElement( 'div' ),
			row = document.createElement( 'div' ),
			col1 = document.createElement( 'div' ),
			col2 = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			otherEl = document.createElement( 'div' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText ),
			img = document.createElement( 'img' ),
			button = document.createElement( 'a' ),
			buttonText = document.createTextNode( 'Learn more' );


		jumbotron.classList.add( 'jumbotron' );
		jumbotron.classList.add( 'mb-0' );
		titleEl.classList.add( 'display-2' );
		button.classList.add( 'btn', 'btn-success', 'btn-lg' );
		container.classList.add( 'container-fluid' );
		container.style.maxWidth = '1140px';
		row.classList.add( 'row', 'align-items-center' );
		col1.classList.add( 'col-md-8' );
		col2.className =  'col-md-4 order-md-2 text-center';
		button.href = 'javascript:void(0);';
		img.src = vertImgSrc;
		img.className = 'img-fluid w-100 mb-md-0 mb-4';
		img.style.maxWidth = '300px';

		titleEl.appendChild( titleText );

		otherEl.innerHTML= additionalText;
		button.appendChild( buttonText );

		col1.appendChild( titleEl );

		if ( theLeadText ) {
			leadEl.classList.add( 'lead' );
			leadEl.appendChild( leadText );
			col1.appendChild( leadEl );
			col1.appendChild( document.createElement( 'hr' ) );
		}
		col1.appendChild( otherEl );
		col1.appendChild( button );

		col2.appendChild( img );

		row.appendChild( col2 );
		row.appendChild( col1 );

		container.appendChild( row );
		jumbotron.appendChild( container );

		return jumbotron;
	}



	static contentInContainer( content, type = 'section' ) {
		let
			el = document.createElement( type );

		el.classList.add( 'container' );
		el.innerHTML = content;

		return el;
	}

	static inputLoginEmail( showLabel = false, id = 'inputEmail', labelText = 'Email address' ) {
		let
			fg = Bootstrap.formGroup(),
			input = document.createElement( 'input' ),
			label = document.createElement( 'label' ),
			labelTextEl = document.createTextNode( labelText );


		input.className = 'form-control';
		input.setAttribute( 'type', 'email' );
		input.setAttribute( 'id', id );
		input.setAttribute( 'placeholder', labelText );

		if ( !showLabel )
			label.className = 'sr-only';

		label.setAttribute( 'for', id );
		label.appendChild( labelTextEl );

		fg.appendChild( label );
		fg.appendChild( input );
		return fg;
	}

	static inputLoginPassword( showLabel = false, id = 'inputPassword', labelText = 'Password' ) {
		let
			fg = Bootstrap.formGroup(),
			input = document.createElement( 'input' ),
			label = document.createElement( 'label' ),
			labelTextEl = document.createTextNode( labelText );


		input.className = 'form-control';
		input.required = true;
		input.autofocus = true;
		input.setAttribute( 'type', 'password' );
		input.id = id;
		input.setAttribute( 'placeholder', labelText );

		if ( !showLabel )
			label.className = 'sr-only';

		label.setAttribute( 'for', id );
		label.appendChild( labelTextEl );

		fg.appendChild( label );
		fg.appendChild( input );
		return fg;
	}

	static buttonLogin( text = 'Sign In' ) {
		let
			button = document.createElement( 'button' ),
			buttonTextEl = document.createTextNode( text );

		button.className = 'btn btn-lg btn-primary btn-block';
	//	button.classlist.add( 'btn' );
		button.type = 'submit';
		button.id = 'login';

		button.appendChild( buttonTextEl );

		return button;

	}

}

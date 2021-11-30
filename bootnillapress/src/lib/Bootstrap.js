// import config from './config';
import Router from './Router';

export default class Bootstrap {


	/**
	 * 1. Original Booststrap Components
	 * 2. Basic Page Elements
	 * @type {String}
	 */



	static inlineListUL() {
		let
			ul = document.createElement( 'ul' );

		ul.className = 'list-inline';
		return ul;
	}

	static inlineListLI() {
		let
			li = document.createElement( 'li' );

		li.className = 'list-inline-item';
		return li;
	}


	static navItemLink( text = '', link = 'javascript:void(0)' ) {
		let
			li = document.createElement( 'li' ),
			a = document.createElement( 'a' );

		a.href = link;
		a.innerHTML = text;
		a.className = 'nav-link';
		li.className = 'nav-item';
		li.appendChild(a);
		return li;
	}



	/**
	 * 1. ORIGINAL BOOTSTRAP COMPONENTS
	 * Produces the most basic components from Bootstrap in their orignal form.
	 */

	/**
	 * [alert description]
	 * @param  {String}  [text='']        [description]
	 * @param  {String}  [type='success'] [description]
	 * @param  {Boolean} [dismiss=false]  [description]
	 * @return {String}
	 * @todo 	auto add class of alert-link if link exists in text
	 * @todo 	titles
	 */
	static alert( text = '', type = 'success', dismiss = false ) {
		let alert = document.createElement( 'div' );
		//	alertText = document.createTextNode( text );

		alert.innerHTML = text;
	//	alert.appendChild( alertText );
/*
		if ( dismiss ) {
			let button = document.createElement( 'button' ),
				buttonX = document.createElement( 'span' ),
				x = document.createTextNode( '×' );

			button.className = 'close';
			button.type = 'button';
			button.dataset.dismiss = 'alert';
			button.setAttribute( 'role', 'alert' );
			button.setAttribute( 'aria-label', 'Close' );
			buttonX.setAttribute( 'aria-hidden', 'true' );

			buttonX.appendChild( x );
			button.appendChild( buttonX );
			alert.appendChild( button );
		}
		*/
		if ( dismiss ) {
			let button = document.createElement( 'button' ),
				buttonX = document.createElement( 'span' );

			buttonX.innerHTML = '×';
			buttonX.setAttribute( 'aria-hidden', 'true' );

			button.className = 'close';
			button.type = 'button';
			button.dataset.dismiss = 'alert';
			button.setAttribute( 'role', 'alert' );
			button.setAttribute( 'aria-label', 'Close' );

			button.appendChild( buttonX );

			alert.appendChild( button );
			alert.className = 'alert alert-'+type+' alert-dismissible fade show';
		} else {
			alert.className = 'alert alert-'+type;
		}
		return alert;
	}

	/**
	 * [badge description]
	 * @param  {String}  [text='']             [description]
	 * @param  {String}  [color='primary'] [description]
	 * @param  {Boolean} [pill=false]          [description]
	 * @param  {String}  [elType='span']       [description]
	 * @param  {String}  [link='']             [description]
	 * @return {[type]}                        [description]
	 */
	static badge( text = '', color = 'primary', pill = false, elType = 'span', link = '' ) {
		let badge = document.createElement( elType );

		if ( 'a' === elType && link ) {
			badge.href = link;
		}

		badge.innerHTML = text;
		badge.className = 'badge badge-'+color;

		if ( pill ) {
			badge.classList.add( 'badge-pill' );
		}

		return badge;
	}
	static badgePill( text = '', color = 'primary', elType = 'span', link = '' ) {
		return Bootstrap.badge(text, color, true, elType, link);
	}

	// Breadcrumb

	static button( text = 'Click', elType = 'button', color = 'primary', link = '', size = '', block = false  ) {
		let button = document.createElement( elType );

		button.className = 'btn btn-'+color;

		// if ( type ) {
		//	button.type = type;
		// }
		button.type = 'button';
		if ( 'a' === elType && link ) {
			button.href = link;
			button.setAttribute( 'role', 'button' );
		}

		if ( size ) {
			button.classList.add( 'btn-'+size );
		}

		if ( block ) {
			button.classList.add( 'btn-block' );
		}

		button.innerHTML = text;

		return button;
	}


	/**
	 * GRID
	 */


	static container( type = 'div', classes = 'container' ) {
		let	el = document.createElement( type );
		el.className = classes;
		return el;
	}
	static row( classes = 'row', type = 'div' ) {
		let	el = document.createElement( type );
		el.className = classes;
		return el;
	}
	static col( classes = 'col', type = 'div' ){
		let el = document.createElement( type );
		el.className = classes;
		return el;
	}
	static cardDeck() {
		let el = document.createElement( 'div' );
		el.className = 'card-deck';
		return el;
	}
	/**
	 * Typography
	 */

	static heading( text = '', el = 'h2', extraClass = '' ) {
		let
			heading = document.createElement( el );

		heading.innerHTML = text;

		if ( extraClass ) {
			heading.className = extraClass;
		}

		return heading;
	}

	static heading2( text = '', el = 'h2', extraClass = '' ) {
		let
			heading = document.createElement( el ),
			headingText = document.createTextNode( text );

		heading.appendChild( headingText );

		if ( extraClass ) {
			heading.className = extraClass;
		}

		return heading;
	}





	static mediaObject( img, title, text, link = "" ) {

		let
			mediaObject	= (link) ? document.createElement('a') : document.createElement('div'),
			mediaImg 	= document.createElement('img'),
			mediaBody 	= document.createElement('div'),
			mediaHeader	= document.createElement('h5'),
			bodyText 	= document.createTextNode( text );


		if ( link ) {
			mediaObject.href = link;
		}

		mediaObject.classList.add( 'media' );
		mediaImg.classList.add( 'mr-3' );
		mediaBody.classList.add( 'media-body' );
		mediaHeader.classList.add( 'mt-0' );

		mediaImg.src = img;
		mediaHeader.innerHTML = title;

		mediaBody.appendChild( mediaHeader );
		mediaBody.appendChild( bodyText );

		mediaObject.appendChild( mediaImg );
		mediaObject.appendChild( mediaBody );

		return mediaObject;

	}



	static card ( title, imgSrc, text ) {

		let
			card 		= document.createElement('a'),
			cardBody 	= document.createElement('div'),
			cardTitle 	= document.createElement('h5'),
			bodyText 	= document.createTextNode( text );

		card.classList.add( 'card' );
		cardBody.classList.add( 'card-body' );
		cardTitle.classList.add( 'card-title' );

		cardTitle.innerHTML = title;

		cardBody.appendChild( cardTitle );
		cardBody.appendChild( bodyText );
		if(imgSrc) {
			let cardImg 	= document.createElement('img');
			cardImg.classList.add( 'card-img-top' );
			cardImg.src = imgSrc;
			card.appendChild( cardImg );
		}

		card.appendChild( cardBody );

		return card;

	}


	static cardLinked ( title, imgSrc, text, link ) {

		let
			card = Bootstrap.card( title, imgSrc, text );

		card.href = Router.makeHashFromLink( link );
		return card;

	}

	static listGroup( el = 'ul' ) {
		let lg = document.createElement( el );

		lg.className = 'list-group';
		return lg;
	}

	static listGroupItem( text, el = 'li' ) {
		let
			listGroupItem =  document.createElement( el ),
		//	itemText = document.createTextNode( text );
			itemText = document.createElement( 'div' );

		itemText.innerHTML=text;

		listGroupItem.className = 'list-group-item';
//		listGroupItem.innerHTML = text;
		listGroupItem.appendChild( itemText );

		return listGroupItem;
	}


	/**
	 * Forms
	 */

	static formGroup() {
		let fg = document.createElement( 'div' );

		fg.classList.add( 'form-group' );
		return fg;
	}

	static formLabel( id, text = 'Example' ) {
		let label = document.createElement( 'label' );

		label.for = id;
		label.innerHTML = text;

		return label;
	}

	static formCheck() {
		let fc = document.createElement( 'div' );

		fc.classList.add( 'form-check' );
		return fc;
	}
/*
	static formCustom( type = 'checkbox' ) {
		let formCustom = document.createElement( 'div' )
	}
*/
	static formInput( id, inputType = 'text', placeholder = '', extraClass = '' ) {
		let
		input = document.createElement( 'input' );

		input.type = inputType;

		if ( placeholder ) {
			input.setAttribute( 'placeholder', placeholder );
		}

		input.id = id;
		input.type = inputType;
		input.className = 'form-control' + extraClass;

		return input;

	}

	static formTextArea( id ) {
		let textarea = document.createElement( 'textarea' );

		textarea.id = id;
		textarea.className = 'form-control';
		return textarea;
	}

	static formSingleCustomCheckbox( id, labelText = 'Check this box', checked = false ) {
		let
			checkboxWrap = document.createElement( 'div' ),
			checkboxInput = document.createElement( 'input' ),
			checkboxLabel = document.createElement( 'label' ),
			checkboxLabelText = document.createTextNode( labelText );

		checkboxWrap.classList.add( 'custom-control', 'custom-checkbox' );
		checkboxLabel.classList.add( 'custom-control-label' );
		checkboxLabel.setAttribute( 'for', id );
		checkboxInput.classList.add( 'custom-control-input' );
		checkboxInput.setAttribute( 'type', 'checkbox' );
		checkboxInput.id = id;

		if ( checked ) {
			checkboxInput.setAttribute( 'checked', 'checked' );
		}

		checkboxLabel.appendChild(checkboxLabelText);
		checkboxWrap.appendChild(checkboxInput);
		checkboxWrap.appendChild(checkboxLabel);

		return checkboxWrap;
	}

	static formCustomRadioGroup( group ) {
		let
			wrap = document.createElement('div'),
			name = group.name,
			length = group.options.length,
			radios = group.options,
			i = 0;

		wrap.setAttribute( 'id', group.id );
		wrap.classList.add( 'form-group' );

        for (i; i < length; i++) {
			let
				radio = radios[i];

			wrap.appendChild( Bootstrap.radio( radio.label, radio.id, radio.value, name, radio.checked ) );
        }

        return wrap;

	}


	static radio( labelText, id, value, name, checked = false ) {
		let
			input = document.createElement( 'input' ),
			label = document.createElement( 'label' ),
			div = document.createElement( 'div' );

		div.classList.add( 'custom-control', 'custom-radio' );
		input.classList.add( 'custom-control-input' );
		input.setAttribute( 'name', name );
		input.setAttribute( 'type', 'radio' );
		input.setAttribute( 'value', value );
		input.id = id;

		label.classList.add( 'custom-control-label' );
		label.setAttribute( 'for', id );
		if ( checked ) {
			input.setAttribute( 'checked', 'checked' );
		}
		label.appendChild( document.createTextNode( labelText ) );
		div.appendChild( input );
		div.appendChild( label );
		return div;
	}

	static jumbotron( theTitleText, theLeadText, inContainer = true, titleSize = 'display-4' ) {
		let
			jumbotron = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText );

		jumbotron.classList.add( 'jumbotron' );
		titleEl.classList.add( titleSize );

		titleEl.appendChild( titleText );
		jumbotron.appendChild( titleEl );

		if ( theLeadText ) {
			leadEl.classList.add( 'lead' );
			leadEl.appendChild( leadText );
			jumbotron.appendChild( leadEl );
		}

		if ( inContainer ) {
			let	container = document.createElement( 'section' );
			container.classList.add( 'container' );
			container.appendChild( jumbotron );
			return container;
		}

		return jumbotron;
	}


	static jumbotronFluid( theTitleText, theLeadText, titleSize = 'display-4' ) {
		let
			jumbotron = document.createElement( 'section' ),
			innerContainer = document.createElement( 'div' ),
			titleEl = document.createElement( 'h1' ),
			leadEl = document.createElement( 'p' ),
			titleText = document.createTextNode( theTitleText ),
			leadText = document.createTextNode( theLeadText );

		jumbotron.classList.add( 'jumbotron' );
		jumbotron.classList.add( 'jumbotron-fluid' );
		titleEl.classList.add( titleSize );
		innerContainer.classList.add( 'container' );

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


	static jumbotronCTA( theTitleText, theLeadText, titleSize = 'display-4' ) {
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



	/**
	 * 2. BASIC PAGE ELEMENTS
	 * Bootstrap components put to use for common scenarios.
	 */

	static jumbotronCTA1( theTitleText, theLeadText, titleSize = 'display-4' ) {
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


	static jumbotronCTA2( theTitleText, theLeadText, titleSize = 'display-4' ) {
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

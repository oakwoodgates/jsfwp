import config from './config';
import Components from './Components';

export default class Helpers {


	static doHeader( title = '', theLeadText ) {
		let
			header = document.getElementById( 'app-header' ),
			section = document.getElementById( 'page-header' );

		if ( section ) {
			let titleEl = header.getElementsByTagName( 'h1' );
			titleEl[0].innerHTML = title;
		} else {
			let section = Components.jumbotronHeader01( title );
			section.id = "page-header";
			header.appendChild( section );
		}
		if ( section ) {
			let container = section.getElementsByClassName('container')[0];
			let containerP = container.getElementsByTagName('p')[0];
			let containerHr = container.getElementsByTagName('hr')[0];
			if(containerP !== undefined ){
				container.removeChild(containerP);
			}
			if(containerHr !== undefined){
				container.removeChild(containerHr);
			}
			if ( theLeadText ) {
				let leadEl = document.createElement('p');
				container.appendChild( document.createElement( 'hr' ) );
				leadEl.classList.add( 'lead' );
				leadEl.innerHTML = theLeadText;
				container.appendChild( leadEl );
			}
		}
	}

	static fade(el) {
		el.style.height = (el.scrollHeight)?el.scrollHeight+'px':'200px';
		el.classList.add('fade-content');

		el.classList.remove('show-content');

		setTimeout(function(){ }, 0);
		el.innerHTML = '';

	}

	static unfade(el) {
		el.classList.remove('fade-content');
		el.style.height = '';
		el.classList.add('show-content');
	}

	static listHandler(){
		Helpers.closeAllLists();
	}

	static closeAllLists() {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		let x = document.getElementsByClassName("autocomplete-items");
//		console.log("before");
//		console.log(x);
		let i = 0;
//			console.log('length'+ x.length);
		let a1 = x.length;
		for (i; i < a1; i++) {
//			console.log('i: '+i);
//			console.log('a1: '+a1);
//			console.log('x.l: '+x.length);
//			console.log(x[i]);

			//	if (elmnt != x[i] && elmnt != inp) {
					x[0].outerHTML = '';
			//		x[i].parentNode.removeChild(x[i]);
			//		x[i].remove();
			//		console.log('ran');
			//		console.log(x[i]);
			//	}
		}
//			console.log('after');
//			console.log(x);
	}

	/**
	 * GRID
	 */


	static container( type = 'section' ) {
		let	el = document.createElement( type );
		el.classList.add( 'container' );
		return el;
	}
	static row( type = 'div' ) {
		let	el = document.createElement( type );
		el.className = 'row';
		return el;
	}
	static col( type = 'div', classes = 'col' ){
		let el = document.createElement( type );
		el.className = classes;
		return el;
	}

	static formGroup() {
		let fg = document.createElement( 'div' );

		fg.classList.add( 'form-group' );
		return fg;
	}

	static formSingleCustomCheckbox( id, checked = false ) {
		let
			checkboxWrap = document.createElement( 'div' ),
			checkboxInput = document.createElement( 'input' ),
			checkboxLabel = document.createElement( 'label' ),
			checkboxLabelText = document.createTextNode( 'Check this box (or don\'t)' );

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

			wrap.appendChild( Helpers.radio( radio.label, radio.id, radio.value, name, radio.checked ) );
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


	static jumbotronFluid( theTitleText, theLeadText, titleSize = 'display-3' ) {
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
		jumbotron.classList.add( 'mb-0' );
		titleEl.classList.add( titleSize );
		button.classList.add( 'btn', 'btn-primary', 'btn-lg' );
		container.classList.add( 'container' );
		row.classList.add( 'row', 'align-items-center' );
		col1.classList.add( 'col-sm-8' );
		col2.className =  'col-sm-4 order-sm-2';
		button.href = '#';
		img.src = 'https://www.biddytarot.com/wp-content/uploads/2017/07/Free-Optin-preview-7-Steps-to-Read-Tarot-for-Yourself.jpg';
		img.className = 'img-fluid';

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
			fg = Helpers.formGroup(),
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
	static inputUsername( showLabel = false, id = 'inputEmail', labelText = 'Username' ) {
		let
			fg = Helpers.formGroup(),
			input = document.createElement( 'input' ),
			label = document.createElement( 'label' ),
			labelTextEl = document.createTextNode( labelText );


		input.className = 'form-control';
		input.setAttribute( 'type', 'text' );
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
			fg = Helpers.formGroup(),
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
		button.onclick = function(e) {
			console.log('here');
	//		console.log(pass.value);
			console.log(e);
			config.btc2('email', 'pass').users().me()
			.then( u => {
				console.log('me:');
				console.log(u);
				return true;
			} )
			.catch( err => {
				console.log( 'me err' );
				console.log( err );
				return false;
			} );
		};

		button.appendChild( buttonTextEl );

		return button;

	}

}

import config from '../../lib/config';
import Helpers from '../../lib/Helpers';
// import Components from '../../lib/Components';



export default class Settings {

	static template() {
		Helpers.doHeader( 'Settings' );

		let container = document.createElement( 'div' ),
	//		title = Components.jumbotronHeader01( 'Settings' ),
			form = Settings.form();

	//	config.siteMain.appendChild( title );
		container.classList.add('container');
		container.appendChild( form );
		return container;
	//	config.siteMain.appendChild( container );
	//	Settings.process();

	}

	static form() {

		let
			form = document.createElement( 'form' ),
			fieldset = document.createElement( 'fieldset' ),
			legend = document.createElement( 'legend' ),
			legendText = document.createTextNode( 'App Settings' ),
			userSettings = localStorage.getItem( 'userSettings' ),
			radioData = { 'id': 'cardStyle' };


		if ( ! userSettings ){
			userSettings = {
				signupCheck: 0,
				cardStyle: 'v3'
			};
			localStorage.setItem( 'userSettings', JSON.stringify( userSettings ) );
		} else {
			userSettings = JSON.parse( userSettings );
		}

		radioData.name = 'cardStyle';
		radioData.options = [];
		radioData.options[0] = {
			label: 'Everyday Tarot',
			id: 'radioV3',
			value: 'v3',
			checked: ( 'v3' === userSettings.cardStyle ) ? true : false
		};
		radioData.options[1] = {
			label: 'Rider Waite',
			id: 'radioV2',
			value: 'v2',
			checked: ( 'v2' === userSettings.cardStyle ) ? true : false
		};

		let
		//	signup = Helpers.formSingleCustomCheckbox( 'signupCheck', userSettings.signupCheck ),
			radios = Helpers.formCustomRadioGroup( radioData ),
			radioTitle = document.createElement( 'div' );


		radioTitle.className = 'my-2 h6 text-uppercase';
		legend.classList.add( 'text-uppercase' );
		form.className = 'col-md-6 col-lg-4 border px-4 py-4 mx-auto';
		radioTitle.innerHTML = "Choose deck to use:";
		radios.prepend( radioTitle );
		legend.appendChild( legendText );
		fieldset.appendChild( legend );
		fieldset.appendChild( radios );
//		fieldset.appendChild( signup );

		form.appendChild( fieldset );

		return form;
	}


	static process() {
		var
	//	signupCheck = document.getElementById( 'signupCheck' ),
		radioCheck = document.getElementsByName( 'cardStyle' ),
		userSettings = JSON.parse( localStorage.getItem( 'userSettings' ) ),
		length = radioCheck.length;

		for ( let i=0; i < length; i++ ) {
			// console.log(i);
			radioCheck[i].onclick = function() {
			//	console.log(radioCheck[i]);
			//	console.log(radioCheck);
			//	console.log(this.value);
				userSettings.cardStyle = this.value;
				config.cardStyle = this.value;
				localStorage.setItem( 'userSettings', JSON.stringify( userSettings ) );

			};
		}
//		function processSignupCheck(  ) {
//			userSettings.signupCheck = ( signupCheck.checked ) ? 1 : 0;
//			localStorage.setItem( 'userSettings', JSON.stringify( userSettings ) );
//		}

//		signupCheck.addEventListener( 'click', processSignupCheck, false );
	}

}

import config from '../../lib/config';
import Helpers from '../../lib/Helpers';
import Router from '../../lib/Router';


export default class Login {

	static template() {
		Helpers.doHeader('Login');

		let header = document.getElementById( 'page-header' ),
			container = Helpers.container(),
			row = Helpers.row(),
			col = Helpers.col( 'div', 'col col-sm-9 col-md-6 col-lg-4' ),
			form = Login.form();

		header.outerHTML = '';
		row.classList.add( 'justify-content-center', 'align-items-center', 'h-100'  );
		container.classList.add( 'text-center', 'vh-100' );

		col.appendChild( form );
		row.appendChild( col );
		container.appendChild( row );

		return container;

	}


	static form() {

		let
			form = document.createElement( 'form' ),
			fieldset = document.createElement( 'fieldset' ),
			legend = document.createElement( 'legend' ),
			legendText = document.createTextNode( 'LOG IN' ),
			legendText1 = document.createElement('div'),
			alertDiv = document.createElement('div'),
			email = Helpers.inputUsername(),
			pass = Helpers.inputLoginPassword(),
			btn = Login.button( 'Sign in', email, pass );

		alertDiv.id = 'alert-div';
		legend.className = 'mb-3';
//		legendText1.innerHTML='<small>username: <i>biddyauthor</i><br/>password: <i>tarot345</i></small>';
		legendText1.innerHTML='Contact Reuben for a login';
		legend.appendChild( legendText );
		legend.appendChild( legendText1 );
		fieldset.appendChild( legend );
		fieldset.appendChild( alertDiv );
		fieldset.appendChild( email );
		fieldset.appendChild( pass );
		fieldset.appendChild( btn );

		form.appendChild( fieldset );
		return form;
	}

	static button() {
		let
			button = document.createElement( 'button' ),
			buttonTextEl = document.createTextNode( 'Sign In' );

		button.className = 'btn btn-lg btn-primary btn-block';
		button.type = 'submit';
		button.id = 'login';
		button.onclick = function(e) {
			e.preventDefault();
			let email = document.getElementById('inputEmail');
			let pass = document.getElementById('inputPassword');
			let alertDiv = document.getElementById('alert-div');
			let creds = JSON.parse( localStorage.getItem( 'creds' ) );

			// remove so it will shake again
			alertDiv.classList.remove('shake');

			config.sg(email.value, pass.value).users().me()
				.then( u => {
					alertDiv.innerHTML = '<div class="alert alert-success" role="alert">UNLOCKED!</div>';
					creds.password = pass.value;
					creds.login = email.value;
					creds.name = u.name;
					creds.slug = u.slug;
					creds.id = u.id;
					config.username = u.slug;
					config.password = pass.value;
					config.userID = u.id;
					localStorage.setItem( 'creds', JSON.stringify( creds ) );

					return true;
			} )
			.then( ()=>{
				Router.load();
				return true;
			})
			.catch( err => {
				if(alertDiv.innerHTML) {
					alertDiv.classList.add('shake');
				} else {
					alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">Login Failed! Try again...</div>';
				}
			//	console.log(err);
				return false;
			} );
		};
		button.appendChild( buttonTextEl );

		return button;

	}

}

import Bootstrap from '../../lib/Bootstrap';
import Components from '../../lib/Components';
import Helpers from '../../lib/Helpers';



export default class Styleguide {

	static template() {
		let frag = document.createDocumentFragment();
	//	title = Components.jumbotronHeader01( 'Styleguide' );
		Helpers.doHeader( 'Styleguide', 'Reusable Bootstrap components, color palette, and theme skin (in progress)' );
	//	config.siteMain.appendChild( title );
		frag.appendChild( Styleguide.alertsContainer() );
		frag.appendChild( document.createElement( 'hr' ) );
		frag.appendChild( Styleguide.badgeContainer() );
		frag.appendChild( document.createElement( 'hr' ) );
		frag.appendChild( Styleguide.buttonsContainer() );
		frag.appendChild( document.createElement( 'hr' ) );
		frag.appendChild( Styleguide.cardContainer() );
		frag.appendChild( document.createElement( 'hr' ) );
		frag.appendChild( Styleguide.formsContainer() );
		frag.appendChild( document.createElement( 'hr' ) );

		// config.siteMain.appendChild( frag );
		return frag;
	}

	static containerTitle( text ) {
		return Bootstrap.heading( text );
	}

	static alertsContainer() {
		let container = Bootstrap.container(),
			frag = document.createDocumentFragment(),
			alert = Bootstrap.alert( '<b>Winner</b> winner chicken dinner' ),
			alertDanger = Bootstrap.alert( 'Better check yourself before you wreck yourself!', 'danger', true );

		frag.appendChild( alert );
		frag.appendChild( alertDanger );
		container.appendChild( frag );

		return container;
	}


	static badgeContainer() {
		let container = Bootstrap.container(),
			frag = document.createDocumentFragment(),
			badge = Bootstrap.badge( '9' ),
			badge2 = Bootstrap.badge( 'chicken', 'secondary', true, 'a', 'javascript:void(0)' );

		frag.appendChild( badge );
		frag.appendChild( badge2 );
		container.appendChild( frag );

		return container;
	}

	static buttonsContainer() {
		let container = Bootstrap.container(),
			frag = document.createDocumentFragment(),
			button  = Bootstrap.button( 'Primary' ),
			button2 = Bootstrap.button( 'Secondary', 'a', 'secondary', 'javascript:void(0)' ),
			button3 = Bootstrap.button( 'Success', 'a', 'success', 'javascript:void(0)' ),
			button4 = Bootstrap.button( 'Danger', 'a', 'danger', 'javascript:void(0)' ),
			button5 = Bootstrap.button( 'Warning', 'a', 'warning', 'javascript:void(0)' ),
			button6 = Bootstrap.button( 'Info', 'a', 'info', 'javascript:void(0)' ),
			button7 = Bootstrap.button( 'Light', 'a', 'light', 'javascript:void(0)' ),
			button8 = Bootstrap.button( 'Dark', 'a', 'dark', 'javascript:void(0)' ),
			button9 = Bootstrap.button( 'Link', 'a', 'link', 'javascript:void(0)' );

		button.classList.add('mb-2');
		button2.classList.add('mb-2');
		button3.classList.add('mb-2');
		button4.classList.add('mb-2');
		button5.classList.add('mb-2');
		button6.classList.add('mb-2');
		button7.classList.add('mb-2');
		button8.classList.add('mb-2');
		button9.classList.add('mb-2');

		frag.appendChild( Styleguide.containerTitle( 'Buttons' ) );
		frag.appendChild( button );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button2 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button3 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button6 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button5 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button4 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button7 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button8 );
		frag.appendChild( document.createTextNode( ' ' ) );
		frag.appendChild( button9 );
		container.appendChild( frag );

		return container;
	}

	static cardContainer() {
		let container = Bootstrap.container(),
			row1 = Styleguide.cardRow(),
			frag = document.createDocumentFragment();

		frag.appendChild( Styleguide.containerTitle( 'Cards' ) );
		frag.appendChild( row1 );
		container.appendChild( frag );

		return container;
	}

	static cardRow() {
		let row = Bootstrap.row(),
			col1 = Bootstrap.col( 'col-md-4' ),
			col2 = Bootstrap.col( 'col-md-4' ),
			col3 = Bootstrap.col( 'col-md-4' ),
			rowFrag = document.createDocumentFragment(),
			card1 = Components.cardStyle01( 'Card', 'Here is some basic text to kick this thing off!' ),
			card2 = Components.cardStyle01( 'Card', 'Here is some basic text to kick this thing off!' ),
			card3 = Components.cardStyle01( 'Card', 'Here is some basic text to kick this thing off!' );

		col1.innerHTML = card1.outerHTML;
		col2.innerHTML = card2.outerHTML;
		col3.innerHTML = card3.outerHTML;
		rowFrag.appendChild( col1 );
		rowFrag.appendChild( col2 );
		rowFrag.appendChild( col3 );

		row.appendChild( rowFrag );

		return row;
	}


	static formsContainer() {
		let container = Bootstrap.container(),
		inlineSignupForm1 = Components.inlineSignupForm01(),
		inlineSignupForm2 = Components.inlineSignupForm01( 'The Awesome Updates' ),
		demoForm = document.createElement( 'form' ),
		checkbox = Bootstrap.formSingleCustomCheckbox( 'signupCheck', 'Checkbox' ),
		radioData = { 'id': 'testRadio' },
		inputDefault = Bootstrap.formInput( 'inputDefault', 'text', 'Placeholder text' ),
		frag = document.createDocumentFragment();


		radioData.name = 'testRadio';
		radioData.options = [];
		radioData.options[0] = {
			label: 'Radio One',
			id: 'radioOne',
			value: 'radioOneValue',
			checked: true
		};
		radioData.options[1] = {
			label: 'Radio Two',
			id: 'radioTwo',
			value: 'radioTwoValue',
			checked: false
		};
		let
		radios = Bootstrap.formCustomRadioGroup( radioData );

		frag.appendChild( Styleguide.containerTitle( 'Forms' ) );
		frag.appendChild( inlineSignupForm1 );
		frag.appendChild( document.createElement( 'br' ) );
		frag.appendChild( inlineSignupForm2 );
		frag.appendChild( document.createElement( 'br' ) );
		demoForm.appendChild( checkbox );
		demoForm.appendChild( radios );
		demoForm.appendChild( inputDefault );
		frag.appendChild( demoForm );
		container.appendChild( frag );

		return container;
	}

	static autocomplete(inp, arr) {
		/* the autocomplete function takes two arguments,
		 * the text field element and an array of possible autocompleted values:*/
		var currentFocus;
		/*execute a function when someone writes in the text field:*/
		inp.addEventListener("input", function(e) {
			var a, b, i, val = this.value;
			/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) { return false;}
			currentFocus = -1;
			/*create a DIV element that will contain the items (values):*/
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");
			/*append the DIV element as a child of the autocomplete container:*/
			this.parentNode.appendChild(a);
			/*for each item in the array...*/
			for (i = 0; i < arr.length; i++) {
				/*check if the item starts with the same letters as the text field value:*/
				if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
					/*create a DIV element for each matching element:*/
					b = document.createElement("DIV");
					/*make the matching letters bold:*/
					b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
					b.innerHTML += arr[i].substr(val.length);
					/*insert a input field that will hold the current array item's value:*/
					b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
					/*execute a function when someone clicks on the item value (DIV element):*/
					b.addEventListener("click", function(e) {
						/*insert the value for the autocomplete text field:*/
						inp.value = this.getElementsByTagName("input")[0].value;
						/*close the list of autocompleted values,
						(or any other open lists of autocompleted values:*/
						closeAllLists();
					});
					a.appendChild(b);
				}
			}
		});
		/*execute a function presses a key on the keyboard:*/
		inp.addEventListener("keydown", function(e) {
			var x = document.getElementById(this.id + "autocomplete-list");
			if (x) x = x.getElementsByTagName("div");
			if (e.keyCode == 40) {
				/*If the arrow DOWN key is pressed,
				increase the currentFocus variable:*/
				currentFocus++;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 38) { //up
				/*If the arrow UP key is pressed,
				decrease the currentFocus variable:*/
				currentFocus--;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 13) {
				/*If the ENTER key is pressed, prevent the form from being submitted,*/
				e.preventDefault();
				if (currentFocus > -1) {
					/*and simulate a click on the "active" item:*/
					if (x) x[currentFocus].click();
				}
			}
		});
		function addActive(x) {
			/*a function to classify an item as "active":*/
			if (!x) return false;
			/*start by removing the "active" class on all items:*/
			removeActive(x);
			if (currentFocus >= x.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = (x.length - 1);
			/*add class "autocomplete-active":*/
			x[currentFocus].classList.add("autocomplete-active");
		}
		function removeActive(x) {
			/*a function to remove the "active" class from all autocomplete items:*/
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove("autocomplete-active");
			}
		}
		function closeAllLists(elmnt) {
			/*close all autocomplete lists in the document,
			except the one passed as an argument:*/
			var x = document.getElementsByClassName("autocomplete-items");
			for (var i = 0; i < x.length; i++) {
				if (elmnt != x[i] && elmnt != inp) {
					x[i].parentNode.removeChild(x[i]);
				}
			}
		}
		/*execute a function when someone clicks in the document:*/
		document.addEventListener("click", function (e) {
			closeAllLists(e.target);
		});
	}


}

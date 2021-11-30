import config from '../../lib/config';
import Router from '../../lib/Router';
import Helpers from '../../lib/Helpers';
//import Components from '../../lib/Components';
import Bootstrap from '../../lib/Bootstrap';

export default class ArchiveTCM {

	/**
	 * render - Display archive list of card_groups
	 *
	 */
	static render() {
		Helpers.doHeader( 'Tarot Card Meanings' );
		config.wp.card_groups = config.wp.registerRoute( 'wp/v2', '/card_groups/(?P<slug>)' );

		let container = Bootstrap.container(),
				row = Bootstrap.row(),
				col1 = Bootstrap.col( 'col-md-6 mb-4 text-center' ),
				col2 = Bootstrap.col( 'col-md-6 mb-4' ),
				col1Title = document.createElement('h3'),
		//	searchContainer = Bootstrap.container(),
			x = config.wp.card_groups()
				.embed()
				.then( card_groups => {
					let	searchInput = ArchiveTCM.searchInput();
		//			searchContainer.appendChild( searchInput );
					col2.appendChild( searchInput );
					col1Title.innerHTML = 'View by Suit';
					col1Title.className = 'w-100 text-center mx-auto mb-3';
					col1.appendChild(col1Title);
					card_groups.map( content => {
						col1.appendChild( ArchiveTCM.template( content ) );
					} );
					row.appendChild(col1);
					row.appendChild(col2);
					container.appendChild(row);
					return container;
				} )
				.catch( err => {
				//	console.log( `Error: ${err}` );
					console.log( err );
				} );

		return x;
	}

	static template( content ) {

		let
			articleEl 	= document.createElement( 'article' ),
			titleEl 	= document.createElement( 'h2' ),
			titleLinkEl	= document.createElement( 'a' ),
			theTitle = ( content.name ) ? content.name : content.title.rendered;

		titleLinkEl.innerHTML = theTitle;
		titleLinkEl.href = Router.makeHashFromLink( content );
		titleEl.appendChild( titleLinkEl );

		articleEl.appendChild( titleEl );

		return articleEl;
	}

	static searchInput( title = 'Search by Name', buttonText = 'Go' ){
		let
			searchForm = document.createElement( 'form' ),
			titleEl = document.createElement( 'h3' ),
			titleText = document.createTextNode( title ),
			formGroup = document.createElement( 'div' ),
			formInput = document.createElement( 'input' ),
			button = document.createElement( 'button' ),
			buttonWrap = document.createElement( 'div' ),
			buttonTextNode = document.createTextNode( buttonText );

		button.appendChild( buttonTextNode );

		searchForm.classList.add( 'form-inline', 'justify-content-center' );
		formGroup.classList.add( 'input-group' );
		formInput.classList.add( 'form-control', 'form-control-sm' );
		button.classList.add( 'btn', 'btn-primary' );

		button.onsubmit = function(e) {
	//		e.preventDefault();
			if ( !formInput.dataset.slug ) {
				console.log('submit');
			}
		};

		buttonWrap.appendChild( button );
		buttonWrap.className = 'input-group-append';
		titleEl.className = 'w-100 text-center mx-auto mb-3';
		titleEl.appendChild( titleText );

		formInput.setAttribute( 'type', 'text' );
		formInput.setAttribute( 'placeholder', 'Search...' );
		formGroup.appendChild( formInput );
		formGroup.appendChild( buttonWrap );

		ArchiveTCM.searchCards( formInput );

		searchForm.appendChild( titleEl );
		searchForm.appendChild( formGroup );
		return searchForm;
	}



	static processSearch( e ){
		console.log('processSearch');
		console.log(e);
	}

	static searchCards( inp ) {
		let currentFocus;
		var pause = false;
	//	inp.addEventListener( 'input', function(e) {

		inp.onblur = function() {
	//		closeAllLists();

			window.setTimeout(function(){
//				closeAllLists();
				console.log('unpause');
			}, 300);

		};
		inp.oninput = function(e) {
			/*close any already open lists of autocompleted values*/
	//		closeAllLists();

			let i, val = this.value;
			if (!val) { return false;}

			if ( pause ) {
				return;
			} else {
				pause = true;
					currentFocus = -1;

					let d = document.getElementById("autocomplete-list");

					if( d === null ){
						/*create a DIV element that will contain the items (values):*/
						d = document.createElement("div");
						d.setAttribute("id", this.id + "autocomplete-list");
						d.className =  "autocomplete-items dropdown-menu show w-100";
					}

					/*append the DIV element as a child of the autocomplete container:*/
					config.wp.cards = config.wp.registerRoute( 'wp/v2', '/cards/(?P<slug>)' );
					config.wp.cards()
						.search( val )
						.order( 'asc' )
						.orderby( 'title' )
						.perPage( 6 )
						.then( p => {
							d.innerHTML='';
							this.parentNode.appendChild(d);

							/*for each item in the array...*/
							for (i = 0; i < p.length; i++) {
								let x = p[i], y = x.title.rendered;
								/*create a DIV element for each matching element:*/
								let b = document.createElement("div");
								/*make the matching letters bold:*/
								b.className = 'dropdown-item';
								let img = '<img src="https://cardapp.howfluid.com/wp-content/uploads/cards/'+config.cardStyle+'/'+x.acf.tcm_img_name+'.jpg" width="40" class="mr-2" />';
								b.innerHTML = img+y;
								/*insert a input field that will hold the current array item's value:*/
								b.innerHTML += "<input type='hidden' value='" + y + "' data-id='"+x.id+"' data-slug='"+x.slug+"'>";

								/*execute a function when someone clicks on the item value (DIV element):*/
								b.onclick = function() {
									let hidden = this.getElementsByTagName("input")[0];
									/*insert the value for the autocomplete text field:*/
									inp.value = hidden.value;
									inp.dataset.id = hidden.dataset.id;
									inp.dataset.slug = hidden.dataset.slug;
								//	if (history.pushState) {
								//		window.history.pushState( '', "Blog", '#/card/'+hidden.dataset.slug );
								//	} else {
										document.location.href = '#/card/'+hidden.dataset.slug;
								//	}
									/*close the list of autocompleted values,
									(or any other open lists of autocompleted values:*/
							//		closeAllLists();
								};
								d.appendChild(b);
								pause = false;
							}
						} )
						.catch( err => {
							console.log( err );
						} );
					// just in case it gets stuck in pause, force timed unpause
					window.setTimeout(function(){
						pause = false;
					}, 1500);
			}

		};
		/*execute a function presses a key on the keyboard:*/
		inp.onkeydown = function(e) {
			let x = document.getElementById("autocomplete-list");
			if (x) x = x.getElementsByTagName("div");
		//	let x = document.getElementsByClassName("autocomplete-items");
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

				} else {

					let y = x[0].getElementsByTagName("input")[0];
					this.value = y.value;
					this.dataset.id = y.dataset.id;
					this.dataset.slug = y.dataset.slug;
					document.location.href = '#/card/'+y.dataset.slug;

				}
			} else {
		//		closeAllLists();
			}
		};
		function addActive(x) {
			/*a function to classify an item as "active":*/
			if (!x) return false;
			/*start by removing the "active" class on all items:*/
			removeActive(x);
			if (currentFocus >= x.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = (x.length - 1);
			/*add class "autocomplete-active":*/
			x[currentFocus].classList.add("active");
		}
		function removeActive(x) {
			/*a function to remove the "active" class from all autocomplete items:*/
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove("active");
			}
		}
	}

}

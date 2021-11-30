import config from './config';
import Helpers from './Helpers';
import Components from './Components';
import Page from '../components/Page/Index';
import Archive from '../components/Archive/Index';
import Single from '../components/Single/Index';
import ArchiveTCM from '../components/Archive/TCM';
import CardGroup from '../components/Taxonomy/CardGroup';
import Card from '../components/Single/Card';
import Settings from '../components/Page/Settings';
import Login from '../components/Page/Login';
import Styleguide from '../components/Page/Styleguide';
import Podcasts from '../components/Archive/Podcasts';
import Podcast from '../components/Single/Podcast';
import Dashboard from '../components/Page/Dashboard';
import Spread from '../components/Page/Spread';
import bsn from '../vendor/bootstrap.native/dist/bootstrap-native-v4';
import WPAPI from 'wpapi';
// import Helpers from './Helpers';

export default class Router {

	/**
	 * init - Initializes the Router
	 *
	 * @returns {void} Not meant to return
	 */
	static init() {
	//	Helpers.clearPage();
		Router.load();
		Router.listenPageChange();
	}
	/**
	 * Listener function for URL changes
	 *
	 * @return {void} Not meant to return
	 */
	static listenPageChange() {
		window.addEventListener( 'hashchange', Router.load, false );
	}

	static load() {
		Router.maybeCloseMenu();
		let el = config.siteMain,
			slug = Router.getSlug() || 'home',
			xlug = slug.split( '/' );

		switch (xlug[1]) {
			case 'dashboard':
			case 'login':

				if(false === config.loggedIn) {
					Router.maybeLogin()
						.then( x => {
							if ( x === true ) {
								xlug[1] = 'dashboard';
								Router.loadPage( el, slug, xlug );
							} else {
								xlug[1] = 'login';
								Router.loadPage( el, slug, xlug );
							}
						})
						.then(()=>{
						});
				} else {
					Router.loadPage( el, slug, xlug );
				}
				break;
			default:
				Router.loadPage( el, slug, xlug );
		}

	}

	static maybeLogin( el, slug, xlug ) {
		let creds = localStorage.getItem( 'creds' ),
		username = '', password = '';

		if ( ! creds ){
			creds = {
				token: '',
				name: '',
				email: '',
				password: '',
				id: '',
				slug: '',
				auth: ''
			};
			localStorage.setItem( 'creds', JSON.stringify( creds ) );
		} else {
			creds = JSON.parse( creds );
		}
		if ( '' === username) {
			username = (creds.slug)?creds.slug:'';
			username = (username)?username:config.username;
			config.username = username;
		}
		if ( '' === password) {
			password = (creds.password)?creds.password:'';
			password = (password)?password:config.password;
			config.password = password;
		}

//		let x = Router.canBTC2( username, password );
		config.sg1 = new WPAPI( {
				username: config.username,
				password: config.password,
				endpoint: config.apiRootSG,
			} );

		let x = config.sg1.users().me()
			.then( u => {
				config.loggedIn = true;
				return true;
			} )
			.catch( err => {
				return false;
			} );
		return x;

	}

	static canBTC2( us = '', ps = '' ) {

//		let x = config.sg(us, ps).users().me()
		let x = config.sg1.users().me()
			.then( u => {
				return true;
			} )
			.catch( err => {
				return false;
			} );
		return x;
	}

	static loadPage( el, slug, xlug ) {
		var promise1 = new Promise(function(resolve) {
			Helpers.fade(el);
			let c = false;
			if ( '/' == slug ) slug = 'home';
			switch ( xlug[1] ) {
				case 'blog':
					if ( 'post' === xlug[2] ) {
						c = Single.render( xlug[3] );
					} else {
						c = Archive.render( xlug[2] );
					}
					break;
				case 'library':
					c = ArchiveTCM.render();
					break;
				case 'card_groups':
					c = CardGroup.render( xlug );
					break;
				case 'card':
					c = Card.render( xlug[2] );
					break;
				case 'post':
					c = Single.render( xlug[2] );
					break;
				case 'podcast':
					c = Podcast.render( xlug[2] );
					break;
				case 'podcasts':
					c = Podcasts.render();
					break;
				case 'card-app':
					c = Spread.render();
					break;
				case 'settings':
					c = Settings.template();
					break;
				case 'dashboard':
					c = Dashboard.render();
					break;
				case 'login':
					c = Login.template();
					break;
				case 'styleguide':
					c = Styleguide.template();
					break;
				default:
					c = Page.render( slug );
			}
			(function smoothscroll(){
				var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
				if (currentScroll > 0) {
					window.requestAnimationFrame(smoothscroll);
					window.scrollTo (0,currentScroll - (currentScroll/5));
				}
			})();
			resolve(c);
		});
		promise1.then(function(value) {
			return value;
		}).then(function(value){
			el.appendChild(value);
		}).then(function(){
			Helpers.unfade(el);

			if ( 'settings' === xlug[1] ) {
				Settings.process();
			} else if ( 'card' === xlug[1]) {
				el.appendChild( Card.form( Card.vars.id, Card.vars.title ) );
			} else if ( 'login' === xlug[1] ) {
			//	Login.process();
			} else if ( 'dashboard' === xlug[1] ) {
				Router.loadDashboard();
			}

			Router.swapFooterAd();
			Router.swapCallOut();
		});
	}

	static swapCallOut() {

		let
			adWrap = config.siteCallout;

		config.wp.ads = config.wp.registerRoute( 'wp/v2', '/ads/(?P<slug>)' );

		config.wp.ads()
			.then( ads => {
				let shuffledAds = Router.shuffle(ads),
						ad = shuffledAds[0];

				Helpers.fade(adWrap);
				let adContainer = Components.jumbotronCTA04(
										ad.acf.ad_title,
										ad.acf.lead_text,
										ad.acf.vertical_image.url,
										ad.acf.additional_text
								);
				if ( 2440 === ad.id ) {
					adContainer.classList.add( 'bg-dark', 'text-white' );
					let adTitle = adContainer.getElementsByTagName( 'h1' )[0];
					let adButton = adContainer.getElementsByTagName( 'a' )[0];
					adTitle.classList.add( 'text-warning' );
					adButton.classList.add( 'btn-primary' );
					adButton.classList.remove( 'btn-success' );
				} else if ( 2452 === ad.id ) {
					adContainer.classList.add( 'bg-primary', 'text-white' );
				}
				config.siteCallout.appendChild(adContainer);

			} ).then( () => {
				Helpers.unfade(adWrap);
			}	);


	}
	/**
	 * Gets the slug from the URL
	 *
	 * @return {string} slug Slug from URL
	 */
	static getSlug() {

		let slug = window.location.hash;

		if ( "" === slug ) {
			return null;
		} else {
			return slug.substr( 1 );
		}

	}

	static swapFooterAd() {
		let ad = document.getElementById( 'footer-ad' ),
				ar = ['nature','people','architecture','tech','animals'],
				sa = Router.shuffle(ar);

		if ( ad ) {
			if ( ad.src != 'https://placeimg.com/300/300/'+sa[0]) {
				ad.src = 'https://placeimg.com/300/300/'+sa[0];
			} else {
				ad.src = 'https://placeimg.com/300/300/'+sa[1];
			}
		}
	}

	static shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
		return array;
	}


	/**
	 * getHash - Get the hash from the url
	 *
	 * @param {Object} content The post or Page object
	 * @return {String} The hash from the url
	 */
	static makeHashFromLink( content, type = content.type ) {

		if ( 'post' === type ) {
			if (content.categories.includes(140)) {
				return '#/podcast/'+content.slug;
			} else {
				return '#/blog/'+type+'/'+content.slug;
			}
		} else if ( type ) {
			return '#/'+type.slice( 0, -1 )+'/'+content.slug;
		} else if ( content.taxonomy ){
			return '#/'+content.taxonomy+'/'+content.slug;
		} else {
			return '#/'+content.slug;
		}

	}


	/**
	 * closeMenu
	 */
	static maybeCloseMenu() {
		let collapseLink = document.getElementById( 'toggle' );
		if ( ! collapseLink.classList.contains( 'collapsed' ) ) {
			let myCollapseInit = new bsn.Collapse( collapseLink );
			myCollapseInit.hide();
		}
	}

	static loadDashboard() {
		Router.loadStats();
		Router.loadReadings();
	}
	static loadStats() {

    let zz = new WPAPI( {
      username: config.username,
      password: config.password,
      endpoint: config.apiRootSG,
    } );
    zz.ftr = zz.registerRoute( 'btc/v1', '/ftr/(?P<id>)' );
    zz.ftr()
      .id(config.userID)
      .then( z => {
        let nrP = document.getElementById( 'd--new-requests' ),
						ipP = document.getElementById( 'd--in-progress' ),
						crP = document.getElementById( 'd--completed' ),
						srP = document.getElementById( 'd--rating' ),
						nr = nrP.getElementsByTagName("span")[0],
						ip = ipP.getElementsByTagName("span")[0],
						cr = crP.getElementsByTagName("span")[0],
						sr = srP.getElementsByTagName("span")[0];

        nr.innerHTML = z.new_requests;
        ip.innerHTML = z.in_progress;
        cr.innerHTML = z.completed;
        sr.innerHTML = z.rating.toFixed(1);
      } )
      .catch( e => {
      //  console.log(e);
      } );

    return zz;

  }

	static loadReadings() {
		let getReadings = Router.getReadings(),
				list = document.getElementById( 'readings-list' );

			getReadings.then( readings => {
				readings.map( content => {
					list.appendChild( Dashboard.listReading( content ) );
				} );
			} );
	}

  static getReadings() {
	//	return Dashboard.getReadings('my_due');

    let zz = new WPAPI( {
      username: config.username,
      password: config.password,
      endpoint: config.apiRootSG,
    } );

    zz.readers_hub = zz.registerRoute( 'btc/v1', '/readers_hub/(?P<slug>)' );
    let x = zz.readers_hub()
			.perPage( 4 )
			.param( 'my_due', true )
      .then( z => {
				return z;
      } )
      .catch( e => {
      //  console.log(e);
      } );

    return x;
  }



}

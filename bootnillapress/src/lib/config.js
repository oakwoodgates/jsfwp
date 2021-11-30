import WPAPI from 'wpapi';

let config = {
	body: document.querySelector( 'body' ),
	siteTitle: document.querySelector( 'a.navbar-brand' ),
	siteMain: document.querySelector( '#primary' ),
	siteSidebar: document.querySelector( '#secondary' ),
	siteCallout: document.querySelector( '#app-callout' ),
	apiRoot: 'https://cardapp.howfluid.com/wp-json/',
	apiRootBT: 'https://www.biddytarot.com/wp-json/',
	apiRootBTC: 'https://community.biddytarot.com/wp-json/',
	apiRootSG: 'https://styleguide.biddytarot.com/wp-json/',
	siteFooter: document.querySelector( '#app-footer' ),
	userSettings: JSON.parse(localStorage.getItem( 'userSettings' )),
	username:'',
	password:'',
	userID:'',
	allCards:0,
	loggedIn: false
};

config.page404 = {
    type: '404',
    title: {
        rendered: '404 Error.'
    },
    content: {
        rendered: '<p>This Page was not found</p>'
    },
    link: '/',
    _embedded: {
        author: [
            {
                name: 'Admin'
            }
        ]
    }
};

let creds = localStorage.getItem( 'creds' );
if ( ! creds ){
	console.log('no creds');
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
config.username = (creds.slug)?creds.slug:'';
config.password = (creds.password)?creds.password:'';
config.userID = (creds.id)?creds.id:'';

// config.wp = new WPAPI( { endpoint: config.apiRoot } );
// config.ad = WPAPI.discover( 'https://cardapp.howfluid.com/' );
config.wp = new WPAPI( {
	endpoint: config.apiRoot,
} );
config.wp2 = function(){
	let x = new WPAPI( {
	endpoint: config.apiRoot,
//	thing: 'this',
//	username: '',
//	password: '',
} );
return x;
};
config.bt = new WPAPI( {
	endpoint: config.apiRootBT,
} );
config.btc = new WPAPI( {
	endpoint: config.apiRootBTC,
} );

config.sg = function( username = '', password = '' ) {
	let x = new WPAPI( {
		username: username,
		password: password,
		endpoint: config.apiRootSG,
	} );
	return x;
};

config.sg1 = new WPAPI( {
		username: config.username,
		password: config.password,
		endpoint: config.apiRootSG,
	} );

fetch( config.apiRoot+'acf/v3/options/app_settings/' )
	.then( ( resp ) => resp.json() ) // Transform the data into json
	.then( function( data ) {
		config.settings = data.acf;
	} );

if ( config.userSettings && config.userSettings.cardStyle ) {
	config.cardStyle = config.userSettings.cardStyle;
} else {
	config.cardStyle = 'v3';
}

config.player = new MediaElementPlayer('mr_audio', {
	success: function(mediaElement, originalNode, instance) {
	// do things
	}
});
export default config;

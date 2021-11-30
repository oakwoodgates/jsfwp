import WPAPI from 'wpapi';

let config = {
	body: document.querySelector( 'body' ),
	siteTitle: document.querySelector( 'a.navbar-brand' ),
	apiRoot: 'https://cardapp.howfluid.com/wp-json/',
};
config.wp = new WPAPI( { endpoint: config.apiRoot } );
export default config;

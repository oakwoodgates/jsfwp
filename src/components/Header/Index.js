import config from '../../lib/config';
// import Helpers from '../../lib/Helpers';

export default class Header {
	static render() {
		config.wp.root()
			.then( info => {
			//	Helpers.renderSiteTitle( info.name );
				config.siteTitle.innerHTML = info.name;
			} )
			.catch( err => {
				console.log( `Error: ${err}` );
			} );
	}
}

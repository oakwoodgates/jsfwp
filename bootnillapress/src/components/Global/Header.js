import Components from '../../lib/Components';

export default class Header {
	static render() {

		let header = document.getElementById( 'app-header' ),
        nav = header.getElementsByTagName( 'nav' )[0],
        menu = Header.nav(),
        titleContainer = Components.jumbotronHeader01( '' );

		titleContainer.id = "page-header";
    nav.appendChild( menu );
    header.appendChild( titleContainer );

		return header;
	}

    static nav() {
        let nav = document.getElementById( "navbarTogglerDemo03" ),
            menu = Header.menu();

        nav.appendChild( menu );

        return nav;


    }

    static menu() {
        let items = {

            "Library" : {
                "name": "Library",
                "link": "#/library"
            },
						"Settings": {
								"name": "Settings",
								"link": '#/settings'
						},
						"Blog": {
                "name": "Blog",
                "link": '#/blog'
            },
            "Podcasts" : {
                "name": "Podcasts",
                "link": "#/podcasts"
            },
						"Spreads": {
                "name": "Spreads",
                "link": '#/card-app'
            },
						"Dashboard": {
                "name": "Dashboard",
                "link": '#/dashboard'
            },
            "Gutenberg": {
                "name": "Gutenberg",
                "link": '#/gutenberg'
            },
            "Styleguide" : {
                "name": "Styleguide",
                "link": "#/styleguide"
            }
        },
        ul = document.createElement( 'ul' );

        ul.className = 'navbar-nav';

    //    for (var i = 0; i < items.length; i++) {
        for (var i in items ) {
            let c = items[i];

            let l = document.createElement( 'li' ),
                a = document.createElement( 'a' ),
                t = document.createTextNode( c.name );
            a.href = c.link;
            a.appendChild( t );
            a.className = 'nav-link';
            l.className = 'nav-item';
            a.onclick = function(){
                let wrapperId = document.getElementById( 'navbarTogglerDemo03' ),
                    activeLink = wrapperId.getElementsByClassName( 'active' );
                    if (activeLink[0]){
                        activeLink[0].classList.remove( 'active' );
                    }
                    a.classList.add( 'active' );
            };
    //		l.appendChild(a);
            ul.appendChild(a);
    //		frag.appendChild(a);
        }
    //    navbar.appendChild(ul);
    //    return navbar;
        return ul;
    }
}

import config from '../../lib/config';
import Helpers from '../../lib/Helpers';
import Bootstrap from '../../lib/Bootstrap';
import WPAPI from 'wpapi';
export default class Dashboard {

  static render() {
    Helpers.doHeader('Dashboard');
    console.log('dashboard template');

    let
			container = Helpers.container(),
      row1 = Helpers.row(),
      row2 = Helpers.row(),
      col0 = Helpers.col( 'div', 'col-sm-12 col-md-9 mx-auto text-center mb-5' ),
      col1 = Helpers.col( 'div', 'col-sm-12 col-md-6 col-lg-5 offset-lg-1 mb-3' ),
      col2 = Helpers.col( 'div', 'col-sm-12 col-md-6 col-lg-5 mb-3 d-flex align-items-stretch' ),
      col3 = Helpers.col( 'div', 'col-sm-10 col-md-9 mx-auto' ),
      statsList = Dashboard.widgetStats(),
      readingsList = Dashboard.widgetReadings(),
      callout = Dashboard.widgetCallout();


    col0.innerHTML = '<p class="h6">This dashboard is pulling FTR data from a demo user on styleguide.biddytarot.com</p>';
    col1.appendChild( statsList );
    col2.appendChild(callout);
    col3.appendChild(readingsList);
    row1.appendChild( col0 );
    row1.appendChild( col1 );
    row1.appendChild( col2 );

    row2.appendChild( col3 );
    row2.classList.add( 'my-5' );
    container.appendChild( row1 );
    container.appendChild( row2 );

		return container;
  }

  static widgetCallout() {
    let div = document.createElement('div');
    let div1 = document.createElement('div');

    div1.className = 'w-100 bg-success text-white d-flex align-items-center py-5 px-4';
    div.innerHTML = 'centered vertical and horizontal; matching height';
    div.className = 'text-center w-100';
    div1.appendChild(div);
    return div1;

  }

  static widgetStats() {
    let
      listGroup = Bootstrap.listGroup(),
      listItem0 = Bootstrap.listGroupItem( 'FTR Stats' ),
      listItem1 = Bootstrap.listGroupItem( '<i class="fa fa-fw fa-envelope text-danger" aria-hidden="true"></i>&nbsp; New Requests' ),
      listItem2 = Bootstrap.listGroupItem( '<i class="fa fa-fw fa-hourglass-half text-primary" aria-hidden="true"></i>&nbsp; In Progress' ),
      listItem3 = Bootstrap.listGroupItem( '<i class="fa fa-fw fa-check text-success" aria-hidden="true"></i>&nbsp; Completed' ),
      listItem4 = Bootstrap.listGroupItem( '<i class="fa fa-fw fa-star text-warning" aria-hidden="true"></i>&nbsp; Average Rating' )
      ;

    listGroup.classList.add('ftr-stats-widget');

    listItem0.classList.add( 'list-group-item', 'text-center', 'text-uppercase', 'h5', 'bg-primary', 'text-light' );
    listItem1.classList.add( 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'text-uppercase', 'h6', 'font-sans' );
    listItem2.classList.add( 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'text-uppercase', 'h6', 'font-sans' );
    listItem3.classList.add( 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'text-uppercase', 'h6', 'font-sans' );
    listItem4.classList.add( 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'text-uppercase', 'h6', 'font-sans' );
    listItem1.id = 'd--new-requests';
    listItem2.id = 'd--in-progress';
    listItem3.id = 'd--completed';
    listItem4.id = 'd--rating';
    listItem1.appendChild(Bootstrap.badgePill( '<i class="fa fa-spinner fa-pulse fa-fw"></i>', 'success' ));
    listItem2.appendChild(Bootstrap.badgePill( '<i class="fa fa-spinner fa-pulse fa-fw"></i>', 'success' ));
    listItem3.appendChild(Bootstrap.badgePill( '<i class="fa fa-spinner fa-pulse fa-fw"></i>', 'success' ));
    listItem4.appendChild(Bootstrap.badgePill( '<i class="fa fa-spinner fa-pulse fa-fw"></i>', 'success' ));

    listGroup.appendChild( listItem0 );
    listGroup.appendChild( listItem1 );
    listGroup.appendChild( listItem2 );
    listGroup.appendChild( listItem3 );
    listGroup.appendChild( listItem4 );

    return listGroup;
  }

  static widgetReadings() {
    let
    frag = document.createDocumentFragment(),
    listGroup = Bootstrap.listGroup(),
    header = document.createElement( 'li' ),
    nav = document.createElement( 'nav' ),
    a1 = document.createElement( 'a' ),
    a2 = document.createElement( 'a' ),
    a3 = document.createElement( 'a' ),
    loadMoreButton = Dashboard.loadMoreButton()
    ;
    listGroup.id = 'readings-list';
    header.classList.add( 'list-group-item', 'py-0', 'px-0' );
    nav.id = 'ftr-nav';
    nav.classList.add( 'nav', 'nav-pills', 'nav-justified' );
    a1.classList.add( 'nav-item', 'nav-link', 'text-uppercase', 'active' );
    a2.classList.add( 'nav-item', 'nav-link', 'text-uppercase' );
    a3.classList.add( 'nav-item', 'nav-link', 'text-uppercase' );
    a1.href = 'javascript:void(0);',
    a2.href = 'javascript:void(0);',
    a3.href = 'javascript:void(0);';

    a1.innerHTML = 'Due';
    a2.innerHTML = 'Complete';
    a3.innerHTML = 'My Requests';

    a1.id = 'my_due';
    a2.id = 'my_complete';
    a3.id = 'my_requests';

    a1.onclick = function(e){Dashboard.swapPostGrid( e, a1.id, a1 );};
    a2.onclick = function(e){Dashboard.swapPostGrid( e, a2.id, a2 );};
    a3.onclick = function(e){Dashboard.swapPostGrid( e, a3.id, a3 );};

    nav.appendChild(a1);
    nav.appendChild(a2);
    nav.appendChild(a3);
    header.appendChild(nav);
    frag.appendChild(header);
    frag.appendChild(listGroup);
    frag.appendChild( loadMoreButton );
    return frag;
  }

  static loadMoreButton() {
    let
    buttonDiv = document.createElement( 'div' ),
    button = Bootstrap.button( 'Load More', 'button', 'success' );

    button.id = "load-more-readings";
		button.classList.add( 'mx-auto');
		button.classList.add( 'my-4');
		button.onclick = function(e){Dashboard.loadMore(e,button);};
		button.setAttribute( 'cat', 'my_due' );
		button.setAttribute( 'pag', 0 );

		buttonDiv.className = 'w-100 text-center';
		buttonDiv.appendChild( button );

    return buttonDiv;
  }

  static loadMore( e, moreButton ) {
		let row = document.getElementById( "readings-list" ),
			nav = 2,
			cat = moreButton.getAttribute( 'cat' ),
			pag = moreButton.getAttribute( 'pag' );

		moreButton.innerHTML = 'Load More <i class="fa fa-spinner fa-spin fa-pulse fa-fw"></i>';

		if ( pag > 0 ) {
			nav = parseInt(pag) + 1;
		}

    let zz = new WPAPI( {
      username: config.username,
      password: config.password,
      endpoint: config.apiRootSG,
    } );
    zz.readers_hub = zz.registerRoute( 'btc/v1', '/readers_hub/(?P<slug>)' );
    zz.readers_hub()
			.param( cat, true )
			.perPage( 4 )
			.page( nav )
			.embed()
				.then( posts => {
					posts.map( content => {
            row.appendChild( Dashboard.listReading( content ) );
					} );
				} )
				.then(()=>{
						moreButton.innerHTML = 'Load More';
					})
				.catch( err => {
          moreButton.innerHTML = 'All Readings Loaded!';
          moreButton.setAttribute( 'lod', 1 );
          console.log( err );
				} );

		moreButton.setAttribute( 'pag', nav );

	}

  static swapPostGrid( e, id, a ) {
		e.preventDefault();

		let
			row = document.getElementById( 'readings-list' ),
			moreButton = document.getElementById( 'load-more-readings' ),
			linkWrap = document.getElementById( 'ftr-nav' ),
			activeLink = linkWrap.getElementsByClassName( 'active' );

    moreButton.innerHTML = 'Load More';
		moreButton.setAttribute( 'cat', id );
		moreButton.setAttribute( 'pag', 0 );

		if (activeLink[0]){
			activeLink[0].classList.remove( 'active' );
		}

		a.classList.add( 'active' );

		Helpers.fade(row);

    let zz = new WPAPI( {
      username: config.username,
      password: config.password,
      endpoint: config.apiRootSG,
    } );
    zz.readers_hub = zz.registerRoute( 'btc/v1', '/readers_hub/(?P<slug>)' );
    zz.readers_hub()
      .param( id, true )
      .perPage( 4 )
      .embed()
				.then( posts => {
					posts.map( content => {
				//		frag.appendChild( Archive.card( content ) );
						row.appendChild( Dashboard.listReading( content ) );
					} );
				} )
				.then( function() {
				//	row.appendChild( frag );
		//		} ).then ( function() {
					Helpers.unfade(row);
				})
				.catch( err => {
          moreButton.innerHTML = 'All Posts Loaded!';
          moreButton.setAttribute( 'lod', 1 );
				} );

		}



  static listReading( reading ) {
    let listEl = document.createElement('a'),
        titleWrap = document.createElement( 'div' ),
        titleEl = document.createElement( 'h5' ),
        status = reading.reading.status,
        statusEl = Bootstrap.badgePill( status ),
        contentEl = document.createElement( 'div' ),
        bottomEl = document.createElement( 'small' ),
        dueDate = Dashboard.dueDate(reading.reading.due),
        dueMsg = '';


    if ( 'ASSIGNED' === status || 'IN PROGRESS' === status ) {
      if ( dueDate > 0 ) {
        if ( dueDate > 48 ) {
          let newDate = dueDate/24;
          dueMsg = 'due in '+newDate.toFixed(0)+' days';
        } else {
          dueMsg = 'due in '+dueDate.toFixed(0)+' hrs';
        }
      } else {
        let posDate = Math.abs(dueDate);
        if ( posDate > 48 ) {
          let newDate = posDate/24;
          dueMsg = 'due '+newDate.toFixed(0)+' days ago';
        } else {
          dueMsg = 'due '+posDate.toFixed(0)+' hrs ago';
        }
        statusEl.innerHTML = 'LATE';
        statusEl.classList.add('badge-danger');
        statusEl.classList.remove('badge-primary');
      }
    } else if ( 'AWAITING FEEDBACK' === status ) {
      statusEl.classList.add('badge-success');
      statusEl.classList.remove('badge-primary');
    } else if ( 'COMPLETE' === status ) {
      let rating = reading.reading.rating;
      statusEl = '';
      statusEl = document.createElement( 'div' );

      for (var i = 0; i < rating; i++) {
        let star = document.createElement('i');
        star.classList.add('fa','fa-star', 'text-warning' );
        statusEl.appendChild(star);
      }

    }

    listEl.classList.add( 'list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start' );
    listEl.href = 'javascript:void(0);';
    titleWrap.classList.add( 'd-flex', 'w-100', 'justify-content-between', 'mb-1' );
    titleEl.classList.add( 'mb-1' );
    titleEl.innerHTML = 'Reading #'+reading.id;
    statusEl.classList.add( 'align-self-center' );
    titleWrap.appendChild( titleEl );
    titleWrap.appendChild( statusEl );
    contentEl.classList.add( 'mb-1' );
    contentEl.innerHTML = reading.content.rendered;
    bottomEl.innerHTML = dueMsg;

    listEl.appendChild( titleWrap );
    listEl.appendChild( contentEl );
    listEl.appendChild( bottomEl );

    return listEl;
  }

  static dueDate(timestamp) {
    let d = new Date( timestamp * 1000 ),
        n = new Date(),
    //    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        res = 0;

    let
    dts = d.getTime()/1000,
    nts = n.getTime()/1000,
    ets = dts - nts,
    etm = ets/60,
    eth = etm/60;

    res = eth;
    return res;
  }

}

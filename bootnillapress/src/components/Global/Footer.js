
import config from '../../lib/config';
import Bootstrap from '../../lib/Bootstrap';


export default class Footer {
	static render() {
		let
			footer 	= document.createElement( 'section' ),
			topFoot = document.createElement( 'div' ),
			midFoot = document.createElement( 'div' ),
			midFootInnerContainer = document.createElement( 'div' ),
			midFootcol1 = Footer.makeCol( 'Rotating Image', Footer.footerAd() ),
			midFootcol2 = document.createElement( 'div' ),
			midFootcol3 = document.createElement( 'div' ),
			midFootRow = document.createElement( 'div' ),
			topFootInnerContainer = Bootstrap.container(),
			finFoot = document.createElement( 'div' ),
			finFootInnerContainer = Bootstrap.container('div','container-fluid');
//			signupForm = Components.inlineSignupForm01();

			topFoot.classList.add( 'bg-warning', 'py-4', 'text-center'  );
			midFoot.classList.add( 'bg-success', 'py-4', 'text-light', 'border-top', 'border-bottom' );
			midFootInnerContainer.classList.add( 'container', 'text-uppercase' );
			midFootRow.classList.add( 'row' );
			midFootcol2.classList.add( 'col-md-4', 'my-3' );
			midFootcol3.classList.add( 'col-md-4', 'my-3' );

	//		midFoot.setAttribute("style", " border-color: #226f71!important;");

			midFootcol2.innerHTML = '<h5 class="text-center mb-3">Our Products</h5><ul>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">First Item</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">Item Number Two</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">Another Fine Link</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">More Coffee Please</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">Yet Another</a></li>'+
			'</ul>';
			midFootcol3.innerHTML = '<h5 class="text-center mb-3">Business</h5><ul>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">About</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">FAQ</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">Privacy</a></li>'+
			'<li class="mb-2"><a href="javascript:void(0)" class="text-light">Contact</a></li>'+
			'</ul><ul class="list-inline text-center">'+
			'<li class="list-inline-item"><a href="javascript:void(0)" class="text-light"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>'+
			'<li class="list-inline-item"><a href="javascript:void(0)" class="text-light"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>'+
			'<li class="list-inline-item"><a href="javascript:void(0)" class="text-light"><i class="fa fa-youtube" aria-hidden="true"></i></a></li>'+
			'<li class="list-inline-item"><a href="javascript:void(0);" class="text-light"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>'+
			'</ul>';

			topFoot.id = 'footer-top';

//			topFootInnerContainer.appendChild( signupForm );
			topFootInnerContainer.innerHTML = '<img src="https://www.biddytarot.com/wp-content/uploads/BT-Header-Logo-@2x.png" width="300px" />';
			topFoot.appendChild( topFootInnerContainer );


			midFootRow.appendChild( midFootcol1 );
			midFootRow.appendChild( midFootcol2 );
			midFootRow.appendChild( midFootcol3 );
			midFootInnerContainer.appendChild( midFootRow );
			midFoot.appendChild( midFootInnerContainer );
	//		midFoot.style.backgroundImage = "url('https://www.biddytarot.com/admin/wp-content/uploads/aurora-borealis-wallpaper-hd-wallpaper-3.jpg')";

			finFoot.classList.add('bg-primary', 'text-light', 'text-center', 'bottom-socket', 'small');
			finFootInnerContainer.classList.add('py-2');
			finFootInnerContainer.innerHTML = "<span>Built with plain vanilla JavaScript + Bootstrap 4 (css only, no jQuery), bootstrap.native, Font Awesome 4, & MediaElement.js</span><br/>"+
			"<span>Content and media copyright Biddy Tarot | Card images copyright Everyday Tarot and U.S. Games Systems, Inc</span><br/>"+
			"<span>Powered by WordPress Rest API + ACF | Application Development by WPGuru4u</span>";
			finFoot.appendChild(finFootInnerContainer);

			footer.appendChild( topFoot );
			footer.appendChild( midFoot );
			footer.appendChild( finFoot );

			config.siteFooter.appendChild( footer );
	}

	static makeCol( title, content ) {
		let
			col = document.createElement( 'div' ),
			colTitleEl = document.createElement( 'h5' ),
			colTitle = document.createTextNode( title );

		col.classList.add( 'col-md-4', 'text-center', 'my-3' );
		colTitleEl.classList.add( 'mb-3' );
		colTitleEl.appendChild( colTitle );
		col.appendChild( colTitleEl );
		col.appendChild( content );

		return col;

	}

	static footerAd() {
		let
			adImg = document.createElement( 'img' );

			adImg.src = 'https://placeimg.com/300/300/animals';
			adImg.classList.add('img-fluid');
			adImg.id = 'footer-ad';

			return adImg;
	}

}

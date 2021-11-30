import config from '../../lib/config';
import Helpers from '../../lib/Helpers';

export default class Single {

    /**
     * render - Display Posts on the post
     *
     * @param  {String} slug Slug of post to display
     */
    static render( slug ) {
        let single = config.bt.posts()
            .slug( slug )
            .embed()
            .then( post => {
                if ( post[0] ) {
                    Helpers.doHeader( post[ 0 ].title.rendered );
                    let frag = document.createDocumentFragment(),
                        template = Single.template( post[ 0 ] );

                    let
                        img = template.getElementsByTagName( 'img' ),
                        ret = document.createElement('div');

                  //  ret = img[0];
                    img[0].classList.add( 'mb-5' );
                    ret.appendChild(img[0]);
                    ret.className = 'mx-auto w-100 text-center';
                    frag.appendChild(ret);
                    frag.appendChild(template);
                    return frag;
                } else {
                    return Single.template( config.page404 );
                }
            } )
            .catch( err => {
                console.log( `Error: ${err}` );
            } );
        return single;
    }


    /**
  	 * Page - Renders a Page
  	 *
  	 * @param  {Object} content Page content object
  	 * @return {void} Not meant to return
  	 */
    static template( content ) {
        let contentEl = document.createElement( 'div' ),
            articleEl = document.createElement( 'article' );

        articleEl.classList.add( 'container' );
//        console.log('content');
  //      console.log(content);
        contentEl.innerHTML = content.content.rendered;
        contentEl.className = 'col-lg-9 mx-auto px-0';

        articleEl.appendChild( contentEl );

        return articleEl;
    }


    static removePodcast( content ) {
      let podcast = content.getElementsByClassName( 'player_container' );

      podcast[0].innerHTML = '';
      return content;
    }

}

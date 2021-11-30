import config from '../../lib/config';
import Helpers from '../../lib/Helpers';
import Components from '../../lib/Components';
import Bootstrap from '../../lib/Bootstrap';

export default class Card {


    static vars() {
        var id = 0,
            title = '';
    }

	/**
     * render - Display Posts on the post
     *
     * @param  {String} slug Slug of post to display
     */
    static render( slug ) {

		config.wp.cards = config.wp.registerRoute( 'wp/v2', '/cards/(?P<slug>)' );

		let x = config.wp.cards()
			.slug( slug )
			.embed()
			.then( post => {
          let p = post[0];
          Helpers.doHeader( p.title.rendered );
          Card.vars.id = p.id;
          Card.vars.title = p.title.rendered;
          return Card.template( p );
			} )
			.catch( err => {
				console.log( err );
			} );
        return x;
    }

    /**
  	 * Template - Renders the Single Card template
  	 *
  	 * @param  {Object} content Page content object
  	 * @return {void} Not meant to return
  	 */
	static template( content ) {
		let
			articleEl 	= document.createElement( 'article' ),
			ad1 = document.createElement( 'section' ),
			ad1Content = Helpers.jumbotron( 'ad 1' );

		ad1.appendChild( ad1Content );
		articleEl.appendChild( Card.meaningSection( content ) );
		articleEl.appendChild( Card.uprightSection( content ) );
    articleEl.appendChild( ad1 );
		articleEl.appendChild( Card.reversedSection( content ) );
    articleEl.appendChild( Card.keywordsSection( content ) );
    return articleEl;

	}

  static meaningSection( content ) {
    let container = Bootstrap.container(),
        row = Bootstrap.row(),
        adCol = Bootstrap.col( 'col-md-3 text-center' ),
        textCol = Bootstrap.col( 'col-md-9 col-lg-8 offset-lg-1' ),
        text = content.acf.tcm_desc,
        adEl = Components.cardStyle01( 'Ad Card', 'Here is some basic text to fill this thing up!', 0, 'javascript:void(0);' ),
        titleEl 	= document.createElement( 'h2' ),
        title 	= document.createTextNode( 'Meanings and Description' );

    titleEl.classList.add( 'text-center', 'mb-4' );
    row.classList.add( 'align-items-center' );
    container.classList.add( 'align-items-center', 'mb-3' );
    adEl.classList.add( 'no-hover-underline', 'text-dark');
    titleEl.appendChild( title );
    textCol.innerHTML = text;
    adCol.appendChild( adEl );
    row.appendChild( textCol );
    row.appendChild( adCol );
    container.appendChild( titleEl );
    container.appendChild( row );
    return container;

  }

  static uprightSection( content ) {
    let container = Bootstrap.container(),
        row = Bootstrap.row(),
        imgCol = Bootstrap.col( 'col-md-4 col-lg-3 offset-lg-1 text-center mb-3' ),
        textCol = Bootstrap.col( 'col-md-9 mx-auto' ),
        firstPCol = Bootstrap.col( 'col-md-8 col-lg-7' ),
        text = content.acf.tcm_up,
        deckLink = document.createElement( 'a' ),
        deckLinkDiv = document.createElement( 'div' ),
        imgEl = document.createElement( 'img' ),
        imgSrc = 'https://cardapp.howfluid.com/wp-content/uploads/cards/'+config.cardStyle+'/'+content.acf.tcm_img_name+'.jpg',
        titleEl 	= document.createElement( 'h2' ),
        title 	= document.createTextNode( 'Upright Meanings' );

    titleEl.classList.add( 'text-center', 'mb-3' );
    imgEl.classList.add( 'my-2' );
    row.classList.add( 'align-items-center' );
    container.classList.add( 'align-items-center', 'mb-3' );

    deckLink.href = 'javascript:void(0);';
    deckLink.innerHTML = 'Buy this deck';
    deckLinkDiv.classList.add('w-100');
    imgEl.src = imgSrc;
    titleEl.appendChild( title );
    textCol.innerHTML = text;
    let firstP = textCol.getElementsByTagName('p')[0];
    firstPCol.appendChild(firstP);

    imgCol.appendChild( imgEl );
    deckLinkDiv.appendChild( deckLink );
    imgCol.appendChild( deckLinkDiv );
    row.appendChild( imgCol );
    row.appendChild( firstPCol );
    row.appendChild( textCol );

    container.appendChild( titleEl );
    container.appendChild( row );
    return container;
  }

  static reversedSection( content ) {
    let container = Bootstrap.container(),
        row = Bootstrap.row(),
        imgCol = Bootstrap.col( 'col-md-4 col-lg-3 order-md-2 text-center mb-3' ),
        textCol = Bootstrap.col( 'col-md-9 order-3 mx-auto' ),
        firstPCol = Bootstrap.col( 'col-md-8 col-lg-7 offset-lg-1' ),
        text = content.acf.tcm_rev,
        deckLink = document.createElement( 'a' ),
        deckLinkDiv = document.createElement( 'div' ),
        imgEl = document.createElement( 'img' ),
        imgSrc = 'https://cardapp.howfluid.com/wp-content/uploads/cards/'+config.cardStyle+'/'+content.acf.tcm_img_name+'.jpg',
        titleEl 	= document.createElement( 'h2' ),
        title 	= document.createTextNode( 'Reversed Meanings' );


    titleEl.classList.add( 'text-center', 'mb-3' );
    imgEl.classList.add( 'my-2', 'rx-img' );
    row.classList.add( 'align-items-center' );
    container.classList.add( 'align-items-center', 'mb-3' );

    deckLink.href = 'javascript:void(0);';
    deckLink.innerHTML = 'Buy this deck';
    deckLinkDiv.classList.add('w-100');
    imgEl.src = imgSrc;
    titleEl.appendChild( title );
    textCol.innerHTML = text;
    let firstP = textCol.getElementsByTagName('p')[0];
    firstPCol.appendChild(firstP);
//    textCol.removeChild( firstP );

    imgCol.appendChild( imgEl );
    deckLinkDiv.appendChild( deckLink );
    imgCol.appendChild( deckLinkDiv );
//    firstP.appendChild(imgCol);
    row.appendChild( imgCol );
    row.appendChild( firstPCol );
    row.appendChild( textCol );

    container.appendChild( titleEl );
    container.appendChild( row );
    return container;

  }

  static keywordsSection( content ) {
    let container = Bootstrap.container(),
        title = Bootstrap.heading('Keywords', 'h2', 'mb-3 w-100 text-center'),
        deck = Bootstrap.cardDeck(),
        upKeyList = Card.commaToList( content.acf.upright_keywords ),
        rxKeyList = Card.commaToList( content.acf.reversed_keywords ),
        upCard = Components.cardStyle04( 'Upright Keywords', 0, upKeyList, 'bg-primary' ),
        rxCard = Components.cardStyle04( 'Reversed Keywords', 0, rxKeyList, 'bg-warning' ),
        iconCard = Components.cardStyle04( 'Symbols', 0, '', 'bg-success' )
        ;

    container.classList.add('mb-4');
    deck.classList.add( 'keyword-deck', 'text-uppercase' );
    deck.appendChild( upCard );
    deck.appendChild( rxCard );
    deck.appendChild( iconCard );
    container.appendChild( title );
    container.appendChild( deck );
    return container;
  }

  static commaToList(list) {
    list = list.split(', ');
    list.sort(function() { return 0.5 - Math.random(); });
    var html = '<ul>';

     for(var i=0; i<list.length; i++) {
        html += '<li>' + list[i] + '</li>';
      }

    html += '</ul>';
    return html;
  }


    static form( id, cardTitle ) {
        let container = Bootstrap.container(),
            row = Bootstrap.row(),
            col = Bootstrap.col( 'col-lg-9 mx-auto'),
            form = document.createElement( 'form' ),
            textareaID = 'tcmNotesTextArea',
            textarea = Bootstrap.formTextArea( textareaID ),
    //        textareaLabel = Bootstrap.formLabel( textareaID ),
            textareaGroup = Bootstrap.formGroup(),
            notes = JSON.parse(localStorage.getItem( 'Note'+id )),
            notesDiv = document.createElement( 'div' ),
            titleText = (notes)?'My notes on '+cardTitle:'Jot down a note about the '+cardTitle,
            titleEl = document.createElement( 'h3' ),
        //    desc = '',
            button = Bootstrap.button( 'Add Note' );

        notesDiv.id = 'notesDiv';
        notesDiv.className = 'my-2';
        if ( notes ) {
            notesDiv.appendChild( Card.noteList( notes.notes ) );
        }

        titleEl.id = 'notesHeader';
        titleEl.innerHTML = titleText;
        titleEl.classList.add( 'text-center', 'mb-3' );
        button.classList.add( 'w-100' );
//        textareaGroup.appendChild( textareaLabel );
        textarea.rows = '4';
        textareaGroup.appendChild( textarea );

        button.onclick = function(){Card.saveNote( id, textareaID );};

        form.appendChild( textareaGroup );
        form.appendChild( button );

        col.appendChild( titleEl );
        col.appendChild( notesDiv );
        col.appendChild( form );
        row.appendChild( col );
        container.classList.add('my-5');
        container.appendChild( row );
        return container;

    }

    static saveNote( id, textareaID ) {
        let	notes = JSON.parse( localStorage.getItem( 'Note'+id ) ),
            note = document.getElementById( textareaID ),
            notesDiv = document.getElementById( 'notesDiv' ),
            value = note.value;

        note.value = '';

        if ( ! notes ) {
            notes = {"notes":[value]};
            let notesHeader = document.getElementById( 'notesHeader' );
            notesDiv.appendChild( Card.noteList( notes.notes ) );
            notesHeader.innerHTML = 'My notes';
        } else {
            notesDiv.getElementsByTagName("ul")[0].appendChild( Card.noteItem( value ) );

        //    let notesArray = notes.notes,
        //        length = notesArray.length;

            notes.notes[notes.notes.length] = value;
        }

        localStorage.setItem( 'Note'+id, JSON.stringify( notes ) );

    }

    static noteList( notes ) {
        let ul = Bootstrap.listGroup(),
            i = 0,
            length = notes.length;

        for ( i; i < length; i++ ) {
          ul.appendChild( Card.noteItem( notes[i] ) );
        }
        return ul;
    }

    static noteItem( note ) {
    //    let div = document.createElement('div'),
  //      item = Bootstrap.listGroupItem( note );
        let
        item =  document.createElement( 'li' ),
        itemText = document.createTextNode( note ),
        button = document.createElement('div');

        item.className = 'list-group-item alert-dismissible card-note';
        item.appendChild( itemText );

        button.className = 'close';
        button.innerHTML = '<span aria-hidden="true">&times;</span>';
        button.onclick = function(e){Card.deleteNote( e, item );};
        item.appendChild(button);
      //  item.innerHTML = note + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

  //      div.innerHTML = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  //      item.appendChild(div);
        return item;
    }

    static deleteNote(e,item) {
      let cardNotes = document.getElementsByClassName('card-note');

      console.log(cardNotes);
      console.log(item);
      console.log(e);
    }
}

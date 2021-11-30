import Helpers from '../../lib/Helpers';
import Bootstrap from '../../lib/Bootstrap';
import Components from '../../lib/Components';
import config from '../../lib/config';



export default class CardApp {

  static render() {
    Helpers.doHeader( 'Tarot Spreads', 'Click the buttons below to add cards to the layout' );
    let container = Bootstrap.container(),
    cardDiv = document.createElement( 'div' ),
    cardDeck = Bootstrap.cardDeck(),
    card1 = Components.cardStyle05(),
    card2 = Components.cardStyle05(),
    card3 = Components.cardStyle05(),
    controlRow = Bootstrap.row(),
    radioCol = Bootstrap.col( 'col-md-6 col-lg-5 offset-lg-1'),
    buttonCol = Bootstrap.col( 'col-md-6 col-lg-5'),
    radioForm = CardApp.form(),
    drawCardButton = CardApp.drawCardButton(),
    shuffleCardsButton = CardApp.shuffleCardsButton(),
    clearSpreadButton = CardApp.clearSpreadButton();

    CardApp.getAllCards();

    cardDiv.id = 'spread--card-wrap';
    drawCardButton.classList.add( 'btn', 'btn-primary', 'w-100', 'my-2' );
    shuffleCardsButton.classList.add( 'btn', 'btn-primary', 'w-100', 'my-2' );
    clearSpreadButton.classList.add( 'btn', 'btn-primary', 'w-100', 'my-2' );
    clearSpreadButton.setAttribute( 'disabled', true );
    cardDiv.classList.add( 'mb-4' );

    cardDeck.appendChild( card1 );
    cardDeck.appendChild( card2 );
    cardDeck.appendChild( card3 );
    cardDiv.appendChild( cardDeck );
    container.appendChild( cardDiv );
    radioCol.appendChild( radioForm );
    buttonCol.appendChild( shuffleCardsButton );
    buttonCol.appendChild( drawCardButton );
    buttonCol.appendChild( clearSpreadButton );
    controlRow.appendChild( radioCol );
    controlRow.appendChild( buttonCol );
    container.appendChild( controlRow );
    return container;
  }

  static drawCardButton() {
    let button = document.createElement( 'button' );

    button.innerHTML = 'Draw Cards';
    button.id = 'spread--draw';
    button.onclick = function() {
      let
      deckOfCards = CardApp.getAllCards(),
      cardsWrap = document.getElementById( 'spread--card-wrap' ),
      clearButton = document.getElementById( 'spread--clear' ),
      cardDivs = cardsWrap.getElementsByClassName( 'card' );

      for (var i = 0; i < cardDivs.length; i++) {
        let thisCard = deckOfCards[i],
            thisDiv = cardDivs[i],
            thisHeader = thisDiv.getElementsByClassName('card-header')[0],
            thisBody = thisDiv.getElementsByClassName('card-body')[0],
            thisImg = thisBody.getElementsByTagName('img')[0],
            thisFooter = thisDiv.getElementsByClassName('card-footer')[0],
            rx = (Math.floor(Math.random() * 2) == 0),
            cardImgSrc = 'https://cardapp.howfluid.com/wp-content/uploads/cards/'+config.cardStyle+'/'+thisCard.acf.tcm_img_name+'.jpg',
            cardTitle = (rx)?thisCard.title.rendered+' Reversed':thisCard.title.rendered,
            cardKeywords = (rx)?thisCard.acf.reversed_keywords:thisCard.acf.upright_keywords
            ;

          thisImg.classList.remove('rx-img');
          thisImg.src = cardImgSrc;
          thisHeader.innerHTML = cardTitle;
          thisFooter.innerHTML = cardKeywords;
          thisImg.classList.remove('cod-hide');
          if (rx) thisImg.classList.add('rx-img');
      }
      // CardApp.shuffleCards();
      button.setAttribute( 'disabled', true );
      clearButton.removeAttribute( 'disabled', true );

    };

    return button;
  }

  static shuffleCardsButton() {
    let button = document.createElement( 'button' );

    button.innerHTML = 'Shuffle Cards';
    button.id = 'spread--shuffle';
    button.onclick = function(){
      button.innerHTML = 'Shuffling <i class="fa fa-id-badge fa-spin"></i>';
      CardApp.shuffleCards();
      setTimeout(function(){
        button.innerHTML = 'Done <i class="fa fa-check"></i>';
        setTimeout(function(){
          button.innerHTML = 'Shuffle Again';
        }, 1300);
      }, 2300);
    };
    return button;
  }

  static clearSpreadButton() {
    let button = document.createElement( 'button' );

    button.innerHTML = 'Clear Spread';
    button.id = 'spread--clear';
    button.onclick = function(){CardApp.clearSpread();};

    return button;
  }

  static clearSpread() {
    let drawButton = document.getElementById( 'spread--draw' ),
    clearButton = document.getElementById( 'spread--clear' ),
    cardsWrap = document.getElementById( 'spread--card-wrap' ),
    cardDivs = cardsWrap.getElementsByClassName( 'card' );

    clearButton.setAttribute( 'disabled', true );
    CardApp.shuffleCards();

    for (var i = 0; i < cardDivs.length; i++) {
      let
      thisDiv = cardDivs[i],
      thisHeader = thisDiv.getElementsByClassName('card-header')[0],
      thisImg = thisDiv.getElementsByTagName('img')[0],
      thisFooter = thisDiv.getElementsByClassName('card-footer')[0];

      thisHeader.innerHTML = '';
      thisFooter.innerHTML = '';
      thisImg.classList.add('cod-hide');
      thisImg.classList.remove('rx-img');
    }
    drawButton.removeAttribute( 'disabled', true );
  }

  static getAllCards() {

    if (0 === config.allCards) {
      config.wp.cards = config.wp.registerRoute( 'wp/v2', '/cards/(?P<slug>)' );
      config.wp.cards()
        .perPage( 100 )
        .then( cards => {
          config.allCards = cards;
          return cards;
        } );
    } else {
      return config.allCards;
    }
  }

/*  static shuffleCards1() {
    var arr = [];
    while(arr.length < 3){
        var randomnumber = Math.floor(Math.random()*100) + 1;
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
  }
*/
  static shuffleCards() {
    let array = config.allCards;
		for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
		return array;
  }







  static form() {

		let
			form = document.createElement( 'form' ),
			fieldset = document.createElement( 'fieldset' ),
			legend = document.createElement( 'legend' ),
			legendText = document.createTextNode( 'Options' ),
			cardSpreadSettings = localStorage.getItem( 'spread' ),
			radioData = { 'id': 'spread' };

		if ( ! cardSpreadSettings ){
			cardSpreadSettings = {
				spread: 'v1'
			};
			localStorage.setItem( 'cardSpreadSettings', JSON.stringify( cardSpreadSettings ) );
		} else {
			cardSpreadSettings = JSON.parse( cardSpreadSettings );
		}

		radioData.name = 'spread';
		radioData.options = [];
    radioData.options[0] = {
			label: 'Three Card',
			id: 'radioV1',
			value: 'v1',
			checked: ( 'v1' === cardSpreadSettings.spread ) ? true : false
		};
    radioData.options[1] = {
			label: 'Coming Soon',
			id: 'radioV2',
			value: 'v2',
			checked: ( 'v2' === cardSpreadSettings.spread ) ? true : false
		};
		radioData.options[2] = {
			label: 'Coming Soon',
			id: 'radioV3',
			value: 'v3',
			checked: ( 'v3' === cardSpreadSettings.spread ) ? true : false
		};

    let
			radios = Helpers.formCustomRadioGroup( radioData ),
			radioTitle = document.createElement( 'div' ),
      radioWrapper2 = radios.getElementsByClassName( 'custom-radio' )[1],
      radioWrapper3 = radios.getElementsByClassName( 'custom-radio' )[2],
      radio2 = radioWrapper2.getElementsByTagName( 'input' )[0],
      radio3 = radioWrapper3.getElementsByTagName( 'input' )[0];

    radio2.setAttribute("disabled", true);
    radio3.setAttribute("disabled", true);

		radioTitle.className = 'my-2';
		form.className = 'border px-4 py-4 mx-auto';
		radioTitle.innerHTML = "Choose your Spread:";
		radios.prepend( radioTitle );
		legend.appendChild( legendText );
		fieldset.appendChild( legend );
		fieldset.appendChild( radios );

		form.appendChild( fieldset );

		return form;
	}
}

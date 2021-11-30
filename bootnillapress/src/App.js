'use strict';

import Header from './components/Global/Header';
import Footer from './components/Global/Footer';
// import Menu from './components/Menu/Index';
import Router from './lib/Router';
import Helpers from './lib/Helpers';

export default class App {

    /**
     * init - Initialize the app
     * @return {void} Not meant to return
     */
    static init() {
        Header.render();
        Router.init();
        Footer.render();
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", Helpers.listHandler, false);
    }

}

App.init();

/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'SupermarketInvoicingSystem.Application',

    name: 'SupermarketInvoicingSystem',

    requires: [
        // This will automatically load all classes in the SupermarketInvoicingSystem namespace
        // so that application classes do not need to require each other.
        'SupermarketInvoicingSystem.*'
    ],

    // The name of the initial view to create.
    mainView: 'SupermarketInvoicingSystem.view.main.Main'
});

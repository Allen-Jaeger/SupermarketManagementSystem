Ext.define('SupermarketInvoicingSystem.profile.Tablet', {
    extend: 'Ext.app.Profile',

    requires: [
        'SupermarketInvoicingSystem.view.tablet.*'
    ],

    // Map tablet/desktop profile views to generic xtype aliases:
    //
    views: {
        email: 'SupermarketInvoicingSystem.view.tablet.email.Email',
        inbox: 'SupermarketInvoicingSystem.view.tablet.email.Inbox',
        compose: 'SupermarketInvoicingSystem.view.tablet.email.Compose',

        searchusers: 'SupermarketInvoicingSystem.view.tablet.search.Users'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    }
});

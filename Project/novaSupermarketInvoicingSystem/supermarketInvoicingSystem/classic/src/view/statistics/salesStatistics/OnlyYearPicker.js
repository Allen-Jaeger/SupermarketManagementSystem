
Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.OnlyYearPicker', {
    // xtype: 'onlyyearpicker',
    alias: 'widget.onlyyearpicker',
    extend: 'Ext.picker.Month',

    afterRender: function () {
        this.callParent();
        this.el.setStyle({
            width: '106px',
        })
    },

    renderTpl: [
        '<div id="{id}-bodyEl" data-ref="bodyEl" class="{baseCls}-body">',
            '<div id="{id}-monthEl" data-ref="monthEl" class="{baseCls}-months" style="display: none;">',
                '<tpl for="months">',
                    '<div class="{parent.baseCls}-item {parent.baseCls}-month">',
                        '<a style="{parent.monthStyle}" role="button" hidefocus="on" class="{parent.baseCls}-item-inner">{.}</a>',
                    '</div>',
                '</tpl>',
            '</div>',
            '<div id="{id}-yearEl" data-ref="yearEl" class="{baseCls}-years">',
                '<div class="{baseCls}-yearnav">',
                    '<div class="{baseCls}-yearnav-button-ct">',
                        '<a id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-prev" hidefocus="on" role="button"></a>',
                    '</div>',
                    '<div class="{baseCls}-yearnav-button-ct">',
                        '<a id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-next" hidefocus="on" role="button"></a>',
                    '</div>',
                '</div>',
                '<tpl for="years">',
                    '<div class="{parent.baseCls}-item {parent.baseCls}-year">',
                        '<a hidefocus="on" class="{parent.baseCls}-item-inner" role="button">{.}</a>',
                    '</div>',
                '</tpl>',
            '</div>',
            '<div class="' + Ext.baseCSSPrefix + 'clear"></div>',
            '<tpl if="showButtons">',
                '<div class="{baseCls}-buttons">{%',
                    'var me=values.$comp, okBtn=me.okBtn, cancelBtn=me.cancelBtn;',
                    'okBtn.ownerLayout = cancelBtn.ownerLayout = me.componentLayout;',
                    'okBtn.ownerCt = cancelBtn.ownerCt = me;',
                    'Ext.DomHelper.generateMarkup(okBtn.getRenderTree(), out);',
                    'Ext.DomHelper.generateMarkup(cancelBtn.getRenderTree(), out);',
                '%}</div>',
            '</tpl>',
        '</div>'
    ]
});

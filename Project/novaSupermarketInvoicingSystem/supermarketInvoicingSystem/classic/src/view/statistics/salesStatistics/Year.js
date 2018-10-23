Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.Year', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.yearfield',
    requires: ['Ext.picker.Month', 'SupermarketInvoicingSystem.view.statistics.salesStatistics.OnlyYearPicker'],
    alternateClassName: ['Ext.form.YearField', 'Ext.form.Year'],
    selectMonth: null,
    createPicker: function () { // Converted function to Chrome
        var me = this,
            format = Ext.String.format,
            pickerConfig;

        pickerConfig = {
            pickerField: me,
            ownerCmp: me,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                select: {
                    scope: me,
                    fn: me.onSelect
                },
                monthdblclick: {
                    scope: me,
                    fn: me.onOKClick
                },
                yeardblclick: {
                    scope: me,
                    fn: me.onOKClick
                },
                OkClick: {
                    scope: me,
                    fn: me.onOKClick
                },
                CancelClick: {
                    scope: me,
                    fn: me.onCancelClick
                }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            },
        };

        if (Ext.isChrome) {//若注释后暂无发现有影响
            me.originalCollapse = me.collapse;
            pickerConfig.listeners.boxready = {
                fn: function () {
                    this.picker.el.on({
                        mousedown: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseup: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: this
                    });
                },
                scope: me,
                single: true
            };
        }

        return Ext.create('SupermarketInvoicingSystem.view.statistics.salesStatistics.OnlyYearPicker', pickerConfig);
    },
    onCancelClick: function () {
        var me = this;
        me.selectMonth = null;
        me.collapse();
    },
    onOKClick: function () {
        var me = this;
        if (me.selectMonth) {
            me.setValue(me.selectMonth);
            me.fireEvent('select', me, me.selectMonth);
        }
        me.collapse();
    },
    onSelect: function (m, d) {
        var me = this;
        me.selectMonth = new Date(1+ '/1/' + d[1]);
    }
});

// Ext.create('Ext.form.field.Month', {
//     format: 'Y',
//     fieldLabel: 'Date',
//     renderTo: Ext.getBody()
// });

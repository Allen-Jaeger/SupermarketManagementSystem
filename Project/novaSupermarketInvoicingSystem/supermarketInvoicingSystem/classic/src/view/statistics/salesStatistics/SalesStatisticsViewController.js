
Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.SalesStatisticsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.salesStatisticsViewController',
  	/*theme*/
  	requires: [
        'Ext.chart.theme.Midnight',
        'Ext.chart.theme.Green',
        'Ext.chart.theme.Muted',
        'Ext.chart.theme.Purple',
        'Ext.chart.theme.Sky'
    ],

    themeNames: [
        'Midnight',
        'Green',
        'Muted',
        'Purple',
        'Sky',
        'Default'
    ],
  	  
    /*Bar3d chart function*/
    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label) / 1000;
        return value === 0 ? '$0' : Ext.util.Format.number(value, '$0K');
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value / 1000, '$0K');
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '$0,000');
    },

    onPreviewBar3dchart: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('bar3dchart');
        chart.preview();
    },

    onDownloadBar3dchart: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('bar3dchart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'bar3dChart'
            });
        } else {
            chart.preview();
        }
    },
    

    /*Pie chart function*/
   
	onThemeSwitch: function () { 
        var chart = this.lookup('piechart'),
	        themeNames = this.themeNames,
	        currentThemeName = Ext.getClassName(chart.getTheme()).split('.').pop(),
	        currentIndex = Ext.Array.indexOf(themeNames, currentThemeName),
	        nextThemeName = themeNames[++currentIndex % themeNames.length];

        chart.setTheme(nextThemeName);
        chart.redraw();
    },
    
    onPreviewPiechart: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('piechart');
        chart.preview();
    },

    onDownloadPiechart: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('piechart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'pieChart'
            });
        } else {
            chart.preview();
        }
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('quarter') + ': ' + record.get('quarterSales') + '%');
    },
  
  
});
/**
 * Created with Visual Studio 2012.
 * Author: wangxiaoyu
 * Date: 2015-08-14
 * Time: 下午17:04
 */
$.extend($.fn.datagrid.methods, {
    /**
     * @param {} jq
     * @param {} params 提示消息框的样式
     * @return {}
     */
    doCellTip: function(jq, params) {
        function showTip(data, td, e) {
            if ($(td).text() == "")
                return;
            params = params || {};
            data.tooltip.text($(td).text()).css({
                top: (e.pageY + 10) + 'px',
                left: (e.pageX + 20) + 'px',
                'z-index': $.fn.window.defaults.zIndex,
                display: 'block'
            });
        };
        return jq.each(function() {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var defaultCls = {
                    'border': '1px solid #333',
                    'padding': '1px',
                    'color': '#333',
                    'background': '#f7f5d1',
                    'position': 'absolute',
                    'max-width': '350px',
                    'border-radius': '4px',
                    '-moz-border-radius': '4px',
                    '-webkit-border-radius': '4px',
                    'display': 'none'
                };
                var tooltip = $("<div id='celltip'></div>").appendTo('body');
                tooltip.css($.extend({}, defaultCls, params));
                options.tooltip = tooltip;
                var panel = grid.datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').each(function() {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {
                        'mouseover': function(e) {
                            if (params) {
                                if (options.tipDelayTime)
                                    clearTimeout(options.tipDelayTime);
                                var that = this;
                                options.tipDelayTime = setTimeout(
                                        function () {
                                            showTip(options, that, e);
                                        }, params.delay);
                            } else {
                                showTip(options, this, e);
                            }
                        },
                        'mouseout': function (e) {
                            if (options.tipDelayTime)
                                clearTimeout(options.tipDelayTime);
                            options.tooltip.css({
                                'display': 'none'
                            });
                        },
                        'mousemove': function (e) {
                            var that = this;
                            if (options.tipDelayTime) {
                                clearTimeout(options.tipDelayTime);
                                options.tipDelayTime = setTimeout(
                                        function () {
                                            showTip(options, that, e);
                                        }, params.delay);
                            } else {
                                showTip(options, that, e);
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * 关闭消息提示功能
     * @param {} jq
     * @return {}
     */
    cancelCellTip: function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.tooltip) {
                data.tooltip.remove();
                data.tooltip = null;
                var panel = $(this).datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').undelegate('td',
                    'mouseover').undelegate('td', 'mouseout')
                    .undelegate('td', 'mousemove');
            }
            if (data.tipDelayTime) {
                clearTimeout(data.tipDelayTime);
                data.tipDelayTime = null;
            }
        });
    }
});


$.extend($.fn.combobox.methods, {
    setValues: function(jq,values,isfilter) {
        return jq.each(function () {
            var target = this;
            var opts = $.data(target, 'combobox').options;
            var data = $.data(target, 'combobox').data;
            var panel = $(target).combo('panel');
            panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
            var vv = [], ss = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                var s = v;
                for (var j = 0; j < data.length; j++) {
                    if (data[j][opts.valueField] == v) {
                        s = data[j][opts.textField];
                        vv.push(v);
                        ss.push(s);
                        break;
                    }
                }               
             panel.find('div.combobox-item[value=' + v + ']').addClass('combobox-item-selected');
            }
            $(target).combo('setValues', vv);
            if (!remainText) {
                $(target).combo('setText', ss.join(opts.separator));
            }
        });
    }
});
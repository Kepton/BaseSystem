




//处理json后日期格式
function formatterDate(date) {

    if (date == undefined) {
        return "";
    }
    ///Date(1464105600000)/
    /*json格式时间转js时间格式*/
    if (date.indexOf("Date") < 0)
        return date;
    date = date.substr(1, date.length - 2);
    var obj = eval('(' + "{Date: new " + date + "}" + ')');
    var date = obj["Date"];
    if (date.getFullYear() < 1900) {
        return "";
    }
    //var datetime = date.pattern("yyyy-MM-dd");
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate());
    return datetime;
}

//easyui扩展日期控件
$.extend($.fn.datagrid.defaults.editors, {
    my97: {
        init: function (container, options) {
            //var input = $('<input class="Wdate" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',readOnly:true});"  />').appendTo(container);
            var input = $('<input class="Wdate" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\',readOnly:false});"  />').appendTo(container);
            return input;
        },

        getValue: function (target) {
            return $(target).val();
        },

        setValue: function (target, value) {
            value = formatterDate(value);
            $(target).val(value);
        },

        resize: function (target, width) {
            var input = $(target);
            if ($.boxModel == true) {
                input.width(width - (input.outerWidth() - input.width()));
            } else {
                input.width(width);
            }
        }
    }
});
//easyui扩展单元格点击事件
$.extend($.fn.datagrid.methods, {
    editCell: function (jq, param) {
        return jq.each(function () {

            var opts = $(this).datagrid('options');
            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                //if (fields[i] != param.field) {
                //    col.editor = null;
                //}
            }
            $(this).datagrid('beginEdit', param.index);
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor = col.editor1;
            }
        });
    }
});

$.extend($.fn.datagrid.defaults.editors, {
    mycheckbox: {
        init: function (container, options) {
            var input = $('<input type="checkbox" name="mycheckbox" />').appendTo(container);
            return input;
        },
        destroy: function (target) {
            $(target).remove();
        },
        getValue: function (target) {
            var cb = $(target)[0].checked;
            if (cb) {
                $(target).attr("value",1);
                return 1;
            }
            else {
                $(target).attr("value", 0);
                return 0;
            }
            //return $(target).val();
        },
        setValue: function (target, value) {
            if (value === 1) {
                $(target).attr("checked", true);
                $(target).attr("value", 1);
                //$(target).val('1');
            }
            else {
                $(target).removeAttr("checked");
                $(target).attr("value", 0);
                //$(target).val('0');
            }
            //$(target).val(value);
        },
        resize: function (target, width) {
            $(target)._outerWidth(width);
        }
    }
});
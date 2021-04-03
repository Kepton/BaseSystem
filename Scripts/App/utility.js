JSUtility = new function () {
    this.getURLParameter = function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };
    this.isNullOrWhitespace = function (input) {
        if (typeof input === 'undefined' || input == null || input == '') return true;
        return input.toString().replace(/\s/g, '').length < 1;
    };
    this.htmlToText = function (html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    };
    this.trim = function () {
        return string.replace(/(^\s*)|(\s*$)/g, "");
    };
    this.cutstr = function cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    };
    this.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

JSUtility.PostAjax = function (urlstr, effectRowdata, callback)
{
    $.ajax({
        type: "POST",
        async: false,
        url: urlstr,
        data: effectRowdata,
        //dataType: "json",
        success: function (result) {
                callback(result);           
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            JSUtility.ErrorAlert("提示", XMLHttpRequest.responseText);
        }
    });
}

JSUtility.Ajax = function (url, param, callback) {
    $.ajax({
        type: "GET",
        url: url,
        data: param,
        dataType: "json",
        success: function (data) {
                callback(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            JSUtility.ErrorAlert("提示", XMLHttpRequest.responseText);
        }
    });
}

JSUtility.Form = function (formId, url, callback) {
    $('#' + formId).form('submit', {
        url: url,
        onSubmit: function () {

            return true;
        },
        success: function (data) {
            var data = eval('(' + data + ')');
            if (data.Success) {
                callback(data);
            }
            else {
                JSUtility.ErrorAlert('Error', data.Error);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}


JSUtility.InitEasyuiTable = function (object, url, title, columns, queryData, toolbarId, onLoadSuccess, onClickRow) {
    object.datagrid({
        //width:100,
        url: url,
        title: title,
        //width:200,
        height: getHeight(),
        //fit: true,
        fitColumns: true,
        nowrap: true,
        singleSelect: true,
        autoRowHeight: true,
        striped: true,
        collapsible: false,
        loadMsg: '',
        pagination: true,
        pageSize: 20,
        pageList: [20, 50, 100],
        rownumbers: true,
        sortOrder: 'asc',
        remoteSort: false,
        idField: 'id',
        queryParams: queryData,
        columns: [columns],
        rowStyler: function (index, row) {
            //if (row.RangeStatus == '@((int)STEMS.IMMS.CertificateManage.EnumCertificateRangeStatus.OutRangeDate)') {
            //    return 'background-color:red;';
            //} else if (row.RangeStatus == '@((int)STEMS.IMMS.CertificateManage.EnumCertificateRangeStatus.RangeDate)') {
            //    return 'background-color:#ff8989;';
            //} else if (row.RangeStatus == '@((int)STEMS.IMMS.CertificateManage.EnumCertificateRangeStatus.UnRangeDate)') {
            //    return 'background-color:yellow;';
            //}
        },
        toolbar: '#' + toolbarId,
        onClickRow: function (index, row) { onClickRow(index, row); },
        onLoadSuccess: onLoadSuccess
    });
}

JSUtility.ReloadTable = function (object) {
    object.datagrid('reload');
}

JSUtility.InitEasyuiTreeTable = function (object, url, title, columns, toolbarId, onClickRow, onLoadSuccess, frozenColumns) {
    object.treegrid({
        url: url,
        title: title,
        //width:200,
        //fit: true,
        height: getHeight(),
        nowrap: true,
        fitColumns: true,
        singleSelect: true,
        striped: true,
        // border: 1,
        collapsible: false,
        loadMsg: '',
        rownumbers: false,
        remoteSort: false,
        idField: 'id',
        treeField: 'NameDisplay',
        frozenColumns: [frozenColumns],
        columns: [columns],
        toolbar: '#' + toolbarId,
        onClickRow: function (rowData) { onClickRow(rowData); },
        onLoadSuccess: onLoadSuccess
    });
}

JSUtility.InitBootstrapTable = function (object, url, columns, idField, toolbarId) {
    object.bootstrapTable({
        method: 'get',
        height: getHeight(),
        url: url,
        dataType: "json",
        striped: true,	 //使表格带有条纹
        pagination: true,	//在表格底部显示分页工具栏
        showExport: true,
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 20, 50, 100, 200, 500],
        idField: idField,  //标识哪个字段为id主键
        showToggle: false,   //名片格式
        cardView: false,//设置为True时显示名片（card）布局
        showColumns: true, //显示隐藏列  
        showRefresh: true,  //显示刷新按钮
        singleSelect: true,//复选框只能选择一条记录
        search: true,//是否显示右上角的搜索框
        clickToSelect: true,//点击行即可选中单选/复选框
        sidePagination: "server",//表格分页的位置
        queryParams: queryParams, //参数
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        toolbar: "#" + toolbarId, //设置工具栏的Id或者class
        columns: columns, //列
        silent: true,  //刷新事件必须设置
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatNoMatches: function () {  //没有匹配的结果
            return '无符合条件的记录';
        },

        onLoadError: function (data) {
            //$('#reportTable').bootstrapTable('removeAll');
        },
        onClickRow: function (row) {
            //window.location.href = "/qStock/qProInfo/" + row.ProductId;
        }
    });
}

JSUtility.InitIgniteIgGrid = function (object, dataSource, columns, pkId, columnSettings) {
    $.ig.loader({
        resources: 'igGrid.Filtering.Sorting.Paging.Selection',
        ready: function () {
            $("#grid1").igGrid({
                columns: columns,
                autoGenerateColumns: false,
                width: '100%',
                primaryKey: pkId,
                height: getHeight() - 110,
                dataSource: dataSource,
                features: [
                    {
                        name: "Selection",
                        multipleSelection: true
                    },
                    {
                        name: "Sorting",
                        sortingDialogContainment: "window"
                    },
                    {
                        name: "Filtering",
                        advancedModeEditorsVisible: true,
                        type: "local",
                        columnSettings: columnSettings
                    },
                    {
                        name: "Paging",
                        type: "local",
                        showPageSizeDropDown: true,
                        pageSizeUrlKey: "page",
                        pageSizeList: [10, 20, 50],
                        pageSizeDropDownLocation: "inpager",
                        pageSize: 20
                    }]
            });
        }
    });
}

JSUtility.ErrorAlert = function (title, message) {
    $.messager.alert(title, message, "error");
}

JSUtility.Alert = function (title, message) {
    $.messager.alert(title, message, "info");
}

JSUtility.WarningAlert = function (title, message) {
    $.messager.alert(title, message, "warning");
}

JSUtility.Confirm = function (message, callback) {
    $.messager.confirm("确认", message, function (r) {
        callback(r);
    });
}

JSUtility.ClearForm = function (formId) {
    $('#' + formId).form('clear');
}
function getHeight() {
    return $(window).height() - $('.headerbar').outerHeight(true) - 70;
}

function SSOPolling() {
    JSUtility.Ajax('/Login/SSOPolling', '', function () {

    });
}

JSUtility.Binding = function (container, data) {
    $("[name]", container).each(function () {
        var attr_name = $(this).attr("name");
        var value = data[attr_name];
        $(this).val(value);
    });
    $(".easyui-datebox", container).each(function () {
        var attr_name = $(this).attr("textboxname");
        var value = data[attr_name];
        $("#" + attr_name).datebox('setValue', value);
    });
}

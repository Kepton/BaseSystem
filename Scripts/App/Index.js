

var formChanged = 0;
var data;
var menuData = {
    "menu": [
        {
            "ID": "hmenu1",
            "name": "主页",
            "module_id": "ShipMng",
            "parent_id": null,
            "flag": 2
        },
        
        {
            "ID": "hmenu7",
            "name": "系统设置",
            "module_id": "ShipMng",
            "parent_id": null,
            "flag": 2
        }, {
            "ID": "vmenu1",
            "name": "主页",
            "module_id": "ShipMng",
            "parent_id": "hmenu1",
            "flag": 2,
            "URL": "/Areas/SystemConfigure/index.html"
        }, 
        {
            "ID": "vmenu10",
            "name": "人员维护",
            "module_id": "ShipMng",
            "parent_id": "hmenu7",
            "flag": 2,
            "URL": "/Areas/SystemConfigure/ryList.html"
        }
       
    ]
};
window.onload = function () {

    timer();
    data = eval(menuData);
    var dataStr = JSON.stringify(menuData);
    $.cookie("userAuth", dataStr);
    BuildHMenu();
    //console.log(data);
    //选中第一个菜单
    //$("ul li a:first").addClass("current");
}


function BuildHMenu() {
    var hMenuEle = $("ul#ul_cartList");
    hMenuEle.empty();
    var hMenu = data.menu.filter(function (value) {
        return (value.parent_id == null);
    });

    if (hMenu.length > 0) {
        var hMenuHtml = Mustache.to_html($("#headMenuTemplate").html(), { menu: hMenu });
        hMenuEle.append(hMenuHtml);
    }
}

function BuildVMenu(parentid) {
    $("ul#ul_cartList>li>a.current").removeClass("current");
    var vMenuEle = $("ul#ul_menu");
    vMenuEle.empty();
    //console.log($.cookie("userAuth"));
    //var data = eval(JSON.parse($.cookie("userAuth")));
    //console.log(data);
    var vMenu = data.menu.filter(function (value) {
        return (value.parent_id === parentid);
    }, parentid);

    if (vMenu.length > 0) {
        var vMenuHtml = Mustache.to_html($("#sideMenuTemplate").html(), { menu: vMenu });
        vMenuEle.append(vMenuHtml);
    }
    var selector = "ul#ul_cartList>li>a#" + parentid;
    $(selector).addClass("current");
}

function Redirect2URL(id, parentId, url) {
    $("ul#ul_menu>li>a.active111").removeClass("active111");
    //console.log(url);
    //$.cookie(url, id + "," + parentId);
    //location.href = url;
    var currentLiEle = $("a#" + id);
    currentLiEle.addClass("active111");
    $("div#tabTitle").attr("title", currentLiEle.innerText);
    document.getElementById("mainFrame").src = url;

}

//隐藏展示页面元素

// header.html中截取
function hideHead(o) {
    if (o.src.indexOf('header_off') > -1) {
        o.src = "images/header_on.png";
        o.title = "展开";
        $("#top").hide();
        parent.layoutDiv(35);
    } else {
        o.src = "images/header_off.png";
        o.title = "收起";
        $("#top").show();
        parent.layoutDiv(94);
    }
}

function changeTab(o, url) {
    //点击后要加载左侧菜单
    var liLength = $("#ul_cartList li").length;
    for (var i = 0; i < liLength; i++) {
        var aElement = $("#ul_cartList li a")[i];
        aElement.className = "";
    }
    o.className = "current";
    //修改
    //var lastUrl = parent.mainFrame.location.href;
    //parent.mainFrame.location.href = url;
}
function openMenu(id, title, url) {
    $("ul#ul_menu>li>a.active111").removeClass("active111");
    //console.log(url);
    //$.cookie(url, id + "," + parentId);
    //location.href = url;
    var currentLiEle = $("a#" + id);
    currentLiEle.addClass("active111");
    parent.addTab(title, url, '', id);
}

function logout() {
    if (window.confirm("确定要退出系统？")) {
        //location.href = "logout.jsp";
    }
}

//function revertLanguage(o) {
//    $.ajax({
//        url: '${ctx}/base/changeLang.do',
//        type: 'post',
//        success: function (data) {
//            parent.document.location.href = "${ctx}/index.do";
//        }
//    });
//}


$(document).ready(function () {

    /*多语言*/
    if (!JSUtility.isNullOrWhitespace($.cookie('language'))) {
        $('#language').val($.cookie('language'));
    } else {
        $('#language').val($('#language option:first').val());
        $.cookie('language', $('#language').val(), { path: '/' });
    }
    $('#language').on('change', function () {
        $.cookie('language', this.value, { path: '/' });
        window.location.reload();
    });

    //$.cookie('language', 'zh_CN');
    //console.log(globalPageLangData);
    $(function () {
        //timer();
        data = eval(menuData);
        //var dataStr = JSON.stringify(menuData);
        //$.cookie("userAuth", dataStr);
        BuildHMenu(data);
        $('#s_input_1').bind({
            focus: function () {
                if (this.value === this.defaultValue) {
                    $(".nui_ipt_placeholder").hide();
                    $(".sJ0").css("opacity", ".5", "filter", "alpha(opacity=50)");
                }
            },
            blur: function () {
                if (this.value === "") {
                    $(".sJ0").css("opacity", ".3", "filter", "alpha(opacity=30)");
                    $(".nui_ipt_placeholder").show();
                }
            }
        });
        $('#dataForm').window({
            title: 'Window',
            width: 500,
            height: 300,
            closed: true,

            minimizable: false,
            top: 50,
            onBeforeClose: function () {
                if (formChanged && formChanged === 1) {
                    if (window.confirm("数据有变化，是否退出？")) {
                        return true;
                    } else {
                        return false;
                    }
                }
                //还原最大化窗口
                $('#dataForm').window("restore");
                //展开窗口  
                $('#dataForm').window("expand");

                return true;
            },
            onClose: function () {
                formChanged = 0;
            },
            modal: true,
            maximizable: true
        });

        $(".side_menu ul li").menu1();
    });
});

function layoutDiv(size) {
    $('#easyui-layout').layout('panel', 'north').panel('resize', {
        height: size
    });
    $('#easyui-layout').layout('resize');
}

function showLeftMenu(flag) {
    if (!flag) {
        $('#easyui-layout').layout('collapse', 'west');
    } else {
        $('#easyui-layout').layout('expand', 'west');
    }
}

//function openMenu(o, url, title, id) {
//    debugger
//    parent.mainFrame.location.href = url;
//}


function addTab(subtitle, url, icon, id, closable) {
    //如果已经存在同一标题的标签，则先关闭之前的，再重新打开
    //url = "localhost:26591/" + url;
    if ($('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('close', subtitle);
    }
    //如果url是启动流程，且带中文启动节点名称，则将startNodeName参数重新编码，后台需要解码，
    //startNodeName必须是最后一个参数
    if (url.indexOf("startProcessActivity") > -1 && url.indexOf("startNodeName") > -1) {
        var s = url.substring(url.lastIndexOf('=') + 1, url.length);
        url = url.substring(0, url.lastIndexOf('=')) + "=" + encodeURI(encodeURI(s));
    }
    $('#tabs').tabs('add', {
        title: subtitle,
        content: createFrame(url, id),
        closable: (closable == false) ? false : true,
        icon: icon
    });
    tabClose();
}
function createFrame(url, id) {
    if (url.indexOf("http") < 0) {//内部链接
        var rootPath = getRootPath();
        var strPath = window.document.location.pathname;
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);//上下文
        if (rootPath.indexOf(postPath) > -1 && url.indexOf(postPath) > -1) {
            url = url.substr(postPath.length + 1, url.length);
        }
        url = getRootPath() + "/" + url;
    }

    var s = '<iframe frameborder="0" marginheight=0 name="' + id + '" id="' + id + '" src="' + url
			+ '" style="width:100%;height:99.5%;"></iframe>';
    return s;
}

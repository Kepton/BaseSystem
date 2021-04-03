/*******************************************************************************
 * 作者：bo 创建日期：2013/10/21 tabs操作
 ******************************************************************************/

$(function() {
//	InitLeftMenu();
	tabClose();
	tabCloseEven();
	$('#tabs').tabs({
		onSelect : function(title) {
			var currTab = $('#tabs').tabs('getTab', title);
			var iframe = $(currTab.panel('options').content);
			// 切换到新页面时需要刷新
			// var src = iframe.attr('src');
			// if(src)
			// $('#tabs').tabs('update', { tab: currTab, options: { content:
			// createFrame(src)} });

		}
	});
})


function addTab(subtitle, url, icon, id, closable) {
	//如果已经存在同一标题的标签，则先关闭之前的，再重新打开
	if ($('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('close', subtitle);
	}
	//如果url是启动流程，且带中文启动节点名称，则将startNodeName参数重新编码，后台需要解码，
	//startNodeName必须是最后一个参数
	if(url.indexOf("startProcessActivity")>-1&&url.indexOf("startNodeName")>-1){
		var s=url.substring(url.lastIndexOf('=')+1,url.length);
		url=url.substring(0,url.lastIndexOf('='))+"="+encodeURI(encodeURI(s));
	}
	$('#tabs').tabs('add', {
		title : subtitle,
		content : createFrame(url,id),
		closable : (closable==false)?false:true,
		icon : icon
	});
	tabClose();
}

function createFrame(url,id) {
	if(url.indexOf("http")<0){//内部链接
		url=getRootPath()+"/"+url;
	}
	var s = '<iframe scrolling="auto" frameborder="0" name="' + id + '" id="' + id + '" src="' + url
			+ '" style="width:100%;height:98%;"></iframe>';
	return s;
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close', subtitle);
	})
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
}
//获取当前tab
function getCurrTab(){
	var currTab = $('#tabs').tabs('getSelected');
	return currTab;
}
//获取首页tab
function getMainTab(){
	var currTab = $('#tabs').tabs('getTab','首页');
	return currTab;
}
//获取指定tab
function getTabByName(tabName){
	var currTab = $('#tabs').tabs('getTab',tabName);
	return currTab;
}
//关闭当前tab
function closeCurTab(){
	var t=getCurrTab();
	$('#tabs').tabs('close', t.panel('options').title);
}
//刷新指定tab
function refreshTab(t){
	var url = $(t.panel('options').content).attr('src');
	var id = $(t.panel('options').content).attr('id');
	$('#tabs').tabs('update', {
		tab : t,
		options : {
			content : createFrame(url,id)
		}
	})
	t.panel('refresh');
	
}
//刷新当前tab
function refreshCurrTab(){
	refreshTab(getCurrTab());
}
function reloadDatagrid(){
	var currTab=getCurrTab();
	var frame=currTab.find('iframe');
	window[frame.attr('name')].tab.datagrid('reload');
	window[frame.attr('name')].tab.datagrid('clearSelections');
}
function getCurWin(){
	var currTab=getCurrTab();
	var frame=currTab.find('iframe');
	return window[frame.attr('name')];
}
function getMainWin(){
	var mainTab=getMainTab();
	if(mainTab){
		var frame=mainTab.find('iframe');
		return window[frame.attr('name')];
	}
}
function getWinByName(tabName){
	var mainTab=getTabByName(tabName);
	if(mainTab){
		var frame=mainTab.find('iframe');
		return window[frame.attr('name')];
	}
}
// 绑定右键菜单事件
function tabCloseEven() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		var id = $(currTab.panel('options').content).attr('id');
		$('#tabs').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url,id)
			}
		})
	})
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	})
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	})
}


// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}
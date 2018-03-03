// ==UserScript==
// @name         Leetcode: hide locked problems
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       zhengyc
// @match        https://leetcode.com/*
// @grant        none
// @license      MIT

$(document).ready(function() {
	
    // 延迟 3s 再执行，等待所有数据加载完毕
    setTimeout(hide, 3000);

    function hide() {
        var lockItems = $(".fa-lock");
        lockItems.parents('tr').hide();
        var header = $(".reactable-column-header");
        header.show();
    }
});
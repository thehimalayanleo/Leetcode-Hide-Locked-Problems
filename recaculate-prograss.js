// ==UserScript==
// @name         Leetcode: re-caculate prograss
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       zhengyc
// @match        https://leetcode.com/problemset/*
// @grant        none
// @license      MIT

// ==/UserScript==

$(document).ready(function() {
    
    // 设置每页显示所有题目，为了方便计数
    var itemsPerPage = localStorage["problem-list:itemsPerPage"];
    if (itemsPerPage != 9007199254740991) {
        localStorage["problem-list:itemsPerPage"] = 9007199254740991;
        location.reload();
    }

    // 延迟 3s 再执行，等待所有数据加载完毕
    setTimeout(caculate, 3000);

    function caculate() {
        var allCnt = caculateTotallCnt();
        var lockCnt = caculateLcokCnt();
        var acCnt = caculateAcCnt();
        console.info("隐藏题目总数量：" + lockCnt);
        changeCntContent(acCnt, allCnt - lockCnt);
        changetodoCntContent(allCnt - lockCnt - acCnt);
    }

    // 计算题目的总数量
    function caculateTotallCnt() {
        var content = getStatusBarContent();
        var totallCnt = content.split("/")[1];
        return totallCnt.substring(0, 3);
    }

    // 计算加锁题目的数量
    function caculateLcokCnt() {
        var lockItems = $(".fa-lock");
        return lockItems.length;
    }

    // 计算通过的题目数量
    function caculateAcCnt() {
        var content = getStatusBarContent();
        return content.split("/")[0];
    }

    function getStatusBarContent() {
        var statusBar = $("#welcome > span > span.label.label-primary.round");
        return statusBar.text();
    }

    function changeCntContent(acCnt, actualTotalCnt) {
        var cntContent = $(".progress-status>.text-success>.status");
        cntContent.html(acCnt + "/" + actualTotalCnt);
    }

    function changetodoCntContent(todoCnt) {
        var todoContent = $("#user-progress-app > div > div > div > div > ul > li.list-group-item.chart-elem > div.row.progress-status > div.col-xs-4.text-primary.text-center > div");
        todoContent.html(todoCnt);
    }
});
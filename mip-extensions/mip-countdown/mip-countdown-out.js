(window.MIP = window.MIP || []).push({name:"mip-countdown",func: function () {// ======================
// mip-countdown/mip-countdown.js
// ======================


/**
 * @file mip-countdown 组件
 * @author lilangbo@baidu.com
 */
define('mip-countdown/mip-countdown', [
    'require',
    'customElement',
    'util'
], function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var setInt;
    // 定时器
    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var endTime = element.getAttribute('endTime') * 1000;
        var startTime = element.getAttribute('startTime') * 1000;
        var duration = element.getAttribute('duration') * 1000;
        var currentDate = new Date().getTime();
        // 参数错误
        if (!endTime && !duration) {
            element.parentNode.removeChild(element);
        }    // 倒计时已结束
        else if (endTime < currentDate && endTime > 0) {
            var end = element.querySelector('.mip-countdown-end');
            if (end) {
                util.css(end, 'display', 'block');
            }
        }    // 倒计时还未开始
        else if (!duration && startTime > currentDate) {
            var notStart = element.querySelector('.mip-countdown-not-start');
            if (notStart) {
                util.css(notStart, 'display', 'block');
            }
        }    // duration 优先级高，重写endTime的值，并且将 startTime 置为null。
        else {
            if (duration > 0) {
                endTime = currentDate + duration;
                startTime = null;
            }
            var running = element.querySelector('.mip-countdown-running');
            if (running) {
                util.css(running, 'display', 'block');
                running.classList.add('mip-countdown-running-active');
            }
            var days;
            // 天数
            var hours;
            // 小时数
            var minutes;
            // 分钟数
            var seconds;
            // 秒数
            var countdown = document.getElementById('mip-countdown-tiles');
            // get tag element
            getCountdown();
            setInt = setInterval(function () {
                getCountdown();
            }, 1000);
            function getCountdown() {
                var now = new Date().getTime();
                // find the amount of "seconds" between now and target
                var seconds_left = (endTime - now) / 1000;
                if (seconds_left < 0) {
                    clearInterval(setInt);
                    var end = element.querySelector('.mip-countdown-end');
                    if (end) {
                        util.css(end, 'display', 'block');
                    }
                    util.css(running, 'display', 'none');
                    return;
                }
                days = pad(parseInt(seconds_left / 86400));
                seconds_left = seconds_left % 86400;
                hours = pad(parseInt(seconds_left / 3600));
                seconds_left = seconds_left % 3600;
                minutes = pad(parseInt(seconds_left / 60));
                seconds = pad(parseInt(seconds_left % 60));
                // format countdown string + set tag value
                countdown.innerHTML = '<span>' + days + '</span><span>' + hours + '</span><span>' + minutes + '</span><span>' + seconds + '</span>';
            }
            function pad(n) {
                return (n < 10 ? '0' : '') + n;
            }
        }
    };
    // 从文档中移出节点回调
    customElement.prototype.detachedCallback = function () {
        clearInterval(setInt);
    };
    return customElement;
}), define('mip-countdown', ['mip-countdown/mip-countdown'], function (main) {
    return main;
});

// =============
// bootstrap
// =============
(function () {
    function registerComponent(mip, component) {
        mip.registerMipElement("mip-countdown", component, "mip-countdown .mip-countdown-not-start,mip-countdown .mip-countdown-running,mip-countdown .mip-countdown-end{display:none}mip-countdown .mip-countdown-running,mip-countdown .mip-countdown-not-start,mip-countdown .mip-countdown-end{position:absolute;top:0;bottom:0;left:0;right:0}mip-countdown .mip-countdown-running{width:100%;height:112px;text-align:center;background:#222;background-image:-webkit-linear-gradient(top, #222, #333, #333, #222);background-image:-moz-linear-gradient(top, #222, #333, #333, #222);background-image:-ms-linear-gradient(top, #222, #333, #333, #222);background-image:-o-linear-gradient(top, #222, #333, #333, #222);border:1px solid #111;border-radius:5px;box-shadow:0 0 8px rgba(0,0,0,0.6);margin:auto;padding:24px 0}mip-countdown .mip-countdown-running:before{content:\"\";width:8px;height:65px;background:#444;background-image:-webkit-linear-gradient(top, #555, #444, #444, #555);background-image:-moz-linear-gradient(top, #555, #444, #444, #555);background-image:-ms-linear-gradient(top, #555, #444, #444, #555);background-image:-o-linear-gradient(top, #555, #444, #444, #555);border:1px solid #111;border-top-left-radius:6px;border-bottom-left-radius:6px;display:block;position:absolute;top:48px;left:-10px}mip-countdown .mip-countdown-running:after{content:\"\";width:8px;height:65px;background:#444;background-image:-webkit-linear-gradient(top, #555, #444, #444, #555);background-image:-moz-linear-gradient(top, #555, #444, #444, #555);background-image:-ms-linear-gradient(top, #555, #444, #444, #555);background-image:-o-linear-gradient(top, #555, #444, #444, #555);border:1px solid #111;border-top-right-radius:6px;border-bottom-right-radius:6px;display:block;position:absolute;top:48px;right:-10px}mip-countdown .mip-countdown-running #mip-countdown-tiles{position:relative;z-index:1}mip-countdown .mip-countdown-running #mip-countdown-tiles>span{width:21%;max-width:21%;font:bold 48px 'Droid Sans',Arial,sans-serif;text-align:center;color:#111;background-color:#ddd;background-image:-webkit-linear-gradient(top, #bbb, #eee);background-image:-moz-linear-gradient(top, #bbb, #eee);background-image:-ms-linear-gradient(top, #bbb, #eee);background-image:-o-linear-gradient(top, #bbb, #eee);border-top:1px solid #fff;border-radius:3px;box-shadow:0 0 12px rgba(0,0,0,0.7);margin:0 2%;padding:18px 0;display:inline-block;position:relative}mip-countdown .mip-countdown-running #mip-countdown-tiles>span:before{content:\"\";width:100%;height:13px;background:#111;display:block;padding:0 3px;position:absolute;top:41%;left:-3px;z-index:-1}mip-countdown .mip-countdown-running #mip-countdown-tiles>span:after{content:\"\";width:100%;height:1px;background:#eee;border-top:1px solid #333;display:block;position:absolute;top:48%;left:0}mip-countdown .mip-countdown-running .labels{width:100%;height:25px;text-align:center;position:absolute;bottom:8px;display:none}mip-countdown .mip-countdown-running-active .labels{display:block}mip-countdown .mip-countdown-running .labels li{width:24%;font:bold 15px 'Droid Sans',Arial,sans-serif;color:#f47321;text-shadow:1px 1px 0 #000;text-align:center;text-transform:uppercase;display:inline-block}");
    }
    if (window.MIP) {
        require(["mip-countdown"], function (component) {
            registerComponent(window.MIP, component);
        });
    }
    else {
        require(["mip", "mip-countdown"], registerComponent);
    }
})();

}});
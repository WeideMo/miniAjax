/*
 * author: WeideMo
 * email: 412511016@qq.com
 * source: https://github.com/WeideMo/miniAjax
 **/
!function (ob) {
    function formatParams(data, random) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        if(random){
            arr.push(("v=" + Math.random()).replace(".", ""));
        }   
        return arr.join("&");
    }
    ob.ajax = function(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data, true);

        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    ob.jsonp = function(options) {
        options = options || {};
        if (!options.url || !options.callback) {
            throw new Error("参数不合法");
        }
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        options.data[options.callback] = callbackName;
        var params = formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            options.success && options.success(json);
        };

        oS.src = options.url + '?' + params;
        if (options.time) {
            oS.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({ message: "超时" });
            }, time);
        }
    };

    ob.ready = function (readyFn) {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                readyFn && readyFn();
            }, false);
        } else {
            var bReady = false;
            document.attachEvent('onreadystatechange', function () {
                if (bReady) {
                    return;
                }
                if (document.readyState == 'complete' || document.readyState == "interactive") {
                    bReady = true;
                    readyFn && readyFn();
                };
            });

            if (!window.frameElement) {
                setTimeout(checkDoScroll, 1);
            }
            function checkDoScroll() {
                try {
                    document.documentElement.doScroll("left");
                    if (bReady) {
                        return;
                    }
                    bReady = true;
                    readyFn && readyFn();
                }
                catch (e) {
                    setTimeout(checkDoScroll, 1);
                }
            };
        }
    };
}(window || this)
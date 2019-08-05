# miniAjax
A mini Ajax library provides Ajax, jsonp and ready features for simple web applications.

![miniAjax](https://www.moweide.com/miniAjax.png)

## Browsers support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ✔                                        | ✔                                        | ✔                                        | ✔                                        | ✔                                             | ✔  

## Usage

There are only 3 interfaces in miniAjax, including Ajax, jsonp and ready functions:

### ajax

```javascript
ajax({
    url: "./testXhr.php",                       //links to server
    type: "POST",                               //request method
    data: { name: "WeideMo", age: 26 },         //request params
    dataType: "json",                           //received dataType
    success: function (response, xml) {
        // do something when success
    },
    fail: function (status) {
        // do something when fail
    }
});
```

### jsonp

```javascript
jsonp({
    url:"https://github.com/WeideMo/",  //links to server
    callback:"callback",                //reception callback name negotiated with the backend-server
    data:{id:"1000120"},                //request params
    success:function(json){
        // do something when success
    },
    fail:function(){
        // do something when fail
    },
    time:10000                          //custom timeout
})
```

### ready

```javascript
ready(function(){
    // do something when page ready
})
```

## Fetures

### High coverage of browsers

Almost support all of the browsers, even the original IE series.

### light Weight

The compressed version is less than 2K, if you use gzip, it will be less than 1K.

### Pure

MiniAjax is just the basic requirement to meet web development.It's only responsible for three things: `Ajax` , `jsonp` and `ready`.


## More

You can get more principles and usage ->[https://github.com/WeideMo/jsonp](https://github.com/WeideMo/jsonp)

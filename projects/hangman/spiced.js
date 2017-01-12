window.spiced = {
    get: function(url, callback) {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState != XMLHttpRequest.DONE) {
                return;
            }
            var status;
            try {
                status = xhr.status;
            } catch(e) {
                return callback();
            }
            if (status != 200) {
                return callback();
            }
            var responseText = xhr.responseText;
            var isJson = !xhr.getResponseHeader('content-type').indexOf('application/json');
            if (!isJson) {
                return callback(responseText);
            }
            var data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                return callback();
            }
            callback(data);
        });
    }
};

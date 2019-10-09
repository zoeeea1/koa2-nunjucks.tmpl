$(document).ready(function () {
    setCanvasRound();
})



/****** 圆形进度条 JS 代码 */
var circle_position = 150;
var circle_size = 100;//圆外围大小
var circle_r = 50;//半径
var circle_p = 0;//进度

function setCanvasRound() {
    for (var i = 0; i < document.getElementsByClassName("showds").length; i++) {
        var val = document.getElementsByClassName("showds")[i].attributes["data-val"].value;

        var id = document.getElementsByClassName("showds")[i].attributes["data-id"].value;

        document.getElementsByClassName("showds")[i].innerText = val + "%";

        drawProgressbg(id);
        // alert(id,val)
        countInterval(id, val);
    }
}

function drawProgressbg(id) {
    // 使用 wx.createContext 获取绘图上下文 context
    var c = document.getElementById("canvasProgressbg" + id);
    var ctx = c.getContext("2d");
    ctx.lineWidth = 6;// 设置圆环的宽度
    ctx.strokeStyle = '#feebeb'; // 设置圆环的颜色
    ctx.lineCap = 'round'; // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(circle_position, circle_position / 2, circle_r, 0, 2 * Math.PI, false);
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
}

function drawCircle(id, val) {
    var c = document.getElementById("canvasProgress" + id);

    var context = c.getContext("2d");
    // 设置渐变a
    var gradient = context.createLinearGradient(circle_position, circle_position, circle_position, 0);
    gradient.addColorStop("1", "#ff6a85");
    //gradient.addColorStop("0.5", "#ff6d87");
    gradient.addColorStop("0", "#ffb0a2");
    context.shadowBlur = 4;
    context.shadowColor = "#ff6a86";
    context.lineWidth = 10;
    context.strokeStyle = gradient;
    context.lineCap = 'round';
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(circle_position, circle_position / 2, circle_r, -Math.PI / 2, (val / 50) * Math.PI - Math.PI / 2, false);
    context.stroke();
}

function countInterval(id, val) {
    drawCircle(id, val);
}
function getScale(e) {
    var winW = document.body.offsetWidth;
    var biLi = winW * (e / 750);
    return biLi;
}
import { Component, OnInit } from "@angular/core";
import * as $ from 'jquery';

@Component({
  selector: "ngx-canvas-chart",
  templateUrl: "./canvas-chart.component.html",
  styleUrls: ["./canvas-chart.component.scss"]
})
export class CanvasChartComponent implements OnInit {
  folders = [{ name: "nadsa", updated: "nadsa" }, { name: "nadsa", updated: "nadsa" }, { name: "nadsa", updated: "nadsa" }];

  timeOutAnimatePontoSelecionado;
  tAtual = 0;
  pts = [];
  constructor() {

  }

  ngOnInit() {
    $(".col").css("background-color", "#000");
    var heightColProjeto = $(".col-projeto").css("height");
    $(".row-pai").css("height", heightColProjeto);

    // console.log(c);
    // $(".row-detalhe").css("background", 'url(' + c.toDataURL() + ')');
    this.animate(0.5, null);
  }


  hexToCanvasColor(hexColor, opacity) {
    // Convert #AA77CC to rbga() format for Firefox
    opacity = opacity || "1.0";
    hexColor = hexColor.replace("#", "");
    var r = parseInt(hexColor.substring(0, 2), 16);
    var g = parseInt(hexColor.substring(2, 4), 16);
    var b = parseInt(hexColor.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  }

  drawPoint(ctx, point, r, color) {

    var x = point.x, y = point.y;
    ctx.save();

    var diametro = 2;
    if (point.isSelecionado) {
      color = "#64bdf0";
      diametro = point.diametroSelecionado;
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = this.hexToCanvasColor(color, 0.8);
    ctx.arc(x, y - 1, diametro, 0.0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    if (point.label) {
      ctx.beginPath();
      var yOffset = (y >= 50) ? y - 12 : y + 13;
      ctx.fillStyle = "#090909";
      ctx.font = "14px Georgia";
      ctx.fillText(point.label, x - 8, yOffset);
      ctx.closePath();
    }

    ctx.restore();

  }


  getControlPoints(x0, y0, x1, y1, x2, y2, t) {

    if (y0 == y1)
      t = 0;

    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    var d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    var fa = t * d01 / (d01 + d12);
    var fb = t - fa;

    var p1x = x1 + fa * (x0 - x2);
    var p1y = y1 + fa * (y0 - y2);

    var p2x = x1 - fb * (x0 - x2);
    var p2y = y1 - fb * (y0 - y2);

    return { p1x, p1y, p2x, p2y }
  }

  drawSpline(ctx, pts, t, closed, showDetails, width, height) {

    if (closed)
      this.drawSplineClosed(ctx, pts, t);
    else
      this.drawSplineOpen(ctx, pts, t);

    if (showDetails) {
      for (var i = 0; i < pts.length; i += 1) {
        this.drawPoint(ctx, pts[i], 1.5, "#f0f0f0f");
      }
    }
  }

  drawSplineClosed(ctx, pts, t) {
    ctx.lineWidth = 4;
    ctx.save();
    var cp = [];
    var n = pts.length;

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);

    pts.push({ x: pts[0].x, y: pts[0].y }, { x: pts[1].x, y: pts[1].y });
    pts.unshift(pts[n - 1]);
    for (var i = 0; i < n; i += 1) {
      cp = cp.concat(this.getControlPoints(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, pts[i + 2].x, pts[i + 2].y, t));
    }
    cp = cp.concat({ p1x: cp[0].p1x, p1y: cp[0].p1y });

    for (var i = 2; i < n + 2; i += 1) {
      ctx.bezierCurveTo(
        cp[i - 2].p2x, cp[i - 2].p2y,
        cp[i - 1].p1x, cp[i - 1].p1y,
        pts[i].x, pts[i].y);
    }

    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.fillStyle = '#8ED6FF';
    ctx.fill();
    ctx.strokeStyle = '#64bdf0';
    ctx.stroke();

    ctx.restore();

  }

  drawSplineOpen(ctx, pts, t) {
    ctx.lineWidth = 4;
    ctx.save();
    var cp = [];
    var n = pts.length;

    for (var i = 0; i < n - 4; i += 2) {
      cp = cp.concat(this.getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], t));
    }
    for (var i = 2; i < pts.length - 5; i += 2) {
      ctx.beginPath();
      ctx.moveTo(pts[i], pts[i + 1]);
      ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], pts[i + 2], pts[i + 3]);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    ctx.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3]);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(pts[n - 2], pts[n - 1]);
    ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 4], pts[n - 3]);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  getPoints(width, height, percCarregamento, pontoSelecionado) {
    if (this.pts.length == 0) {

      //ponto inferior para puxar o inicio do grafico para baixo
      this.pts.push({ x: -20, y: height + 10 });
      var larguraColuna = 30, x = 0, y = 0;
      var qtdDeNosReais = (width / larguraColuna) - 1;
      for (var i = 0; i <= qtdDeNosReais; i++) {
        var x = (i * 30) + 15,
          y = Math.round(((Math.random() * 100) / 2) + 10)
        this.pts.push({ x, y, label: y });
      }
      if (this.pts.length > 0) {
        //ponto para puxar a linha reta do grafico no inio
        this.pts.splice(1, 0, { x: -10, y: this.pts[1].y });
        //ponto para puxar a linha reta do grafico no final
        this.pts.push({ x: width + 10, y: this.pts[this.pts.length - 1].y });
      }
      //ponto para puxar a linha final do grafico pra baixo e fechar com a primeira
      this.pts.push({ x: width + 10, y: height + 10 });
    }

    var ptsClone = JSON.parse(JSON.stringify(this.pts));

    if (percCarregamento >= 0)
      ptsClone.forEach(function (value, index, array) {
        value.y = (array[index].y * percCarregamento) + (1.0 - percCarregamento) * height;
        value.isSelecionado = pontoSelecionado ? pontoSelecionado.indexSelecionado == index - 2 : false;
        value.diametroSelecionado = pontoSelecionado ? pontoSelecionado.diametroSelecionado : 0;
      });
    return ptsClone;
  }

  main(t, percCarregamento, pontoSelecionado) {

    var e = document.createElement('canvas'), ctx = e.getContext('2d');
    e.width = 30 * 32;
    e.height = 70;

    if (!ctx) { return }
    ctx.clearRect(0, 0, e.width, e.height);
    ctx.scale(1, 1);
    this.drawSpline(ctx, this.getPoints(e.width, e.height, percCarregamento, pontoSelecionado), t, true, percCarregamento == 1, e.width, e.height);

    $(".row-detalhe").css("background", 'url(' + e.toDataURL() + ')');
  }


  animate(t2, whenDone) {
    var qtdFrames = 20;
    var t1 = this.tAtual;
    for (var i = 0; i <= qtdFrames; i += 1) {

      (() => {
        var percCarregamento = i / qtdFrames;
        var tempoDeEspera = (qtdFrames * percCarregamento + 1) * 40;
        setTimeout(() => {
          var t = percCarregamento * t2 + t1;
          this.main(t, percCarregamento, null);
        }, tempoDeEspera);
      })();
    }

    setTimeout(() => {
      if (whenDone) { whenDone() };
    }, 3000);
  }

  animatePontoSelecionado(t2, indexSelecionado, whenDone) {
    var diametroSelecionado = 6;
    var qtdFrames = 3;
    clearTimeout(this.timeOutAnimatePontoSelecionado);
    for (var i = 0; i <= qtdFrames; i += 1) {

      (function () {
        var percCarregamento = i / qtdFrames;
        var tempoDeEspera = (qtdFrames * percCarregamento + 1) * 40;
        this.timeOutAnimatePontoSelecionado = setTimeout(function () {
          var diametroProporcional = percCarregamento * diametroSelecionado;
          this.main(t2, 1, { indexSelecionado, diametroSelecionado: diametroProporcional });
        }, tempoDeEspera);
      })();
    }
  }
}

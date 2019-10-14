import { Component, OnInit } from '@angular/core';
import * as jqueryAssigner from 'jquery';
import { ApontamentosService } from '../services/apontamentos.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.scss'],
})
export class CanvasChartComponent implements OnInit {
  folders = [
    { name: 'nadsa', updated: 'nadsa' },
    { name: 'nadsa', updated: 'nadsa' },
    { name: 'nadsa', updated: 'nadsa' },
  ];

  timeOutAnimatePontoSelecionado: any;
  tAtual = 0;
  pts = [];
  apontamentos: any;
  projetos = ['Projeto 1', 'Projeto 2', 'Projeto 3'];
  today = moment.now();
  daysInMonth: any[];
  constructor(private apontamentosService: ApontamentosService) {
    // this.apontamentosService.getApontamentos(1).subscribe(response => {
    //   console.log(response);
    // });
  }

  ngOnInit() {
    const numberOfDaysInThisMonth = moment().daysInMonth();
    this.daysInMonth = Array(numberOfDaysInThisMonth).fill('');
    jqueryAssigner('.col').css('background-color', '#000');
    const heighColOutros = jqueryAssigner('.col-outros').css('height');
    const heightTotal = heighColOutros;
    jqueryAssigner('.row-pai').css('height',
      Number(heightTotal.slice(0, -2)) * (3 + this.projetos.length) + 35 + 'px',
    );

    // console.log(c);
    // jqueryAssigner('.row-detalhe').css('background', 'url(' + c.toDataURL() + ')');
    this.animate(0.5, null);
  }

  // nao alocado - componente gráfico
  // falta abonada
  // ferias


  hexToCanvasColor(hexColor, opacity) {
    // Convert #AA77CC to rbga() format for Firefox
    opacity = opacity || '1.0';
    hexColor = hexColor.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
  }

  drawPoint(ctx, point, r, color) {

    const x = point.x, y = point.y;
    ctx.save();

    let diametro = 2;
    if (point.isSelecionado) {
      color = '#64bdf0';
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
      let yOffset = 0;
      if (y >= 50) {
        yOffset = y - 12;
        ctx.fillStyle = '#0083d9';
      } else {
        yOffset = y + 13;
        ctx.fillStyle = '#FFFFFF';
      }
      ctx.font = '14px Georgia';
      ctx.fillText(point.label, x - 8, yOffset);
      ctx.closePath();
    }

    ctx.restore();

  }


  getControlPoints(x0, y0, x1, y1, x2, y2, t) {

    if (y0 === y1)
      t = 0;

    const d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    const d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const fa = t * d01 / (d01 + d12);
    const fb = t - fa;

    const p1x = x1 + fa * (x0 - x2);
    const p1y = y1 + fa * (y0 - y2);

    const p2x = x1 - fb * (x0 - x2);
    const p2y = y1 - fb * (y0 - y2);

    return { p1x, p1y, p2x, p2y };
  }

  drawSpline(ctx, pts, t, closed, showDetails, width, height) {

    if (closed)
      this.drawSplineClosed(ctx, pts, t);
    else
      this.drawSplineOpen(ctx, pts, t);

    if (showDetails) {
      for (let i = 0; i < pts.length; i += 1) {
        this.drawPoint(ctx, pts[i], 1.5, '#f0f0f0f');
      }
    }
  }

  drawSplineClosed(ctx, pts, t) {
    ctx.lineWidth = 4;
    ctx.save();
    let cp = [];
    const n = pts.length;

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);

    pts.push({ x: pts[0].x, y: pts[0].y }, { x: pts[1].x, y: pts[1].y });
    pts.unshift(pts[n - 1]);

    for (let i = 0; i < n; i += 1) {
      cp = cp.concat(
        this.getControlPoints(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, pts[i + 2].x, pts[i + 2].y, t),
        );
    }

    cp = cp.concat({ p1x: cp[0].p1x, p1y: cp[0].p1y });

    for (let i = 2; i < n + 2; i += 1) {
      ctx.bezierCurveTo(
        cp[i - 2].p2x, cp[i - 2].p2y,
        cp[i - 1].p1x, cp[i - 1].p1y,
        pts[i].x, pts[i].y);
    }

    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.fillStyle = '#009aff';
    ctx.fill();
    ctx.strokeStyle = '#0083d9';
    ctx.stroke();

    ctx.restore();

  }

  drawSplineOpen(ctx, pts, t) {
    ctx.lineWidth = 4;
    ctx.save();
    let cp = [];
    const n = pts.length;

    for (let i = 0; i < n - 4; i += 2) {
      cp = cp.concat(this.getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], t));
    }
    for (let i = 2; i < pts.length - 5; i += 2) {
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
    if (this.pts.length === 0) {

      // ponto inferior para puxar o inicio do grafico para baixo
      this.pts.push({ x: -20, y: height + 10 });
      const larguraColuna = 30;
      const qtdDeNosReais = (width / larguraColuna) - 1;
      for (let i = 0; i <= qtdDeNosReais; i++) {
        const x = (i * 30) + 15, y = Math.round(((Math.random() * 100) / 2) + 10);
        this.pts.push({ x, y, label: y });
      }
      if (this.pts.length > 0) {
        // ponto para puxar a linha reta do grafico no inio
        this.pts.splice(1, 0, { x: -10, y: this.pts[1].y });
        // ponto para puxar a linha reta do grafico no final
        this.pts.push({ x: width + 10, y: this.pts[this.pts.length - 1].y });
      }
      // ponto para puxar a linha final do grafico pra baixo e fechar com a primeira
      this.pts.push({ x: width + 10, y: height + 10 });
    }

    const ptsClone = JSON.parse(JSON.stringify(this.pts));

    if (percCarregamento >= 0)
      ptsClone.forEach(function (value, index, array) {
        value.y = (array[index].y * percCarregamento) + (1.0 - percCarregamento) * height;
        value.isSelecionado = pontoSelecionado ? pontoSelecionado.indexSelecionado === index - 2 : false;
        value.diametroSelecionado = pontoSelecionado ? pontoSelecionado.diametroSelecionado : 0;
      });
    return ptsClone;
  }

  main(t, percCarregamento, pontoSelecionado) {

    const e = document.createElement('canvas'), ctx = e.getContext('2d');
    e.width = 30 * 32;
    e.height = 70;

    if (!ctx) { return; }
    ctx.clearRect(0, 0, e.width, e.height);
    ctx.scale(1, 1);
    this.drawSpline(
      ctx, this.getPoints(
        e.width, e.height, percCarregamento, pontoSelecionado,
        ), t, true, percCarregamento === 1, e.width, e.height,
      );

    jqueryAssigner('.row-detalhe').css('background', 'url(' + e.toDataURL() + ')');
  }


  animate(t2, whenDone) {
    const qtdFrames = 20;
    const t1 = this.tAtual;
    for (let i = 0; i <= qtdFrames; i += 1) {

      (() => {
        const percCarregamento = i / qtdFrames;
        const tempoDeEspera = (qtdFrames * percCarregamento + 1) * 40;
        setTimeout(() => {
          const t = percCarregamento * t2 + t1;
          this.main(t, percCarregamento, null);
        }, tempoDeEspera);
      })();
    }

    setTimeout(() => {
      if (whenDone) { whenDone(); }
    }, 3000);
  }

  animatePontoSelecionado(t2, indexSelecionado, whenDone) {
    const diametroSelecionado = 6;
    const qtdFrames = 3;
    clearTimeout(this.timeOutAnimatePontoSelecionado);
    for (let i = 0; i <= qtdFrames; i += 1) {

      (() => {
        const percCarregamento = i / qtdFrames;
        const tempoDeEspera = (qtdFrames * percCarregamento + 1) * 40;
        this.timeOutAnimatePontoSelecionado = setTimeout(() => {
          const diametroProporcional = percCarregamento * diametroSelecionado;
          this.main(t2, 1, { indexSelecionado, diametroSelecionado: diametroProporcional });
        }, tempoDeEspera);
      })();
    }
  }
}

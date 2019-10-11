import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";

@Component({
  selector: "ngx-pedro-canvas",
  templateUrl: "./pedro-canvas.component.html",
  styleUrls: ["./pedro-canvas.component.scss"]
})
export class PedroCanvasComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [{ data: [8, 8, 4, 5, 10, 2, 4, 4] }];
  public lineChartLabels: Label[] = Array(31)
    .fill(0)
    .map((x, i) => "");
  public lineChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    // animation: {
    //   onComplete: function() {
    //     var ctx = this.chart.ctx;
    //     ctx.textAlign = "center";
    //     ctx.textBaseline = "middle";
    //     var chart = this;
    //     var datasets = this.config.data.datasets;

    //     datasets.forEach(function(dataset: Array<any>, i: number) {
    //       ctx.font = "10px Arial";

    //       ctx.fillStyle = "Black";
    //       chart.getDatasetMeta(i).data.forEach(function(p: any, j: any) {
    //         ctx.fillText(datasets[i].data[j], p._model.x, p._model.y - 10);
    //       });
    //     });
    //   }
    // },
    tooltips: {
      enabled: true
    },
    legend: {
      display: false
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      yAxes: [
        {
          display: false,
          scaleLabel: { display: false, fontSize: 0 },
          ticks: { padding: 50 }
        }
      ],
      xAxes: [{ display: false, ticks: { padding: 50 } }]
    }
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = false;
  public lineChartType = "line";

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);

  }

  ngOnInit() {
  }

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}

import React from "react";
import Chart from "chart.js";
import "./PieGraph.css";

class PieGraph extends React.Component {
   constructor() {
      super();
      this.pieCanvasRef = React.createRef();
      this.labelsAndDataset = null;
      this.PieGraph = null;
      this.colors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#d145f7", "#45f7b9", "#e8d7b4"];
   }

   componentDidMount() {
      this.labelsAndDataset = this.extractLabelsAndDataset(this.props.data);
      this.buildPieGraph();
   }

   componentDidUpdate(prevProps) {
      if (!this.isIdenticalData(prevProps.data, this.props.data)) {
         this.labelsAndDataset = this.extractLabelsAndDataset(this.props.data);
         this.removeGraphData();
         this.updateGraphData();
      }
   }

   isIdenticalData = (obj1, obj2) => {
      return JSON.stringify(obj1) === JSON.stringify(obj2); // true
   };

   /** Update pie graph current props value: labels, dataset */
   updateGraphData() {
      this.PieGraph.data.labels = this.labelsAndDataset.labels;
      this.PieGraph.data.datasets.forEach((dataset) => {
         dataset.data.push(...this.labelsAndDataset.dataset);
      });
      this.PieGraph.update();
   }

   /** Remove from pie graph current labels, dataset */
   removeGraphData() {
      this.PieGraph.data.labels = [];
      this.PieGraph.data.datasets.forEach((dataset) => {
         dataset.data = [];
      });
      this.PieGraph.update();
   }

   /** Build pie graph inside canvas and hold ref this.PieGraph */
   buildPieGraph = () => {
      Chart.defaults.global.defaultFontFamily = "'Alef', 'sans - serif'";

      const ctx = this.pieCanvasRef.current.getContext("2d");

      this.PieGraph = new Chart(ctx, {
         type: "pie",
         data: {
            labels: this.labelsAndDataset.labels,
            datasets: [
               {
                  data: this.labelsAndDataset.dataset,
                  backgroundColor: this.colors,
               },
            ],
         },
         options: {
            legend: {
               position: "right",
               rtl: true,
               labels: { fontColor: "black", fontSize: 14 },
            },
            tooltips: {
               rtl: true,
               displayColors: true,
               xPadding: 5,
               yPadding: 5,
               callbacks: {
                  label: (tooltipItem, data) => {
                     const labels = data.labels;
                     const dataset = data.datasets[0].data;
                     const currentIndex = tooltipItem.index;
                     return ` ${dataset[currentIndex]} \u20AA ${labels[currentIndex]}`;
                  },
               },
            },
         },
      });
   };

   extractLabelsAndDataset = (data) => {
      const labelsAndDataset = { labels: [], dataset: [] };
      for (const property in data) {
         labelsAndDataset.labels.push(property);
         labelsAndDataset.dataset.push(data[property]);
      }
      return labelsAndDataset;
   };

   render() {
      return (
         <div className="pie-graph">
            <div className="pie-graph__container">
               <canvas ref={this.pieCanvasRef} />
            </div>
         </div>
      );
   }
}
export default PieGraph;

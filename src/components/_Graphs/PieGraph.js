import React from "react";
import Chart from "chart.js";
import "./PieGraph.css";

/** Pie Graph Component:
# Props:
- title - string - graph title
- labels - array of strings - each label represent the name of section in graph
- dataset - array of numbers, each number represent the value of section in graph
- backgroundColors - array of strings - each color represent by string            
 */

class PieGraph extends React.Component {
   constructor() {
      super();
      this.pieCanvasRef = React.createRef();
   }

   componentDidMount() {
      this.buildPieGraph();
   }

   componentDidUpdate(prevProps) {
      //Update pie ui only when data change
      const { labels: prevLabels, dataset: prevDataset } = prevProps;
      const { labels, dataset } = this.props;
      if (!this.isIdentical(prevLabels, labels) || !this.isIdentical(prevDataset, dataset)) {
         this.removeGraphData();
         this.updateGraphData();
      }
   }

   /** Check equality of two arrays */
   isIdentical = (arr1, arr2) => {
      if (arr1.length === arr2.length) {
         for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
               return false;
            }
         }
      } else {
         return false;
      }
      return true;
   };

   /** Update pie graph current props value: labels, dataset */
   updateGraphData() {
      this.PieGraph.data.labels = this.props.labels;
      this.PieGraph.data.datasets.forEach((dataset) => {
         dataset.data.push(...this.props.dataset);
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
      const { labels, dataset, backgroundColors } = this.props;

      this.PieGraph = new Chart(ctx, {
         type: "pie",
         data: {
            labels: labels,
            datasets: [
               {
                  data: dataset,
                  backgroundColor: backgroundColors,
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

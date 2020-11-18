import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "./PieGraph.css";

//FIXME: PROP TYPE

const PieGraph = (props) => {
   const canvasRef = useRef(null);
   const graphRef = useRef(null);

   useEffect(() => {
      const { labels, dataset } = extractLabelsAndDataset(props.data);
      if (graphRef.current) {
         updateData();
         updateData(labels, dataset);
      } else {
         graphRef.current = buildGraph(labels, dataset);
      }
   }, [props.data]);

   /**
    * @param {object} data object keys represent labels, object values represent data
    * @return {object} object contain labels, dataset array
    */
   const extractLabelsAndDataset = (data) => {
      const labelsAndDataset = { labels: [], dataset: [] };
      for (const property in data) {
         labelsAndDataset.labels.push(property);
         labelsAndDataset.dataset.push(data[property]);
      }
      return labelsAndDataset;
   };

   /**
    * @param {array} labels array of strings represent graph labels
    * @param {array} dataset array of numbers represent graph dataset
    * @return {object} reference to graph object
    */
   const buildGraph = (labels, dataset) => {
      Chart.defaults.global.defaultFontFamily = "'Alef', 'sans - serif'";
      const colors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#d145f7", "#45f7b9", "#e8d7b4"];
      const ctx = canvasRef.current.getContext("2d");
      const graph = new Chart(ctx, {
         type: "pie",
         data: {
            labels: labels,
            datasets: [
               {
                  data: dataset,
                  backgroundColor: colors,
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
      return graph;
   };

   /**
    * Update graph data, when no args passed in reset the table
    * @param {array} labels array of strings represent graph labels
    * @param {array} dataset array of numbers represent graph dataset
    */
   const updateData = (labels = [], dataset = []) => {
      graphRef.current.data.labels = labels;
      graphRef.current.data.datasets.forEach((graphDataset) => {
         graphDataset.data = dataset;
      });
      graphRef.current.update();
   };

   return (
      <div className="pie-graph">
         <div className="pie-graph__container">
            <canvas ref={canvasRef} />
         </div>
      </div>
   );
};

export default PieGraph;

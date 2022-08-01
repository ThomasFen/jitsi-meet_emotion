import { Component } from 'react';
import Chart from 'react-apexcharts';
import '@arco-design/web-react/dist/css/arco.css';
import * as React from 'react';
import HistoryForm from './HistoryForm';

class HistoryDialogContent extends Component {
  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '45%',
            rangeBarGroupRows: true,
          },
        },
        stroke: {
          width: 1,
        },
        fill: {
          type: 'solid',
          opacity: 1,
        },
        colors: [
          '#008FFB',
          '#00E396',
          '#FEB019',
          '#FF4560',
          '#775DD0',
          '#3F51B5',
          '#546E7A',
          '#D4526E',
        ],

        xaxis: {
          type: 'datetime',
        },
        legend: {
          show: false,
        },
        chart: {
            foreColor: '#cccccc',
          },
        tooltip: {
          custom: function (opts) {
            const fromYear = new Date(opts.y1).getFullYear();
            const toYear = new Date(opts.y2).getFullYear();
            const values = opts.ctx.rangeBar.getTooltipValues(opts);

            return '';
          },
        },
      },
      series: [
        {
          name: 'Fear',
          data: [
            {
              x: 'Maier',
              y: [1651391331000, 1651391511000],
            },
            {
              x: 'Beck',
              y: [1651391331000, 1651391511000],
            },

            {
              x: 'Schmitz',
              y: [1651391331000, 1651391511000],
            },

            {
              x: 'Zimmermann',
              y: [1651391331000, 1651391511000],
            },
            {
              x: 'Maier',
              y: [1651392411000, 1651392711000],
            },
          ],
        },
        {
          name: 'Digust',
          data: [
            {
              x: 'Maier',
              y: [1651391511000, 1651391571000],
            },
            {
              x: 'Beck',
              y: [1651391511000, 1651391571000],
            },

            {
              x: 'Schmitz',
              y: [1651391511000, 1651391571000],
            },

            {
              x: 'Zimmermann',
              y: [1651391511000, 1651391571000],
            },
            {
              x: 'Maier',
              y: [1651392711000, 1651392951000],
            },
          ],
        },
        {
          name: 'Contempt',
          data: [
            {
              x: 'Maier',
              y: [1651391571000, 1651391631000],
            },
            {
              x: 'Beck',
              y: [1651391571000, 1651391631000],
            },
            {
              x: 'Schmitz',
              y: [1651391571000, 1651391631000],
            },

            {
              x: 'Zimmermann',
              y: [1651391571000, 1651391631000],
            },
            {
              x: 'Maier',
              y: [1651392951000, 1651393131000],
            },
          ],
        },
        {
          name: 'Anger',
          data: [
            {
              x: 'Maier',
              y: [1651391631000, 1651391691000],
            },
            {
              x: 'Beck',
              y: [1651391631000, 1651391691000],
            },

            {
              x: 'Schmitz',
              y: [1651391631000, 1651391691000],
            },

            {
              x: 'Zimmermann',
              y: [1651391631000, 1651391691000],
            },
            {
              x: 'Maier',
              y: [1651393131000, 1651393551000],
            },
          ],
        },
        {
          name: 'Surprise',
          data: [
            {
              x: 'Maier',
              y: [1651391691000, 1651391871000],
            },
            {
              x: 'Beck',
              y: [1651391691000, 1651391871000],
            },

            {
              x: 'Schmitz',
              y: [1651391691000, 1651391871000],
            },

            {
              x: 'Zimmermann',
              y: [1651391691000, 1651391871000],
            },
            {
              x: 'Maier',
              y: [1651393551000, 1651393611000],
            },
          ],
        },
        {
          name: 'Sad',
          data: [
            {
              x: 'Maier',
              y: [1651391871000, 1651392231000],
            },
            {
              x: 'Beck',
              y: [1651391871000, 1651392231000],
            },

            {
              x: 'Schmitz',
              y: [1651391871000, 1651392231000],
            },

            {
              x: 'Zimmermann',
              y: [1651391871000, 1651392231000],
            },
            {
              x: 'Maier',
              y: [1651393611000, 1651394031000],
            },
          ],
        },
        {
          name: 'Happy',
          data: [
            {
              x: 'Maier',
              y: [1651392231000, 1651392411000],
            },
            {
              x: 'Schmitz',
              y: [1651392231000, 1651392411000],
            },
            {
              x: 'Beck',
              y: [1651392231000, 1651392411000],
            },
            {
              x: 'Krause',
              y: [1651392231000, 1651392411000],
            },
            {
              x: 'Maier',
              y: [1651394031000, 1651394391000],
            },
          ],
        },
        {
          name: 'Neutral',
          data: [
            {
              x: 'Beck',
              y: [1651394751000, 1651394871000],
            },
            {
              x: 'Zimmermann',
              y: [1651394751000, 1651394871000],
            },
          ],
        },
      ],
    };
  }

  updateCharts() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];

    this.state.seriesMixedChart.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data, type: s.type });
    });

    this.state.seriesBar.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (180 - min + 1)) + min;
      });
      newBarSeries.push({ data, name: s.name });
    });

    this.setState({
      seriesMixedChart: newMixedSeries,
      seriesBar: newBarSeries,
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
    });
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="rangeBar"
              width="850"
            />
          </div>
        </div>
        <div className="row">
          <HistoryForm />

          <p className="col"></p>
        </div>
      </div>
    );
  }
}

export default HistoryDialogContent;

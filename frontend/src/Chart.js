import React from 'react'
// import Plot from 'react-plotly.js';
// import {  PatternLines, BarSeries, DensitySeries, XAxis, YAxis } from '@data-ui/histogram'


// export default function App({data}) {
//     const getdataX = () => {
//         if (data) {
//             var stuff = {
//                 score: [],
//             }
//             var current = '';
//             var cnt = 0;

//             for (var i = 0; i < data.score.length; i++) {

//                 if (data.score[i] !== current) {
//                     if (cnt > 0) {
//                         stuff.score.push(parseInt(current))
//                     }
//                     current = data.score[i];
//                     cnt = 1;
//                 } else {
//                     cnt++;
//                 }
//             }
//             if (cnt > 0) {
//                 stuff.score.push(parseInt(current))
//             }
//         } else {
//             return undefined
//         }
//         return stuff.score
//     }

//     const getdataY = () => {
//         if (data) {
//             var stuff = {
//                 count: []
//             }
//             var current = '';
//             var cnt = 0;
//             for (var i = 0; i < data.score.length; i++) {

//                 if (data.score[i] !== current) {
//                     if (cnt > 0) {
//                         stuff.count.push(cnt)
//                     }
//                     current = data.score[i];
//                     cnt = 1;
//                 } else {
//                     cnt++;
//                 }
//             }
//             if (cnt > 0) {
//                 stuff.count.push(cnt)
//             }
//         } else {
//             return undefined
//         }
//         return stuff.count
//     }

//     return (
//         <div>
//             <div><h1>Score by count</h1></div>
//             <div ariaLabel="test">
// <PatternLines
//   id="normal"
//   height={8}
//   width={8}
//   stroke="#fff"
//   background="#e64980"
//   strokeWidth={1}
//   orientation={[ "horizontal","vertical" ]}
// />
// <BarSeries
//   stroke="#e64980"
//   fillOpacity={0.15}
//   fill="url(#normal)"
//   rawData={[ 10.145890458401636,9.968175754732735]}
// />
// <DensitySeries
//   stroke="#e64980"
//   showArea={false}
//   smoothing={0.01}
//   kernel="parabolic"
//   rawData={[ 10.145890458401636,9.968175754732735 ]}
// />
// <XAxis/>
// <YAxis/>
// </div>
//         </div>
//     );
// }





/*

{data ?  <Plot
        data={[
          {
            x: getdataX(),
            y: getdataY(),
            xbins: {size:10},
            ybins: {size: 5},
            type: 'histogram',
            name: 'Score',
            marker: {color: 'red'},
          },
          {
            
            x: getdataX(),
            y: getdataY(),
            xbins: {size:10},
            ybins: {size: 5},
            type: 'line',
            line: {
              color: 'rgb(207, 114, 255)'
            },
            name: 'Score'
        }
        ]}

        layout={ {height: 500} }
      /> : <div>no data</div>}

      */


 import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
 
const ResponsiveHistogram = withParentSize(
  ({ parentWidth, parentHeight, ...rest }) => (
    <Histogram width={parentWidth} height={parentHeight} {...rest} />
  )
);

export default function App({data}) {

        const getdataX = () => {
        if (data) {
            var stuff = {
                score: [],
            }
            var current = '';
            var cnt = 0;

            for (var i = 0; i < data.score.length; i++) {

                if (data.score[i] !== current) {
                    if (cnt > 0) {
                        stuff.score.push(parseInt(current))
                    }
                    current = data.score[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }
            if (cnt > 0) {
                stuff.score.push(parseInt(current))
            }
        } else {
            return undefined
        }
        return stuff.score
    }

  return (
    <div className="App" style={{ height: 450 }}>
    {data ?
      <ResponsiveHistogram
        ariaLabel="histogram"
        orientation={[ "horizontal","vertical" ]}
        binCount={10}
        binType="numeric"
      >
        <DensitySeries animated rawData={getdataX()}   showArea={false}
  smoothing={0.01}/>
        <BarSeries
        stroke="#e64980"
        fillOpacity={0.30}
        fill="orange"
        rawData={getdataX()}
        />
        <XAxis />
        <YAxis label='Count'/>
      </ResponsiveHistogram>
      : 'no data'}
    </div>
  );
}

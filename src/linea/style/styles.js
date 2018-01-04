// Styles to be used in rendering our floorplans
const defaultStyle = {
  labelStyle: {
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
    fontSize: 8,
  },
  circleStyle: {
    stroke: 'black',
  },
  gridStyle: {
    major: {
      stroke: '#cccccc',
      strokeWidth: 1,
    },
    minor: {
      stroke: '#eaeaea',
      strokeWidth: 1,
    },
  },
  roomOutline: {
    default: {
      stroke: '#000000',
      strokeWidth: 8,
      fill: '#f4e4d7',
      fillOpacity: 0.5,
    },
  },
  interiorWallStyle: {
    default: {
      stroke: '#000000',
      strokeWidth: 1,
      fill: '#f4e4d7',
      fillOpacity: 1,
    },
  },
  windowStyle: {
    default: {
      stroke: '#f9f9f9',
      strokeWidth: 6,
      fill: 'none',
      fillOpacity: 1,
      strokeLinecap: 'round',
    },
    open: {
      stroke: 'yellow',
      strokeWidth: 6,
      fill: 'none',
      fillOpacity: 1,
    },
  },
  doorStyle: {
    door: {
      default: {
        stroke: '#c1272d',
        strokeWidth: 6,
        fill: 'none',
        fillOpacity: 1,
      },
      open: {
        stroke: '#ff00ff',
        strokeWidth: 6,
        fill: 'none',
        fillOpacity: 1,
      },
    },
    projection: {
      default: {
        stroke: '#c1272d',
        strokeWidth: 3,
        fill: 'none',
        fillOpacity: 1,
        strokeDasharray: '4 8',
        strokeLinecap: 'round',
      },
      open: {
        stroke: '#ff00ff',
        strokeWidth: 3,
        fill: 'none',
        fillOpacity: 1,
        strokeDasharray: '0',
        strokeLinecap: 'round',
      },
    },
    doorStop: {
      default: {
        stroke: '#c1272d',
        strokeWidth: 1,
        fill: 'none',
        fillOpacity: 1,
      },
      open: {
        stroke: '#ff00ff',
        strokeWidth: 1,
        fill: 'none',
        fillOpacity: 1,
      },
    },
  },
  bedStyle: {
    default: {
      stroke: 'black',
      strokeWidth: 1,
      fill: 'none',
      fillOpacity: 1,
    },
  },
  dresserStyle: {
    default: {
      stroke: 'grey',
      strokeWidth: 1,
      fill: 'none',
      fillOpacity: 1,
    },
  },
  nightTableStyle: {
    default: {
      stroke: 'grey',
      strokeWidth: 1,
      fill: 'none',
      fillOpacity: 1,
    },
  },
};

export default defaultStyle;

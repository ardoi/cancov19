import { rgb } from "d3-color";
import { useState, useEffect } from 'react';

export const colorf = () => {
    //http://tsitsul.in/blog/coloropt/
    const cols = [
        [235, 172, 35],
        [184, 0, 88],
        [0, 140, 249],
        [0, 110, 0],
        [0, 187, 173],
        [209, 99, 230],
        [178, 69, 2],
        [255, 146, 135],
        [89, 84, 214],
        [0, 198, 248],
        [135, 133, 0],
        [0, 167, 108],
        [189, 189, 189]
    ];
    return cols.map(x =>
        rgb(x[0], x[1], x[2])
            .darker(.5)
            .formatHex()
    );
};

export const sortpc = (provinces, colors) => {
    const merged = [];
    for (let i = 0; i < provinces.length; i++) {
        merged.push({ a1: provinces[i], a2: colors[i] });
    }
    merged.sort((x, y) => x.a1.value - y.a1.value);
    for (let i = 0; i < merged.length; i++) {
        provinces[i] = merged[i].a1;
        colors[i] = merged[i].a2;
    }
    // console.log(provinces, colors);
};

export const population = {
    ON: 14.71,
    QC: 8.53,
    BC: 5.11,
    AB: 4.41,
    SK: 1.18,
    NL: 0.52,
    NS: 0.98,
    MB: 1.38,
    NB: 0.78,
    PE: 0.16,
    YT: 0.041,
    NT: 0.044,
    NU: 0.039
};


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function totalReduce(group){
    const res = group.reduce(
            (p, v) => {
                return p + v.Total;
            },
            (p, v) => {
                return p - v.Total;
            },
            () => 0
        );
    return res;
}

export function provinceTotalReduce(group){
    const pCounts = group.reduce(
        (p, v) => {
            p[v.Prov] = (p[v.Prov] || 0) + v.Total;
            return p;
        },
        (p, v) => {
            p[v.Prov] = p[v.Prov] - v.Total;
            return p;
        },
        () => ({})
    );
    return pCounts;
}
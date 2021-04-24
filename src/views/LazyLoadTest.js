import React, { useEffect, useRef } from 'react';
import lazyLoad from './LazyLoad';

const imgArr = [];
for (let i = 0; i < 40; i++) {
  imgArr.push(`https://picsum.photos/${200 + i}`);
}

export default function LazyLoadTest() {
  const imgContainerRef = useRef(null);
  useEffect(() => {
    console.log(imgContainerRef.current);
    lazyLoad(imgContainerRef.current);
  }, []);
  return (
    <div ref={imgContainerRef} style={{
      overflow: 'auto',
      height: '90vh',
      width: 700
    }}>
      {
        imgArr.map((imgurl, index) => {
          return <div style={{ height: 250 }}>

            <span style={{ fontSize: 30, fontWeight: 'bold', marginRight: 64, verticalAlign: 'top'}}>
              第{index}个：
            </span>

            <img alt='' data-src={imgurl} style={{ width: 200 }} key={index}></img>
          </div>
        })
      }
      
    </div>
  )
}

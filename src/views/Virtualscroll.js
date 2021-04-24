import React, {
  useState, useEffect, useRef
} from 'react';
// import { observer } from 'mobx-react';
import './virtual-scroll.css';

const offset = 10; // 上下多余元素的个数
const itemHeight = 40; // 计算单个元素的高度
const containerHeight = 410; // 容器高度
const visibleCount = Math.ceil(containerHeight / itemHeight); // 可视区域放置元素的个数

export default function Virtualscroll() {
  const [allData] = useState(() => {
    const res = [];
    for(let i = 0; i < 10000; i++) {
      res.push(i);
    }
    return res;
  });
  const [startHeight, setStartHeight] = useState(0);
  const [endHeight, setEndHeight] = useState(0);

  const [data, setData] = useState(allData.slice(0, 20));
  const containerRef = useRef(null);

  useEffect(() => {
    if (allData.length <= visibleCount ) {
      return;
    }
    let timer = null;
    function setHeight() {
      const { scrollTop } = containerRef.current;
      const startIndex = Math.ceil(scrollTop / 40);
      const start = startIndex - offset > 0 ? startIndex - offset : 0;
      const end = startIndex + visibleCount + offset < allData.length ? 
        startIndex + visibleCount + offset : allData.length;
      setData(allData.slice(start, end));
      setStartHeight(start * 40);
      setEndHeight((allData.length - end) * 40);
    }

    setHeight();    

    function debounce(func, delay) {
      if (timer) return;
      timer = setTimeout(() => {
        func();
        timer = null;
      }, delay);
    }

    containerRef.current.addEventListener('wheel', () => {
      if (timer) return; 
      debounce(setHeight, 120);
    })

  }, [allData])

  return (
    <div>
      <div 
      className='virtual__container'
      style={{ height: containerHeight }}
      ref={containerRef}
    >

      <div style={{ height: startHeight }}></div>

      {
        data.map((item) => <div
          className='virtual__text'
          style={{ height: itemHeight}}
          key={item}
        >
          {item}
        </div>)
      }

      <div style={{ height: endHeight }}></div>
      
    </div>

    </div>
  )
}

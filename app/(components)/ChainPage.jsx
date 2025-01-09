
"use client"
import { Parallax,ParallaxLayer } from "@react-spring/parallax";
import React, { useState } from 'react'
import { useRef,useEffect } from "react";
import styles from "../../styles/ChainNumbers.module.css"
const ChainPage = () => {
    const Page = ({ offset, gradient, onClick }) => (
        <>
          <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
            <div className={styles.slopeBegin} />
          </ParallaxLayer>
          <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
            <div className={`${styles.slopeEnd} ${styles[gradient]}`} />
          </ParallaxLayer>
          <ParallaxLayer className={`${styles.text} ${styles.number}`} offset={offset} speed={0.3}>
            <span>{offset + 1}</span>
          </ParallaxLayer>
        </>
      )
      const parallax = useRef(null)
      const scroll=(to) => {
        if (parallax.current) {
          parallax.current.scrollTo(to)
        }
      }
     
      const [pageCount, setPageCount] = useState(7)
      // Sayfa açıldığında scroll işlemlerini tetiklemek için useEffect kullanıyoruz
      useEffect(() => {
        scrollPages(pageCount);
      }, []); // Boş array [] ile yalnızca ilk render'da tetiklenir

      const intervalCounter = 4000/pageCount;
      const scrollPages = (pageCount) => {
        for (let i = 0; i < pageCount; i++) {
          setTimeout(() => {
            scroll(i);
          }, intervalCounter * i); // Her kaydırma arasında 500ms zaman bırak
        }
      };
  return (
    <div style={{ background: '#dfdfdf' }}>
      <Parallax className={styles.container} ref={parallax} pages={pageCount} horizontal>
      {
      Array.from({ length: pageCount }).map((_, i) => (
        <Page key={i} offset={i} gradient="blue" onClick={() => scroll(i + 1)} />
      ))
    }
      </Parallax>
    </div>
  )
}

export default ChainPage
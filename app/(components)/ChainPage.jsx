"use client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/ChainNumbers.module.css";

const ChainPage = () => {
  const Page = ({ offset, gradient }) => (
    <>
      <ParallaxLayer offset={offset} speed={0.2}>
      <div className={`${styles.slopeBegin}p-4 rounded-lg h-full`} />
      </ParallaxLayer>
      <ParallaxLayer offset={offset} speed={0.6}>
        <div className={`${styles.slopeEnd} ${styles[gradient]} h-full`} />
      </ParallaxLayer>
      <ParallaxLayer className={`${styles.text} ${styles.number} `} offset={offset} speed={0.3}>
        <span className="ml-10">{offset + 1}</span>
      </ParallaxLayer>
    </>
  );

  const parallax = useRef(null);
  const [pageCount, setPageCount] = useState(2); // Toplam sayfa sayısı

  const scroll = (to) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  useEffect(() => {
    scrollPages();
  }, []); // İlk render'da çalışır

  const scrollPages = async () => {
    const totalScrolls = pageCount > 15 ? 10 : pageCount; // Maksimum 10 kaydırma
    const startOffset = pageCount > 15 ? pageCount - 10 : 0; // Başlangıç offset'i

    for (let i = 0; i < totalScrolls; i++) {
      const delay = calculateDelay(i, totalScrolls); // Dinamik gecikme
      await new Promise((resolve) => setTimeout(resolve, delay)); // Bekleme
      scroll(startOffset + i); // Kaydırma işlemi
    }
  };

  // Gecikme süresini hesaplayan fonksiyon (hızlıdan yavaşa)
  const calculateDelay = (currentIndex, totalScrolls) => {
    const maxDelay = 1000; // En uzun gecikme (ms)
    const minDelay = 100; // En kısa gecikme (ms)
    const progress = currentIndex / totalScrolls; // İlerleme yüzdesi (0 ile 1 arasında)
    return minDelay + (maxDelay - minDelay) * progress; // Hızlıdan yavaşa geçiş
  };

  const offsets = pageCount > 15 
    ? Array.from({ length: 10 }, (_, i) => pageCount - 10 + i) // Son 10 sayfa
    : Array.from({ length: pageCount }, (_, i) => i); // Tüm sayfalar

  return (
<div className="relative w-full h-full mx-auto overflow-hidden scrollbar-hide">
<Parallax className={`${styles.container} scrollbar-hide`} ref={parallax} pages={pageCount} horizontal >
        {offsets.map((offset, i) => (
          <Page key={i} offset={offset} gradient="teal" />
        ))}
      </Parallax>
    </div>
  );
};

export default ChainPage;

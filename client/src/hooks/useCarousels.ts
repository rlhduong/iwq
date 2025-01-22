import { useState, useEffect } from 'react';

interface UseCarouselprop {
  total: number;
  interval?: number;
}

export const useCarousel = ({ total, interval = 5000 }: UseCarouselprop) => {
  const [currImg, setCurrImg] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrImg((prev) => (prev + 1) % total);
    }, interval);

    return () => clearInterval(intervalId);
  }, [total, interval]);

  return currImg;
};


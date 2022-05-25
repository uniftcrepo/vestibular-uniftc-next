import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
const tipoImage = [
  {
    tipo:"banner",
    width: 1200,
    height: 400
  },
  {
    tipo:"diferenciais",
    width: 410,
    height: 400
  },

]

export const ImageLoad = React.memo(({ src, placeholder, alt = "", tipo = "" }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(placeholder);
  const [currentSrcTipo, setCurrentSrcTipo] = useState(
    tipo && tipoImage.filter(image => image.tipo === tipo)
  )

  useEffect(() => {
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      // When image is loaded replace the src and set loading to false
      setLoading(false);
      updateSrc(src);
    }
  }, [src])
  return (
  <>
    {loading && <Skeleton variant="rectangular" count={1} height={currentSrcTipo && currentSrcTipo[0].height} width={currentSrcTipo && currentSrcTipo[0].width} />}
    <img
      src={currentSrc}
      style={{
        opacity: loading ? 0.1 : 1,
        transition: "opacity .15s linear",
        maxWidth: tipo === " banner" ? "100%" : "",
        height: tipo === "banner" ? "auto" : "",
        width: tipo === "banner" ? "100%" : "",
      }}
      alt={alt}
    />
  </>
  )
});
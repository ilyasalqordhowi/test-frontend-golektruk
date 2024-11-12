import React, { useRef } from "react";

const Soal1 = () => {
  // 1. Buat kotak dibawah menjadi elemen drag and drop tanpa menggunakan plugin

  const boxRef = useRef(null);

  const MouseDown = (e) => {
    const box = boxRef.current;
    const offsetX = e.clientX - box.getBoundingClientRect().left;
    const offsetY = e.clientY - box.getBoundingClientRect().top;
    console.log(offsetX);

    const MouseMove = (e) => {
      box.style.position = "absolute";
      box.style.left = `${e.clientX - offsetX}px`;
      box.style.top = `${e.clientY - offsetY}px`;
    };

    const MouseUp = () => {
      document.removeEventListener("mousemove", MouseMove);
      document.removeEventListener("mouseup", MouseUp);
    };

    document.addEventListener("mousemove", MouseMove);
    document.addEventListener("mouseup", MouseUp);
  };

  return (
    <>
      <div
        ref={boxRef}
        onMouseDown={MouseDown}
        style={{
          backgroundColor: "#fff",
          width: 40,
          height: 40,
          borderRadius: "8px",
          position: "absolute",
          cursor: "grab",
        }}
      ></div>

      {/* Ekspektasi hasil */}
      <iframe
        src="/soal1.mp4"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid white",
        }}
      ></iframe>
    </>
  );
};

export default Soal1;

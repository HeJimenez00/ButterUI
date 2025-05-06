import { gsap } from "gsap";
import { $ } from "../utils/selector.ts";

export function initNotch(root) {
  const _ = (sel: string) => $(sel, root)!;

  const components = {
    preview: _(".preview"),
    code: _(".code"),
    "notch-wrapper": _(".notch-wrapper"),
    notch: _(".notch"),
  };

  let isDraggable = false;
  let baseX = 0;
  let positionName = "preview";
  let cors = {
    x: 0, // cordenada el mouse
    offsetX: 0, // posicion donde moveremos (lugar donde jalaremos la cuerda)
    deltaX: 0, // diferencia entre x y offset para simular que estamos haciendo click en la posición donde se espera
  };

  const animations = {
    b: {
      scale: 1,
      duration: 0.6,
      ease: "power4.out",
    },
    c: {
      duration: 0.4,
      ease: "power4.out",
    },
  };

  components["notch-wrapper"]?.addEventListener("mousedown", notchDown);
  window.addEventListener("mousemove", notchMove);
  window.addEventListener("mouseup", notchDrop);

  // funciones
  function notchDown(event) {
    event.preventDefault();
    isDraggable = true;
    cors.offsetX = event.clientX;
  }

  function notchMove(event) {
    if (isDraggable) {
      cors.x = event.clientX;

      cors.deltaX = cors.x - cors.offsetX;

      gsap.to([components.preview, components.code], {
        x: cors.deltaX + baseX,
        scale: 0.93,
      });

      gsap.to(components.notch, {
        y: -15,
        filter: "blur(5px)",
        scale: 0.93,
        opacity: 0,
        ...animations.c,
      });
    }
  }

  function notchDrop() {
    isDraggable = false;
    const wrapperWidth = components["notch-wrapper"]?.clientWidth;
    const threshold = wrapperWidth / 2;

    gsap.to(components.notch, {
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      opacity: 1,
      ...animations.c,
    });

    // necesitamos un valor que sea el punto medio que es el objeto que estamos moviendo
    const previewWidth = components.preview.offsetWidth + 12.5; // ancho mas el gap

    if (positionName === "preview") {
      // si se cumple se muestra el codigo
      if (cors.deltaX <= -threshold) {
        gsap.to([components.preview, components.code], {
          x: -previewWidth,
          ...animations.b,
        });

        baseX = -previewWidth; //cambiar posición por que esta se cambiara para que tenga limites
        positionName = "code";
        // se regresa a su estado original
      } else {
        gsap.to([components.preview, components.code], {
          x: 0,
          ...animations.b,
        });
      }
    } else {
      if (cors.deltaX >= threshold) {
        gsap.to([components.preview, components.code], {
          x: 0,
          ...animations.b,
        });

        positionName = "preview";
        baseX = 0;
        // se regresa a su estado original
      } else {
        gsap.to([components.preview, components.code], {
          x: -previewWidth,
          ...animations.b,
        });
        baseX = -previewWidth;
      }
    }
  }
}

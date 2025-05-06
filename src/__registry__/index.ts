export const Index = {
AvatarList: {
    name: "AvatarList",
    description: ``,
    type: "butter",
    files: ["src/registry/butter/AvatarList.astro"],
    component: async () => import("../registry/butter/AvatarList.astro"),
    code: `---
import { Image } from \"astro:assets\";
import { cva } from \"class-variance-authority\";
import type { AvatarItem } from \"../../types/index.ts\";

interface AvatarList {
  data: AvatarItem[];
  direction?: \"horizontal\" | \"vertical-left\" | \"vertical-right\";
  size?: \"medium\" | \"small\";
  shape?: \"circle\" | \"rounded\";
  imageStyles?: string;
  nameStyles?: string;
}

const avatar = cva(\"\", {
  variants: {
    direction: {
      horizontal: [\"\"],
      \"vertical-left\": [\"flex-col\"],
      \"vertical-right\": [\"flex-col\"],
    },
    size: {
      small: [\"w-9 h-9\"],
      medium: [\"w-16 h-16 max-sm:w-14 max-sm:h-14\"],
    },
    shape: {
      circle: [\"rounded-full\"],
      rounded: [\"rounded-xl\"],
    },
  },
  defaultVariants: {
    direction: \"horizontal\",
  },
});

const {
  data = [],
  direction = \"horizontal\",
  size = \"medium\",
  shape = \"circle\",
  nameStyles = \"\",
  imageStyles = \"\",
} = Astro.props as AvatarList;
---

<ul
  class:list={[
    \"avatar flex relative\",
    direction !== \"horizontal\" && avatar({ direction }),
  ]}
>
  {
    data.map(({ name, src, alt }) => (
      <li
        class:list={[
          \"avatar-item relative first:ml-0 first:mt-0\",
          direction === \"horizontal\"
            ? size === \"medium\"
              ? \"-ml-5\"
              : \"-ml-3\"
            : direction === \"vertical-left\" || direction === \"vertical-right\"
              ? size === \"medium\"
                ? \"-mt-5\"
                : \"-mb-3\"
              : \"\",
        ]}
      >
        <Image
          src={src || \"/placeholder.svg\"}
          alt={alt}
          width={size === \"small\" ? 36 : 64}
          height={size === \"small\" ? 36 : 64}
          widths={[36, 64]}
          sizes=\"(max-width: 360px) 36px, 64px\"
          loading=\"lazy\"
          class:list={[
            \"avatar-image object-cover aspect-square ring-white shadow-xl shadow-black/15 dark:ring-zinc-100\",
            size === \"small\" ? \"ring-[3px]\" : \"ring-[3px] md:ring-[4px]\",
            avatar({ size, shape }),
            imageStyles,
          ]}
        />
        <span
          class:list={[
            \"avatar-name absolute opacity-100 -translate-y-1/2 px-[6px] py-[1px] text-zinc-700 rounded-full bg-white ring-1 ring-zinc-300 dark:ring-zinc-100 dark:bg-zinc-300\",
            nameStyles,
            size === \"medium\" ? \"text-sm\" : \"text-xs\",

            direction === \"horizontal\" && \"left-1/2 -translate-x-1/2\",

            (direction === \"vertical-left\" || direction === \"vertical-right\") &&
              \"top-1/2\",

            direction === \"horizontal\"
              ? size === \"medium\"
                ? \"-top-8\"
                : size === \"small\"
                  ? \"-top-6\"
                  : \"\"
              : \"\",

            direction === \"vertical-right\"
              ? size === \"medium\"
                ? \"left-full ml-4\"
                : size === \"small\"
                  ? \"left-full ml-4\"
                  : \"\"
              : direction === \"vertical-left\"
                ? size === \"medium\"
                  ? \"right-full mr-4\"
                  : size === \"small\"
                    ? \"right-full mr-4\"
                    : \"\"
                : \"\",
          ]}
        >
          {name}
        </span>
      </li>
    ))
  }
</ul>

<script>
  import { gsap } from \"gsap\";

  function initAvatar() {
    const \$avatarList = document.querySelectorAll(\".avatar\");
    if (!\$avatarList.length) return;

    \$avatarList.forEach((\$avatarItem) => {
      const handleAvatar = (ev: Event, isEnter: boolean) => {
        const \$item = (ev.target as HTMLElement).closest(\".avatar-item\");
        if (\$item && \$avatarItem.contains(\$item)) {
          const \$name = \$item.querySelector(\".avatar-name\") as HTMLElement;

          gsap.to(\$item, {
            y: isEnter ? -10 : 0,
            duration: 0.6,
            ease: \"elastic.out(0.6, 0.3)\",
          });

          gsap.to(\$name, {
            opacity: isEnter ? 1 : 0,
            scale: isEnter ? 1 : 0.9,
            filter: isEnter ? \" blur(0px)\" : \"blur(4px)\",
            duration: 0.3,
            ease: \"power1\",
          });
        }
      };

      \$avatarItem.addEventListener(
        \"mouseenter\",
        (ev) => handleAvatar(ev, true),
        true,
      );
      \$avatarItem.addEventListener(
        \"mouseleave\",
        (ev) => handleAvatar(ev, false),
        true,
      );
    });
  }
  initAvatar();
</script>

<style>
  .avatar-name {
    visibility: hidden;
    scale: 0.9;
    transition: visibility 0.3s ease;
  }
  .avatar-item:hover .avatar-name {
    visibility: visible;
  }
</style>
`},
Jumpy: {
    name: "Jumpy",
    description: ``,
    type: "butter",
    files: ["src/registry/butter/Jumpy.astro"],
    component: async () => import("../registry/butter/Jumpy.astro"),
    code: `---
import { cva } from \"class-variance-authority\";
import { Image } from \"astro:assets\";
import { type ImageItem } from \"../../types/index.ts\";

interface JellyProps {
  images: ImageItem[];
  size?: \"small\" | \"medium\" | \"large\";
  minRotation?: number;
  maxRotation?: number;
  wrapperStyles?: string;
  imageStyles?: string;
  spacing?: string;
  spacingHover?: number;
  initEase?: gsap.EaseFunction | string;
  hoverEase?: gsap.EaseFunction | string;
  duration?: number;
}

const jelly = cva(\"jelly\", {
  variants: {
    size: {
      small: [\"w-10 h-10\", \"md:w-12 md:h-12\", \"lg:w-14 lg:h-14\", \"ring-3\"],
      medium: [
        \"w-12 h-12\",
        \"md:w-14 md:h-14\",
        \"lg:w-16 lg:h-16\",
        \"ring-3 md:ring-4\",
      ],
      large: [
        \"w-14 h-14\",
        \"md:w-18 md:h-18\",
        \"lg:w-22 lg:h-22\",
        \"ring-3 md:ring-4\",
      ],
    },
  },
});

let rotations: number[] = [];

const generateRotations = function (min: number, max: number) {
  for (let i = 0; i < images.length; i++) {
    const rotation = Math.random() * (max - min) + min;

    let getValue = Math.random() > 0.5 ? rotation : -rotation;
    rotations = [...rotations, getValue];
  }
};

const {
  images = [],
  size = \"large\",
  spacing = \"-ml-6\",
  spacingHover = 40,
  minRotation = 7,
  maxRotation = 8,
  duration = 0.4,
  initEase = \"elastic.out(0.5, 0.4)\",
  hoverEase = \"power4.out\",
  imageStyles = \"\",
  wrapperStyles = \"\",
} = Astro.props as JellyProps;

generateRotations(minRotation, maxRotation);
---

<div
  class=\"flex image-gallery\"
  data-jumpy-rotations={rotations.join(\",\")}
  data-jumpy-spacing-hover={spacingHover}
  data-jumpy-init-ease={initEase}
  data-jumpy-hover-ease={hoverEase}
  data-jumpy-duration={duration}
>
  {
    images &&
      images.map(({ src, alt, href }, idx) => (
        <>
          {href ? (
            <a
              href={href}
              target=\"_blank\"
              class:list={[
                \"relative first:ml-0 ring-white rounded-xl overflow-hidden shadow-black/20 shadow-xl dark:ring-zinc-100\",
                jelly({ size }),
                wrapperStyles,
                spacing,
              ]}
              style={\`transform: rotate(\${rotations[idx]}deg)\`}
            >
              <Image
                src={src || \"/placeholder.svg\"}
                alt={alt}
                width={size === \"small\" ? 56 : size === \"medium\" ? 64 : 88}
                height={size === \"small\" ? 56 : size === \"medium\" ? 64 : 88}
                widths={[56, 64, 88]}
                sizes=\"(max-width: 360px) 56px, (max-width: 720px) 64px, 88px\"
                loading=\"lazy\"
                class:list={[\"aspect-square object-cover\", imageStyles]}
              />
            </a>
          ) : (
            <div
              class:list={[
                \"relative first:ml-0 ring-white rounded-xl overflow-hidden shadow-black/20 shadow-xl dark:ring-zinc-100\",
                jelly({ size }),
                spacing,
              ]}
              style={\`transform: rotate(\${rotations[idx]}deg)\`}
            >
              {\" \"}
              <Image
                src={src || \"/placeholder.svg\"}
                alt={alt}
                width={size === \"small\" ? 56 : size === \"medium\" ? 64 : 88}
                height={size === \"small\" ? 56 : size === \"medium\" ? 64 : 88}
                widths={[56, 64, 88]}
                sizes=\"(max-width: 360px) 56px, (max-width: 720px) 64px, 88px\"
                loading=\"lazy\"
                class:list={[\"aspect-square object-cover\", imageStyles]}
              />
            </div>
          )}
        </>
      ))
  }
</div>

<script>
  import { gsap } from \"gsap\";

  function initJumpy(container: HTMLElement) {
    const rotations =
      container?.dataset.jumpyRotations
        ?.split(\",\")
        .map((value) => Number(value)) ?? [];

    const spacing = Number(container?.dataset.jumpySpacingHover);
    const initEase = container?.dataset.jumpyInitEase;
    const hoverEase = container?.dataset.jumpyHoverEase;
    const duration = Number(container?.dataset.jumpyDuration);

    const images = container?.children ?? [];
    let lastHoveredRotation: number | null = null;

    gsap.fromTo(
      images,
      { scale: 0 },
      { scale: 1, stagger: 0.05, ease: initEase },
    );

    function moveImages(idx: number) {
      if (lastHoveredRotation !== null && lastHoveredRotation !== idx) {
        gsap.to(images[lastHoveredRotation], {
          duration: 0.6,
          rotation: rotations[lastHoveredRotation],
          ease: hoverEase,
        });
      }

      lastHoveredRotation = idx;

      const SPACING = spacing;

      [...images].forEach((image, i) => {
        gsap.to(image, {
          x: idx < i ? SPACING : idx > i ? -SPACING : 0,
          duration,
          ease: hoverEase,
          rotation: idx === i ? 0 : rotations[i],
        });
      });
    }

    function leaveImages() {
      [...images].forEach((image, idx) => {
        gsap.to(image, {
          rotate: rotations[idx],
          x: 0,
          duration: duration + 0.2,
          ease: initEase,
        });
      });
    }
    Array.from(images).forEach((image, idx) => {
      image.addEventListener(\"mouseenter\", () => moveImages(idx));
    });

    container?.addEventListener(\"mouseleave\", () => leaveImages());
  }

  document.addEventListener(\"DOMContentLoaded\", () => {
    const galleries = document.querySelectorAll(\".image-gallery\");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          initJumpy(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    galleries.forEach((gallery) => observer.observe(gallery));
  });
</script>
`},
Jelly: {
    name: "Jelly",
    description: ``,
    type: "butter",
    files: ["src/registry/butter/Jelly.astro"],
    component: async () => import("../registry/butter/Jelly.astro"),
    code: `---
import { Image } from \"astro:assets\";

export interface JellyProps {
  title: string;
  owner: string;
  location: string;
  src: string;
  alt: string;
  width?: string;
  height?: string;
  containerClass?: string;
  titleClass?: string;
  ownerClass?: string;
  locationClass?: string;
  animate?: boolean;
}

const {
  title,
  owner,
  location,
  alt,
  src,
  width = \"w-60\",
  height = \"h-72\",
  containerClass,
  titleClass,
  ownerClass,
  locationClass,
  animate = true,
} = Astro.props as JellyProps;

let transformInfoY = animate ? \"80%\" : 0;
let transformTextsY = animate ? \"30%\" : 0;
let blur = animate ? \"4px\" : 0;
let opacity = animate ? 0 : 1;
---

<div
  class:list={[\"rounded-3xl overflow-hidden\", width, height, containerClass]}
>
  <div
    data-animate={animate}
    class:list={[\"jelly-reveal-container relative\", width, height]}
  >
    <Image
      src={src}
      alt={alt}
      height={288}
      width={240}
      loading=\"lazy\"
      class=\"jelly-image size-full object-cover absolute inset-0\"
    />
    <div class=\"flex flex-col justify-end h-full\">
      <div
        class=\"jelly-reveal-info relative bg-black/50 backdrop-blur-md saturate-100 contrast-125\"
      >
        <div class=\"p-4 block\">
          <h4 class:list={[\"text-xl font-bold text-white\", titleClass]}>
            {title}
          </h4>
          <span class:list={[\"text-sm block text-white/50\", ownerClass]}
            >{owner}</span
          >
        </div>
        <footer class=\"jelly-reveal-footer p-4 block\">
          <span
            class:list={[
              \"text-sm flex items-center gap-1 text-white\",
              locationClass,
            ]}
          >
            <span>
              <svg
                width=\"24\"
                height=\"24\"
                class=\"p-1\"
                viewBox=\"0 0 24 24\"
                fill=\"none\"
                stroke=\"currentColor\"
                stroke-width=\"2\"
                stroke-linecap=\"round\"
                stroke-linejoin=\"round\"
                class=\"lucide lucide-map-pin\"
                ><path
                  d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"
                ></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg
              >
            </span>{location}</span
          >
        </footer>
      </div>
    </div>
  </div>
</div>

<script>
  import gsap from \"gsap\";

  document.querySelectorAll(\".jelly-reveal-container\").forEach((el) => {
    const container = el as HTMLElement;

    const animate = container.dataset.animate === \"true\";
    if (!animate) return;

    const info = container.querySelector(\".jelly-reveal-info\");
    const texts = container.querySelectorAll(
      \".jelly-reveal-info h4, .jelly-reveal-info span\",
    );

    function jellyReveaAnimation(isAnimated: boolean) {
      gsap.to(info, {
        y: isAnimated ? 0 : \"80%\",
        opacity: isAnimated ? 1 : 0,
        duration: 0.6,
        ease: isAnimated ? \"expo.out\" : \"back.out\",
      });

      gsap.to(texts, {
        opacity: isAnimated ? 1 : 0,
        y: isAnimated ? 0 : \"30%\",
        filter: isAnimated ? \"blur(0px)\" : \"blur(4px)\",
        stagger: 0.06,
        duration: 0.6,
        ease: \"power4.out\",
        delay: isAnimated ? 0.1 : 0,
      });
    }

    container.addEventListener(\"mouseenter\", () => jellyReveaAnimation(true));
    container.addEventListener(\"mouseleave\", () => jellyReveaAnimation(false));
  });
</script>

<style define:vars={{ transformInfoY, transformTextsY, opacity, blur }}>
  .jelly-reveal-info {
    transform: translateY(var(--transformInfoY));
    opacity: var(--opacity);
  }
  .jelly-reveal-info h4,
  .jelly-reveal-info span {
    transform: translateY(var(--transformTextsY));
    filter: blur(var(--blur));
    opacity: var(--opacity);
  }
</style>
`},
Vault: {
    name: "Vault",
    description: ``,
    type: "butter",
    files: ["src/registry/butter/Vault.astro"],
    component: async () => import("../registry/butter/Vault.astro"),
    code: `---
interface VaultProps {
  label: string;
  labelClass: string;
  vaultClass: string;
  footerClass: string;
  overlayClass: string;
  notchClass: string;
  easeOpen: string;
  easeStretch: string;
  durationOpen: number;
  durationStretch: number;
}
const {
  // comportamiento
  label = \"Vault\",
  labelClass = \"\",
  vaultClass = \"\",
  footerClass = \"\",
  notchClass = \"\",

  //animaciones
  easeOpen = \"power4.out\",
  easeStretch = \"elastic(1, 0.75)\",
  durationOpen = 0.4,
  durationStretch = 0.5,
} = Astro.props as VaultProps;
---

<button class:list={[\"cursor-pointer\", labelClass]} id=\"button-vault\"
  >{label}</button
>

<div
  class:list={[
    \"fixed bottom-0 right-0 left-0 w-full origin-bottom-left max-h-3/4 overflow-y-scroll\",
    vaultClass,
  ]}
  id=\"Vault\"
  data-ease-open={easeOpen}
  data-ease-stretch={easeStretch}
  data-duration-open={durationOpen}
  data-duration-stretch={durationStretch}
>
  <div
    class=\"absolute w-full h-full max-h-3/4 rounded-t-xl\"
    id=\"vault-container\"
  >
    <span
      id=\"vault-notch\"
      class=\"w-full h-full relative block py-5 hover:cursor-grab active:cursor-grabbing\"
    >
      <div class:list={[\"w-[10%] h-2 mx-auto rounded-full\", notchClass]}></div>
    </span>
    <div class=\"max-w-xl mx-auto\">
      <!-- esto sera el contenido del ussario -->
      <slot />
    </div>
  </div>
</div>

<div
  class:list={[
    \"w-full h-16 fixed translate-y-full bottom-0 right-0 left-0\",
    footerClass,
  ]}
  id=\"vault-footer\"
>
</div>

<div
  class=\"bg-black w-screen h-screen fixed top-0 left-0 z-30 opacity-0 invisible\"
  id=\"vault-overlay\"
>
</div>

<script>
  import { gsap } from \"gsap\";

  const \$ = (selector: string, context: Document | HTMLElement = document) => {
    return context.querySelector(selector);
  };

  const vault = {
    vault: \$(\"#Vault\"),
    trigger: \$(\"#button-vault\"),
    notch: \$(\"#vault-notch\"),
    footer: \$(\"#vault-footer\"),
    overlay: \$(\"#vault-overlay\"),
  };

  const easeOpen = vault.vault?.dataset.easeOpen;
  const easeStretch = vault.vault?.dataset.easeStretch;
  const durationOpen = Number(vault.vault?.dataset.durationOpen);
  const durationStretch = Number(vault.vault?.dataset.durationStretch);

  document.addEventListener(\"DOMContentLoaded\", () => {
    //Pasar el vault al body para que no colapse si se tiene en algun contenedor dentro con valores overflow-hidden, relative etc...
    document.body.appendChild(vault.vault as HTMLElement);
    document.body.appendChild(vault.footer as HTMLElement);
    document.body.appendChild(vault.overlay as HTMLElement);

    // muestra el vault
    vault.trigger?.addEventListener(\"click\", () => openVault());

    // activar la sensación de arrastre
    vault.notch?.addEventListener(\"mousedown\", (event: Event) =>
      vaultDrag(event),
    );

    // cuando se este arrastrando necesitamos que se mueva respecto a la posición actual del mouse
    window.addEventListener(\"mousemove\", (event) => vaultMove(event));

    // Se ejecuta cuando se suelta el vault
    window.addEventListener(\"mouseup\", () => vaultDrop());

    // se ejecuta cuando se presiona en el overlay
    vault.overlay?.addEventListener(\"click\", () => showOverlay());
  });

  //animations
  const animationDefaults = {
    easeContainer: easeOpen,
    easeNotch: easeStretch,
    durationContainer: durationOpen,
    durationNotch: durationStretch,
  };

  let isVaultVisible = false,
    isDragging = false,
    offset = { y: 0 },
    startY = 0;

  const animationSettings = {
    vault: {
      ease: animationDefaults.easeContainer,
      duration: animationDefaults.durationContainer,
    },
    notch: {
      ease: animationDefaults.easeNotch,
      duration: animationDefaults.durationNotch,
    },
    stretch: {
      ease: animationDefaults.easeNotch,
      duration: animationDefaults.durationContainer,
    },
  };

  function openVault(y = 0) {
    isVaultVisible = true;

    document.body.style.overflow = \"hidden\";

    gsap.to(vault.vault, { y, ...animationSettings.vault });
    gsap.to(vault.footer, { y, ...animationSettings.vault });
    gsap.to(vault.overlay, {
      opacity: 0.3,
      duration: 0.3,
      visibility: \"visible\",
    });
  }

  function vaultDrag(event) {
    event.preventDefault();
    isDragging = true;
    //recuperar la posición del vault desde el notch
    offset.y = event.clientY;
  }

  function vaultMove(event) {
    if (isDragging && isVaultVisible) {
      startY = event.clientY - offset.y;

      if (startY > 0) {
        gsap.to(vault.vault, {
          y: startY,
          // importante que sea 0.3, para que la animación sea natural sino se sentira lenta cuando se coloque un valor mayor
          duration: 0.3,
          ease: animationSettings.vault.ease,
        });
      } else {
        // Se deforma el vaul por que se estira demasiado haciá arriba (StartY es menor a 0)
        //se espera: recuperamos la posición de startY y la multiplicamos por un numero pequeño para que cuando se estire de la sensación de menor movimiento, obligando al usuario a soltar, en otras palabras
        //-400 (startY) * -0.000113 = -0.0452
        //-600 (startY) * -0.000113 = -0.0678
        const stretch = startY * -0.000113;
        gsap.to(vault.vault, {
          scaleY: 1 + stretch,
          ...animationSettings.stretch,
        });
      }
    }
  }

  function vaultDrop() {
    isDragging = false;

    if (isVaultVisible) {
      gsap.to(vault.vault, {
        scaleY: 1,
        ...animationSettings.notch,
      });

      //calculamos el valor del tamaño de pantalla para poder cambiarlo y no haya mucha animación y tenga un limite natural
      const matchMedia = window.matchMedia(\"(min-width: 1600px)\").matches
        ? 0.25
        : 0.4;
      // console.log(startY, offset.y * matchMedia);
      //el bug esta en que el valor se queda tal cual cuando borro, por lo que necesito reiniciarlo

      if (startY > offset.y * matchMedia) {
        gsap.to([vault.vault, vault.footer], {
          y: \"100%\",
          ...animationSettings.vault,
        });

        gsap.to(vault.overlay, { opacity: 0, duration: 0.3 });

        setTimeout(() => {
          gsap.to(vault.overlay, {
            visibility: \"hidden\",
          });
        }, 300);

        isVaultVisible = false;
        startY = 0;

        document.body.style.overflow = \"visible\";
      } else {
        gsap.to(vault.vault, {
          y: 0,
          ...animationSettings.notch,
        });
      }
    }
  }

  function showOverlay() {
    // verificamos que isVaultVisible este mostrandose y el isDragging no se este moviendo
    if (isVaultVisible && !isDragging) {
      gsap.to([vault.vault, vault.footer], {
        y: \"100%\",
        bottom: 0,
        duration: animationDefaults.durationNotch,
        ease: \"power4.out\",
      });

      gsap.to(vault.overlay, {
        opacity: 0,
        duration: 0.3,
      });

      setTimeout(() => {
        gsap.to(vault.overlay, {
          visibility: \"hidden\",
        });
      }, 300);

      document.body.style.overflow = \"visible\";
      isVaultVisible = false;
    }
  }
</script>
`},
Text: {
    name: "Text",
    description: ``,
    type: "butter",
    files: ["src/registry/butter/Text.astro"],
    component: async () => import("../registry/butter/Text.astro"),
    code: `---
interface TweenAnimation {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: {
    amount?: number;
    from?: string;
  };
  ease?: string;
  delay?: number;
  scale?: number;
  rotation?: number;
}

interface TextItem {
  as: string;
  class: string;
  textType: \"chars\" | \"words\" | \"lines\";
  mask: \"true\" | \"false\";
  duration?: number;
  opacity?: number;
  y?: number;
  x?: number;
  ease?: string;
  staggerAmount?: number;
  staggerFrom?: string;
  delay?: number;
  tweenFrom: TweenAnimation;
  id: string;
}

const GUID = () => {
  return Math.random().toString(36).substring(2, 9);
};

const {
  as = \"p\",
  textType = \"chars\",
  mask = \"false\",
  duration = 0.7,
  opacity = 0,
  y = 0,
  x,
  ease = \"power4.out\",
  staggerAmount = 0.1,
  staggerFrom = \"start\",
  delay,
  tweenFrom,
  id = GUID(),
  class: className = \"\",
}: TextItem = Astro.props as TextItem;

const animationConfig = {
  y,
  ...(x !== undefined && { x }),
  opacity,
  duration,
  ease,
  stagger: {
    amount: staggerAmount,
    from: staggerFrom,
  },
  ...(delay !== undefined && { delay }),
  ...tweenFrom,
};
const tween = JSON.stringify(animationConfig);

const AsComponent = as;
const uniqueID = \`butter-text-\${id}\`;
---

<AsComponent
  data-text-type={textType}
  data-is-mask={mask}
  data-unique-class={uniqueID}
  data-tween-from={tween}
  class:list={[\"butter-text\", uniqueID, className]}
>
  <slot />
</AsComponent>

<script>
  import { gsap } from \"gsap\";
  import { SplitText } from \"gsap/SplitText\";

  const initTextAnimation = (element) => {
    const type = element.dataset.textType;
    const isMask = element.dataset.isMask !== \"false\";
    const uniqueClass = element.dataset.uniqueClass;
    const tweenFromString = element.dataset.tweenFrom;
    const tweenFrom = JSON.parse(tweenFromString);

    let split;

    const typeText = (type, self) => {
      let option =
        type === \"chars\"
          ? self.chars
          : type === \"words\"
            ? self.words
            : self.lines;
      return option;
    };

    document.fonts.ready.then(() => {
      split = SplitText.create(\`.\${uniqueClass}\`, {
        type: type,
        autoSplit: true,
        mask: isMask && type,
        onSplit: (self) => {
          return gsap.from(typeText(type, self), tweenFrom);
        },
      });
      return split;
    });
  };

  document.querySelectorAll(\".butter-text\").forEach((element) => {
    initTextAnimation(element);
  });
</script>

<style is:global>
  .word,
  .char {
    outline: 1px dashed;
    border-radius: 10px;
  }
</style>
`},
TextHacker: {
    name: "TextHacker",
    description: ``,
    type: "butter",
    files: ["src/registry/butter/TextHacker.astro"],
    component: async () => import("../registry/butter/TextHacker.astro"),
    code: `---
interface TweenAnimation {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  scramble?: {
    chars?: \"upperCase\" | \"lowerCase\" | \"upperAndLowerCase\" | string;
  };
}

interface TextItem {
  as: string;
  class: string;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  scrambleChars: string;
  tweenFrom: TweenAnimation;
  id: string;
}

const GUID = () => {
  return Math.random().toString(36).substring(2, 9);
};

const {
  as = \"p\",
  duration = 0.7,
  ease = \"none\",
  delay,
  stagger = 0.1,
  scrambleChars = \"upperCase\",
  tweenFrom,
  id = GUID(),
  class: className = \"\",
}: TextItem = Astro.props as TextItem;

const animationConfig = {
  duration,
  opacity: 0,
  ease,
  delay,
  stagger,
  scrambleText: {
    text: \"{original}\",
    chars: scrambleChars,
    newClass: \"isnt-scrambling\",
    oldClass: \"is-scrambling\",
  },
  ...tweenFrom,
};

const tween = JSON.stringify(animationConfig);

const AsComponent = as;
const uniqueID = \`butter-text-\${id}\`;
---

<AsComponent
  data-unique-class={uniqueID}
  data-tween-from-hacker={tween}
  class:list={[\"butter-text-hacker\", uniqueID, className]}
>
  <slot />
</AsComponent>

<script>
  import { gsap } from \"gsap\";
  import { ScrambleTextPlugin } from \"gsap/ScrambleTextPlugin\";
  import { SplitText } from \"gsap/SplitText\";

  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(SplitText);

  function initHackerText(element) {
    const uniqueClass = element.dataset.uniqueClass;
    const tweenFromHackerString = element.dataset.tweenFromHacker;
    const tweenFrom = JSON.parse(tweenFromHackerString);
    const { duration } = tweenFrom;

    let split;
    let tl = gsap.timeline({
      defaults: {
        duration,
      },
    });
    document.fonts.ready.then(() => {
      SplitText.create(\`.\${uniqueClass}\`, {
        type: \"chars\",
        charsClass: \"chars++\",
        onSplit: (self) => {
          split = tl.from(self.chars, tweenFrom);
          return split;
        },
      });
    });
  }

  document.querySelectorAll(\".butter-text-hacker\").forEach((element) => {
    initHackerText(element);
  });
</script>

<style is:global>
  .is-scrambling {
    opacity: 0.7;
    animation: scrambling 0.2s cubic-bezier(0.48, 0.51, 0.75, 0.74);
  }
  .isnt-scrambling {
    opacity: 1;
  }

  @keyframes scrambling {
    0% {
      opacity: 0.7;
    }
    10% {
      opacity: 1;
    }
    100% {
      opacity: 0.7;
    }
  }
</style>
`},
AvatarListMain: {
    name: "AvatarListMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/AvatarListMain.astro"],
    component: async () => import("../registry/examples/AvatarListMain.astro"),
    code: `---
import { AvatarList, type AvatarItem } from \"@butter-js/ui\";

const example: AvatarItem[] = [
  {
    name: \"Three.js\",
    src: \"https://pbs.twimg.com/profile_images/1510259524271173638/lgTEVmRi_400x400.jpg\",
    alt: \"Three.js Logo\",
  },
  {
    name: \"Midulive\",
    src: \"https://pbs.twimg.com/profile_images/1824773087323111424/-S3LUmjQ_400x400.jpg\",
    alt: \"Midulive Logo\",
  },
  {
    name: \"Svelte\",
    src: \"https://pbs.twimg.com/profile_images/1121395911849062400/7exmJEg4_400x400.png\",
    alt: \"Svelte Logo\",
  },
  {
    name: \"Astro\",
    src: \"https://pbs.twimg.com/profile_images/1632785343433908224/SnMGR19O_400x400.png\",
    alt: \"Astro Logo\",
  },
  {
    name: \"Gsap\",
    src: \"https://pbs.twimg.com/profile_images/1713633504431394816/h28jJ1qM_400x400.jpg\",
    alt: \"Gsap Logo\",
  },
];
---

<AvatarList data={example} />
`},
AvatarListVertical: {
    name: "AvatarListVertical",
    description: ``,
    type: "example",
    files: ["src/registry/examples/AvatarListVertical.astro"],
    component: async () => import("../registry/examples/AvatarListVertical.astro"),
    code: `---
import { AvatarList, type AvatarItem } from \"@butter-js/ui\";

const example: AvatarItem[] = [
  {
    name: \"Svelte\",
    src: \"https://pbs.twimg.com/profile_images/1121395911849062400/7exmJEg4_400x400.png\",
    alt: \"Svelte Logo\",
  },
  {
    name: \"Three.js\",
    src: \"https://pbs.twimg.com/profile_images/1510259524271173638/lgTEVmRi_400x400.jpg\",
    alt: \"Three.js Logo\",
  },
  {
    name: \"Astro\",
    src: \"https://pbs.twimg.com/profile_images/1632785343433908224/SnMGR19O_400x400.png\",
    alt: \"Astro Logo\",
  },
];
---

<AvatarList data={example} direction=\"vertical-right\" size=\"medium\" />
`},
AvatarListBlog: {
    name: "AvatarListBlog",
    description: ``,
    type: "example",
    files: ["src/registry/examples/AvatarListBlog.astro"],
    component: async () => import("../registry/examples/AvatarListBlog.astro"),
    code: `---
import { AvatarList, type AvatarItem } from \"@butter-js/ui\";

const avatars: AvatarItem[] = [
  {
    name: \"Gsap\",
    src: \"https://pbs.twimg.com/profile_images/1713633504431394816/h28jJ1qM_400x400.jpg\",
    alt: \"Gsap logo\",
  },
  {
    name: \"FredKSchott\",
    src: \"https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg\",
    alt: \"Heeector logo\",
  },
];

let text = \"\";

function getNames() {
  for (let i = 0; i < avatars.length; i++) {
    if (avatars.length > 1 && i === avatars.length - 1) {
      text += \` and <span class=\"text-zinc-900\">\${avatars[i].name}</span>\`;
    } else if (i > 0 && i < avatars.length - 1) {
      text += \`, <span class=\"text-zinc-900\">\${avatars[i].name}</span>\`;
    } else {
      text += \`<span class=\"text-zinc-900\">\${avatars[i].name}</span>\`;
    }
  }
}
getNames();
---

<section
  class=\"max-w-[95%] md:max-w-[70%] p-5 bg-zinc-100 rounded-xl dark:bg-white\"
>
  <h1 class=\"text-zinc-800 text-xl md:text-2xl lg:text-3xl font-medium\">
    Create animated avatars for stunning UI 😎
  </h1>
  <p class=\"py-2 lg:py-5 text-zinc-600 text-small lg:text-body\">
    Learn how to design and animate <span class=\"text-zinc-900\">avatars</span> that
    bring life to your UI. Using <span class=\"text-zinc-900\">GSAP</span>, you
    can create <span class=\"text-zinc-900\"
      >dynamic hover effects, smooth scaling</span
    >, and <span class=\"text-zinc-900\">interactive transitions</span>. These
    animated avatars are perfect for adding <span class=\"text-zinc-900\"
      >personality</span
    > to your project, whether it's a website, app, or portfolio. Stand out with
    engaging and <span class=\"text-zinc-900\">visually appealing animations</span
    > that captivate your audience!
  </p>
  <div class=\"flex items-center gap-3\">
    <AvatarList
      data={avatars}
      size=\"small\"
      imageStyles=\"!ring-zinc-100 !shadow-none\"
    />
    <div>
      <p class=\"text-xs text-zinc-900\">Created by</p>
      <p class=\"text-xs text-zinc-900\" set:html={text} />
    </div>
  </div>
</section>
`},
JumpyMain: {
    name: "JumpyMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/JumpyMain.astro"],
    component: async () => import("../registry/examples/JumpyMain.astro"),
    code: `---
import { Jumpy, type JumpyItem } from \"@butter-js/ui\";

const example: JumpyItem[] = [
  {
    src: \"https://a0.muscache.com/im/pictures/hosting/Hosting-1124010734237889235/original/5d19481e-59be-49ab-a820-4af2ef1052aa.jpeg?im_w=720&im_format=avif\",
    alt: \"Imagen 1\",
  },
  {
    src: \"https://a0.muscache.com/im/pictures/hosting/Hosting-1124010734237889235/original/0dedcab2-8e2d-4aa9-9209-41abaa775b26.jpeg?im_w=720&im_format=avif\",
    alt: \"Imagen 2\",
  },
  {
    src: \"https://a0.muscache.com/im/pictures/hosting/Hosting-1124010734237889235/original/d97467a3-fe5a-4a2d-a15b-9870257eec66.jpeg?im_w=720&im_format=avif\",
    alt: \"Imagen 3\",
  },
  {
    src: \"https://a0.muscache.com/im/pictures/hosting/Hosting-1124010734237889235/original/7c1d094c-8e8d-4e5d-83e8-7fca80de7486.jpeg?im_w=720&im_format=avif\",
    alt: \"Imagen 4\",
  },
  {
    src: \"https://a0.muscache.com/im/pictures/hosting/Hosting-1124010734237889235/original/4449af5d-53a5-4909-b416-db802314894b.jpeg?im_w=720&im_format=avif\",
    alt: \"Imagen 5\",
  },
];
---

<Jumpy images={example} />
`},
JumpyText: {
    name: "JumpyText",
    description: ``,
    type: "example",
    files: ["src/registry/examples/JumpyText.astro"],
    component: async () => import("../registry/examples/JumpyText.astro"),
    code: `---
import { Jumpy, type JumpyItem } from \"@butter-js/ui\";

const images: JumpyItem[] = [
  {
    src: \"https://cdn-icons-png.flaticon.com/512/3991/3991951.png\",
    alt: \"Dribbble logo\",
    href: \"https://dribbble.com/\",
  },
  {
    src: \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/1690643591twitter-x-logo-png.webp/2000px-1690643591twitter-x-logo-png.webp.png\",
    alt: \"X logo\",
    href: \"https://x.com/heeector00\",
  },
  {
    src: \"https://img.freepik.com/vector-premium/logo-linkedin_578229-227.jpg\",
    alt: \"LinkedIn logo\",
    href: \"https://www.linkedin.com/feed/\",
  },
];
---

<h1
  class=\"text-center text-black dark:text-white text-4xl/tight md:text-5xl/tight lg:text-6xl/tight\"
>
  <span>Thanks for visiting!</span>
  <span class=\"flex items-center gap-4\"
    >Reach me on <div>
      <Jumpy
        as=\"a\"
        images={images}
        wrapperStyles=\"!ring-0\"
        size=\"small\"
        spacing=\"-ml-4 md:-ml-5\"
        spacingHover={20}
      />
    </div>
  </span>
</h1>
`},
GlimpseMain: {
    name: "GlimpseMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/GlimpseMain.astro"],
    component: async () => import("../registry/examples/GlimpseMain.astro"),
    code: `---
import { Glimpse, GlimpseProps } from \"@butter-js/ui\";

const data: GlimpseProps = [
  {
    title: \"Oaxaca\",
    owner: \"@Riven on Dribbble\",
    location: \"Mont Blanc, Francia\",
    src: \"https://cms.riven.ch/assets/8c58bd40-da78-4c05-953e-3254c94762b8?key=reduce\",
    alt: \"image oaxaca\",
    width: \"w-60\",
    height: \"h-72\",
    animate: true,
  },
];
---

{data.map((item: GlimpseProps) => <Glimpse {...item} />)}
`},
GlimpseCards: {
    name: "GlimpseCards",
    description: ``,
    type: "example",
    files: ["src/registry/examples/GlimpseCards.astro"],
    component: async () => import("../registry/examples/GlimpseCards.astro"),
    code: `---
import { Glimpse, GlimpseProps } from \"@butter-js/ui\";

const cardsData: GlimpseProps = [
  {
    title: \"Iglesia en Frankfurt\",
    owner: \"@heeector on Twitter\",
    location: \"Dreikonigskirche, Alemania\",
    src: \"https://www.expedia.mx/stories/wp-content/uploads/2021/11/Aerial-view-of-Cologne-Germany.jpg\",
    alt: \"Iglesia en Frankfurt\",
  },
  {
    title: \"Castillo de Neuschwanstein\",
    owner: \"@travelphotographer on Instagram\",
    location: \"Baviera, Alemania\",
    src: \"https://upload.wikimedia.org/wikipedia/commons/f/f8/Schloss_Neuschwanstein_2013.jpg\",
    alt: \"Castillo de Neuschwanstein en los Alpes bávaros\",
  },
  {
    title: \"Puerta de Brandenburgo\",
    owner: \"@berlinlover on Twitter\",
    location: \"Berlín, Alemania\",
    src: \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/1200px-Brandenburger_Tor_abends.jpg\",
    alt: \"Puerta de Brandenburgo iluminada por la noche\",
  },
  {
    title: \"Puerto de Hamburgo\",
    owner: \"@maritimephotography on Instagram\",
    location: \"Hamburgo, Alemania\",
    src: \"https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg\",
    alt: \"Vista panorámica del Puerto de Hamburgo\",
  },
];
---

<div class=\"w-full flex justify-center\">
  <div class=\"grid grid-cols-2 gap-4 place-items-center\">
    {
      cardsData.map(({ title, owner, location, src, alt }) => (
        <Glimpse
          title={title}
          owner={owner}
          location={location}
          src={src}
          alt={alt}
          width=\"w-52\"
          height=\"h-52\"
          containerClass=\"shadow-lg\"
          titleClass=\"!text-body\"
          ownerClass=\"italic\"
          locationClass=\"font-semibold\"
        />
      ))
    }
  </div>
</div>
`},
VaultMain: {
    name: "VaultMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/VaultMain.astro"],
    component: async () => import("../registry/examples/VaultMain.astro"),
    code: `---
import { Vault } from \"@butter-js/ui\";
---

<Vault
  labelClass={\`bg-zinc-200 dark:bg-zinc-700 px-5 py-2 rounded-xl\`}
  vaultClass=\"z-41 bg-zinc-100 dark:bg-zinc-800 pb-5 px-5 rounded-2xl\"
  notchClass=\"bg-zinc-300 dark:bg-zinc-600\"
  footerClass=\"bg-zinc-100 dark:bg-zinc-800 z-40\"
>
  <h3 class=\"mt-0 mb-3 p-0\">Motion</h3>
  <p class=\"mb-3 dark:text-zinc-50\">
    Beautiful, fluid motions bring the interface to life, conveying status,
    providing feedback and instruction, and enriching the visual experience of
    your app or game.
  </p>
  <img
    src=\"https://w0.peakpx.com/wallpaper/236/488/HD-wallpaper-mac-os-ventura-dark-macos-ventura-macbook-apple-computer.jpg\"
    alt=\"Imagen\"
    class=\"rounded-2xl h-[400px] object-cover w-full\"
  />
</Vault>
`},
TextMain: {
    name: "TextMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/TextMain.astro"],
    component: async () => import("../registry/examples/TextMain.astro"),
    code: `---
import { Text } from \"@butter-js/ui\";
---

<Text
  class=\"text-2xl font-normal\"
  as=\"h2\"
  y={100}
  duration={1}
  textType=\"chars\"
  staggerAmount={0.5}
  staggerFrom=\"random\"
>
  This text appears from below
</Text>
`},
TextWords: {
    name: "TextWords",
    description: ``,
    type: "example",
    files: ["src/registry/examples/TextWords.astro"],
    component: async () => import("../registry/examples/TextWords.astro"),
    code: `---
import { Text } from \"@butter-js/ui\";
---

<Text
  class=\"text-2xl\"
  as=\"p\"
  textType=\"words\"
  mask=\"true\"
  tweenFrom={{
    y: 30,
    duration: 0.7,
    ease: \"power4.out\",
    stagger: {
      amount: 0.2,
      from: \"random\",
    },
  }}
>
  Text separated word by word in random order
</Text>
`},
TextLines: {
    name: "TextLines",
    description: ``,
    type: "example",
    files: ["src/registry/examples/TextLines.astro"],
    component: async () => import("../registry/examples/TextLines.astro"),
    code: `---
import { Text } from \"@butter-js/ui\";
---

<Text
  class=\"text-2xl font-light flex flex-col\"
  as=\"p\"
  textType=\"lines\"
  mask=\"true\"
  tweenFrom={{
    y: 100,
    duration: 0.7,
    ease: \"power4.out\",
    stagger: {
      amount: 0.4,
      from: \"start\",
    },
  }}
>
  <span>Text separated line by line</span>
  <span>Text separated line by line</span>
  <span>Text separated line by line</span>
  <span>Text separated line by line</span>
  <span>Text separated line by line</span>
</Text>
`},
TextHackerMain: {
    name: "TextHackerMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/TextHackerMain.astro"],
    component: async () => import("../registry/examples/TextHackerMain.astro"),
    code: `---
import { TextHacker } from \"@butter-js/ui\";

const defaultChars =
  \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\";
---

<TextHacker
  class=\"text-2xl font-geist-code\"
  stagger={0.1}
  duration={0.5}
  delay={0.5}
  scrambleChars={defaultChars}>April 30, 2025</TextHacker
>
`}
};
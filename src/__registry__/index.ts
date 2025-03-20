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
import { Icon } from \"astro-icon/components\";

export interface JellyProps {
  title: string;
  owner: string;
  location: string;
  src: string;
  alt: string;
  iconLocation?: string;
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
  iconLocation = \"location\",
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
            <span><Icon name={iconLocation} class=\"text-white\" /></span>{
              location
            }</span
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

<AvatarList data={example} direction=\"vertical-right\" />
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
import type { ImageItem } from \"src/types\";
import Jumpy from \"../butter/Jumpy.astro\";

const example: ImageItem[] = [
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
import Jumpy from \"../butter/Jumpy.astro\";

const images = [
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
JellyMain: {
    name: "JellyMain",
    description: ``,
    type: "example",
    files: ["src/registry/examples/JellyMain.astro"],
    component: async () => import("../registry/examples/JellyMain.astro"),
    code: `---
import Jelly from \"../butter/Jelly.astro\";

const data = [
  {
    title: \"The Alpes\",
    owner: \"@wickedmishra on Dribbble\",
    location: \"Zugspitze, Alemania\",
    alt: \"text alternative\",
    src: \"https://w0.peakpx.com/wallpaper/980/128/HD-wallpaper-sunset-over-the-village-wamberg-bavarian-alps-trees-germany-mountains-cabin-clouds-sky.jpg\",
    width: \"w-60\",
    height: \"h-72\",
    containerClass: \"\",
    titleClass: \"\",
    ownerClass: \"\",
    locationClass: \"\",
    animate: true,
  },
];
---

{data.map((item) => <Jelly {...item} />)}
`},
JellyCards: {
    name: "JellyCards",
    description: ``,
    type: "example",
    files: ["src/registry/examples/JellyCards.astro"],
    component: async () => import("../registry/examples/JellyCards.astro"),
    code: `---
import JellyReveal from \"../butter/Jelly.astro\";

const cardsData = [
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
        <JellyReveal
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
`}
};
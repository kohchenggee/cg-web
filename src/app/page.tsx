"use client";
import Image from "next/image";
import { FC, ReactNode, useMemo, useRef, useState } from "react";
// import { Modal, ModalBody, ModalHeader,  } from "reactstrap";
import { useCollapse } from "react-collapsed";
import ReactPlayer from "react-player";
import styles from "./Home.module.css";
import JobCard from "@/lib/JobCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Sphere } from "@react-three/drei";
import { Group, MeshPhysicalMaterial, type Object3DEventMap } from "three";
import Camera from "./Camera";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const [open, setOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const FixedGroup: FC = () => {
    // Random radius between 0.1 and 0.25
    const radius: number = useMemo(() => Math.random() * 0.1 + 0.15, []);

    return (
      <group>
        {/* Background spheres */}
        {Array.from({ length: 9 }, (_, i) => (
          <Sphere
            key={i}
            args={[radius, 16, 16]}
            position={[Math.cos(i) * 6.5, Math.sin(i) * 1.5, -4.5]}
          >
            <meshPhysicalMaterial
              attach="material"
              color={SPHERE_COLOURS[i % SPHERE_COLOURS.length]}
              roughness={0.2}
              reflectivity={1}
              opacity={1}
            />
          </Sphere>
        ))}
      </group>
    );
  };

  type SectionContent = {
    heading?: ReactNode;
    body: ReactNode;
    href?: string;
  };

  const SECTIONS: SectionContent[] = [
    {
      body: (
        <>
          <h1 className={styles.title}>
            <span className="animate-flip relative inline-block text-cyan-500 [animation-delay:calc(0.2s*0)]">
              C
            </span>
            <span className="animate-flip relative inline-block text-purple-300 [animation-delay:calc(0.2s*1)]">
              G
            </span>
          </h1>
          <Image
            src={`${prefix}/assets/profile_img.png`}
            alt="Profile Photo"
            className={styles.profilePhoto}
            width={100}
            height={100}
          />

          <h2 className={styles.description}>
            Hi, I am{" "}
            <span className={styles.title_word + " " + styles.title_word_1}>
              Koh{" "}
            </span>
            <span className={styles.title_word + " " + styles.title_word_2}>
              Cheng{" "}
            </span>
            <span className={styles.title_word + " " + styles.title_word_3}>
              Gee
            </span>
          </h2>

          <p className={styles.description}>
            I am a software engineer based in Singapore.
          </p>
        </>
      ),
    },
    {
      heading: "Career",
      body: (
        <div className="flex justify-center gap-8 py-8">
          <div className="mt-5">
            <JobCard
              project={{
                name: "Cognizant Technology Solutions",
                url: "https://www.cognizant.com/",
              }}
              name="Associate (Frontend)"
              year="Mar 2023 - Present"
              list={[
                "Nx",
                "ReactJS",
                "Redux Toolkit",
                "Typescript",
                "Playwright",
                "Jest",
                "Streamlit",
                "MUI",
              ]}
            />
          </div>
          <div className="mt-5">
            <JobCard
              project={{ name: "99.co", url: "https://www.99.co/" }}
              name="Frontend Software Engineer"
              year="Dec 2020 - Dec 2022"
              list={["ReactJS", "Redux Thunk", "Typescript", "Jest"]}
            />
          </div>
          <div className="mt-5">
            <JobCard
              project={{ name: "Streetsine", url: "https://www.srx.com.sg/" }}
              name="Mobile App Developer"
              year="May 2018 - Dec 2020"
              list={["React Native", "Javascript", "Redux"]}
            />
          </div>
        </div>
      ),
    },
    {
      heading: "Project",
      body: (
        <div className="flex justify-center gap-5 py-8">
          <div className="mt-5">
            <JobCard
              project={{
                name: "Jobify",
                url: "https://tutorial-jobify-dribrwuq5-kohchenggees-projects.vercel.app/",
              }}
              year="Dec 2024 - Jan 2025"
              list={[
                "NextJs",
                "Nx Monorepo",
                "Prisma",
                "TailwindCss",
                "Shadcn",
              ]}
            />
          </div>
          <div className="mt-5">
            <JobCard
              project={{
                name: "The Chosen One",
                url: "",
                onClick: () => {
                  setOpen(true);
                  setModalUrl("https://vimeo.com/782384898");
                },
              }}
              year="Aug 2017 - Nov 2017"
              list={["Unity"]}
            />
          </div>
          <div className="mt-5">
            <JobCard
              project={{
                name: "Trick Tower",
                url: "",
                onClick: () => {
                  setOpen(true);
                  setModalUrl("https://vimeo.com/782427046");
                },
              }}
              year="May 2018 - Dec 2020"
              list={["Unreal Engine"]}
            />
          </div>
        </div>
      ),
    },
  ];

  type ScenePageProps = {
    position: [number, number, number];
    sectionIndex: number;
    radius: number;
    columnWidth: number;
  };

  const SPHERE_COLOURS = ["grey", "silver"] as const;
  const ScenePage: FC<ScenePageProps> = ({
    position,
    radius = 1,
    columnWidth,
    sectionIndex,
  }) => {
    const isOnLeft = sectionIndex % 2 === 0;
    const onRightPosition = [columnWidth, 0, 0] as [number, number, number];
    const onLeftPosition = [-columnWidth, 0, 0] as [number, number, number];
    const modelPosition = isOnLeft ? onLeftPosition : onRightPosition;
    const color = SPHERE_COLOURS[sectionIndex % SPHERE_COLOURS.length];

    const material = useRef<MeshPhysicalMaterial>(null);

    useGSAP(() => {
      // Fade in and out as the corresponding section enters/exits the viewport
      gsap.fromTo(
        material.current,
        {
          opacity: 0,
        },
        {
          keyframes: [
            { opacity: 1, duration: 0.33 }, // fade in for 1/3 of the scroll distance
            { opacity: 1, duration: 0.33 }, // be fully visible for 1/3 of the scroll distance
            { opacity: 0, duration: 0.33 }, // fade out for 1/3 of the scroll distance
          ],
          ease: "none",
          scrollTrigger: {
            trigger: `#section-${sectionIndex}`,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
          },
        }
      );
    }, []);

    return (
      <group position={position}>
        <Sphere args={[radius, 40, 40]} position={modelPosition}>
          <meshPhysicalMaterial
            ref={material}
            attach="material"
            color={color}
            roughness={0.12}
            reflectivity={1}
            transparent={true}
            opacity={0}
          />
        </Sphere>
      </group>
    );
  };
  const ScrollingGroup: FC = () => {
    const { height, width } = useThree((s) => s.viewport);
    const group = useRef<Group<Object3DEventMap>>(null);

    const pageHeight = height; // Could be adjusted if each section is not full height
    // This needs to match the CSS grid (6 columns)
    const columnWidth = width / 6;

    useGSAP(
      () => {
        if (!group.current) return;
        gsap.fromTo(
          group.current.position,
          { y: 0 },
          {
            y: pageHeight * (SECTIONS.length - 1),
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 0.6,
              fastScrollEnd: true,
            },
          }
        );
      },
      { dependencies: [pageHeight] }
    );

    return (
      // The group is translated up/down to match the scroll position
      <group ref={group}>
        {Array.from({ length: SECTIONS.length }, (_, i) => (
          <ScenePage
            key={i}
            position={[0, i * -pageHeight, 0]}
            radius={Math.max(columnWidth / 2, 0.5)}
            columnWidth={columnWidth}
            sectionIndex={i}
          />
        ))}
      </group>
    );
  };

  type SectionProps = SectionContent & {
    index: number;
  };

  const Section: FC<SectionProps> = ({ heading, body, href, index }) => {
    const section = useRef<HTMLDivElement>(null);

    useGSAP(
      () => {
        gsap.fromTo(
          "h2, p",
          { opacity: 0, y: 48 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: ".text",
              start: "top 90%",
              end: "center center",
              scrub: true,
            },
          }
        );
      },
      { dependencies: [], scope: section }
    );

    return (
      <section
        ref={section}
        id={`section-${index}`}
        className="grid h-screen w-full items-center"
      >
        <div className={"text col-span-2 h-fit space-y-4"}>
          {heading && (
            <h2 className="text-2xl font-bold leading-normal tracking-tight text-white sm:text-3xl lg:text-6xl text-center">
              {heading}
            </h2>
          )}
          {body}
        </div>
      </section>
    );
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project Video</DialogTitle>
          </DialogHeader>
          <div className={styles.modalContainer}>
            <ReactPlayer
              url={modalUrl}
              className={styles.reactPlayer}
              width="100%"
              playing
            />
          </div>
        </DialogContent>
      </Dialog>
      {/* <Modal isOpen={open} toggle={() => setOpen(false)}>
          <div>
            <h3 className={styles.projectTitle}>Project Video</h3>
            <div className={styles.modalContainer}>
              <ReactPlayer
                url={modalUrl}
                className={styles.reactPlayer}
                width="100%"
                playing
              />
            </div>
          </div>
        </Modal> */}
      <title>Koh Cheng Gee</title>
      <meta name="description" content="Self Intro" />
      <link rel="icon" href="/favicon.ico" />

      <main className="min-h-[calc(100vh)] flex flex-col justify-center items-center flex-1">
        <Canvas
          className="!fixed inset-0"
          gl={{
            alpha: false,
            antialias: false,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.5} color="#fff" />
          {/* Image downloaded from: https://polyhaven.com/hdris */}
          <Environment
            files={`${prefix}/assets/puresky.jpg`}
            background={true}
            resolution={512}
            ground={false}
          />
          <ScrollingGroup />
          <FixedGroup />
          <Camera />
        </Canvas>

        <div className="relative z-50 w-full">
          {SECTIONS.map((content, i) => (
            <Section key={i} {...content} index={i} />
          ))}
        </div>
        {/* <Separator />
        <section className="text-center w-full  py-2 px-4">
          <h2 className="text-2xl">Career</h2>
          <div className="flex justify-center gap-8 py-8">
            <div className="mt-5">
              <JobCard
                project={{
                  name: "Cognizant Technology Solutions",
                  url: "https://www.cognizant.com/",
                }}
                name="Associate (Frontend)"
                year="Mar 2023 - Present"
              />
            </div>
            <div className="mt-5">
              <JobCard
                project={{ name: "99.co", url: "https://www.99.co/" }}
                name="Frontend Software Engineer"
                year="Dec 2020 - Dec 2022"
              />
            </div>
            <div className="mt-5">
              <JobCard
                project={{ name: "Streetsine", url: "https://www.srx.com.sg/" }}
                name="Mobile App Developer"
                year="May 2018 - Dec 2020"
              />
            </div>
          </div>
        </section>
        <Separator />
        <section className="text-center w-full  py-2 px-4">
          <h2 className="text-2xl">Project</h2>
          <div className="flex justify-center gap-5 py-8">
            <div className="mt-5">
              <JobCard
                project={{
                  name: "Jobify",
                  url: "https://tutorial-jobify-dribrwuq5-kohchenggees-projects.vercel.app/",
                }}
                year="Dec 2024 - Jan 2025"
                list={[
                  "NextJs",
                  "Nx Monorepo",
                  "Prisma",
                  "TailwindCss",
                  "Shadcn",
                ]}
              />
            </div>
            <div className="mt-5">
              <JobCard
                project={{
                  name: "The Chosen One",
                  url: "",
                  onClick: () => {
                    setOpen(true);
                    setModalUrl("https://vimeo.com/782384898");
                  },
                }}
                year="Aug 2017 - Nov 2017"
                list={["Unity"]}
              />
            </div>
            <div className="mt-5">
              <JobCard
                project={{
                  name: "Trick Tower",
                  url: "",
                  onClick: () => {
                    setOpen(true);
                    setModalUrl("https://vimeo.com/782427046");
                  },
                }}
                year="May 2018 - Dec 2020"
                list={["Unreal Engine"]}
              />
            </div>
          </div>
        </section>
        <Separator /> */}
      </main>

      <footer className="mt-4 flex flex-wrap gap-4 justify-center">
        <span>
          <a
            className={styles.hover_underline_animation + " " + styles.anchor}
            href="https://www.linkedin.com/in/cheng-gee-koh-b41bb5153/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </span>

        <span>
          <a
            href="mailto:kohchenggee@gmail.com"
            className={styles.hover_underline_animation + " " + styles.anchor}
          >
            Email
          </a>
        </span>
      </footer>
    </div>
  );
}

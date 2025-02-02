"use client";
import Image from "next/image";
import { useState } from "react";
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

export default function Home() {
  const [open, setOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="py-8 px-8">
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

      <main className="min-h-[calc(100vh-68px)] flex flex-col justify-center items-center flex-1">
        <h1 className={styles.title}>
          <span className="animate-flip relative inline-block text-purple-500 [animation-delay:calc(0.2s*0)]">
            C
          </span>
          <span className="animate-flip relative inline-block text-purple-700 [animation-delay:calc(0.2s*1)]">
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
        <h2>
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
        <Separator />
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
        <Separator />
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

import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const [open, setOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <div className={styles.container + " " + styles.containerBackground}>
      <Modal isOpen={open} toggle={() => setOpen(false)}>
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
      </Modal>
      <Head>
        <title>Koh Cheng Gee</title>
        <meta name="description" content="Self Intro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span
            className={styles.spinLabel}
            style={{ animationDelay: "calc(.2s * 0)" }}
          >
            C
          </span>
          <span
            className={styles.spinLabel}
            style={{ animationDelay: "calc(.2s * 1)" }}
          >
            G
          </span>
        </h1>
        <Image
          src={`${prefix}/assets/profile_img.png`}
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

        <section className={styles.careerSection}>
          <h2>Career</h2>
          <div className={styles.positionContainer}>
            <div className={styles.careerFlex}>
              <h3>
                <a
                  className={
                    styles.hover_underline_animation + " " + styles.anchor
                  }
                  href="https://www.99.co/"
                >
                  99.co
                </a>
              </h3>
              <b>Frontend Software Engineer</b>
              <p>Dec 2020 - Dec 2022</p>
            </div>
            <div className={styles.careerFlex}>
              <h3>
                <a
                  className={
                    styles.hover_underline_animation + " " + styles.anchor
                  }
                  href="https://www.srx.com.sg/"
                >
                  Streetsine Singapore Pte Ltd
                </a>
              </h3>
              <b>Mobile App Developer</b>
              <p>May 2018 - Dec 2020</p>
            </div>
          </div>
        </section>
        <section className={styles.careerSection}>
          <h2>Project</h2>
          <div className={styles.positionContainer}>
            <div className={styles.careerFlex}>
              <a
                onClick={() => {
                  setOpen(true);
                  setModalUrl("https://vimeo.com/782384898");
                }}
                className={
                  styles.hover_underline_animation + " " + styles.anchor
                }
              >
                <h3>The Chosen One</h3>
              </a>
              <p>Aug 2017 - Nov 2017</p>
            </div>
            <div className={styles.careerFlex}>
              <h3>
                <a
                  onClick={() => {
                    setOpen(true);
                    setModalUrl("https://vimeo.com/782427046");
                  }}
                  className={
                    styles.hover_underline_animation + " " + styles.anchor
                  }
                >
                  Trick Tower
                </a>
              </h3>
              <p>May 2018 - Dec 2020</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
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

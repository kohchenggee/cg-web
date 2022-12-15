import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container + " " + styles.containerBackground}>
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
        <h2>
          Hi, I am{" "}
          <span className={styles.title_word + " " + styles.title_word_2}>
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

        <section>
          Career
          <div>
            <h4>99.co</h4>
            <b>Frontend Software Engineer</b>
            <p>Dec 2020 - Dec 2022</p>
          </div>
          <div>
            <h4>Streetsine Singapore Pte Ltd</h4>
            <b>Mobile App Developer</b>
            <p>May 2018 - Dec 2020</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

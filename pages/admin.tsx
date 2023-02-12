import Image from "next/image";
import Base from "../components/Base";
import styles from "../styles/Admin.module.css";

const images = [
  {
    id: "cld7g2n2s3d590bldcg9ucg9e",
    fileName: "1.png",
    width: 1920,
    height: 1080,
    title: "Domácí terminál v El Nido",
    // url: "https://media.graphassets.com/PpwKxWcfSp2BiTqZoHy7",
  },
  {
    id: "cld7g2n2s3d590bldcg9uce",
    fileName: "2.jpg",
    width: 1920,
    height: 1080,
    title: "Naše letadlo po příletu na Panglao",
    // url: "https://media.graphassets.com/PpwKxWcfSp2BiTqZoHy7",
  },
  {
    id: "cld7g2n2s3d590bldcgcg9e",
    fileName: "3.jpg",
    width: 1920,
    height: 1440,
    title: "terminal v číně",
    // url: "https://media.graphassets.com/PpwKxWcfSp2BiTqZoHy7",
  },
  {
    id: "cld7g2n2s3d590bcg9ucg9e",
    fileName: "4.jpg",
    width: 1920,
    height: 1440,
    title: "terminal v číně 2",
    // url: "https://media.graphassets.com/PpwKxWcfSp2BiTqZoHy7",
  },
];

export default function Admin({}: any) {
  return (
    <Base>
      <section className={styles.content}>
        <h2 className={styles.title}>Admin</h2>
        <p className={styles.perex}>panglao</p>
        {/* <img src="https://faustenova.cz/assets/img/macbook.png"></img> */}
        {images.map((image): any => {
          return (
            <div key={image.id} className={styles.imgWrapper}>
              <Image
                src={`https://faustenova.cz/travelblog/assets/panglao/${image.fileName}`}
                alt={image.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 70vw"
              />
            </div>
          );
        })}
      </section>
    </Base>
  );
}

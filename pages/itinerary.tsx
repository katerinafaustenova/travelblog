import { Base } from "../components/Base";
import { ItineraryList } from "../components/ItineraryList";
import styles from "../styles/Itinerary.module.css";

export default function Admin({}: any) {
  return (
    <Base>
      <section className={styles.content}>
        <h2 className={styles.title}>Itinerary</h2>
        <ItineraryList />
      </section>
    </Base>
  );
}

import styles from "../styles/Itinerary.module.css";
import { itineraryData } from "../staticData/itineraryData";
import Link from "next/link";
import { DatePicker } from "./DatePicker";

export function ItineraryTransfer({ item }: any) {
  const { id, country, island, location, dateFrom, slug, url, name, priceCZK } =
    item;
  return (
    <div className={styles.itineraryTransfer}>
      <div key={id} className={styles.itineraryItem}>
        <h3>
          {dateFrom} - {name}
        </h3>
        <h4>{priceCZK}</h4>
      </div>
    </div>
  );
}

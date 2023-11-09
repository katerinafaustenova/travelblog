import styles from "../styles/Itinerary.module.css";
import { itineraryData } from "../staticData/itineraryData";
import Link from "next/link";
import { DatePicker } from "./DatePicker";

export function ItineraryStay({ item }: any) {
  const {
    country,
    island,
    location,
    dateFrom,
    dateTo,
    slug,
    url,
    name,
    priceCZK,
  } = item;

  return (
    <div className={styles.itineraryStay}>
      <div className={styles.itineraryItem}>
        <h3>
          {country} - {island}
          {location && ` - ${location}`}
        </h3>
        <h4>
          {dateFrom} - {dateTo}-{" "}
          {slug ? <Link href={url}>{name}</Link> : <>{name}</>}
          {priceCZK && ` - ${priceCZK}`}
        </h4>
        {slug && <Link href={slug}>Blog</Link>}
      </div>
    </div>
  );
}

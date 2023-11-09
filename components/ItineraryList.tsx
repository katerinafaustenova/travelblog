import styles from "../styles/Itinerary.module.css";
import { itineraryData } from "../staticData/itineraryData";
import { DatePicker } from "./DatePicker";
import { ItineraryStay } from "./ItineraryStay";
import { ItineraryTransfer } from "./ItineraryTransfer";

export function ItineraryList() {
  const ubytka = itineraryData.filter((item) => !item.isTransfer);
  let ubytkaTotal = 0;
  for (let index = 0; index < ubytka.length; index++) {
    ubytkaTotal = ubytkaTotal + Number(ubytka[index].priceCZK);
  }

  const cesty = itineraryData.filter((item) => item.isTransfer);
  let cestyTotal = 0;
  for (let index = 0; index < cesty.length; index++) {
    cestyTotal = cestyTotal + Number(cesty[index].priceCZK);
  }

  return (
    <>
      <h3 className={styles.title}>Itinerář:</h3>
      total za ubytka : {ubytkaTotal}
      total za cesty : {cestyTotal}
      <div>
        {itineraryData.map((item) => {
          const { id, isTransfer } = item;

          return (
            <div key={id}>
              {isTransfer ? (
                <ItineraryTransfer item={item} />
              ) : (
                <ItineraryStay item={item} />
              )}
            </div>
          );
        })}
      </div>
      <DatePicker />
    </>
  );
}

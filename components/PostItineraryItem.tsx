import { format } from "date-fns";
import { useContext } from "react";
import LangContext from "../context/LangContext";
import styles from "../styles/PostItineraryItem.module.css";
import { processNbsp } from "../utils/processNbsp";

export function PostItineraryItem({ itinerary_item_ref }: any) {
  const { enLang } = useContext(LangContext);

  if (!itinerary_item_ref || itinerary_item_ref.length < 0) return null;

  itinerary_item_ref.sort((next: any, prev: any) => {
    const nextDate = Date.parse(next.date);
    const prevDate = Date.parse(prev.date);
    return nextDate - prevDate;
  });

  return (
    <>
      <h3 className={styles.itineraryTitle}>
        {enLang ? "Itinerary" : "Itinerář"}:
      </h3>
      {!enLang ? (
        itinerary_item_ref.map(({ id, title, date, text }: any) => {
          const processedTitle = processNbsp(title) || title;
          const processedText = processNbsp(text) || text;

          return (
            <div key={id} className={styles.itineraryItem}>
              <div className={styles.itineraryHeader}>
                <time className={styles.itineraryDate}>
                  {format(new Date(date), "dd.MM")}
                </time>
                <h5 className={styles.itineraryName}>{processedTitle}</h5>
              </div>
              <div className={styles.itineraryContent}>
                {processedText ? (
                  <p
                    className={styles.itineraryText}
                    dangerouslySetInnerHTML={{ __html: processedText }}
                  />
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <h4>There is no available itinerary data in this language version</h4>
      )}
    </>
  );
}

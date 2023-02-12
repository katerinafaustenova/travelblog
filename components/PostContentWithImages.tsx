import classNames from "classnames";
import Image from "next/image";
import styles from "../styles/PostContentWithImages.module.css";
import { processNbsp } from "../utils/processNbsp";

export default function PostContentWithImages({
  contentWithImages,
  setModalState,
}: any) {
  if (!contentWithImages || contentWithImages?.length < 0) return null;

  return (
    <>
      {contentWithImages.map(({ content, images }: any) => {
        const escapedContent = content?.html?.replaceAll("amp;", "");
        const processedContent = processNbsp(escapedContent) || escapedContent;

        return (
          <>
            {processedContent && (
              <div
                dangerouslySetInnerHTML={{
                  __html: processedContent,
                }}
                className={styles.wysiwyg}
              />
            )}
            {images?.length > 0 && (
              <div className={styles.wysiwygImages}>
                {images.map(
                  ({ id, url, title, fileName, width, height }: any) => {
                    const paddingRatio = (height / width) * 100;
                    const isAlone = images.length === 1;
                    return (
                      <div
                        key={id}
                        className={classNames(
                          styles.wysiwygImageFlex,
                          isAlone && styles.isAlone
                        )}
                      >
                        <div
                          className={styles.wysiwygImageWrapper}
                          style={{ paddingBottom: `${paddingRatio}%` }}
                        >
                          <Image
                            src={url}
                            alt={title || fileName}
                            onClick={() =>
                              setModalState({ open: true, chosenId: id })
                            }
                            fill
                            sizes="(max-width: 700px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </>
        );
      })}
    </>
  );
}

import classNames from "classnames";
import Image from "next/image";
import { Fragment, useContext } from "react";
import LangContext from "../context/LangContext";
import styles from "../styles/PostContentWithImages.module.css";
import { processNbsp } from "../utils/processNbsp";

export function PostContentWithImages({
  contentWithImages,
  imagesJsonData,
  setModalState,
}: any) {
  const { enLang } = useContext(LangContext);
  const noContent = !contentWithImages || contentWithImages?.length < 1;

  if (noContent && !imagesJsonData) return null;

  return (
    <>
      {!noContent &&
        contentWithImages.map(
          ({ content, contentEn, images }: any, index: any) => {
            const newContent = enLang && contentEn ? contentEn : content;
            const escapedContent = newContent?.html?.replaceAll("amp;", "");
            const processedContent =
              processNbsp(escapedContent) || escapedContent;

            return (
              <Fragment key={index}>
                {processedContent ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: processedContent,
                    }}
                    className={styles.wysiwyg}
                  />
                ) : null}
                {images?.length > 0 ? (
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
                ) : null}
              </Fragment>
            );
          }
        )}
      {/* TODO: zrefaktorovat a udelat samostatnou komponentu pro img */}
      {/* TODO: nedomysleli jsme razeni obrazku a jejich prirazeni k jednotlivym contentum (odstavcum textu) */}
      {/* TODO: styling vetsi odsazeni odshora */}
      {noContent && imagesJsonData && (
        <div className={styles.wysiwygImages}>
          {imagesJsonData.map(
            ({ id, url, title, fileName, width, height }: any) => {
              const paddingRatio = (height / width) * 100;
              const isAlone = imagesJsonData.length === 1;
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
}

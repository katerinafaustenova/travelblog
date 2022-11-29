import { format } from "date-fns";
import { gql, GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import Base from "../components/Base";
import styles from "../styles/Slug.module.css";


export default function Admin({  }: any) {
  return (
    <Base>
      <section className={styles.content}>
        <h2 className={styles.title}>Admin</h2>
        <p className={styles.perex}>test</p>
      </section>
    </Base>
  );
}

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";

const token = process.env.API_TOKEN;

export default function Home({ types }) {
  useEffect(() => {
    console.log(types);
  }, [types]);
  return <div>TEST</div>;
}

export const getServerSideProps = async () => {
  let url = "https://api.imagga.com/v2/text";
  try {
    const res2 = await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Basic ${token}`,
      },
      params: {
        image_url:
          "https://www.thecocktailproject.com/sites/default/files/liquors.jpg",
      },
    });
    const types = res2.data.result.text;
    return { props: { types } };
  } catch (e) {
    console.log("err", e);
  }
};

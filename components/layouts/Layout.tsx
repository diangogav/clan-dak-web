import { FC } from "react"

import Head from "next/head"
import { NavBar } from "../ui/NavBar";

export const Layout: FC<{ title?: string }> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Clan DAK"}</title>
        <meta name="author" content="Diango Gavidia" />
        <meta
          name="description"
          content={'Clan DAK'}
        />
        <meta name="keywords" content={`${title}, DAK, ygo, mdc`} />
      </Head>

      <NavBar/>

      <main style={{
        padding: "0px 20px"
      }}>{children}</main>
    </>
  );
}
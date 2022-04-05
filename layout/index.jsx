import { makeStyles } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import { APP_NAME } from "../assets/constants";
import SideBar from "../components/layout/SideBar";

const layoutStyles = makeStyles(theme=>({
  root:{
    display: 'flex',
    overflow: "hidden",
    height: "100vh",
  }
}))

export default function Layout({ children, title, pageName, isBlur }) {
  const classes = layoutStyles({isBlur});

  return (
    <React.Fragment>
      <Head>
        <title>{title ?? `${APP_NAME} | ${pageName}`}</title>
        <link rel={`icon`} href={`/favicon.ico`} type={`image/icon type`} />
      </Head>
      <div className={classes.root}>
        <SideBar />
        {children}
      </div>
    </React.Fragment>
  );
}

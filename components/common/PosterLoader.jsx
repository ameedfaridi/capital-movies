import { Skeleton } from '@material-ui/lab'
import React from 'react'
import clsx from "clsx";


export default function PosterLoader({classes}) {
  return (
    <div className={clsx(classes.skeleton, classes.root)}>
         {Array(8).fill().map((item,i)=><Skeleton height="20rem" key={i} classes={{
            text:classes.text
          }}/>)}
    </div>
  )
}

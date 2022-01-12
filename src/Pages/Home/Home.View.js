import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react"
// import {Grid} from "@material-ui/core"

export const View = forwardRef((props,ref)=>{
    const {data} = props

    useImperativeHandle(ref, () => ({

   }))

  return(
     //   <Grid>tes</Grid>
     <></>
  )

})
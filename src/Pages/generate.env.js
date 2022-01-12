var fs = require('fs');

var env_name = process.argv.slice(2)[0]


const CreateFile = () => {
    fs.writeFile('/frame/src/Pages/'+env_name+'/'+env_name + '.Component.js', 'import React from "react"\nimport {Grid} from "@material-ui/core"', function (err) {
        if (err) throw err;
        console.log(env_name + '.Component.js Generated!');
    });
    
    fs.writeFile('/frame/src/Pages/'+env_name+'/'+env_name + '.View.js', 'import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react"\nimport {Grid} from "@material-ui/core"\n\nexport const View = forwardRef((props,ref)=>{\n    const {data} = props\n\n    useImperativeHandle(ref, () => ({\n\n   }))\n\n  return(\n       <Grid>tes</Grid>\n  )\n\n})', function (err) {
        if (err) throw err;
        console.log(env_name + '.View.js Generated!');
    });
    
    fs.writeFile('/frame/src/Pages/'+env_name+'/'+env_name + '.Dialog.js', 'import React from "react"\nimport {Grid} from "@material-ui/core"', function (err) {
        if (err) throw err;
        console.log(env_name + '.Dialog.js Generated!');
    });
    
    fs.writeFile('/frame/src/Pages/'+env_name+'/'+env_name + '.Function.js', 'import React from "react"\nimport {Grid} from "@material-ui/core"', function (err) {
        if (err) throw err;
        console.log(env_name + '.Function.js Generated!');
    });

    fs.writeFile('/frame/src/Pages/'+env_name+'/'+env_name + '.js', 'import React, {createRef} from "react"\nimport {Grid} from "@material-ui/core"\nimport {View} from "./'+env_name+'.View.js"\n\nexport default class '+env_name+' extends React.Component{\n      constructor(props){\n           super(props)\n          this.state = {\n\n           }\n\n\n       this.Viewref = createRef()\n}\n\n   render(){\n     return(\n          <View ref={this.Viewref} data={this.state} />\n        )\n }\n\n} ',
     function (err) {
        if (err) throw err;
        console.log(env_name + '.Function.js Generated!');
    });
}




fs.mkdir(env_name, { recursive: true }, (err) => {
    if (err) throw err;




    CreateFile()
  });

//   export const View = forwardRef((props,ref)=>{
//     const {data} = props

//     useImperativeHandle(ref, () =>({
 
//     }))

//     return(
//         <Grid>
//             tes
//         </Grid>
//     )
// })


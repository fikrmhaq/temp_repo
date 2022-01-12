import React, {useState} from 'react'
import {Route, Redirect as Direct, Switch} from 'react-router-dom'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Core from '../Pages/Core/Core'
import Ruangan from '../Pages/Ruangan/Ruangan'
import Transaction from '../Pages/Transaction/Transaction'
import Ref from '../Pages/Ref/Ref'

export const path = [ // Rute
    {
        name:'Login',
        path:'/',
    },
    {
        name: 'Dashboard',
        path: '/dashboard'
    },
    {
        name: 'Core',
        path: '/core'
    },
    {
        name: 'Ruangan',
        path: '/ruang'
    },
    {
        name: 'Transaction',
        path: '/transaction'
    },
    {
        name: 'Ref',
        path: '/ref'
    }
]

export const ExportRoutes = () =>{





    var components = { // Menunjukkan komponen yang di render pada Rute
        'Login': <Login />,
        'Dashboard': <Dashboard/>,
        'Core': <Core/>,
        'Ruangan': <Ruangan/>,
        'Transaction': <Transaction/>,
        'Ref': <Ref />
    }
    


 

    return (
        <>
            <Switch>
                 {Object.keys(components).map(item=>{
                    var data = path.find(a=>a.name == item)
                     return {
                         component:components[item],
                         path:data.path,
                         access:data.access

                        } 
                    }).map((sheet, i)=>{
                        return <Route exact path={sheet.path}  key={i}>{sheet.component}</Route>
                })}
            </Switch>
        </>
    )
    
    
}
import React, { useEffect, useState } from "react"
import { useBarang } from "../../../functions/hooks/states";

const ListofData = ({ }) => {
    const barang = useBarang()

    useEffect(() => {
        




    }, [])

    return (
        <div>
            {
                barang.map(item=>{
                    return (
                        <div class="row mb-3">
                            <div style={
                                {
                                    flex:'0 0 auto',
                                    width:'12.33333%'
                                }
                            }>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#BCD6FF', borderRadius:'10px' }}>

                                    </div>
                            </div>
                            <div class="col-6">
                                <div class="text-color-dark-blue font-weight-500">{item.nama_barang}</div>
                                <div class="text-color-light-blue">12 Jan 2007</div>
                            </div>
                            <div class="col my-auto">
                                <div style={{
                                    color:'#2672ED'
                                }}>175,000,000</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}

export {
    ListofData
}
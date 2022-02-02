import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import ItemIn from './ItemIn';
import Services from '../../services/Services';

// Component
import { Card } from '../../components';
import defaultModel from '../../models/defaultModel';
import { useBarang } from '../../functions/hooks/states';
import { memo } from 'react';
import { ListofData } from './components';
import { useEffect } from 'react';
import barangModel from '../../models/barangModel';


const Dashboard = memo(() => {
    const barang = useBarang()
    const [chartLine, setChartLine] = useState(null)
    const [chartBar, setChartBar] = useState(null)
    const [ruangan, setruangan] = useState(
        [
            {
                nama: 'Research & Development',
                pic: 'Pak Goenawan',
                lantai: 1,
                avaible: true,
            },
            {
                nama: 'Audio Room',
                pic: 'Pak Goenawan',
                lantai: 2,
                avaible: false,
            },
            {
                nama: 'Server Room',
                pic: 'Pak Goenawan',
                lantai: 3,
                avaible: true,
            },
        ]
    )
    const [threeData, setthreeData] = useState(
        {
            kontrak: null,
            pengeluaran: null,
            aset: null
        }
    )
    const [kategori_barang, setkategori_barang] = useState(null)
    const [rincian_asset, setrincian_asset] = useState(null)


    useEffect(() => {
        
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const color = ['#F4AAAA', '#5F9CFF'];
        const dataBar = month.map(() => Math.floor(Math.random() * 100));


        setChartBar(new Chart(document.getElementById('chartJumlah'), {
            type: 'bar',
            data: {
                labels: month,
                datasets: [
                    {
                        label: 'Barang Masuk',
                        data: dataBar,
                        backgroundColor: dataBar.map((item, index) => {
                            if (!index || item == dataBar[index - 1]) return color[1];
                            return item > dataBar[index - 1] ? color[1] : color[0];
                        }),
                        borderRadius: 5,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#89A1DD'
                        }
                    },
                    y: {
                        min: 0,
                        grid: {
                            color: '#DCEAFF'
                        },
                        ticks: {
                            color: '#A9B7DB'
                        }
                    }
                }
            }
        }))

        setChartLine(new Chart(document.getElementById('chartIncome').getContext('2d'), {
            type: 'line',
            data: {
                labels: month,
                datasets: [
                    {
                        label: 'Barang',
                        data: month.map(item => Math.floor(Math.random() * 100)),
                        tension: .5,
                        borderColor: '#5F9CFF',
                        borderWidth: 4,
                        fill: {
                            target: 'origin',
                            above: 'rgba(95, 156, 255, 0.4)'
                        },
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        min: 0
                    }
                },
                plugins: {
                    tooltip: {

                    }
                }
            }
        }))
        defaultModel.getKontrak().then(res=>{
            threeData.kontrak = res.data.data.length;
            var jumlah = 0;
            res.data.data.forEach(item => {
                jumlah += item.nilai_kontrak;
            })
            threeData.pengeluaran = jumlah;
            // this.setState({ threeData: threeData });
            setthreeData(threeData)
        })

        barangModel.getCoreBarang().then(res=>{
            threeData.aset = res.data.data.length;
            const rincian_asset = new Object();
            res.data.data.forEach(item => {
                if (Object.keys(rincian_asset).indexOf(item.rincian_asset) < 0) rincian_asset[item.rincian_asset] = 0;
                rincian_asset[item.rincian_asset]++;
            })
            var berubah = Object.keys(rincian_asset).map(item => {
                return {
                    rincian_asset: item,
                    total: rincian_asset[item]
                };
            })
            berubah = berubah.sort((a, b) => a.total - b.total).filter((item, index) => index < 5);
            setthreeData({threeData, kategori_barang: new Chart(document.getElementById('kategori-barang'), {
                type: 'doughnut',
                data: {
                    labels: berubah.map(item => item.rincian_asset.split(' ').map(item => {
                        if (item == null || item == '') return;
                        var hasil = item.toLowerCase().split('');
                        hasil[0] = hasil[0].toUpperCase();
                        return hasil.join('');
                    }).join(' ')),
                    datasets: [
                        {
                            label: 'Kategori Barang',
                            data: berubah.map(item => item.total),
                            backgroundColor: ['#246BDD', '#4280E4', '#5F9CFF', '#BCD6FF', '#D8E7FF'].reverse(),
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            })})
        })
    }, [])

    return (
        <div className="dashboard">
            <div className="background-foto"><img src={require('../components/Img/LogoBackground.png').default} alt="LogoBackground" /></div>
            <div className="row">
                <div className="col-lg-9">
                    <div className="row threeData me-5 pe-5">
                        <div className="col-lg-4">
                            <Card>
                                <h5>Total Aset</h5>
                                <h3 className={"mt-4 mb-0 " + (threeData.aset == null && 'placeholder-wave')}>{threeData.aset != null ? threeData.aset.toString().split('').reverse().map((item, index, elem) => {
                                    if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
                                    return item;
                                }).join('').split('').reverse().join('') : (<span className='placeholder col-12'></span>)}</h3>
                                <h6>Buah</h6>
                            </Card>
                        </div>
                        <div className="col-lg-4 my-4 my-lg-0">
                            <Card>
                                <h5>Total Kontrak</h5>
                                <h3 className={"mt-4 mb-0 " + (threeData.kontrak == null && 'placeholder-wave')}>{threeData.kontrak != null ? threeData.kontrak.toString().split('').reverse().map((item, index, elem) => {
                                    if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
                                    return item;
                                }).join('').split('').reverse().join('') : (<span className='placeholder col-12'></span>)}</h3>
                                <h6>Kontrak</h6>
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card>
                                <h5>Total Pengeluaran</h5>
                                <h3 className={"mt-4 mb-0 " + (threeData.pengeluaran == null && 'placeholder-wave')}>{threeData.pengeluaran != null ? threeData.pengeluaran.toString().split('').reverse().map((item, index, elem) => {
                                    if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
                                    return item;
                                }).join('').split('').reverse().join('') + ',00' : (<span className='placeholder col-12'></span>)}</h3>
                                <h6>Rupiah</h6>
                            </Card>
                        </div>
                    </div>
                    <Card className="mt-4">
                        <div className="d-flex justify-content-between">
                            <h5>Statistik Barang Bulanan</h5>
                            <div className="form-group w-25">
                                <select name="years" id="years" className="form-select">
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </select>
                            </div>
                        </div>
                        <canvas id="chartIncome" className="my-3"></canvas>
                    </Card>
                    <div className="row mt-4">
                        <div className="col-lg-8 ruangan">
                            <div className="d-flex mb-3 justify-content-between">
                                <h6 className=''>Ruangan</h6>
                                <p className='m-0'>Lebih Banyak <i class="fas fa-angle-right"></i></p>
                            </div>
                            {ruangan.map(item => {
                                return (
                                    <Card className="mb-4">
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <div className="h-100 position-relative">

                                                </div>
                                            </div>
                                            <div className="col-lg-10 d-flex justify-content-between">
                                                <div className='my-auto'>
                                                    <h6 className='m-0'>{item.nama}</h6>
                                                    <p className='m-0'>{item.pic} &#9679; Lantai {item.lantai}</p>
                                                </div>
                                                <div className='my-auto me-4'>
                                                    <h2 style={{ cursor: 'pointer' }} className='m-0'><i class="fas fa-angle-right"></i></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                        <div className="col-lg-4">
                            <Card>
                                <h5>Kategori Barang</h5>
                                <canvas id='kategori-barang'></canvas>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 my-4 my-lg-0 barang-masuk">
                    <Card className="chart-barang-masuk">
                        <h5>Barang Masuk</h5>
                        <canvas id="chartJumlah" className="py-3" style={{ height: '100px' }}></canvas>
                    </Card>
                    <Card className="mt-4" classBody="p-0">
                        <div className='card-body pe-0'>
                            <h5>Barang Terbaru</h5>
                            <div className="barang-terbaru mt-4">
                                {/* {Object.keys([...Array(10)]).map(() => (
                                    <ItemIn></ItemIn>
                                ))} */}
                                <ListofData data={barang} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
})


// class Dashboard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             chartLine: null,
//             chartBar: null,
//             kategori_barang: null,
//             ruangan: [
//                 {
//                     nama: 'Research & Development',
//                     pic: 'Pak Goenawan',
//                     lantai: 1,
//                     avaible: true,
//                 },
//                 {
//                     nama: 'Audio Room',
//                     pic: 'Pak Goenawan',
//                     lantai: 2,
//                     avaible: false,
//                 },
//                 {
//                     nama: 'Server Room',
//                     pic: 'Pak Goenawan',
//                     lantai: 3,
//                     avaible: true,
//                 },
//             ],
//             threeData: {
//                 kontrak: null,
//                 pengeluaran: null,
//                 aset: null
//             },
//             rincian_asset: null
//         }
//     }

//     componentDidMount() {
//         // if (!localStorage.getItem('logged')) window.location.href = 'http://192.168.2.16:3000'
//         const month = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
//         const color = ['#F4AAAA', '#5F9CFF'];
//         const dataBar = month.map(() => Math.floor(Math.random() * 100));

//         defaultModel.getKontrak().then(res=>{
//             console.log(res)
//         })

//         this.setState({ chartBar: new Chart(document.getElementById('chartJumlah'), {
//             type: 'bar',
//             data: {
//                 labels: month,
//                 datasets: [
//                     {
//                         label: 'Barang Masuk',
//                         data: dataBar,
//                         backgroundColor: dataBar.map((item, index) => {
//                             if (!index || item == dataBar[index - 1]) return color[1];
//                             return item > dataBar[index - 1] ? color[1] : color[0];
//                         }),
//                         borderRadius: 5,
//                         borderSkipped: false
//                     }
//                 ]
//             },
//             options: {
//                 scales: {
//                     x: {
//                         grid: {
//                             display: false
//                         },
//                         ticks: {
//                             color: '#89A1DD'
//                         }
//                     },
//                     y: {
//                         min: 0,
//                         grid: {
//                             color: '#DCEAFF'
//                         },
//                         ticks: {
//                             color: '#A9B7DB'
//                         }
//                     }
//                 }
//             }
//         }), chartLine: new Chart(document.getElementById('chartIncome').getContext('2d'), {
//             type: 'line',
//             data: {
//                 labels: month,
//                 datasets: [
//                     {
//                         label: 'Barang',
//                         data: month.map(item => Math.floor(Math.random() * 100)),
//                         tension: .5,
//                         borderColor: '#5F9CFF',
//                         borderWidth: 4,
//                         fill: {
//                             target: 'origin',
//                             above: 'rgba(95, 156, 255, 0.4)'
//                         },
//                     }
//                 ]
//             },
//             options: {
//                 scales: {
//                     x: {
//                         grid: {
//                             display: false
//                         }
//                     },
//                     y: {
//                         min: 0
//                     }
//                 },
//                 plugins: {
//                     tooltip: {

//                     }
//                 }
//             }
//         }) })
//         Services.getKontrak().then(res => {
//             threeData.kontrak = res.data.data.length;
//             var jumlah = 0;
//             res.data.data.forEach(item => {
//                 jumlah += item.nilai_kontrak;
//             })
//             threeData.pengeluaran = jumlah;
//             this.setState({ threeData: threeData });
//         })
//         Services.getBarang().then(res => {
//             threeData.aset = res.data.data.length;
//             const rincian_asset = new Object();
//             res.data.data.forEach(item => {
//                 if (Object.keys(rincian_asset).indexOf(item.rincian_asset) < 0) rincian_asset[item.rincian_asset] = 0;
//                 rincian_asset[item.rincian_asset]++;
//             })
//             var berubah = Object.keys(rincian_asset).map(item => {
//                 return {
//                     rincian_asset: item,
//                     total: rincian_asset[item]
//                 };
//             })
//             berubah = berubah.sort((a, b) => a.total - b.total).filter((item, index) => index < 5);
//             this.setState({ threeData: threeData, kategori_barang: new Chart(document.getElementById('kategori-barang'), {
//                 type: 'doughnut',
//                 data: {
//                     labels: berubah.map(item => item.rincian_asset.split(' ').map(item => {
//                         if (item == null || item == '') return;
//                         var hasil = item.toLowerCase().split('');
//                         hasil[0] = hasil[0].toUpperCase();
//                         return hasil.join('');
//                     }).join(' ')),
//                     datasets: [
//                         {
//                             label: 'Kategori Barang',
//                             data: berubah.map(item => item.total),
//                             backgroundColor: ['#246BDD', '#4280E4', '#5F9CFF', '#BCD6FF', '#D8E7FF'].reverse(),
//                             borderWidth: 0
//                         }
//                     ]
//                 },
//                 options: {
//                     plugins: {
//                         legend: {
//                             position: 'bottom'
//                         }
//                     }
//                 }
//             }) });
//         })
//     }

//     render() { 
// // const barang = useBarang()

//         return (
//             <div className="dashboard">
//                 <div className="background-foto"><img src={require('../components/Img/LogoBackground.png').default} alt="LogoBackground" /></div>
//                 <div className="row">
//                     <div className="col-lg-9">
//                         <div className="row threeData me-5 pe-5">
//                             <div className="col-lg-4">

//                                 <Card>
//                                     <h5>Total Aset</h5>
//                                     <h3 className={"mt-4 mb-0 " + (threeData.aset == null && 'placeholder-wave')}>{threeData.aset != null ? threeData.aset.toString().split('').reverse().map((item, index, elem) => {
//                                         if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
//                                         return item;
//                                     }).join('').split('').reverse().join('') : (<span className='placeholder col-12'></span>)}</h3>
//                                     <h6>Buah</h6>
//                                 </Card>
//                             </div>
//                             <div className="col-lg-4 my-4 my-lg-0">
//                                 <Card>
//                                     <h5>Total Kontrak</h5>
//                                     <h3 className={"mt-4 mb-0 " + (threeData.kontrak == null && 'placeholder-wave')}>{threeData.kontrak != null ? threeData.kontrak.toString().split('').reverse().map((item, index, elem) => {
//                                         if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
//                                         return item;
//                                     }).join('').split('').reverse().join('') : (<span className='placeholder col-12'></span>)}</h3>
//                                     <h6>Kontrak</h6>
//                                 </Card>
//                             </div>
//                             <div className="col-lg-4">
//                                 <Card>
//                                     <h5>Total Pengeluaran</h5>
//                                     <h3 className={"mt-4 mb-0 " + (threeData.pengeluaran == null && 'placeholder-wave')}>{threeData.pengeluaran != null ? threeData.pengeluaran.toString().split('').reverse().map((item, index, elem) => {
//                                         if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
//                                         return item;
//                                     }).join('').split('').reverse().join('') + ',00' : (<span className='placeholder col-12'></span>)}</h3>
//                                     <h6>Rupiah</h6>
//                                 </Card>
//                             </div>
//                         </div>
//                         <Card className="mt-4">
//                             <div className="d-flex justify-content-between">
//                                 <h5>Statistik Barang Bulanan</h5>
//                                 <div className="form-group w-25">
//                                     <select name="years" id="years" className="form-select">
//                                         <option value="2021">2021</option>
//                                         <option value="2022">2022</option>
//                                         <option value="2023">2023</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <canvas id="chartIncome" className="my-3"></canvas>
//                         </Card>
//                         <div className="row mt-4">
//                             <div className="col-lg-8 ruangan">
//                                 <div className="d-flex mb-3 justify-content-between">
//                                     <h6 className=''>Ruangan</h6>
//                                     <p className='m-0'>Lebih Banyak <i class="fas fa-angle-right"></i></p>
//                                 </div>
//                                 {ruangan.map(item => {
//                                     return (
//                                         <Card className="mb-4">
//                                             <div className="row">
//                                                 <div className="col-lg-2">
//                                                     <div className="h-100 position-relative">

//                                                     </div>
//                                                 </div>
//                                                 <div className="col-lg-10 d-flex justify-content-between">
//                                                     <div className='my-auto'>
//                                                         <h6 className='m-0'>{item.nama}</h6>
//                                                         <p className='m-0'>{item.pic} &#9679; Lantai {item.lantai}</p>
//                                                     </div>
//                                                     <div className='my-auto me-4'>
//                                                         <h2 style={{ cursor: 'pointer' }} className='m-0'><i class="fas fa-angle-right"></i></h2>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Card>
//                                     );
//                                 })}
//                             </div>
//                             <div className="col-lg-4">
//                                 <Card>
//                                     <h5>Kategori Barang</h5>
//                                     <canvas id='kategori-barang'></canvas>
//                                 </Card>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-3 my-4 my-lg-0 barang-masuk">
//                         <Card className="chart-barang-masuk">
//                             <h5>Barang Masuk</h5>
//                             <canvas id="chartJumlah" className="py-3" style={{ height: '100px' }}></canvas>
//                         </Card>
//                         <Card className="mt-4" classBody="p-0">
//                             <div className='card-body pe-0'>
//                                 <h5>Barang Terbaru</h5>
//                                 <div className="barang-terbaru">
//                                     {Object.keys([...Array(10)]).map(() => (
//                                         <ItemIn></ItemIn>
//                                     ))}
//                                 </div>
//                             </div>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

export default Dashboard;
const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname)));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(80, () => {
    console.log("Fut, port: 80");
});









const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/sendInfo', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);
  

});




































const fs = require("fs")


app.post('/addSeries', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);

    write(data, data.kinek, data.pass)
});





function write(mit, kinek, passw) {
    console.log("-----")

    var marletezik = false

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik += 1
                    letezo = undefined
                }
            }

            if (letezo == undefined) {
                console.log("nincs")
                jsonData.users.push({"name": kinek, "pass": "none", sorozatok: []})
            }
            

            //console.log(jsonData.users[hanyadik].sorozatok.length)
            if (jsonData.users[hanyadik].sorozatok.length > 0) {
                for(let letezik = 0; letezik < jsonData.users[hanyadik].sorozatok.length; letezik++) {
                    //console.log(mit.data.files)
                    if(jsonData.users[hanyadik].sorozatok[letezik].files == mit.data.files) {
                        console.log("Már létezik!")
                        marletezik = true
                        break
                    }
                }


                if (!marletezik) {
                    jsonData.users[hanyadik].sorozatok.push({name: mit.data.name, files: mit.data.files, seasons: mit.data.seasons})
                }
            } else {
                jsonData.users[hanyadik].sorozatok.push({name: mit.data.name, files: mit.data.files, seasons: mit.data.seasons})
                //console.log(jsonData.users[hanyadik])
            }

        
        
            //console.log(marletezik + " letezik")

            if (!marletezik) {
                if (jsonData.users[hanyadik].pass != "none") {
                    if (jsonData.users[hanyadik].pass == passw) {

                        fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                            if (err) {
                              console.error(err);
                            } else {
                                console.log("oke")
                            }
                        });

                    } else {
                        console.log("Helytelen jelszó!")
                    }
                } else {
                    jsonData.users[hanyadik].pass = passw

                    fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("oke")
                        }
                    });
                }
            }

    })
}



































app.post('/deleteSeries', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);
    


    console.log(data.files)
    if (data.files != "http://") {
        if (data.files != "https://") {
            if (data.files.slice(-1) == "/") {
                data.files = data.files.slice(0, -1)
            }
        }
    }
    console.log(data.files)


    
    deleteSeries(data, data.kinek, data.pass)
});





function deleteSeries(mit, kinek, passw) {
    console.log("-----")

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik = undefined
                    letezo = undefined
                }
            }


            

            for(let IndexOfSeries = 0; IndexOfSeries < jsonData.users[hanyadik].sorozatok.length; IndexOfSeries++) {
                let sorozat = jsonData.users[hanyadik].sorozatok[IndexOfSeries]

                if(sorozat.files == mit.files) {
                    let sorozatszam = jsonData.users[hanyadik].sorozatok.indexOf(sorozat)

                    const what = jsonData.users[hanyadik].sorozatok.splice(sorozatszam, 1);

                    break
                }
            }



            if (jsonData.users[hanyadik].pass != "none") {
                if (jsonData.users[hanyadik].pass == passw) {

                    fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                        if (err) {
                          console.error(err);
                        } else {
                            console.log("oke")



                            deleteSeries_fromWatched(mit)
                        }
                    });

                } else {
                    console.log("Helytelen jelszó!")
                }
            } else {
                jsonData.users[hanyadik].pass = passw

                fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke törölve")



                        deleteSeries_fromWatched(mit)
                    }
                });
            }

    })
}






























app.post('/addSeason', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);


    console.log(data.files)
    if (data.files != "http://") {
        if (data.files != "https://") {
            if (data.files.slice(-1) == "/") {
                data.files = data.files.slice(0, -1)
            }
        }
    }
    console.log(data.files)

    
    addSeason(data, data.kinek, data.pass)
});





function addSeason(mit, kinek, passw) {
    console.log("-----")

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik = undefined
                    letezo = undefined
                }
            }


            

            for(let IndexOfSeries = 0; IndexOfSeries < jsonData.users[hanyadik].sorozatok.length; IndexOfSeries++) {
                let sorozat = jsonData.users[hanyadik].sorozatok[IndexOfSeries]

                if(sorozat.files == mit.files) {
                    let sorozatszam = jsonData.users[hanyadik].sorozatok.indexOf(sorozat)

                    let seasonszam = 0
                    for(let IndexOfNextSeason = 1; IndexOfNextSeason < 10000; IndexOfNextSeason++) {
                        if(jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[IndexOfNextSeason.toString()]) {
                            seasonszam = IndexOfNextSeason
                        } else {
                            seasonszam += 1

                            let seasonszam_s = seasonszam.toString()


                            jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[seasonszam_s] = {"episodes": mit.episodes, "pilot": mit.pilot}

                            break
                        }
                        
                    }
                
                    


                    break
                }
            }



            if (jsonData.users[hanyadik].pass != "none") {
                if (jsonData.users[hanyadik].pass == passw) {

                    fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                        if (err) {
                          console.error(err);
                        } else {
                            console.log("oke")
                        }
                    });

                } else {
                    console.log("Helytelen jelszó!")
                }
            } else {
                jsonData.users[hanyadik].pass = passw

                fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke")
                    }
                });
            }

    })
}





























































app.post('/addEpizod', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);



    console.log(data.files)
    if (data.files != "http://") {
        if (data.files != "https://") {
            if (data.files.slice(-1) == "/") {
                data.files = data.files.slice(0, -1)
            }
        }
    }
    console.log(data.files)


    
    addEpizod(data, data.kinek, data.pass)
});





function addEpizod(mit, kinek, passw) {
    console.log("-----")

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik = undefined
                    letezo = undefined
                }
            }


            

            for(let IndexOfSeries = 0; IndexOfSeries < jsonData.users[hanyadik].sorozatok.length; IndexOfSeries++) {
                let sorozat = jsonData.users[hanyadik].sorozatok[IndexOfSeries]

                if(sorozat.files == mit.files) {
                    let sorozatszam = jsonData.users[hanyadik].sorozatok.indexOf(sorozat)


                    if (!mit.ispilot) {


                        if (jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[mit.season]) {
                            let szezon = jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[mit.season]
                            
                            let eps = parseInt(szezon.episodes)
                            eps += 1


                            jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[mit.season].episodes = eps.toString()
                        }


                    } else {


                        if (jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[mit.season]) {
                            jsonData.users[hanyadik].sorozatok[sorozatszam].seasons[mit.season].pilot = true
                        }


                    }
                
                    


                    break
                }
            }



            if (jsonData.users[hanyadik].pass != "none") {
                if (jsonData.users[hanyadik].pass == passw) {

                    fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                        if (err) {
                          console.error(err);
                        } else {
                            console.log("oke")
                        }
                    });

                } else {
                    console.log("Helytelen jelszó!")
                }
            } else {
                jsonData.users[hanyadik].pass = passw

                fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke")
                    }
                });
            }

    })
}









































app.post('/boritoValtoztatas', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);



    console.log(data.files)
    if (data.files != "http://") {
        if (data.files != "https://") {
            if (data.files.slice(-1) == "/") {
                data.files = data.files.slice(0, -1)
            }
        }
    }
    console.log(data.files)

    
    
    boritoValtoztatas(data, data.kinek, data.pass)
});





function boritoValtoztatas(mit, kinek, passw) {
    console.log("-----")

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik = undefined
                    letezo = undefined
                }
            }


            

            for(let IndexOfSeries = 0; IndexOfSeries < jsonData.users[hanyadik].sorozatok.length; IndexOfSeries++) {
                let sorozat = jsonData.users[hanyadik].sorozatok[IndexOfSeries]

                if(sorozat.files == mit.files) {
                    let sorozatszam = jsonData.users[hanyadik].sorozatok.indexOf(sorozat)

                    if (mit.newfiles) {
                        jsonData.users[hanyadik].sorozatok[sorozatszam].files = mit.newfiles
                    }

                    break
                }
            }



            if (jsonData.users[hanyadik].pass != "none") {
                if (jsonData.users[hanyadik].pass == passw) {

                    fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                        if (err) {
                          console.error(err);
                        } else {
                            console.log("oke")
                        }
                    });

                } else {
                    console.log("Helytelen jelszó!")
                }
            } else {
                jsonData.users[hanyadik].pass = passw

                fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke")
                    }
                });
            }

    })
}























app.post('/watched', (req, res) => {
    const data = req.body;


    console.log('Received data:', data);

    if (data.allapot == "igen") {
        addtowatched(data, data.kinek, data.pass)
    } else if (data.allapot == "nem") {
        removefromwatched(data, data.kinek, data.pass)
    }

});





function addtowatched(mit, kinek, passw) {
    console.log("-----")

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik += 1
                    letezo = undefined
                }
            }

            if (letezo == undefined) {
                console.log("nincs")
                jsonData.users.push({"name": kinek, "pass": "none", sorozatok: []})
            }


            if (jsonData.users[hanyadik].pass != "none") {
                if (jsonData.users[hanyadik].pass == passw) {

                    add_readwatched(mit)

                } else {
                    console.log("Helytelen jelszó!")
                }
            } else {
                jsonData.users[hanyadik].pass = passw

                fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke")
                    }
                });


                add_readwatched(mit)
            }

    })
}





function add_readwatched(adat) {
    //console.log(adat)

    fs.readFile("./watched.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == adat.kinek) {
                    break
                } else {
                    hanyadik += 1
                    letezo = undefined
                }
            }

            if (letezo == undefined) {
                console.log("nincs")
                jsonData.users.push({"name": adat.kinek, sorozatok: []})
            }

    
           

            if (jsonData.users[hanyadik].sorozatok.length == 0) {
                const toAddWatched = {evad: adat.evad, epizodok: [adat.epizod]}

                jsonData.users[hanyadik].sorozatok.push({"files": adat.files, "watched": [toAddWatched]})
            } else {
                for (let a = 0; a <= jsonData.users[hanyadik].sorozatok.length; a++) {
                    var vanilyen = false

                    if (jsonData.users[hanyadik].sorozatok[a]) {
                        if (jsonData.users[hanyadik].sorozatok[a].files == adat.files) {
                            const toAddWatched = jsonData.users[hanyadik].sorozatok[a].watched

                            let ok = false
                            for (let b = 0; b <= toAddWatched.length; b++) {
                                //console.log(b)

                                if(toAddWatched[b]) {
                                    if (toAddWatched[b].evad == adat.evad) {
                                        ok = true

                                        let epstring = adat.epizod.toString()
                                        let marbennevan = false

                                        for (let c = 0; c <= toAddWatched[b].epizodok.length; c++) {
                                            //console.log(toAddWatched[b].epizodok[c] + " tostringes")
                                            if (toAddWatched[b].epizodok[c] == epstring) {
                                                marbennevan = true
                                            }
                                        }

                                        if (!marbennevan) {
                                            toAddWatched[b].epizodok.push(adat.epizod.toString())
                                        }

                                        break
                                    }
                                }
                            }

                            if (!ok) {
                                toAddWatched.push({evad: adat.evad, epizodok: [adat.epizod]})
                            }

                            jsonData.users[hanyadik].sorozatok[a].watched = toAddWatched

                            //console.log(toAddWatched)
                            vanilyen = true
                            break
                        }
                    }
                }

                if (!vanilyen) {
                    const toAddWatched = {evad: adat.evad, epizodok: [adat.epizod]}

                    jsonData.users[hanyadik].sorozatok.push({"files": adat.files, "watched": [toAddWatched]})
                }
            }




            //console.log("---------------------- VEGLEGES ----------------------------" + JSON.stringify(jsonData))


            //várni kellene olyan 6ms-t
            

            

            
            setTimeout(() => {
                fs.writeFile('./watched.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke")
                    }
                });
            }, 5000);



    })
}


    































function removefromwatched(mit, kinek, passw) {
    console.log("-----")

    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == kinek) {
                    break
                } else {
                    hanyadik += 1
                    letezo = undefined
                }
            }

            if (letezo == undefined) {
                console.log("nincs")
                jsonData.users.push({"name": kinek, "pass": "none", sorozatok: []})
            }


            if (jsonData.users[hanyadik].pass != "none") {
                if (jsonData.users[hanyadik].pass == passw) {

                    remove_readwatched(mit)

                } else {
                    console.log("Helytelen jelszó!")
                }
            } else {
                jsonData.users[hanyadik].pass = passw

                fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("oke")
                    }
                });


                remove_readwatched(mit)
            }

    })
}





function remove_readwatched(adat) {
    //console.log(adat)

    fs.readFile("./watched.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)



            for(let i = 0; i < jsonData.users.length; i++) {
                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == adat.kinek) {
                    break
                } else {
                    hanyadik += 1
                    letezo = undefined
                }
            }

            if (letezo == undefined) {
                console.log("nincs")
                //jsonData.users.push({"name": adat.kinek, sorozatok: []})
            }

    

           
        if (letezo != undefined) {
            if (jsonData.users[hanyadik].sorozatok.length == 0) {
                
            } else {
                for (let a = 0; a <= jsonData.users[hanyadik].sorozatok.length; a++) {
                    var vanilyen = false

                    if (jsonData.users[hanyadik].sorozatok[a]) {
                        if (jsonData.users[hanyadik].sorozatok[a].files == adat.files) {
                            const toAddWatched = jsonData.users[hanyadik].sorozatok[a].watched

                            for (let b = 0; b <= toAddWatched.length; b++) {
                                //console.log(b)

                                if(toAddWatched[b]) {
                                    if (toAddWatched[b].evad == adat.evad) {

                                        for(let IndexOfEpisode = 0; IndexOfEpisode < toAddWatched[b].epizodok.length; IndexOfEpisode++) {
                                            let ep = toAddWatched[b].epizodok[IndexOfEpisode]
                                            //console.log(ep)
                            
                                            if(ep == adat.epizod.toString()) {
                                                let epszam = toAddWatched[b].epizodok.indexOf(ep)
                            
                                                const what = toAddWatched[b].epizodok.splice(epszam, 1);
                            



                                                //max el lehet távolítani a listából

                                                break
                                            }
                                        }

                                        break
                                    }
                                }
                            }

                            jsonData.users[hanyadik].sorozatok[a].watched = toAddWatched

                            //console.log(toAddWatched)
                            vanilyen = true
                            break
                        }
                    }
                }

                if (!vanilyen) {
                    const toAddWatched = {evad: adat.evad, epizodok: [adat.epizod]}

                    jsonData.users[hanyadik].sorozatok.push({"files": adat.files, "watched": [toAddWatched]})
                }




                setTimeout(() => {
                    fs.writeFile('./watched.json', JSON.stringify(jsonData), err => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("oke")
                        }
                    });
                }, 6000);


            }     
        }



    })
}












function deleteSeries_fromWatched(adat) {
    console.log(adat)
    //kinek, pass, files




    fs.readFile("./watched.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }

            const jsonData = JSON.parse(data)


            for(let i = 0; i < jsonData.users.length; i++) {

                var letezo = jsonData.users[i].name
                var hanyadik = i

                if(letezo == adat.kinek) {
                    break
                } else {
                    hanyadik += 1
                    letezo = undefined
                }
            }



            if (letezo == undefined) {
                console.log("nincs")
            }

    

           
        if (letezo != undefined) {
            if (jsonData.users[hanyadik].sorozatok.length == 0) {
                
            } else {
                for (let a = 0; a <= jsonData.users[hanyadik].sorozatok.length; a++) {


                    if (jsonData.users[hanyadik].sorozatok[a]) {
                        if (jsonData.users[hanyadik].sorozatok[a].files == adat.files) {
                            var sori = jsonData.users[hanyadik].sorozatok[a]
                            var sori_szam = jsonData.users[hanyadik].sorozatok.indexOf(sori)

                            //console.log(sori)

                            const valami_eltavolit = jsonData.users[hanyadik].sorozatok.splice(sori_szam, 1);


                            break
                        }
                    }
                }



                setTimeout(() => {
                    fs.writeFile('./watched.json', JSON.stringify(jsonData), err => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("oke")
                        }
                    });
                }, 6000);


            }     
        }



    })
}
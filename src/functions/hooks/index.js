import { useEffect, useState } from "react"

const useSearch = (array) => {
    const [foundOnIndex, setFound] = useState([])





    useEffect(() => {


        setFound(
            array.map((item, i) => {
                return i
            })
        )


    }, [array])

    const Search = (value) => {

        let construct = array.map((item, i) => {

                let dump = Object.values(item)
                .map(a => {
                    return a.toLowerCase().includes(value.toLowerCase())
                })

                if(dump.includes(true)) {
                    return i
                }

                return


        
        })

        setFound(construct)

    }




    return [array.filter((item, i) => foundOnIndex.includes(i)), Search]

}

export {
    useSearch
}
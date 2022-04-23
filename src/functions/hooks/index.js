import { useEffect, useState } from "react"
import { catchUndefined } from ".."

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

            if (dump.includes(true)) {
                return i
            }

            return



        })

        setFound(construct)

    }




    return [array.filter((item, i) => foundOnIndex.includes(i)), Search]

}

const usePaginate = (array, page_num) => {
    const [indexes, setIndexes] = useState([])
    const [index, setIndex] = useState(0)


    const format = async(length,per_page) => {
        const calculate_leftover = length % per_page == 0 ? true : false

        let data = []
        let count = 0;

        for (var i = 0; i < (calculate_leftover ? (length / per_page) : parseInt((length / per_page) + 1)); i++) {
            if (!calculate_leftover) {
                if (i == (parseInt((length / per_page) + 1))) {
                    data.push([count, count + (length - count)])
                    break;
                }
            }
            data.push([count, count + per_page])
            count = (count + per_page)
        }

        if(indexes.length > 0){
            return
        }

        setIndexes(
            data.map((sheet, i) => {
                return array.slice(sheet[0],sheet[1])
            })
        )
        
        


    }

    useEffect(() => {


        format(array.length, page_num)




        
        
        


        // console.log(map)
    }, [indexes])

    return [catchUndefined(indexes[index]), setIndex, {data: indexes, now_page: index}]


}

export {
    useSearch,
    usePaginate
}
const newData = [
    {
        "name":"default",
        "url":process.env.REACT_APP_DEFAULT
    }
]


export default function APIUrls(type){
    return newData.find(item=>item.name === type).url || "unknown_type";
} 
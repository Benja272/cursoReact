import axios from 'axios'

const url = 'http://localhost:3001/Agend'

const adder = (newPerson) => {
    const agend = axios.post(url,newPerson)
    return(agend.then(response => response))
}

const elim= (num)=>{
    let link = url +"/"+num.id
    const agend = axios.delete(link)
    return(agend.then(response => response.data))
}
const get = () => {
    const agend = axios.get(url)
    return(agend.then(response => response.data))
}

const actualizar = (per) => {
    console.log(per);
    const agend = axios.put(url+"/"+per.id,per)
    return (agend.then(response => response.data))
}

export default {adder,get,elim,actualizar}


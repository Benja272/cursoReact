import React from 'react'
const Mensage = ({mensage,error}) => {
    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if(error){
        style.color = "red"
    }
    if(mensage !== ""){
        return(
            <div style={style}>
                {mensage}
            </div>
        )
    }else{
        return(<></>)
    }
}
export default Mensage
import React, {useState, useEffect} from "react";
import './TodoList.css'
import icone from './assets/icon.webp'

function TodoList(){
    const listaStorage = localStorage.getItem('lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(lista))
    },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById('inputEntrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista]
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function deletaTudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>To-do list</h1>
            <form onSubmit={adicionaItem}>
                <input 
                id="inputEntrada" 
                type="text"
                value={novoItem}
                onChange={(e)=>{setNovoItem(e.target.value)}}
                placeholder="Type here"/>
                <button className="add" type="submit">+</button>
            </form>
            <div className="ListaTarefas">
                <div style={{textAlign:'center'}}>
                {
                    lista.length < 1
                    ?
                    <img className="iconeCentral" src={icone} />
                    :
                    lista.map((item, index)=>(
                    
                    <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button onClick={()=>{deleta(index)}} className="del">-</button>
                    </div>
                    ))
                }
                {
                    lista.length > 0 && <button onClick={()=>{deletaTudo()}} className="deleteAll">Remove all</button>
                }
                </div>
            </div>
        </div>
    )
}

export default TodoList;
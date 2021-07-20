import './users.css'
import { useEffect, useState } from 'react'
import axios from "axios"


function Users() {

    // Função GET que está trazendo os dados da API
    // useEffect, necessário para que o get execute apenas uma única vez
    let [tarefas, setTarefas] = useState([])
    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resp) => {setTarefas(resp.data)})
    }, [])

   // Retornando o conteúdo que será renderizado em tela
   // Função map percorrendo todo o array recuperado anteriormente com o axios e listando na tela cada linha do array
    return (
        <>
        {tarefas.map((t, index) => {
            return (
            <div className="user_container" key={'user'+index}>
                <div className="user_content">
                    <img className="user_thumbnail" src={t.img} alt=""/>
                    <div className="user_infos">
                        <p>Nome do Usuário {t.name}</p>
                        <p>ID: {t.id} - Username: {t.username}</p>
                    </div>
                    <button>Pagar</button>
                </div>
            </div>
            )
        })}
      </>
    );
}

// Exportando o component Users
export default Users;
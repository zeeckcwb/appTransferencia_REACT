import './users.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import $ from 'jquery'
import 'jquery-mask-plugin/dist/jquery.mask.min.js'


function Users() {

    // Declarando variáveis
    // useState setando o valor inicial da variável
    let [usuarios, setUsuarios] = useState([])
    let [usuarioSelecionado, setUsuarioSelecionado] = useState({})
    let [modalShow, setShowModal] = useState(false)
    let [modalShowReceipt, setShowModalReceipt] = useState(false)

    // useEffect, necessário para que o get execute apenas uma única vez
    useEffect(() => {
        // Função GET que está trazendo os dados da API
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resp) => {setUsuarios(resp.data)})
    }, [])

    // Função que exibe a modal de pagamento
    let showModal = (e, i) => {
        setUsuarioSelecionado(usuarios[i])
        setShowModal(true)
    }

    // Função que exibe a modal de recibo de pagamento
    let showModalReceipt = (e) => {
        setShowModalReceipt(true)
    }

    // Setando a variável array dos cartões de pagamento
    let cards = [
        // Cartão válido
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        // Cartão inválido
        {
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
        },
    ];

    // Função que envia o POST de pagamento para o endpoint
    let sendPayment = (e) => {
        // evento preventDefaul para não atualizar a página após a execução da função
        e.preventDefault()
        // Declarando variáveis
        const card = document.getElementById('card').value
        const valueInput = document.getElementById('valor').value
        const paymentSucces = document.getElementById('payment_succes')
        const paymentError = document.getElementById('payment_error')
        // Se o cartão selecionado for o cartão válido, realiza o POST
        if (card === 'card0') {
            // Função POST está enviando os dados para o endpoint
            axios.post('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', {
                "card_number": '1111111111111111',
                "cvv": 789,
                "expiry_date": '01/18',
                "destination_user_id": usuarioSelecionado.id,
                "value": valueInput
            })
            // Exibindo a modal de recebo
            showModalReceipt(true)
            // Removendo o h2 de erro
            paymentError.innerHTML = ""
        } else {
            // Exibindo a modal de recebo
            showModalReceipt(true)
            // Removendo o h2 de sucesso
            paymentSucces.innerHTML = ""
        }
    }

    // Função para dar refresh na página após a exibição do recibo de pagamento
    function refreshPage(){
        window.location.reload()
    }

    // Máscara jQuery para o campo 'valor'
    $(document).ready(function () {
        $('#valor').mask('000.000.000.000.000,00', { reverse: true });
    });


   // Retornando o conteúdo que será renderizado em tela
   // Função map percorrendo todo o array recuperado anteriormente com o GET e listando na tela cada linha do array
    return (
        <>
            {usuarios.map((u, index) => {
                return (
                <div className="user_container" key={'user'+index}>
                    <div className="user_content">
                        <img src="" alt="" />
                        <img className="user_thumbnail" src={u.img} alt=""/>
                        <div className="user_infos">
                            <p>Nome do Usuário: {u.name}</p>
                            <p>ID: {u.id} - Username: {u.username}</p>
                        </div>
                        <button data-index={index} onClick={(e) => showModal(e, index)}>Pagar</button>
                    </div>
                </div>
                )
            })}

            <div className="backdrop" style={{display: (modalShow ? 'block' : 'none')}} onClick={() => setShowModal(false)}></div>
            <div className="modal_box" style={{display: (modalShow ? 'block' : 'none')}}>
                <div className="modal_title">
                    <p>Pagamento para <span>{usuarioSelecionado.name}</span></p>
                </div>
                <form action="" className="modal_form">
                    <input name="valor" type="text" id="valor" placeholder="R$ 0,00" required></input>
                    <select name="card" id="card" required>
                        <option value="">Selecione o cartão</option>
                        {cards.map((card, index) =>
                            <option value={'card'+index} key={'card'+index}>Cartão com final {card.card_number.substr(-4)}</option>
                        )}
                    </select>
                    <button className="modal_button" onClick={(e) => sendPayment(e)}>Pagar</button>
                </form>
            </div>
            
            <div className="modal_box" style={{display: (modalShowReceipt ? 'block' : 'none')}}>
                <div className="modal_title">
                    <p>Recibo de pagamento</p>
                </div>
                <div className="modal_content">
                    <h2 id="payment_succes">O pagamento foi concluído com sucesso</h2>
                    <h2 id="payment_error">O pagamento não foi concluído com sucesso</h2>
                    <button onClick={refreshPage}>Concluir Transação</button>
                </div>
            </div>
        </>
    );
}

// Exportando o component Users
export default Users;
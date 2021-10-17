import React from "react";
import api from "../../services/api";

import { useAuth } from "../../context/auth";

export default function ListPelada() {
  const [listPelada, setListPelada] = React.useState(null);

  const context = useAuth();

  async function fetchListaPelada() {
    try {
      let response = await api.get("/peladas");

      setListPelada(response.data);
    } catch (error) {

      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que sai do alcance de 2xx
        console.group('Resposta do servidor com erro')
          console.error(error.response.data)
          console.error(error.response.status)
          console.error(error.response.headers)

      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
        // http.ClientRequest no node.js
        console.group('Nenhuma resposta recebida')
        console.error(error.request);
      } else {
        // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
        console.group('Erro na requisição')
        console.error('Error', error.message);
      }
    }
  }

    React.useEffect(() => {
      fetchListaPelada();
    }, []);

    return (
      listPelada &&
      listPelada.map((pelada) => <li key={pelada.id}>{pelada.nome}</li>)
    );

}

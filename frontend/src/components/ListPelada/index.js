import React, {useEffect} from "react";
import api from "../../services/api";
import { useAxios } from '../../hooks/UseAxios'

import { useAuth } from "../../context/auth";

export default function ListPelada() {
  const [listPelada, setListPelada] = React.useState(null);

  const context = useAuth();

  const { response, error } = useAxios({
    url: '/peladas',
  })

  useEffect(() => {
    setListPelada(response)
  }, [response])
  

  return (
    listPelada
      ? listPelada.map((pelada) => <li key={pelada.id}>{pelada.nome}</li>)
      : null
  );

}

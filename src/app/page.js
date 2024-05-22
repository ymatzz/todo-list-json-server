'use client'
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import CardTarefa from "@/components/cardtarefa";

export default function Home() {
  const [inputTarefa, setInputTarefa] = useState("");
  const [tarefas, setTarefas] = useState([])
  const url = "http://localhost:8000/tarefas";

  const getAllTarefas = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error(error);
    }
  }

  const adicionarTarefa = async () => {
    const data = {
      "descricao": inputTarefa,
      "estaFeita": false
    }
    if (inputTarefa.trim().length > 0) {
      try {
        const response = await fetch(url, 
          {
            method: 'POST',
            headers: 
              {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
          }
        );
        if (!response.ok){
          throw new Error('Erro ao adicionar tarefa');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInputTarefa("");
        await getAllTarefas();
      }
    } else {
      alert("É necessário dar um nome a tarefa!");
    }
  }

  useEffect(() => {
    getAllTarefas()
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.caixaTodo}>
          <h1 className={styles.h1}>TODO List</h1>
          <div className={styles.caixaDeInput}>
            <input className={styles.input} value={inputTarefa} onChange={(e) => setInputTarefa(e.target.value)} />
            <button className={styles.button} onClick={adicionarTarefa}> <CgMathPlus  className={styles.iconAdd} /> </button>
          </div>
          <ul className={styles.ul}>
            {tarefas && tarefas.map((tarefa, index) =>
              <li className={styles.li}>
                <CardTarefa key={index} id={tarefa.id} getAllTarefas={getAllTarefas} />
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
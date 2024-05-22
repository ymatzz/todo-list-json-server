'use client'
import styles from "./cardtarefa.module.css";
import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function CardTarefa({ id, getAllTarefas }) {
    const [tarefa, setTarefa] = useState("")
    const url = "http://localhost:8000/tarefas";

    const getTarefa = async () => {
        console.log("adadasdasdas", getAllTarefas)
        try {
            const response = await fetch(`${url}/${id}`)
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Erro ao atualizar tarefa');
            }
            setTarefa(data);
        } catch (error) {
            console.log("aaaaa", error);
        }
    }

    const atualizaTarefaFeita = async () => {
        const data = {
            "estaFeita": !tarefa.estaFeita
        }
        try {
            const response = await fetch(`${url}/${tarefa.id}`,
                {
                    method: 'PATCH',
                    headers:
                    {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            );
            if (!response.ok) {
                throw new Error('Erro ao atualizar tarefa');
            }
        } catch (error) {
            console.error(error);
        } finally {
            await getTarefa();
        }
    }

    const deletaTarefa = async () => {
        try {
            const response = await fetch(`${url}/${tarefa.id}`,
                {
                    method: 'DELETE',
                    headers:
                    {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Erro ao deletar tarefa');
            }
        } catch (error) {
            console.error(error);
        } finally {
            await getAllTarefas();
        }
    }

    useEffect(() => {
        getTarefa();
    }, []);

    return (
        <main className={styles.main}>
            {tarefa && (
                <>
                    <input className={styles.checkbox} type="checkbox" checked={tarefa.estaFeita} onClick={atualizaTarefaFeita} />
                    <span className={styles.span}> {tarefa.descricao} </span>
                    <FaTrashAlt onClick={deletaTarefa} className={styles.iconeLixeira} />
                </>
            )}
        </main>
    )
}
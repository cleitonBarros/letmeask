import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import {Button} from '../components/button'

import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { FormEvent, useState } from "react";
import { db } from "../services/Firebase";


export function Home(){

    const history = useNavigate();
    const { user, signInWithGoogle   } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    

   async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history('/room/new')
    }

    async function handleJoinRoom(event:FormEvent){
        event.preventDefault()

        if(roomCode.trim() === ""){
            return;
        }

        const roomRef =  await db.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){
            alert('room does not exists')
            return;
        }

        history(`/rooms/${roomCode}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationsImg} alt="ilustração simbolizando perguntas e repostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>


            <main >
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom}className="create-room">
                        <img src={googleIconImg} alt="Icone do google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator"> ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom} >
                        <input type="text" placeholder="Digite o codigo da sala" onChange={event=>setRoomCode(event.target.value)} value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
          
        </div>
    )
}
"use client"
import { useState,useEffect } from "react";
export default function jogo(){

  const [pontos, setPontos] = useState(0)
  const [poderDeClique,setPoderDeClique] = useState(1)
  const[rendaPassiva, setRendaPassiva] = useState(0)

  const [jogoCarregado, setJogoCarregado] = useState(false)

  function tocarSomDeclique(){
    const audio = new Audio('/somDaCompra.mp3')
    audio.play().catch(()=>console.log('som de compra não encontrado'))
  }

  function tocarSomDeCompra(){
    const audio = new Audio('')
    audio.play().catch(()=>console.log('som de compra não encontrado'))
  }

  useEffect(()=>{
    const save = localStorage.getItem('meu_jogo_save')
    if(save){
      const dadosSalvos = JSON.parse(save);
      setPontos(dadosSalvos.pontosSalvos);
      setPoderDeClique(dadosSalvos.poderSalvo);
      setRendaPassiva(dadosSalvos.rendaSalva);
    }
    setJogoCarregado(true)
  },[])

  useEffect(() => {
    if(!jogoCarregado) return;

    const meusDados = {
      pontosSalvos: pontos,
      poderSalvo: poderDeClique,
      rendaSalva: rendaPassiva
    };
    localStorage.setItem("meu_jogo_save", JSON.stringify(meusDados));
  },[pontos,poderDeClique,rendaPassiva,jogoCarregado])


  function clicarNoBotao(){
    setPontos(pontos + poderDeClique)
    tocarSomDeclique()
  }

  function comprarUpgrade(custoDoItem,poderDoItem,passivaDoItem){
    if(pontos >= custoDoItem){
      setPontos(pontos - custoDoItem)
      setPoderDeClique(poderDeClique + poderDoItem)
      setRendaPassiva(rendaPassiva + passivaDoItem)
    }else{
      alert("Você  não tem recursos para comprar esse item")
    }
  }

  const upgrades = [
    {
      id: 1,
      nome:"Cursor Rápido",
      custo: 50,
      descricao: "Gera +1 ponto por click",
      poder: 1,
      passivo: 0
    },
    {
      id: 2,
      nome: "Girassol Ajudante",
      custo: 200,
      descricao: "Gera +5  pontos por segundo",
      poder: 0,
      passivo: 5
    },
    {
      id: 3,
      nome: "Super Mouse",
      custo: 500,
      descricao: "Gera +10 pontos de click",
      poder: 10

    },
    {
      id: 4,
      nome: "Fábrica de Pontos",
      custo: 1500,
      descricao: "Gera +50 Pontos por Segundo",
      poder: 50,
      passivo: 0

    }
    
]

useEffect(()=>{
  if(rendaPassiva === 0) {return}

  const cronometro = setInterval(()=>{
    setPontos((ValorAtual)=> ValorAtual + rendaPassiva)
  },1000)

  return () => clearInterval(cronometro)


},[rendaPassiva])


  return(
    // div main
  <div className="min-h-screen bg-[#F3E4A8] flex flex-col md:flex-row 
  text-white font-sans ">
    {/* Lado Esquerdo da tela*/}
    <div className="flex-1 flex flex-col items-center justify-center
    p-10 border-slate-700">
    <h2 className="text-2x1 text-slate-400 font-bold tracking-widest uppercase mb-2">
      Seu Jogo Clicker
      </h2>

      <p className="text-6x1 font-black mb-12 text-slate-800">
        {pontos} R$
        </p>

        <div onClick= {clicarNoBotao} className="w-64 h-64 bg-slate-700 rounded-full flex items-center justify-center text-5x1 cursor-pointer hover:scale-100 active:scale-95 transition-all">
          😁
    </div>
    
    </div>
    
    {/*Lado direito*/}
    <div   className="w-full md:w-96 bg-slate-800 p-6 flex flex-col">
      <h2 className="text-2x1 font-bold mb-6 text-center border-b border-slate-700 pb-4">
        Loja De Melhorias
      </h2>
      {/* Card do Upgrade */}
      <div className="flex flex-col gap-4">
      {upgrades.map((item)=>(
      <div key={item.id} onClick={()=> comprarUpgrade(item.custo,item.poder,item.passivo)}className="bg-slate-700 p-4 rounded-x1 flex justify-between items-center hover:bg-slate-600 cursor-pointer transition">
    <div>
      <h3 className="font-bold text-lg">{item.nome}</h3>
    <p className="text-sm text-slate-400">{item.descricao}</p>
    </div>
    <div className="bg-slate-900 px-4 py-2 rounded-lg font-bold text-green-400">
      $ {item.custo}
    </div>

      </div>
      ))}
    </div>
    </div>
  </div>
  );
}
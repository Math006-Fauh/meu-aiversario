import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import confetti from "canvas-confetti";

// add a type for messages returned from Supabase
interface Message {
  id: number;
  name: string;
  content: string;
  created_at?: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // helper for fetching messages (used when submitting a new message)
  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => {
    // perform an async fetch inside the effect so that setState is not called
    // directly during rendering
    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setMessages(data);
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from("messages")
      .insert([{ name, content }]);
    if (!error) {
      setName("");
      setContent("");
      fetchMessages();
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }

  return (
    <>
      <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* HEADER ESTILIZADO */}
        <header className="bg-gradient-to-br from-red-600 to-orange-500 text-white py-16 px-4 text-center shadow-lg">
          <img
            src="/perfil.jpg"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
            alt="Aniversariante"
          />
          <h1 style={{ color: "red", fontSize: "50px" }}>
            Matusse B-Day Journey 06.03
          </h1>
          <p className="text-lg opacity-90 font-light italic">
            Khanimambo por vir conhecer a minha história!
          </p>
        </header>

        <section className="max-w-4xl mx-auto px-6 py-12">
          {/* SECÇÃO DE PRESENTES (M-PESA / E-MOLA) */}
          <section className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-md border-t-8 border-red-600 transform hover:scale-105 transition">
              <h3 className="text-red-600 font-black text-xl mb-4">
                M-PESA 🇲🇿
              </h3>
              <p className="text-3xl font-mono tracking-tighter mb-4">
                85 389 4337
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("853894337");
                  confetti();
                }}
                className="w-full bg-slate-100 py-2 rounded-xl font-bold text-sm hover:bg-red-50 transition"
              >
                COPIAR NÚMERO
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border-t-8 border-orange-500 transform hover:scale-105 transition">
              <h3 className="text-orange-500 font-black text-xl mb-4">
                E-MOLA 🇲🇿
              </h3>
              <p className="text-3xl font-mono tracking-tighter mb-4">
                86 117 5799
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("861175799");
                  confetti();
                }}
                className="w-full bg-slate-100 py-2 rounded-xl font-bold text-sm hover:bg-orange-50 transition"
              >
                COPIAR NÚMERO
              </button>
            </div>
          </section>

          {/* SECCÃO TIMELINE COMPLETA */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 border-l-4 border-red-600 pl-4 uppercase tracking-wider">
              A Minha Jornada
            </h2>

            <div className="space-y-16">
              {/* 1. INFÂNCIA */}
              <div className="group">
                <h4 className="font-black text-2xl text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-red-600">01.</span> INFÂNCIA
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <img
                    src="/infancia.jpg"
                    className="rounded-3xl shadow-md w-full h-64 object-cover"
                    alt="Infância"
                  />
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Há alguns anos atrás, Deus permitiu que eu viesse ao mundo.
                    Fui privilegiado por nascer do ventre de uma grande mulher:
                    HERMENEGILDA LISBOA MANUEL. Uma grande mulher que mesmo
                    solteira e em meio a tantas dificuldades, cuidou de mim e de
                    meus dois irmãos mais velhos: OSMAR e TOMÉ MALHALHA. A vida
                    nunca foi fácil para nós mas minha mãe nunca deixou faltar
                    comida na nossa humilde mesa, sempre nos incentivou a
                    estudar e nos formar para um dia sermos alguém na sociedade.
                  </p>
                </div>
              </div>

              {/* 2. ADOLESCÊNCIA */}
              <div className="group">
                <h4 className="font-black text-2xl text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-red-600">02.</span> Adolescência
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div className="order-2 md:order-1 text-slate-600 leading-relaxed text-lg">
                    <p>
                      Tive uma adolescêencia com de qualquer um, e como quase
                      todos adolescentes, vivia dando dores de cabeça para minha
                      mãe. Mas mesmo assim, ela nunca deixou de me amar e de me
                      apoiar. Me foi dada uma grande oportunidade por aquele que
                      eu chamo de meu segundo pai: JOÃO PAULO CHACALA, tio
                      materno que me levou para morar com ele na província de
                      Tete. Ele é quem moldou o jovem que sou hoje. No decorrer
                      dos meus estudos comecei a desenvolver paixão por
                      tecnologia e inovação.
                    </p>
                  </div>
                  <img
                    src="/adolescencia.jpg"
                    className="rounded-3xl shadow-md w-full h-64 object-cover order-1 md:order-2"
                    alt="Adolescência"
                  />
                </div>
              </div>

              {/* 3. CONVERSÃO (Múltiplas Fotos) */}
              <div className="group">
                <h4 className="font-black text-2xl text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-red-600">03.</span> Conversão
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  Durante a adolescência enquanto morava em Tete, vivi um
                  momento decisivo de mudança de vida e valores. A base
                  espiritual que sustenta a minha caminhada: JESUS CRISTO.
                  Conheci o amor de Deus e decidi me entregar a Ele. A minha fé
                  tem sido o alicerce que me sustenta em todas as fases da minha
                  vida, e é a luz que guia os meus passos. Sou grato por cada
                  momento dessa jornada de fé, e por cada pessoa que Deus
                  colocou no meu caminho para me ajudar a crescer
                  espiritualmente. Louvo a Deus pela vida dos meus pastores:
                  HELTON e LAILA MACHADO, pessoas que Deus colocou na minha vida
                  para me ensinar sobre o amor de Deus e a importância de viver
                  uma vida de fé. Sou grato a Deus pela vida do meu grande
                  discipulador: LENINE CULEMEDZA, homem de Deus que mostrou os
                  primeiros passos da minha caminhada cristã, e que me ensinou a
                  importância de buscar a Deus de todo o coração.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img
                    src="/conversao1.jpg"
                    className="rounded-2xl shadow-sm w-full h-40 object-cover"
                    alt="Conversão 1"
                  />
                </div>
              </div>

              {/* 4. VITÓRIAS (Múltiplas Fotos) */}
              <div className="group">
                <h4 className="font-black text-2xl text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-red-600">04.</span> Vitórias
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  Durante os meus estudos me destaquei em diversos eventos
                  académicos provinciais e nacionais, como PRÉMIO JOVEM
                  CRIATIVO, OLIMPÍADAS NACIONAIS DE MATEMÁTICA, FEIRA DE
                  CIÊNCIAS E TECNOLOGIA, etc. Desfrutei das conquistas
                  académicas, profissionais e pessoais. Cada certificado, cada
                  meta batida e cada obstáculo superado. Reconheço que não
                  cheguei até aqui sozinho, e sou grato por cada pessoa que me
                  apoiou, em especial aos professores ZACARIAS MASSACHE, FILIPE
                  VILANCULO, ZACARIAS AIRONE e BENJAMIM GUISSIMONE, professores
                  que acreditaram no meu potencial e me incentivaram a seguir em
                  frente, mesmo quando eu duvidava de mim mesmo. Sou grato
                  também a NEMA NHONGO, AMÉLIA CONSELHO, LUCÍLIA CARLITOS,
                  LEOVIGILDO MARIANO e SIMIÃO QUENTE, pessoas que partilharam
                  grandes palcos comigo e me inspiraram a sonhar mais alto. Cada
                  vitória é um lembrete de que sou capaz de alcançar grandes
                  coisas, e me motiva a continuar buscando o melhor de mim
                  mesmo.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <img
                    src="/vitoria1.jpg"
                    className="rounded-2xl shadow-sm w-full h-40 object-cover"
                    alt="Vitória 1"
                  />
                  <img
                    src="/vitoria2.jpg"
                    className="rounded-2xl shadow-sm w-full h-40 object-cover"
                    alt="Vitória 2"
                  />
                  <img
                    src="/vitoria3.jpg"
                    className="rounded-2xl shadow-sm w-full h-40 object-cover"
                    alt="Vitória 3"
                  />
                  <img
                    src="/vitoria4.jpg"
                    className="rounded-2xl shadow-sm w-full h-40 object-cover"
                    alt="Vitória 4"
                  />
                </div>
              </div>

              {/* 5. HOJE */}
              <div className="group bg-white p-8 rounded-3xl shadow-inner border border-slate-100">
                <h4 className="font-black text-2xl text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-green-600">05.</span> Hoje (06.03)
                </h4>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <img
                    src="/hoje.jpg"
                    className="rounded-3xl shadow-xl w-full h-80 object-cover border-4 border-white"
                    alt="Hoje"
                  />
                  <div>
                    <p className="text-slate-700 leading-relaxed text-xl italic">
                      Hoje, Estudante de Engenharia Informática, a caminha ainda
                      não teve o seu fim. Continuo medindo esforços para ser
                      alguém melhor a cada dia, seja nos códigos, nos estudos,
                      nos games até na oração. Grato por cada passo dado. Hoje
                      celebro não apenas anos de vida, mas a evolução de quem me
                      tornei.
                    </p>
                    <div className="mt-6 flex gap-2">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                        Dev Life
                      </span>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                        Gratidão
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* MURAL DE MENSAGENS */}
        <section className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-8">Deixe os seus Parabéns ✨</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mb-12">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Teu Nome"
              className="w-full p-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none transition"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreve aqui..."
              className="w-full p-4 rounded-2xl border border-slate-200 h-32 focus:border-red-500 outline-none transition"
              required
            />
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:shadow-xl active:scale-95 transition">
              ENVIAR FELICITAÇÕES
            </button>
          </form>

          <div className="grid gap-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-400"
              >
                <p className="text-xs font-bold text-orange-600 uppercase mb-1">
                  {m.name}
                </p>
                <p className="text-slate-700">{m.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        Happy Birthday to me • 2026
      </footer>
    </>
  );
}

export default App;

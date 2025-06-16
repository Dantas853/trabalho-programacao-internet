// Importa o cliente Supabase (certificar sempre de configurar o URL e a chave anon)
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://czhablojniwloaugarfu.supabase.co" // URL do Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aGFibG9qbml3bG9hdWdhcmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTg5NDQsImV4cCI6MjA2NTE3NDk0NH0.Yw8t0I9X1QLhKhDaL4s_n8TzBspS_uKmp4iTMaHHeC8" // Chave anon do Supabase
const supabaseClient = createClient(supabaseUrl, supabaseKey)

// Script para o formulário de contato
document.addEventListener("DOMContentLoaded", () => {
  const contatoForm = document.getElementById("contato")

  if (contatoForm) {
    contatoForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const nome = document.getElementById("nome").value
      const email = document.getElementById("email").value
      const mensagem = document.getElementById("mensagem").value

      try {
        // Enviar dados para o Supabase
        const { error } = await supabaseClient.from("contatos").insert([{ nome, email, mensagem }])

        if (error) throw error

        alert("Mensagem enviada com sucesso! Em breve entraremos em contato.")
        contatoForm.reset()
      } catch (error) {
        alert("Erro ao enviar mensagem: " + error.message)
      }
    })
  }
})

// Import the Supabase client library
import { createClient } from "@supabase/supabase-js"

// Criando um cliente Supabase singleton para uso em todo o site
const createSupabaseClient = () => {
  const supabaseUrl = "https://czhablojniwloaugarfu.supabase.co" // URL supabase
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aGFibG9qbml3bG9hdWdhcmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTg5NDQsImV4cCI6MjA2NTE3NDk0NH0.Yw8t0I9X1QLhKhDaL4s_n8TzBspS_uKmp4iTMaHHeC8" // Chave do supabase ANON

  // Verificar se o objeto supabase já existe
  if (typeof supabase === "undefined") {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    return supabase
  }

  return supabase
}

// Inicializar o cliente
const supabaseClient = createSupabaseClient()

// Verificar o estado da autenticação ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession()

  // Atualizar a interface com base no estado de autenticação
  updateAuthUI(session)
})

// Função para atualizar a interface com base no estado de autenticação
function updateAuthUI(session) {
  const authButtons = document.querySelector("header nav:nth-of-type(1)")

  if (authButtons) {
    if (session) {
      // Usuário está logado
      authButtons.innerHTML = `
        <a href="pets.html"><button>Meus Pets</button></a>
        <button onclick="logout()">Sair</button>
      `
    } else {
      // Usuário não está logado
      authButtons.innerHTML = `
        <a href="login.html"><button>Login</button></a>
        <a href="cadastro.html"><button>Cadastro</button></a>
      `
    }
  }
}

// Função para logout
async function logout() {
  const { error } = await supabaseClient.auth.signOut()
  if (error) {
    alert(error.message)
  } else {
    alert("Desconectado com sucesso!")
    window.location.href = "index.html"
  }
}

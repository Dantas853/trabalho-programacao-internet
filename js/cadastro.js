// Script para a página de cadastro
document.addEventListener("DOMContentLoaded", () => {
  const cadastroForm = document.querySelector("form")
  const supabaseClient = supabase.createClient("https://czhablojniwloaugarfu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aGFibG9qbml3bG9hdWdhcmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTg5NDQsImV4cCI6MjA2NTE3NDk0NH0.Yw8t0I9X1QLhKhDaL4s_n8TzBspS_uKmp4iTMaHHeC8")

  if (cadastroForm && window.location.pathname.includes("cadastro")) {
    cadastroForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        alert("Cadastro realizado com sucesso!")
        window.location.href = "login.html"
      } catch (error) {
        alert("Erro ao cadastrar: " + error.message)
      }
    })
  }
})

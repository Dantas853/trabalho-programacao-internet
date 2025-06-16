// Script para a página de login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form")

  if (loginForm && window.location.pathname.includes("login")) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        alert("Login realizado com sucesso!")
        window.location.href = "index.html"
      } catch (error) {
        alert("Erro ao fazer login: " + error.message)
      }
    })
  }
})

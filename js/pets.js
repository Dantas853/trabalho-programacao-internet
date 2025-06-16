// Script para a página de cadastro de pets
document.addEventListener("DOMContentLoaded", () => {
  const petForm = document.querySelector("form")

  if (petForm && window.location.pathname.includes("pts")) {
    // Função para mostrar/esconder campo de medicações
    const toggleMedicamentos = () => {
      const medicacao = document.getElementById("medicacao").value
      document.getElementById("quais_medicacoes").style.display = medicacao === "Sim" ? "block" : "none"
    }

    // Configurar o evento change para o select de medicação
    const medicacaoSelect = document.getElementById("medicacao")
    if (medicacaoSelect) {
      medicacaoSelect.addEventListener("change", toggleMedicamentos)
      // Executar uma vez para configurar o estado inicial
      toggleMedicamentos()
    }

    // Inicializar o cliente Supabase (assumindo que ele foi inicializado em outro lugar)
    const supabaseClient = supabase.createClient("https://czhablojniwloaugarfu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aGFibG9qbml3bG9hdWdhcmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTg5NDQsImV4cCI6MjA2NTE3NDk0NH0.Yw8t0I9X1QLhKhDaL4s_n8TzBspS_uKmp4iTMaHHeC8")

    // Manipular o envio do formulário
    petForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Verificar se o usuário está autenticado (logado)
      const {
        data: { session },
      } = await supabaseClient.auth.getSession()

      if (!session) {
        alert("Você precisa estar logado para cadastrar um pet.")
        window.location.href = "login.html"
        return
      }

      const nome = document.getElementById("nome").value
      const raca = document.getElementById("raca").value
      const idade = Number.parseInt(document.getElementById("idade").value)
      const medicacao = document.getElementById("medicacao").value
      const quais_medicacoes = document.getElementById("quais_medicacoes").value

      const problemasSelect = document.getElementById("problemas")
      const problemas = Array.from(problemasSelect.selectedOptions)
        .map((option) => option.value)
        .join(", ")

      try {
        // Inserir o pet no banco de dados com o ID do usuário
        const { error } = await supabaseClient.from("pets").insert([
          {
            nome,
            raca,
            idade,
            medicacao,
            quais_medicacoes: medicacao === "Sim" ? quais_medicacoes : "",
            problemas,
            user_id: session.user.id,
          },
        ])

        if (error) throw error

        alert("Pet cadastrado com sucesso!")
        petForm.reset()
      } catch (error) {
        alert("Erro ao cadastrar pet: " + error.message)
      }
    })
  }
})

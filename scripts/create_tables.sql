-- Criação da tabela de contatos
CREATE TABLE IF NOT EXISTS contatos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criação da tabela de pets
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  raca TEXT NOT NULL,
  idade INTEGER NOT NULL,
  medicacao TEXT NOT NULL,
  quais_medicacoes TEXT,
  problemas TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configuração de políticas de segurança para a tabela de pets
CREATE POLICY "Usuários podem ver apenas seus próprios pets" 
  ON pets FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios pets" 
  ON pets FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar apenas seus próprios pets" 
  ON pets FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir apenas seus próprios pets" 
  ON pets FOR DELETE 
  USING (auth.uid() = user_id);

-- Configuração de políticas de segurança para a tabela de contatos
CREATE POLICY "Qualquer pessoa pode enviar contatos" 
  ON contatos FOR INSERT 
  WITH CHECK (true);

-- Apenas administradores podem ver os contatos (implementação futura)

const form = document.getElementById('formCadastro');
const message = document.getElementById('message');

function showMessage(text, ok = true) {
  message.textContent = text;
  message.className = `message show ${ok ? 'ok' : 'error'}`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const cpf = document.getElementById('cpf').value.trim();

  try {
    const consulta = await fetch(`/pessoas?cpf=${encodeURIComponent(cpf)}`);
    const existentes = await consulta.json();
    if (existentes.length) return showMessage('Já existe um cadastro com este CPF.', false);

    const pessoa = {};
    ['nome','sobrenome','email','idade','telefone','cpf','rua','bairro','cidade','estado','rg']
      .forEach(campo => pessoa[campo] = document.getElementById(campo).value.trim());

    const response = await fetch('/pessoas', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pessoa)
    });
    if (!response.ok) throw new Error('Não foi possível cadastrar.');
    form.reset();
    showMessage('Pessoa cadastrada com sucesso!');
  } catch (error) { showMessage(error.message, false); }
});

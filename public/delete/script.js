const form = document.getElementById('formDelete');
const message = document.getElementById('message');
function showMessage(text, ok = true) { message.textContent = text; message.className = `message show ${ok ? 'ok' : 'error'}`; }

form.addEventListener('submit', async event => {
  event.preventDefault();
  const cpf = document.getElementById('cpf').value.trim();
  try {
    const consulta = await fetch(`/api/pessoas?cpf=${encodeURIComponent(cpf)}`);
    const data = await consulta.json();
    if (!data.length) return showMessage('Pessoa não encontrada.', false);
    const pessoa = data[0];
    const confirmar = confirm(`Excluir o cadastro de ${pessoa.nome} ${pessoa.sobrenome}?`);
    if (!confirmar) return;
    const response = await fetch(`/api/pessoas/${pessoa.id}`, { method:'DELETE' });
    if (!response.ok) throw new Error();
    form.reset();
    showMessage('Cadastro excluído com sucesso!');
  } catch (error) { showMessage('Não foi possível excluir o cadastro.', false); }
});

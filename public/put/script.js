const buscaForm = document.getElementById('buscaForm');
const form = document.getElementById('formEdicao');
const message = document.getElementById('message');
function showMessage(text, ok = true) { message.textContent = text; message.className = `message show ${ok ? 'ok' : 'error'}`; }

buscaForm.addEventListener('submit', async event => {
  event.preventDefault();
  const cpf = document.getElementById('cpfBusca').value.trim();
  try {
    const response = await fetch(`/api/pessoas?cpf=${encodeURIComponent(cpf)}`);
    const data = await response.json();
    if (!data.length) { form.hidden = true; return showMessage('Pessoa não encontrada.', false); }
    const pessoa = data[0];
    ['id','nome','sobrenome','email','idade','telefone','cpf','rua','bairro','cidade','estado','rg'].forEach(campo => document.getElementById(campo).value = pessoa[campo] ?? '');
    form.hidden = false;
    showMessage('Cadastro carregado. Faça as alterações e salve.');
  } catch (error) { showMessage('Erro ao buscar o cadastro.', false); }
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const pessoa = {};
  ['nome','sobrenome','email','idade','telefone','cpf','rua','bairro','cidade','estado','rg'].forEach(campo => pessoa[campo] = document.getElementById(campo).value.trim());
  try {
    const response = await fetch(`/api/pessoas/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(pessoa) });
    if (!response.ok) throw new Error();
    showMessage('Cadastro atualizado com sucesso!');
  } catch (error) { showMessage('Não foi possível atualizar o cadastro.', false); }
});

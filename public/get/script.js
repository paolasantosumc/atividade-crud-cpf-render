const tabela = document.getElementById('tabela');
const vazio = document.getElementById('vazio');
const message = document.getElementById('message');

function showMessage(text, ok = true) { message.textContent = text; message.className = `message show ${ok ? 'ok' : 'error'}`; }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char])); }

function render(data) {
  tabela.innerHTML = '';
  vazio.style.display = data.length ? 'none' : 'block';
  data.forEach(pessoa => {
    const tr = document.createElement('tr');
    const endereco = `${pessoa.rua}, ${pessoa.bairro} - ${pessoa.cidade}/${pessoa.estado}`;
    tr.innerHTML = `<td>${escapeHtml(pessoa.id)}</td><td>${escapeHtml(pessoa.nome)}</td><td>${escapeHtml(pessoa.sobrenome)}</td><td>${escapeHtml(pessoa.email)}</td><td>${escapeHtml(pessoa.idade)}</td><td>${escapeHtml(pessoa.telefone)}</td><td>${escapeHtml(pessoa.cpf)}</td><td>${escapeHtml(endereco)}</td><td>${escapeHtml(pessoa.rg)}</td>`;
    tabela.appendChild(tr);
  });
}

async function carregar(url = '/pessoas') {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao consultar os registros.');
    const data = await response.json();
    render(data);
    if (url !== '/pessoas') showMessage(data.length ? 'CPF encontrado.' : 'Nenhum cadastro encontrado para este CPF.', Boolean(data.length));
    else message.className = 'message';
  } catch (error) { showMessage(error.message, false); }
}

document.getElementById('buscaForm').addEventListener('submit', event => {
  event.preventDefault();
  const cpf = document.getElementById('cpfBusca').value.trim();
  if (!cpf) return showMessage('Digite um CPF para realizar a busca.', false);
  carregar(`/pessoas?cpf=${encodeURIComponent(cpf)}`);
});
document.getElementById('listarTodos').addEventListener('click', () => carregar());
carregar();

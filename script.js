document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas salvas
    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
        tarefas.forEach(tarefa => {
            const tarefaObj = typeof tarefa === 'string' 
                ? { texto: tarefa, concluida: false } 
                : tarefa;
            adicionarTarefaALista(tarefaObj);
        });
    }

    // Salvar tarefas no localStorage
    function salvarTarefas() {
        const tarefas = Array.from(taskList.children).map(item => ({
            texto: item.querySelector('span').textContent,
            concluida: item.classList.contains('concluida')
        }));
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // Adicionar tarefa à lista
    function adicionarTarefaALista(tarefa) {
        const itemTarefa = document.createElement('li');
        itemTarefa.classList.add('task-item');
        
        if (tarefa.concluida) {
            itemTarefa.classList.add('concluida');
        }
        
        const textoItem = document.createElement('span');
        textoItem.textContent = tarefa.texto;
        textoItem.addEventListener('click', () => {
            itemTarefa.classList.toggle('concluida');
            salvarTarefas();
        });
        
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('delete-button');
        botaoExcluir.addEventListener('click', () => {
            itemTarefa.classList.add('remover');
            itemTarefa.addEventListener('animationend', () => {
                taskList.removeChild(itemTarefa);
                salvarTarefas();
            });
        });
        
        itemTarefa.appendChild(textoItem);
        itemTarefa.appendChild(botaoExcluir);
        taskList.appendChild(itemTarefa);
    }

    // Evento para adicionar nova tarefa
    addTaskButton.addEventListener('click', () => {
        const textoTarefa = taskInput.value.trim();
        if (textoTarefa) {
            adicionarTarefaALista({ texto: textoTarefa, concluida: false });
            taskInput.value = '';
            salvarTarefas();
        }
    });

    // Permitir adicionar tarefa com a tecla Enter
    taskInput.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            const textoTarefa = taskInput.value.trim();
            if (textoTarefa) {
                adicionarTarefaALista({ texto: textoTarefa, concluida: false });
                taskInput.value = '';
                salvarTarefas();
            }
        }
    });

    // Carregar tarefas salvas quando a página carregar
    carregarTarefas();
});

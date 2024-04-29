// ==UserScript==
// @name         Filtro de Professores para SED Educação SP
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Filtra as aulas por professor na SED Educação SP quando clicado no nome do professor e reseta ao clicar novamente.
// @author       Você
// @match        https://sed.educacao.sp.gov.br/RegistroAula/RelatorioTurma
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let ultimoProfessorClicado = '';

    function filtrarOuResetarAulas(professorNome) {
        if (professorNome === ultimoProfessorClicado) {
            resetarVisibilidadeAulas();
            ultimoProfessorClicado = '';
        } else {
            filtrarAulasPorProfessor(professorNome);
            ultimoProfessorClicado = professorNome;
        }
    }

    function filtrarAulasPorProfessor(professorNome) {
        document.querySelectorAll('.aulas').forEach(function(aula) {
            if(aula.textContent.includes(professorNome)) {
                Array.from(aula.children).forEach(child => child.style.visibility = 'visible');
            } else {
                Array.from(aula.children).forEach(child => child.style.visibility = 'hidden');
            }
        });
    }

    function resetarVisibilidadeAulas() {
        document.querySelectorAll('.aulas div').forEach(function(div) {
            div.style.visibility = 'visible';
        });
    }

    function adicionarEventos() {
        document.querySelectorAll('#dadosTurma b').forEach(function(nome) {
            nome.style.cursor = 'pointer';
            nome.removeEventListener('click', listenerFunc); // Remove any previous listeners to prevent duplicates
            nome.addEventListener('click', listenerFunc);
        });
    }

    function listenerFunc(e) {
        filtrarOuResetarAulas(e.target.textContent.trim());
    }

    // Roda a cada 2 segundos para garantir que os eventos sejam adicionados após o carregamento dinâmico do conteúdo.
    setInterval(adicionarEventos, 2000);
})();
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const submitButton = contactForm.querySelector('.form-submit-btn');
  const formStatus = document.getElementById('formStatus');
  const defaultButtonText = submitButton.textContent;

  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status is-visible is-${type}`;
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.setAttribute('aria-disabled', 'true');
    submitButton.textContent = 'Enviando...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const ajaxEndpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error('Não foi possível concluir o envio.');
      }

      contactForm.reset();
      showFormStatus('Mensagem enviada com sucesso! Em breve, nossa equipe entrará em contato.', 'success');
    } catch (error) {
      showFormStatus('Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-disabled');
      submitButton.textContent = defaultButtonText;
    }
  });
}

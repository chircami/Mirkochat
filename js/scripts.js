window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 20;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var getCurrentTime = function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 17) return 'Te deseo un feliz dia!!';
    if (current >= 17 && current < 20) return 'Te deseo una feliz tarde!!';
    if (current >= 20 || current < 5) return 'Te deseo una feliz noche!!';
  }

  var messages = [
    'Hola',
    'Me llamo Mirkolino',
    'Soy desarrollador de paginas web con WordPress y otras tecnologias',
    'Podemos charlar o tomar un cafe',
    'Contacta: <a href="mailto:mirko.zedde@gmail.com">email</a> o visita <a href="https://www.mirkolab.com/">Mirkolab</a>',
    'Encuentrame en <a href="https://www.linkedin.com/in/mirkozedde">LinkedIn</a>',
    getCurrentTime(),
    'Nos vemos pronto, Mirko.'
  ]

  var sendMessage = function(message) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 800;

    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');

    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add('left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');

    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;

    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);

    // Hide message, set bubble to loading size
    messageEl.style.opacity = '0';
    messageEl.style.position = 'absolute';
    messageEl.style.visibility = 'hidden';
    bubbleEl.style.width = '4rem';
    bubbleEl.style.height = '2.25rem';
    bubbleEl.style.opacity = '0';
    bubbleEl.style.overflow = 'hidden';

    messagesEl.appendChild(bubbleEl);
    messagesEl.appendChild(document.createElement('br'));

    // Fade in loading bubble
    anime({
      targets: bubbleEl,
      opacity: [0, 1],
      duration: 300
    });

    setTimeout(function() {
      // Hide dots, show message in normal flow to measure
      loadingEl.style.display = 'none';
      messageEl.style.position = '';
      messageEl.style.visibility = '';
      bubbleEl.classList.remove('cornered');

      // Let browser measure the natural size
      bubbleEl.style.width = 'auto';
      bubbleEl.style.height = 'auto';
      bubbleEl.style.maxWidth = '80%';

      var finalW = bubbleEl.offsetWidth + 'px';
      var finalH = bubbleEl.offsetHeight + 'px';

      // Reset to loading size for animation
      bubbleEl.style.width = '4rem';
      bubbleEl.style.height = '2.25rem';
      bubbleEl.style.overflow = 'hidden';

      // Animate to full size
      anime({
        targets: bubbleEl,
        width: finalW,
        height: finalH,
        duration: 350,
        easing: 'easeOutQuad',
        complete: function() {
          bubbleEl.style.width = 'auto';
          bubbleEl.style.height = 'auto';
          bubbleEl.style.overflow = '';
          anime({
            targets: messageEl,
            opacity: [0, 1],
            duration: 250
          });
        }
      });

    }, loadingDuration);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    var delay = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 1200;
    setTimeout(sendMessages, delay);
  }

  sendMessages();

}

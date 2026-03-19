window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 20;
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

  var sendMessage = function(message, callback) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 800;

    // Create elements
    var bubbleEl  = document.createElement('div');
    var dotsEl    = document.createElement('div');
    var messageEl = document.createElement('div');

    bubbleEl.className  = 'bubble left cornered';
    dotsEl.className    = 'loading';
    messageEl.className = 'message';

    dotsEl.innerHTML    = '<b>•</b><b>•</b><b>•</b>';
    messageEl.innerHTML = message;
    messageEl.style.display = 'none';

    bubbleEl.appendChild(dotsEl);
    bubbleEl.appendChild(messageEl);
    messagesEl.appendChild(bubbleEl);
    messagesEl.appendChild(document.createElement('br'));

    // Phase 1: show bubble with dots, animate dots
    anime({
      targets: bubbleEl,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: 'easeOutQuad'
    });

    anime({
      targets: dotsEl.querySelectorAll('b'),
      scale: [0.5, 1.2],
      opacity: [0.3, 1],
      duration: 400,
      loop: true,
      direction: 'alternate',
      delay: function(el, i) { return i * 120; },
      easing: 'easeInOutSine'
    });

    // Phase 2: after loading duration, swap dots for message
    setTimeout(function() {
      dotsEl.style.display = 'none';
      messageEl.style.display = '';
      bubbleEl.classList.remove('cornered');

      anime({
        targets: messageEl,
        opacity: [0, 1],
        translateY: [4, 0],
        duration: 350,
        easing: 'easeOutQuad'
      });

      if (callback) callback();
    }, loadingDuration);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    ++messageIndex;
    var nextDelay = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 1000;
    sendMessage(message, function() {
      setTimeout(sendMessages, nextDelay * 0.3);
    });
  }

  sendMessages();

}

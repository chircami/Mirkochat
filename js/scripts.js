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
    'Contacta: <a href="mailto:mirko.zedde@gmail.com">email</a> o <a href="https://www.mirkolab.com/">Mirkolab</a>',
    '<a href="https://www.linkedin.com/in/mirkozedde">LinkedIn</a>',
    getCurrentTime(),
    'Nos vemos pronto, Mirko.'
  ]

  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

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
    messagesEl.appendChild(bubbleEl);
    messagesEl.appendChild(document.createElement('br'));

    // Show bubble with loading dots
    bubbleEl.style.opacity = 0;
    bubbleEl.style.width = '4rem';
    bubbleEl.style.height = '2.25rem';
    messageEl.style.opacity = 0;

    anime({
      targets: bubbleEl,
      opacity: [0, 1],
      duration: 300
    });

    // After loading duration, reveal the message
    setTimeout(function() {
      // Hide loading dots
      loadingEl.style.display = 'none';
      bubbleEl.classList.remove('cornered');

      // Measure real message size
      var msgW = pxToRem(messageEl.scrollWidth + 8);
      var msgH = pxToRem(messageEl.scrollHeight + 16);

      // Expand bubble to fit message
      anime({
        targets: bubbleEl,
        width: msgW,
        height: msgH,
        duration: 300,
        easing: 'easeOutQuad',
        complete: function() {
          // Fade in message text
          anime({
            targets: messageEl,
            opacity: [0, 1],
            duration: 300
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

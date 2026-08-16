(function () {
  var threadsWrap = document.getElementById('chatThreads');
  if (!threadsWrap) return;

  var threads = [
    {
      id: 'alex', name: 'Alexandra Harrington', role: 'Customer — ORD-2841', online: true, initials: 'AH',
      messages: [
        { sender: 'James', message: "Hello Alexandra! I've started on your Navy Wool Suit. Could you confirm whether you'd like single or double-breasted?", time: '2:15 PM', isSelf: true },
        { sender: 'Alexandra', message: 'Hi James! Single-breasted please, with notch lapels.', time: '2:22 PM', isSelf: false },
        { sender: 'James', message: 'Perfect. And for the lining — would you prefer the full navy or a contrast burgundy?', time: '2:24 PM', isSelf: true },
        { sender: 'Alexandra', message: "The contrast burgundy sounds lovely. Let's go with that.", time: '2:31 PM', isSelf: false },
        { sender: 'James', message: "Excellent choice! I'll proceed with that. Estimated ready date remains Aug 3.", time: '2:33 PM', isSelf: true }
      ]
    },
    {
      id: 'marcus', name: 'Marcus Chen', role: 'Customer — ORD-2796', online: false, initials: 'MC',
      messages: [
        { sender: 'James', message: 'Marcus, just confirming sleeve length — 65 cm?', time: '11:30 AM', isSelf: true },
        { sender: 'Marcus', message: "Yes, that's right. Thanks for checking!", time: '11:45 AM', isSelf: false }
      ]
    },
    {
      id: 'thomas', name: 'Thomas Wright', role: 'Customer — ORD-2860', online: true, initials: 'TW',
      messages: [
        { sender: 'Thomas', message: 'Any update on the tweed suit? Excited for it!', time: 'Jul 20', isSelf: false },
        { sender: 'James', message: "Still in cutting phase, should be on sewing by Friday. Looking great so far!", time: 'Jul 20', isSelf: true }
      ]
    }
  ];

  var selfName = 'James';
  var activeId = threads[0].id;
  var chatShell = document.getElementById('chatShell');

  var chatHead = document.getElementById('chatHead');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');
  var chatCount = document.getElementById('chatCount');
  var chatAttachBtn = document.getElementById('chatAttachBtn');
  var chatImageInput = document.getElementById('chatImageInput');
  var chatAttachmentPreview = document.getElementById('chatAttachmentPreview');
  var chatAttachmentImg = document.getElementById('chatAttachmentImg');
  var chatAttachmentRemove = document.getElementById('chatAttachmentRemove');

  var attachedImage = null;

  function findThread(id) {
    return threads.filter(function (t) { return t.id === id; })[0];
  }

  function renderThreadsList() {
    threadsWrap.innerHTML = '';
    threads.forEach(function (t) {
      var last = t.messages[t.messages.length - 1];
      var preview = last ? (last.message || (last.image ? '📷 Photo' : '')) : '';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-thread' + (t.id === activeId ? ' is-active' : '');
      btn.setAttribute('data-thread', t.id);
      btn.innerHTML =
        '<div class="chat-avatar">' + t.initials + (t.online ? '<span class="chat-avatar__dot"></span>' : '') + '</div>' +
        '<div class="chat-thread__body">' +
          '<div class="chat-thread__top">' +
            '<span class="chat-thread__name"></span>' +
            '<span class="chat-thread__time"></span>' +
          '</div>' +
          '<div class="chat-thread__preview"></div>' +
        '</div>';
      btn.querySelector('.chat-thread__name').textContent = t.name;
      btn.querySelector('.chat-thread__time').textContent = last ? last.time : '';
      btn.querySelector('.chat-thread__preview').textContent = preview;
      threadsWrap.appendChild(btn);
    });
    chatCount.textContent = threads.length + ' conversations';
  }

  function renderHead(thread) {
    chatHead.innerHTML =
      '<button type="button" class="chat-back-btn" aria-label="Back to conversations">←</button>' +
      '<div class="chat-avatar">' + thread.initials + (thread.online ? '<span class="chat-avatar__dot"></span>' : '') + '</div>' +
      '<div>' +
        '<div class="chat-panel__name"></div>' +
        '<div class="chat-panel__role"></div>' +
      '</div>' +
      (thread.online ? '<div class="chat-panel__online"><span class="chat-panel__online-dot"></span> Online</div>' : '');
    chatHead.querySelector('.chat-panel__name').textContent = thread.name;
    chatHead.querySelector('.chat-panel__role').textContent = thread.role;
  }

  chatHead.addEventListener('click', function (event) {
    if (event.target.closest('.chat-back-btn')) {
      chatShell.classList.add('chat-shell--idle');
    }
  });

  function renderMessages(thread) {
    chatMessages.innerHTML = '';
    thread.messages.forEach(function (m) {
      var row = document.createElement('div');
      row.className = 'chat-bubble-row' + (m.isSelf ? ' is-self' : '');

      var bubbleHtml = '<div class="chat-bubble' + (m.image ? ' chat-bubble--image' : '') + '">';
      if (m.image) {
        bubbleHtml += '<img class="chat-bubble-image" src="' + m.image + '" alt="Attached image">';
        if (m.message) bubbleHtml += '<div class="chat-bubble-caption"></div>';
      }
      bubbleHtml += '</div>';

      row.innerHTML =
        '<div class="chat-bubble-avatar"></div>' +
        '<div class="chat-bubble-col">' +
          bubbleHtml +
          '<span class="chat-bubble-time"></span>' +
        '</div>';
      row.querySelector('.chat-bubble-avatar').textContent = m.sender.charAt(0);
      if (m.image) {
        var caption = row.querySelector('.chat-bubble-caption');
        if (caption) caption.textContent = m.message;
      } else {
        row.querySelector('.chat-bubble').textContent = m.message;
      }
      row.querySelector('.chat-bubble-time').textContent = m.time;
      chatMessages.appendChild(row);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function selectThread(id) {
    activeId = id;
    chatShell.classList.remove('chat-shell--idle');
    renderThreadsList();
    var thread = findThread(activeId);
    renderHead(thread);
    renderMessages(thread);
  }

  threadsWrap.addEventListener('click', function (event) {
    var btn = event.target.closest('.chat-thread');
    if (!btn) return;
    selectThread(btn.getAttribute('data-thread'));
  });

  function updateSendState() {
    chatSend.disabled = !(chatInput.value.trim() || attachedImage);
  }

  function clearAttachment() {
    attachedImage = null;
    chatImageInput.value = '';
    chatAttachmentPreview.classList.remove('is-visible');
    chatAttachmentImg.src = '';
  }

  chatAttachBtn.addEventListener('click', function () {
    chatImageInput.click();
  });

  chatImageInput.addEventListener('change', function () {
    var file = chatImageInput.files && chatImageInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      attachedImage = reader.result;
      chatAttachmentImg.src = attachedImage;
      chatAttachmentPreview.classList.add('is-visible');
      updateSendState();
    };
    reader.readAsDataURL(file);
  });

  chatAttachmentRemove.addEventListener('click', function () {
    clearAttachment();
    updateSendState();
  });

  function send() {
    var text = chatInput.value.trim();
    if (!text && !attachedImage) return;
    var thread = findThread(activeId);
    var msg = {
      sender: selfName,
      message: text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    if (attachedImage) msg.image = attachedImage;
    thread.messages.push(msg);
    chatInput.value = '';
    clearAttachment();
    updateSendState();
    renderThreadsList();
    renderMessages(thread);
  }

  chatInput.addEventListener('input', updateSendState);
  chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') send();
  });
  chatSend.addEventListener('click', send);

  // Show the full-width thread list first; opening a thread reveals the conversation panel.
  renderThreadsList();
})();

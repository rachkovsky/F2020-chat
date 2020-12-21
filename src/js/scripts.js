document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('.chat__messages');
    const sendButton = document.getElementById('send-message');
    const messageInput = document.querySelector('.chat__input-text');
    const friendsListContainer = document.querySelector('.friends-list');

    const socket = io('http://localhost:4000');


    socket.on('message_sent', (data) => {
        console.log('===== ', data);
    })
    
    let chatRooms = [];

    fetch('http://localhost:4000/chats')
    .then((res) => {
        return res.json();
    })
    .then((result) => {
        chatRooms = result;
        chatRooms.forEach((el) => {
            createFriendsList(el);
        })
        renderFriendsList(chatRooms);
    })


    friendsListContainer.addEventListener('click', (event) => {

        const previews = document.getElementsByClassName('friend-preview');
        console.log(previews);

        for (let el of previews) {
            if(el.classList.contains('friend-preview--active')) {
                el.classList.remove('friend-preview--active');
            }
        }

        let el = event.target;
        if (el.dataset.chatroom) {
            renderChat(el.dataset.chatroom);
            el.classList.add('friend-preview--active')
        } else {
            let target = el.closest('[data-chatroom]');
            renderChat(target.dataset.chatroom);
            target.classList.add('friend-preview--active')
        }
    });

    sendButton.addEventListener('click', (event) => {
        if (messageInput.value) {
            const msg = {
                message: messageInput.value,
                // id: chat1.length + 1,
                owner: 0,
                date: Date.now()

            }

            // chat1.push(msg);
            createMessage(msg);
            // console.log(chat1);
            socket.emit('message', {message: messageInput.value});
        }
    });

    messageInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendButton.click();
        }
    });

    function renderFriendsList(chatRooms) {
        let result =''
        chatRooms.forEach((chat) => {
            result = result + createFriendsList(chat);
        })

        friendsListContainer.insertAdjacentHTML('beforeEnd', result);
    }

    function renderChat(id) {
       
        let result = chatRooms.find((el,i) => {
            return id === el.id;
        })

        if (result) {
            container.innerHTML = '';
            result.chat.forEach((el) => {
                createMessage(el);
            })
        }
    }
    
    function createMessage(options) {

        const message = `
        <div class="message ${options.owner ? '' : 'message--owner'}">
            <div class="message__img">
                <img src="${ options.img ? options.img : 'https://fakeimg.pl/50x50/' }">
            </div>
            <div class="message__content">
                <div class="message__text">${options.message}</div>
                <div class="message__date">${new Date(options.date).toUTCString()}</div>
            </div> 
        </div>
        `;
    
        container.insertAdjacentHTML('beforeEnd', message)
    }

    function createFriendsList(options) {
        return `
        <div class="friend-preview" data-chatroom=${options.id}>
            <div class="friend-preview__img">
                <img src="https://fakeimg.pl/55x55/">
            </div>
            <div class="friend-preview__content">
            <div class="friend-preview__name">${options.name}</div>
            <div class="friend-preview__message">${options.chat[options.chat.length - 1].message}</div>
          </div>
          <div class="friend-preview__time">${options.chat[options.chat.length - 1].date}</div>
        </div>
        `;

        // friendsListContainer.insertAdjacentHTML('beforeEnd', item);
    }
});



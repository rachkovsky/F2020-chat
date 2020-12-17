document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('.chat__messages');
    const sendButton = document.getElementById('send-message');
    const messageInput = document.querySelector('.chat__input-text');
    const friendsListContainer = document.querySelector('.friends-list');
    

    const chat1 = [
        {
            message: "Some text",
            date: '1608138141315',
            id: '1',
            owner: 'rt75hjut56y74'
        },
        {
            message: "Some text 2",
            date: '1608138161315',
            id: '2',
            owner: 0
        },
        {
            message: "Some text sample",
            date: '',
            id: '3',
            owner: 'rt75hjut56y74'
        },
        {
            message: "Some text 4",
            date: '',
            id: '4',
            owner: 0
        },
        {
            message: "Some text 5",
            date: '',
            id: '5',
            owner: 0
        },
    
    ];

    const chat2 = [
        {
            message: "123 Some text",
            date: '',
            id: '1',
            owner: 'rt75hjut56y74'
        },
        {
            message: "123 Some text 2",
            date: '',
            id: '2',
            owner: 0
        },
        {
            message: "123 Some text sample",
            date: '',
            id: '3',
            owner: 'rt75hjut56y74'
        },
        {
            message: "Some text 4",
            date: '',
            id: '4',
            owner: 0
        },
        {
            message: "Some text 5",
            date: '',
            id: '5',
            owner: 0
        },
    
    ];

    const chatRooms = [
        {
            chat: chat1,
            id: 'fdsfasgasdf6758567867gh',
            name: "John Doe"

        },
        {
            chat: chat2,
            id: 'fd785685asdfghlhjklghkj',
            name: "Jane Doe"
            
        }
    ]

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


    sendButton.addEventListener('click', (event) => {
        if (messageInput.value) {
            const msg = {
                message: messageInput.value,
                id: chat1.length + 1,
                owner: 0,
                date: Date.now()

            }

            chat1.push(msg);
            createMessage(msg);
            console.log(chat1);
        }
    });

    messageInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendButton.click();
        }
    });

    chatRooms.forEach((el) => {
        createFriendsList(el);
    })

    renderFriendsList(chatRooms);

    function renderFriendsList(chatRooms) {
        let result =''
        chatRooms.forEach((chat) => {
            result = result + createFriendsList(chat);
        })

        friendsListContainer.insertAdjacentHTML('beforeEnd', result);
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



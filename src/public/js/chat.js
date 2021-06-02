var viewChat = false;
var chatY = 361;
var chatId = 0;


$(document).ready(function() {

    $(document).on('submit', '#messageForm', function(e) {
        
        e.preventDefault();
        var objectForm = {};
        $.each($(this).serializeArray(), function(i, m) {
            objectForm[m.name] = m.value;
        })
        $.post('new-message', objectForm, function(response) {
            document.getElementById("message").value = "";
        });
    });

    $(document).on('click', '#contentChatHead', function() {
        chatViewWindow();
    });

    getAllMessages();

});

function getAllMessages() {

    setInterval(() => {
        

        $.post('get-messages', { id: chatId }, function(response) {
            
            var html = "";
            var messageArray = response.messages;
            messageArray.forEach(function(m) {
                chatId = m.counter;
                html = '<div class="col-md-12 p-0 m-o mb-2 mt-2 pl-3">' +
                            '<div class="content-chat-messages-container">' +
                                '<p>' + m.message + '</p>' +
                            '</div>' +
                            '<div class="col-md-12 p-0 m-0">' +
                                '<span>' + moment(m.fecha).format('h:mm a') + '</span>' +
                            '</div>' +
                        '</div>';
                        
                $("#contentChatMessages").append(html);
                document.getElementById("contentChatMessages").scrollTop = document.getElementById("contentChatMessages").scrollHeight;
            });

        });

    }, 3000);


}

function chatViewWindow() {

    viewChat = !viewChat;

    var func1 = function() {

        if(chatY <= 0) {
            chatY = 0;
            clearInterval(idInterval);
        } else {

            chatY = chatY - 5;
            document.getElementById("contentChat").style.transform = 'translateY(' + chatY + 'px)';
            document.getElementById("iconDown").classList.add("rotate");

        }

    }

    var func2 = function() {

        if(chatY >= 361) {
            chatY = 361;
            clearInterval(idInterval);
        } else {
            chatY = chatY + 5;
            document.getElementById("contentChat").style.transform = 'translateY(' + chatY + 'px)';
            document.getElementById("iconDown").classList.remove("rotate");
        }

    }

    var func = func1;

    if(!viewChat)
        func = func2;


    var idInterval = setInterval(func, 1);

}
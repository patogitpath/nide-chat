var viewChat = false;
var chatY = 361;
var chatId = 0;


$(document).ready(function() {

    $("#message").emojioneArea({
        placeholder: "message",
        pickerPosition: 'top'
    });

    $(document).on('submit', '#messageForm', function(e) {
        
        e.preventDefault();
        var objectForm = {};
        $.each($(this).serializeArray(), function(i, m) {
            objectForm[m.name] = m.value;
        });

        var data = new FormData();
        data.append('message', objectForm.message);
        data.append('file', $("#file")[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/new-message',
            data: data,
            processData: false,
            contentType: false,
            success: function(response) {
                document.getElementById("message").value = "";
                document.getElementById("file").value = "";
                $("#message")[0].emojioneArea.setText("");
            },
            error: function() {
                console.log("error");
            }
        });

    });

    $(document).on('click', '#contentChatHead', function() {
        chatViewWindow();
    });

    getAllMessages();

});

function getAllMessages() {

    setInterval(() => {
        

        $.post('/get-messages', { id: chatId }, function(response) {
            
            var html = "";
            var messageArray = response.messagesArray;
            messageArray.forEach(function(m) {
                chatId = m.message.counter;
                var imageMessageHtml = "";
                m.images.forEach(function(img) {
                    imageMessageHtml = '<img src="/images/' + img.url + '" alt="image" width="150" />';
                });
                html = '<div class="col-md-12 p-0 m-o mb-2 mt-2 pl-3">' +
                            '<div class="content-chat-messages-container">' +
                                '<p>' + m.message.message + '</p>' +
                                imageMessageHtml +
                            '</div>' +
                            '<div class="col-md-12 p-0 m-0">' +
                                '<span>' + moment(m.message.fecha).format('h:mm a') + '</span>' +
                            '</div>' +
                        '</div>';
                        
                $("#contentChatMessages").append(html);
                setTimeout(() => {
                    document.getElementById("contentChatMessages").scrollTop = document.getElementById("contentChatMessages").scrollHeight;
                }, 1000);
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
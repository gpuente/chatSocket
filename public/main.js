var socket = io.connect('http://192.168.1.186:3000', {'forceNew' : true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(elem, index){
		return(`<div>
					<strong>${elem.author}</strong>: 
					<em>${elem.text}</em>
				</div>`);
	}).join(" ");
				
	document.getElementById("messages").innerHTML = html;
};

function addMessage(e){
	var payload = {
		author: document.getElementById('username').value,
		text: document.getElementById('text').value
	};

	console.log(payload);

	socket.emit('newMessage', payload);
	return false;
};
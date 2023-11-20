const sendButton = document.querySelector('.sendButton');
sendButton.addEventListener('click', async ()=> {
    const chat = document.querySelector('.chat');
    const text = document.querySelector('.text').value;
    makeMessage(text, 'you');
    thinkingMessage();
    chat.scrollTop = chat.scrollHeight;
    sendButton.style.display = 'none';
    const output = await botTalk(text)
    document.querySelector('.text').value = '';
    document.getElementById('thinkingMessage').remove();
    makeMessage(output['out'], 'bot');
    sendButton.style.display = 'block';
    
})

async function botTalk(input){
    const url = 'https://robomatic-ai.p.rapidapi.com/api';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '------key----',
		'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
	},
	body: new URLSearchParams({
		in: input,
		op: 'in',
		cbot: '1',
		SessionID: 'RapidAPI1',
		cbid: '1',
		key: '------key----',
		ChatSource: 'RapidAPI',
		duration: '2'
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result
} catch (error) {
	console.error(error);
}
}

function makeMessage(msg,sender){
    const chat = document.querySelector('.chat');
    const message = document.createElement('div');
    message.className = 'message';
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.innerHTML = (sender == 'you') ? '🧔 You:' : '🤖 BOT:';
    const messageText = document.createElement('p');
    messageText.className = 'messageText';
    messageText.innerHTML = msg;
    message.appendChild(userDiv);
    message.appendChild(messageText);
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function thinkingMessage(){
    const chat = document.querySelector('.chat');
    const message = document.createElement('div');
    message.className = 'message';
    message.id = 'thinkingMessage'
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.innerHTML = '🤖 BOT:';
    const messageText = document.createElement('p');
    messageText.className = 'messageText';
    messageText.innerHTML = 'Thinking...';
    message.appendChild(userDiv);
    message.appendChild(messageText);
    chat.appendChild(message);
}
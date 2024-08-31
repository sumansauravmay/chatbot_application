import React, { useState, useEffect } from 'react';

const Chat = () => {

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
  
    useEffect(() => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
  
      recognition.onresult = (event) => {
        const speechToText = event.results[event.results.length - 1][0].transcript;
        setTranscript(speechToText);
        // Send transcript to OpenAI API and get response
      };
  
      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
  
      return () => recognition.stop();
    }, [isListening]);
  
    const handleVoiceResponse = (responseText) => {
      const utterance = new SpeechSynthesisUtterance(responseText);
      window.speechSynthesis.speak(utterance);
    };
  



  return (
    <div>
      <button onClick={() => setIsListening((prevState) => !prevState)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>{transcript}</p>
      {/* Avatar and other UI components here */}
    </div>
  )
}

export default Chat

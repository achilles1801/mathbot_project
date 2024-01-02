'use client'
import './globals.css'
import { useState } from 'react'

export default function Home() {

  const [input, setInput] = useState('');
  const [response, setResponse] = useState([]);

  const handleClick = () => {
    fetch('https://mathbot.majdk.com/chat',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: input
      })
    })
    .then(response => {
      if (response.headers.get('content-type').includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Server response was not in JSON format');
      }
    })
      .then(data => {
        console.log(data);
        setResponse(data.reply);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t
     from-[#ffb700] to-[#ffecb3] p-8 justify-end">
      <main className="flex-grow mb-4 overflow-y-auto px-4 flex flex-col-reverse space-y-4 space-y-reverse w-full h-full max-w-md mx-auto">
        <div className="w-full max-w-md bg-gradient-to-t from-[#fff1c5] to-[#ffbf00] rounded-xl shadow-lg p-4 mb-4 h-full ">
          <p className="text-gray-800">{response || "The response will appear here."}</p>
        </div>
      </main>
      <div className="flex items-center justify-center w-full max-w-md mx-auto">
          <img src='/bee.png' alt='bee' className="w-12 mr-4"/>
          <input
            type="text"
            placeholder="How can I help you?"
            className="px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent w-3/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={handleClick}
            className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full 
            shadow-lg hover:bg-transparent"
          >
            SUBMIT
          </button>
        </div>
    </div>
  );
}
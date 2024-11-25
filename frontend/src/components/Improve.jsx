// // import React from 'react'
// // import Navbar from './Navbar'

// // const ChatApp = () => {

// //   return (

// //     <>
// //     <Navbar/>
// //     <div className='mt-[100px]' >
            
// //             Communication ______

// //     </div>

   
    
// //     </>

// //   )
// // }

// // export default ChatApp


// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';

// const topics = [
//     "Technology and Innovation",
//     "The Importance of Education",
//     "Environmental Issues",
//     "Artificial Intelligence",
//     "Future of Work",
//     "Space Exploration",
//     "Mental Health Awareness",
//     "Social Media Impact",
//     "Personal Growth",
//     "Health and Wellness"
// ];

// // Array of feedback messages
// const feedbackMessages = [
//     "Great job! Keep working on clarity and pronunciation.",
//     "Nice effort! Try to speak a bit slower for better understanding.",
//     "Good job! Focus on maintaining a steady pace.",
//     "Excellent! Practice your tone to make it more engaging.",
//     "Well done! Consider enunciating words more clearly.",
//     "Impressive! Keep up the good work and stay consistent.",
//     "Great attempt! Focus on reducing any filler words.",
//     "Nice! Try to articulate each word more distinctly.",
//     "Awesome! Work on your intonation for a stronger impact.",
//     "Good start! Practice makes perfect, keep going!"
// ];

// const Improve = () => {
//     const [currentTopic, setCurrentTopic] = useState("");
//     const [feedback, setFeedback] = useState("");
//     const [transcriptStarted, setTranscriptStarted] = useState(false);

//     const startListening = () => {
//         console.log("Starting listening...");
//         SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
//         setTranscriptStarted(true);
//     };

//     const { transcript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();

//     const generateRandomTopic = () => {
//         const randomTopic = topics[Math.floor(Math.random() * topics.length)];
//         setCurrentTopic(randomTopic);
//     };

//     // Randomly select a feedback message from the array
//     const generateRandomFeedback = () => {
//         const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
//         return randomFeedback;
//     };

//     const handleSubmit = () => {
//         if (transcript.length > 0) {
//             setFeedback(generateRandomFeedback());
//         } else {
//             setFeedback("Please start speaking to get feedback.");
//         }
//     };

//     useEffect(() => {
//         generateRandomTopic();
//     }, []);

//     useEffect(() => {
//         // Cleanup function to stop listening on unmount or new session start
//         return () => {
//             SpeechRecognition.stopListening();
//         };
//     }, []);

//     if (!browserSupportsSpeechRecognition) {
//         return <p className="text-center text-red-500">Browser does not support speech recognition.</p>;
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="flex flex-col items-center p-6 bg-gradient-to-b from-black via-purple-900 to-black min-h-screen mt-[70px] ">
//                 <div className="md:w-[830px] w-[400px] bg-purple-800 rounded-lg shadow-lg p-6 text-white ">
//                     <div className="flex justify-between items-center ">
//                         <h1 className="text-2xl text-white font-bold">Improve Communication _____</h1>
//                         <Link to="/">
//                             <span className="text-purple-400 text-2xl cursor-pointer">X</span>
//                         </Link>
//                     </div>

//                     <div className="mt-4 text-center">
//                         <h2 className="text-lg font-medium">Your Topic:</h2>
//                         <p className="text-purple-200 bg-purple-700 p-2 rounded">{currentTopic}</p>
//                         <button 
//                             className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
//                             onClick={generateRandomTopic}
//                         >
//                             Get New Topic
//                         </button>
//                     </div>

//                     <div className="mt-6">
//                         <h2 className="text-lg font-medium">Transcript:</h2>
//                         <div 
//                             className="p-4 mt-2 bg-purple-900 rounded text-purple-200 cursor-pointer" 
//                         >
//                             {transcript || (transcriptStarted ? "Listening..." : "Click 'Start' to begin speaking")}
//                         </div>
//                     </div>

//                     <div className="mt-6 flex space-x-3 justify-center">
//                         <button 
//                             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" 
//                             onClick={startListening}
//                         >
//                             Start
//                         </button>
//                         <button 
//                             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500" 
//                             onClick={SpeechRecognition.stopListening}
//                         >
//                             Stop
//                         </button>
//                         <button 
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" 
//                             onClick={handleSubmit}
//                         >
//                             Submit
//                         </button>
//                     </div>

//                     {feedback && (
//                         <div className="mt-4 p-3 bg-purple-700 rounded text-center text-white">
//                             <p>{feedback}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Improve;


import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const topics = [
    "Technology and Innovation",
    "The Importance of Education",
    "Environmental Issues",
    "Artificial Intelligence",
    "Future of Work",
    "Space Exploration",
    "Mental Health Awareness",
    "Social Media Impact",
    "Personal Growth",
    "Health and Wellness"
];

const Improve = () => {
    const [currentTopic, setCurrentTopic] = useState("");
    const [feedback, setFeedback] = useState("");
    const [transcriptStarted, setTranscriptStarted] = useState(false);
    const [generatingFeedback, setGeneratingFeedback] = useState(false);
    const [error, setError] = useState(null);

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // Function to start listening
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        setTranscriptStarted(true);
    };

    // Generate a random topic
    const generateRandomTopic = () => {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        setCurrentTopic(randomTopic);
    };

    // Function to send transcript to Gemini API for feedback
    const generateFeedback = async () => {
        if (!transcript || transcript.trim().length === 0) {
            setFeedback("Please start speaking to get feedback.");
            return;
        }

        setGeneratingFeedback(true); // Indicate the API call is in progress
        setFeedback("Analyzing your speech...");

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD0o5aN82ZmXlyoR1wn9NQ2S49bh0vfWYc`,
                method: "post",
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Here is the transcribed text from a user: "${transcript}". Based on this, please provide three lines of feedback to help improve their communication skills.`
                                }
                            ]
                        }
                    ]
                }
            });

            const apiFeedback = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Feedback not available.";
            setFeedback(apiFeedback);
        } catch (err) {
            console.error("Error fetching feedback from Gemini API:", err);
            setError("An error occurred while generating feedback. Please try again later.");
        } finally {
            setGeneratingFeedback(false); // End API call state
        }
    };

    // Generate a random topic on component mount
    useEffect(() => {
        generateRandomTopic();
    }, []);

    // Stop listening when component unmounts
    useEffect(() => {
        return () => SpeechRecognition.stopListening();
    }, []);

    if (!browserSupportsSpeechRecognition) {
        return <p className="text-center text-red-500">Browser does not support speech recognition.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-6 bg-gradient-to-b from-black via-purple-900 to-black min-h-screen mt-[70px]">
                <div className="md:w-[830px] w-[400px] bg-purple-800 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl text-white font-bold">Improve Communication</h1>
                        <Link to="/">
                            <span className="text-purple-400 text-2xl cursor-pointer">X</span>
                        </Link>
                    </div>

                    <div className="mt-4 text-center">
                        <h2 className="text-lg font-medium">Your Topic:</h2>
                        <p className="text-purple-200 bg-purple-700 p-2 rounded">{currentTopic}</p>
                        <button 
                            className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
                            onClick={generateRandomTopic}
                        >
                            Get New Topic
                        </button>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-medium">Transcript:</h2>
                        <div 
                            className="p-4 mt-2 bg-purple-900 rounded text-purple-200" 
                        >
                            {transcript || (transcriptStarted ? "Listening..." : "Click 'Start' to begin speaking")}
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-3 justify-center">
                        <button 
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" 
                            onClick={startListening}
                        >
                            Start
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500" 
                            onClick={SpeechRecognition.stopListening}
                        >
                            Stop
                        </button>
                        <button 
                            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 ${
                                generatingFeedback ? "opacity-50 cursor-not-allowed" : ""
                            }`} 
                            onClick={generateFeedback}
                            disabled={generatingFeedback}
                        >
                            Submit
                        </button>
                    </div>

                    {feedback && (
                        <div className="mt-4 p-3 bg-purple-700 rounded text-center text-white">
                            <p>{feedback}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-700 rounded text-center text-white">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Improve;

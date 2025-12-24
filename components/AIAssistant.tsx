
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

// Audio Utils
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '¡Bienvenido al núcleo de MitZay Agency! Mi cerebro ahora está conectado a nuestra base de datos central vía n8n. ¿En qué puedo ayudarte hoy?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isVisionEnabled, setIsVisionEnabled] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const stopAllAudio = useCallback(() => {
    audioSourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const startLiveMode = async () => {
    try {
      const constraints = { 
        audio: true, 
        video: isVisionEnabled ? { width: 640, height: 480 } : false 
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (isVisionEnabled && videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'Eres el asistente de voz de MitZay. Estás conectado a una base de datos dinámica. Responde en español, sé directo y amable.',
        },
        callbacks: {
          onopen: () => {
            setIsMicActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmData = new Uint8Array(int16.buffer);
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: { data: encodeBase64(pcmData), mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            
            source.connect(processor);
            processor.connect(inputCtx.destination);

            if (isVisionEnabled && canvasRef.current && videoRef.current) {
              const canvas = canvasRef.current;
              const video = videoRef.current;
              const ctx = canvas.getContext('2d');
              
              frameIntervalRef.current = window.setInterval(() => {
                if (video.videoWidth > 0 && ctx) {
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  
                  canvas.toBlob((blob) => {
                    if (blob) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64Data = (reader.result as string).split(',')[1];
                        sessionPromise.then(session => {
                          session.sendRealtimeInput({
                            media: { data: base64Data, mimeType: 'image/jpeg' }
                          });
                        });
                      };
                      reader.readAsDataURL(blob);
                    }
                  }, 'image/jpeg', 0.6);
                }
              }, 1000);
            }
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              const buffer = await decodeAudioData(decodeBase64(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              audioSourcesRef.current.add(source);
              source.onended = () => audioSourcesRef.current.delete(source);
            }
            if (msg.serverContent?.interrupted) {
              stopAllAudio();
            }
          },
          onclose: () => setIsLiveMode(false),
          onerror: (e) => console.error("Live API Error:", e),
        }
      });

      liveSessionRef.current = await sessionPromise;
      setIsLiveMode(true);
    } catch (err) {
      console.error("Failed to start live mode:", err);
      alert("Error de acceso a periféricos.");
    }
  };

  const stopLiveMode = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.close();
      liveSessionRef.current = null;
    }
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    stopAllAudio();
    setIsLiveMode(false);
    setIsMicActive(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const aiResponseContent = await getGeminiResponse(userMessage.content, history);

    const aiMessage: ChatMessage = {
      role: 'assistant',
      content: aiResponseContent,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full sm:max-w-md h-full glass border-l border-white/10 shadow-3xl flex flex-col animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-surface z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-black font-bold transition-all duration-500 ${isLiveMode ? 'bg-primary scale-105 shadow-[0_0_20px_#00DC01]' : 'bg-primary'}`}>
              {isLiveMode ? (
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-black rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              ) : 'DB'}
            </div>
            <div>
              <h3 className="font-poppins font-bold text-base md:text-lg">Smart Assistant</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isMicActive ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-primary shadow-[0_0_8px_#00DC01]'}`}></span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Conectado a n8n Cloud
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 relative no-scrollbar">
          {isLiveMode && isVisionEnabled && (
            <div className="absolute inset-0 bg-black z-0">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover opacity-50" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {!isLiveMode ? (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-primary text-black font-semibold rounded-tr-none shadow-lg' 
                  : 'bg-white/5 border border-white/10 text-gray-100 rounded-tl-none backdrop-blur-md'
                }`}>
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-[9px] opacity-40 mt-2 block">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-pulse relative z-10 px-4">
              {!isVisionEnabled && (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              )}
              <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                <h4 className="text-lg md:text-xl font-poppins font-bold text-white">
                  {isVisionEnabled ? 'Modo Visión Activo' : 'Voz Real-Time'}
                </h4>
                <p className="text-gray-300 text-xs md:text-sm mt-2">
                  La IA de MitZay te escucha...
                </p>
              </div>
            </div>
          )}
          
          {isTyping && !isLiveMode && (
            <div className="flex justify-start relative z-10">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-white/10 bg-surface z-10">
          {!isLiveMode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsVisionEnabled(!isVisionEnabled)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${isVisionEnabled ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10 text-gray-400'}`}
                  aria-label="Cámara"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button 
                  onClick={startLiveMode}
                  className="flex-1 h-12 bg-primary/20 border border-primary/40 text-primary rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/30 transition-all font-black text-xs uppercase tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Hablar
                </button>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe aquí (consultas a DB)..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-2 w-10 h-10 bg-primary text-black rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={stopLiveMode}
                className="w-full py-5 bg-red-600/20 border border-red-600/40 text-red-500 font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                TERMINAR SESIÓN
              </button>
              <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black">n8n Hybrid Intelligence</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIAssistant;

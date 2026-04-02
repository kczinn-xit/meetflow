'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { Video, Mic, ScreenShare, MessageSquare, Users, PhoneOff } from 'lucide-react';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Em produção, buscar token do backend
    const fetchToken = async () => {
      try {
        // Mock token - em produção: await fetch(`/api/rooms/${roomId}/token`)
        const mockToken = 'mock-token-for-demo';
        setToken(mockToken);
      } catch (error) {
        console.error('Erro ao buscar token:', error);
      }
    };

    if (roomId) {
      fetchToken();
    }
  }, [roomId]);

  const handleJoin = () => {
    if (!username.trim()) {
      alert('Por favor, digite seu nome');
      return;
    }
    setJoined(true);
  };

  if (!joined) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <Video className="w-16 h-16 text-violet-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Entrar na reunião</h1>
            <p className="text-gray-400 mb-6">Sala: {roomId}</p>

            <div className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />

              <button
                onClick={handleJoin}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]"
              >
                Entrar na sala
              </button>

              <a
                href="/dashboard"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Voltar ao dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880'}
        data-lk-theme="default"
        style={{ height: '100vh' }}
        onDisconnected={() => setJoined(false)}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Video className="w-6 h-6 text-violet-500" />
              <span className="font-semibold">MeetFlow - {roomId}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{username}</span>
              </div>
            </div>
          </header>

          {/* Main Video Grid */}
          <div className="flex-1 p-4">
            <MyVideoConference />
          </div>

          {/* Control Bar */}
          <div className="bg-slate-900/80 backdrop-blur-md border-t border-white/10 px-4 py-3">
            <ControlBar variation="minimal" />
          </div>

          <RoomAudioRenderer />
        </div>
      </LiveKitRoom>
    </div>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - 140px)' }}>
      <ParticipantTile />
    </GridLayout>
  );
}

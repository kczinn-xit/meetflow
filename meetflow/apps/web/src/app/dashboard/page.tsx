'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Video, Plus, Calendar, Copy, Clock, Users, Trash2 } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  scheduledAt?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Mock meetings - em produção, buscar do backend
    const mockMeetings: Meeting[] = [
      {
        id: 'abc123',
        title: 'Reunião de Equipe',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'def456',
        title: 'Demo com Cliente',
        scheduledAt: new Date(Date.now() + 172800000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
    setMeetings(mockMeetings);
    setLoading(false);
  }, [status, router]);

  const createMeeting = async () => {
    const newId = Math.random().toString(36).substring(2, 8);
    const newMeeting: Meeting = {
      id: newId,
      title: `Nova Reunião ${newId}`,
      createdAt: new Date().toISOString(),
    };
    setMeetings([newMeeting, ...meetings]);
    
    // Em produção, chamar API para criar sala no LiveKit
    router.push(`/room/${newId}`);
  };

  const copyLink = (roomId: string) => {
    const url = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado!');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Video className="w-8 h-8 text-violet-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                MeetFlow
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden sm:block">{session?.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Meeting Button */}
        <div className="mb-8">
          <button
            onClick={createMeeting}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Criar nova reunião</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Video, label: 'Total de reuniões', value: meetings.length.toString() },
            { icon: Calendar, label: 'Agendadas', value: meetings.filter(m => m.scheduledAt).length.toString() },
            { icon: Users, label: 'Participantes', value: '0' },
            { icon: Clock, label: 'Horas em reunião', value: '0h' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <stat.icon className="w-6 h-6 text-violet-400 mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Meetings List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Suas reuniões</h2>
          
          {meetings.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Nenhuma reunião criada ainda</p>
              <button
                onClick={createMeeting}
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                Criar sua primeira reunião →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{meeting.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                      {meeting.scheduledAt && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(meeting.scheduledAt).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(meeting.scheduledAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        ID: {meeting.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/room/${meeting.id}`}
                      className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Entrar
                    </Link>
                    <button
                      onClick={() => copyLink(meeting.id)}
                      className="border border-white/20 hover:border-white/40 text-white p-2 rounded-lg transition-colors"
                      title="Copiar link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="border border-red-500/20 hover:border-red-500/40 text-red-400 p-2 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

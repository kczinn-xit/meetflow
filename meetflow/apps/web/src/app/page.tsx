'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Video, Shield, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Video className="w-8 h-8 text-violet-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                MeetFlow
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Funcionalidades</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Como funciona</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Preços</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Videoconferência
              </span>
              <br />
              <span className="text-white">para o futuro</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Reuniões em HD com criptografia de ponta a ponta. Compartilhamento de tela, chat em tempo real e muito mais. Tudo em uma plataforma segura e escalável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-violet-500/25"
              >
                Começar grátis
              </Link>
              <Link 
                href="#demo" 
                className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/5"
              >
                Ver demonstração
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Funcionalidades poderosas
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Video, title: 'Vídeo HD', desc: 'Qualidade cristalina até 1080p' },
              { icon: Users, title: 'Chat em tempo real', desc: 'Mensagens instantâneas durante reuniões' },
              { icon: Zap, title: 'Compartilhar tela', desc: 'Apresente com qualidade máxima' },
              { icon: Shield, title: 'Seguro e criptografado', desc: 'Proteção de ponta a ponta' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <feature.icon className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Crie uma sala', desc: 'Gere um link único para sua reunião em segundos' },
              { step: '2', title: 'Compartilhe o link', desc: 'Envie para participantes por email ou mensagem' },
              { step: '3', title: 'Comece a reunião', desc: 'Conecte-se com vídeo, áudio e chat em tempo real' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">O que dizem nossos usuários</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Ana Silva', role: 'CEO @ TechStart', text: 'MeetFlow revolucionou nossas reuniões remotas. Simples e eficiente!' },
              { name: 'Carlos Mendes', role: 'Product Manager', text: 'A qualidade de vídeo é impressionante. Melhor que muitas soluções pagas.' },
              { name: 'Juliana Costa', role: 'Designer', text: 'Interface linda e intuitiva. Compartilhar tela nunca foi tão fácil.' },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Planos simples e transparentes</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Free',
                price: 'R$0',
                period: '/mês',
                features: ['Até 4 participantes', 'Reuniões de 30 min', 'Vídeo HD', 'Chat em tempo real'],
                cta: 'Começar grátis',
                popular: false,
              },
              {
                name: 'Pro',
                price: 'R$29',
                period: '/mês',
                features: ['Até 100 participantes', 'Reuniões ilimitadas', 'Vídeo 1080p', 'Gravação de reuniões', 'Suporte prioritário'],
                cta: 'Assinar Pro',
                popular: true,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 border ${plan.popular ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}
              >
                {plan.popular && (
                  <span className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Mais popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-300">
                      <Zap className="w-5 h-5 text-violet-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white' 
                    : 'border border-white/20 hover:border-white/40 text-white hover:bg-white/5'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Video className="w-6 h-6 text-violet-500" />
                <span className="text-lg font-bold">MeetFlow</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Videoconferência moderna para equipes que buscam excelência.
              </p>
            </div>
            {[
              { title: 'Produto', links: ['Funcionalidades', 'Preços', 'Segurança'] },
              { title: 'Empresa', links: ['Sobre', 'Blog', 'Carreiras'] },
              { title: 'Suporte', links: ['Central de ajuda', 'Contato', 'Status'] },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MeetFlow. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

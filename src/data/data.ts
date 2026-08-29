// data/data.ts - Versión completa con múltiples talentos

export interface Talent {
  id: string
  name: string
  role: string
  category: string
  location: string
  rating: number
  reviews: number
  photo: string
  available: boolean
  tags: string[]
  hourlyRate: number
  bio: string
  skills: string[]
  portfolio: { id: string; title: string; img: string }[]
  reviewsList: { author: string; rating: number; comment: string; date: string }[]
  saved?: boolean
  email: string
  phone?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface Project {
  id: string
  title: string
  category: string
  budget: number
  deadline: string
  proposals: number
  description: string
  clientName: string
  clientPhoto: string
  skills: string[]
  status: 'open' | 'in-progress' | 'completed'
  saved?: boolean
  clientId?: string
}

export interface Conversation {
  id: string
  participants: string[]
  talentId: string
  name: string
  photo: string
  lastMessage: string
  time: string
  unread: number
  role: string
}

export interface Message {
  id: string
  conversationId: string
  from: string
  to: string
  text: string
  time: string
  read: boolean
}

export interface Notification {
  id: string
  userId: string
  type: 'achievement' | 'project' | 'message' | 'review' | 'system'
  title: string
  body: string
  time: string
  read: boolean
}

export interface Transaction {
  id: string
  userId: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'talent' | 'client'
  photo: string
  type: 'talent' | 'client'
  talentId?: string
  coins: number
  bio?: string
  skills?: string[]
  location?: string
}

// USUARIOS DEL SISTEMA
export const users: User[] = [
  {
    id: 'user1',
    name: 'Carice B.',
    email: 'carice@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&auto=format',
    talentId: '1',
    coins: 150,
    bio: 'Diseñadora gráfica con 5 años de experiencia',
    skills: ['Figma', 'Illustrator', 'Photoshop'],
    location: 'Managua'
  },
  {
    id: 'user2',
    name: 'Maris G.',
    email: 'maris@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format',
    talentId: '2',
    coins: 80,
    bio: 'Community Manager especializada en crecimiento',
    skills: ['Instagram', 'Facebook Ads', 'TikTok'],
    location: 'León'
  },
  {
    id: 'user3',
    name: 'Jaled L.',
    email: 'jaled@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
    talentId: '3',
    coins: 200,
    bio: 'Editor de video cinematográfico',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci'],
    location: 'Managua'
  },
  {
    id: 'user4',
    name: 'Laura P.',
    email: 'laura@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1631377307692-36a9b6ae3ef6?w=300&h=300&fit=crop&auto=format',
    talentId: '4',
    coins: 120,
    bio: 'Fotógrafa profesional especializada en retratos',
    skills: ['Lightroom', 'Photoshop', 'Fotografía'],
    location: 'Managua'
  },
  {
    id: 'user5',
    name: 'Karah R.',
    email: 'karah@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1589729132389-8f0e0b55b91e?w=300&h=300&fit=crop&auto=format',
    talentId: '5',
    coins: 300,
    bio: 'Desarrolladora full stack con 4 años de experiencia',
    skills: ['React', 'TypeScript', 'Node.js'],
    location: 'Managua'
  },
  {
    id: 'user6',
    name: 'Valeria S.',
    email: 'valeria@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1609436132311-e4b0c9370469?w=300&h=300&fit=crop&auto=format',
    talentId: '6',
    coins: 100,
    bio: 'Diseñadora UX/UI centrada en experiencias digitales',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    location: 'Masaya'
  },
  {
    id: 'user7',
    name: 'Andrés T.',
    email: 'andres@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
    talentId: '7',
    coins: 60,
    bio: 'Especialista en marketing digital con enfoque en SEO',
    skills: ['SEO', 'Google Ads', 'Email Marketing'],
    location: 'Estelí'
  },
  {
    id: 'user8',
    name: 'Diego R.',
    email: 'diego@nictalent.com',
    role: 'talent',
    type: 'talent',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format',
    talentId: '8',
    coins: 40,
    bio: 'Redactor especializado en contenido web SEO',
    skills: ['SEO Writing', 'Copywriting', 'Blogging'],
    location: 'Chinandega'
  },
  {
    id: 'user9',
    name: 'Ana Herrera',
    email: 'ana@nictalent.com',
    role: 'client',
    type: 'client',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&auto=format',
    coins: 500,
    bio: 'Cliente frecuente en NICtalent',
    location: 'Managua'
  },
  {
    id: 'user10',
    name: 'TechNica SRL',
    email: 'technica@nictalent.com',
    role: 'client',
    type: 'client',
    photo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&auto=format',
    coins: 1000,
    bio: 'Empresa de tecnología',
    location: 'Managua'
  }
]

export const talents: Talent[] = [
  {
    id: '1',
    name: 'Carice B.',
    role: 'Diseñadora Gráfica',
    category: 'Diseño y Creatividad',
    location: 'Managua',
    rating: 4.8,
    reviews: 60,
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['Diseño Gráfico', 'Branding', 'UI/UX'],
    hourlyRate: 25,
    bio: 'Diseñadora gráfica con 5 años de experiencia creando identidades visuales memorables para empresas nicaragüenses y latinoamericanas. Especializada en branding, diseño editorial y UI/UX.',
    skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Canva Pro', 'Branding'],
    portfolio: [
      { id: 'p1', title: 'Identidad Banco Nacional', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'App Móvil PagoYa', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Campaña Nica Foods', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Juan M.', rating: 5, comment: 'Excelente trabajo, muy profesional y creativa.', date: 'Ago 2026' },
      { author: 'Sofía R.', rating: 5, comment: 'Entregó antes del plazo y superó mis expectativas.', date: 'Jul 2026' },
      { author: 'Carlos V.', rating: 4, comment: 'Muy buen trabajo, comunicación fluida.', date: 'Jun 2026' },
    ],
    saved: true,
    email: 'carice@nictalent.com'
  },
  {
    id: '2',
    name: 'Maris G.',
    role: 'Community Manager',
    category: 'Marketing Digital',
    location: 'León',
    rating: 4.9,
    reviews: 39,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['Redes Sociales', 'Contenido', 'Estrategia'],
    hourlyRate: 18,
    bio: 'Community Manager especializada en crecimiento orgánico de redes sociales para PYMES nicaragüenses. Creo contenido que conecta, inspira y convierte.',
    skills: ['Instagram', 'Facebook Ads', 'TikTok', 'Copywriting', 'Analytics', 'Canva'],
    portfolio: [
      { id: 'p1', title: 'Estrategia Café Nica', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'Campaña Navidad 2025', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Growth Tienda Online', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Ana L.', rating: 5, comment: 'Triplicamos seguidores en 3 meses. Increíble.', date: 'Ago 2026' },
      { author: 'Pedro N.', rating: 5, comment: 'Muy profesional y creativa en sus estrategias.', date: 'Jul 2026' },
    ],
    saved: true,
    email: 'maris@nictalent.com'
  },
  {
    id: '3',
    name: 'Jaled L.',
    role: 'Editor de Video',
    category: 'Fotografía y Video',
    location: 'Managua',
    rating: 4.7,
    reviews: 15,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
    available: false,
    tags: ['Edición Video', 'After Effects', 'YouTube'],
    hourlyRate: 22,
    bio: 'Editor de video cinematográfico con experiencia en contenido para YouTube, publicidad y eventos corporativos. Transformo ideas en historias visuales impactantes.',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Color Grading'],
    portfolio: [
      { id: 'p1', title: 'Spot TV Claro Nicaragua', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'Documental Lago Cocibolca', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Reels Virales 2025', img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Empresa XYZ', rating: 5, comment: 'Calidad cinematográfica excepcional.', date: 'Jul 2026' },
    ],
    email: 'jaled@nictalent.com'
  },
  {
    id: '4',
    name: 'Laura P.',
    role: 'Fotógrafa',
    category: 'Fotografía y Video',
    location: 'Managua',
    rating: 4.9,
    reviews: 41,
    photo: 'https://images.unsplash.com/photo-1631377307692-36a9b6ae3ef6?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['Fotografía', 'Retratos', 'Eventos'],
    hourlyRate: 30,
    bio: 'Fotógrafa profesional especializada en retratos, eventos corporativos y fotografía de producto. Capturo momentos únicos con una mirada artística y técnica depurada.',
    skills: ['Lightroom', 'Photoshop', 'Fotografía Comercial', 'Retratos', 'Producto'],
    portfolio: [
      { id: 'p1', title: 'Sesión Corporativa BANPRO', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'Boda en Granada', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Campaña Artesanías Nica', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Empresa Moda NI', rating: 5, comment: 'Las fotos quedaron espectaculares.', date: 'Ago 2026' },
      { author: 'Ricardo M.', rating: 5, comment: 'Muy puntual y profesional.', date: 'Jul 2026' },
    ],
    saved: true,
    email: 'laura@nictalent.com'
  },
  {
    id: '5',
    name: 'Karah R.',
    role: 'Desarrolladora Web',
    category: 'Programación y Tech',
    location: 'Managua',
    rating: 4.6,
    reviews: 20,
    photo: 'https://images.unsplash.com/photo-1589729132389-8f0e0b55b91e?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['React', 'Node.js', 'Full Stack'],
    hourlyRate: 35,
    bio: 'Desarrolladora full stack con 4 años de experiencia construyendo aplicaciones web modernas. Apasionada por el código limpio y la experiencia de usuario.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    portfolio: [
      { id: 'p1', title: 'E-commerce NicaShop', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'App Gestión RRHH', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Dashboard Analytics', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'StartupNIC', rating: 5, comment: 'Entregó el MVP en tiempo récord.', date: 'Ago 2026' },
      { author: 'Luis P.', rating: 4, comment: 'Excelente código y documentación.', date: 'Jun 2026' },
    ],
    email: 'karah@nictalent.com'
  },
  {
    id: '6',
    name: 'Valeria S.',
    role: 'Diseñadora UX/UI',
    category: 'Diseño y Creatividad',
    location: 'Masaya',
    rating: 4.8,
    reviews: 31,
    photo: 'https://images.unsplash.com/photo-1609436132311-e4b0c9370469?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['UX/UI', 'Figma', 'Prototipado'],
    hourlyRate: 28,
    bio: 'Diseñadora UX/UI centrada en crear experiencias digitales que realmente conectan con los usuarios. Especialista en investigación de usuarios y diseño de interfaces.',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototipado', 'Design Systems'],
    portfolio: [
      { id: 'p1', title: 'App Fintech Móvil', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'Rediseño Claro NI', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Sistema de Diseño INSS', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Fintech NI', rating: 5, comment: 'Proceso de diseño muy estructurado y resultados excelentes.', date: 'Ago 2026' },
    ],
    email: 'valeria@nictalent.com'
  },
  {
    id: '7',
    name: 'Andrés T.',
    role: 'Community Manager',
    category: 'Marketing Digital',
    location: 'Estelí',
    rating: 4.7,
    reviews: 18,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['Marketing', 'SEO', 'Contenido'],
    hourlyRate: 20,
    bio: 'Especialista en marketing digital con enfoque en SEO, gestión de comunidades y creación de contenido estratégico para marcas locales.',
    skills: ['SEO', 'Google Ads', 'Email Marketing', 'WordPress', 'Analytics', 'Content Strategy'],
    portfolio: [
      { id: 'p1', title: 'SEO Clínica Norte', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'Campaña Hotel El Sesteo', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop' },
      { id: 'p3', title: 'Posicionamiento Google #1', img: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Clínica Norte', rating: 5, comment: 'Aumentó nuestro tráfico web en 300%.', date: 'Jul 2026' },
      { author: 'Hotel Sesteo', rating: 4, comment: 'Estrategia muy bien implementada.', date: 'May 2026' },
    ],
    email: 'andres@nictalent.com'
  },
  {
    id: '8',
    name: 'Diego R.',
    role: 'Redactor Web',
    category: 'Redacción y Traducción',
    location: 'Chinandega',
    rating: 4.5,
    reviews: 12,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format',
    available: true,
    tags: ['Copywriting', 'SEO Writing', 'Español'],
    hourlyRate: 15,
    bio: 'Redactor especializado en contenido web SEO, blogs corporativos y copywriting persuasivo. Transformo ideas complejas en textos claros y convincentes.',
    skills: ['SEO Writing', 'Copywriting', 'Blogging', 'Español nativo', 'Inglés B2', 'WordPress'],
    portfolio: [
      { id: 'p1', title: '100 artículos SEO Turismo', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop' },
      { id: 'p2', title: 'Estrategia de contenidos', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop' },
    ],
    reviewsList: [
      { author: 'Turismo NI', rating: 5, comment: 'Contenido excelente, muy buen posicionamiento.', date: 'Jun 2026' },
    ],
    email: 'diego@nictalent.com'
  },
]

// CONVERSACIONES CON MÚLTIPLES PARTICIPANTES
export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['user1', 'user9'],
    talentId: '1',
    name: 'Carice B.',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    lastMessage: 'Perfecto, te envío las propuestas mañana 🎨',
    time: '10:42',
    unread: 2,
    role: 'Diseñadora Gráfica',
  },
  {
    id: 'conv2',
    participants: ['user5', 'user9'],
    talentId: '5',
    name: 'Karah R.',
    photo: 'https://images.unsplash.com/photo-1589729132389-8f0e0b55b91e?w=100&h=100&fit=crop',
    lastMessage: 'El deploy está listo. Revisalo cuando puedas.',
    time: 'Ayer',
    unread: 0,
    role: 'Desarrolladora Web',
  },
  {
    id: 'conv3',
    participants: ['user2', 'user9'],
    talentId: '2',
    name: 'Maris G.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Claro, podemos empezar el lunes.',
    time: 'Lun',
    unread: 0,
    role: 'Community Manager',
  },
  {
    id: 'conv4',
    participants: ['user4', 'user9'],
    talentId: '4',
    name: 'Laura P.',
    photo: 'https://images.unsplash.com/photo-1631377307692-36a9b6ae3ef6?w=100&h=100&fit=crop',
    lastMessage: 'Aquí las fotos editadas del evento 📸',
    time: 'Dom',
    unread: 1,
    role: 'Fotógrafa',
  },
  {
    id: 'conv5',
    participants: ['user6', 'user9'],
    talentId: '6',
    name: 'Valeria S.',
    photo: 'https://images.unsplash.com/photo-1609436132311-e4b0c9370469?w=100&h=100&fit=crop',
    lastMessage: 'El prototipo está listo para revisión',
    time: 'Ayer',
    unread: 0,
    role: 'Diseñadora UX/UI',
  },
  {
    id: 'conv6',
    participants: ['user7', 'user9'],
    talentId: '7',
    name: 'Andrés T.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lastMessage: 'La estrategia SEO está en marcha',
    time: 'Mar',
    unread: 0,
    role: 'Community Manager',
  },
]

// MENSAJES POR CONVERSACIÓN
export const chatMessages: Record<string, Message[]> = {
  conv1: [
    { id: 'm1', conversationId: 'conv1', from: 'user9', to: 'user1', text: 'Hola Carice, me interesa tu trabajo de diseño de identidad visual.', time: '10:30', read: true },
    { id: 'm2', conversationId: 'conv1', from: 'user1', to: 'user9', text: '¡Hola! Con mucho gusto. ¿Me puedes contar más sobre tu empresa?', time: '10:32', read: true },
    { id: 'm3', conversationId: 'conv1', from: 'user9', to: 'user1', text: 'Somos una startup de tecnología financiera en Managua. Necesitamos logo y guía de marca completa.', time: '10:35', read: true },
    { id: 'm4', conversationId: 'conv1', from: 'user1', to: 'user9', text: '¡Perfecto! Eso es exactamente mi especialidad. ¿Cuál es el presupuesto aproximado?', time: '10:38', read: true },
    { id: 'm5', conversationId: 'conv1', from: 'user9', to: 'user1', text: 'Tenemos alrededor de $500 para el proyecto.', time: '10:40', read: true },
    { id: 'm6', conversationId: 'conv1', from: 'user1', to: 'user9', text: 'Perfecto, te envío las propuestas mañana 🎨', time: '10:42', read: false },
  ],
  conv2: [
    { id: 'm1', conversationId: 'conv2', from: 'user5', to: 'user9', text: 'Buenos días, acabo de terminar las funcionalidades del carrito de compras.', time: 'Ayer 14:00', read: true },
    { id: 'm2', conversationId: 'conv2', from: 'user9', to: 'user5', text: '¡Qué buena noticia! ¿Todo funcionando bien?', time: 'Ayer 14:05', read: true },
    { id: 'm3', conversationId: 'conv2', from: 'user5', to: 'user9', text: 'Sí, pasé todas las pruebas. El deploy está listo. Revisalo cuando puedas.', time: 'Ayer 14:10', read: true },
  ],
  conv3: [
    { id: 'm1', conversationId: 'conv3', from: 'user9', to: 'user2', text: 'Hola Maris, ¿qué tal?', time: 'Lun 09:00', read: true },
    { id: 'm2', conversationId: 'conv3', from: 'user2', to: 'user9', text: 'Hola! Todo bien, ¿en qué puedo ayudarte?', time: 'Lun 09:05', read: true },
    { id: 'm3', conversationId: 'conv3', from: 'user9', to: 'user2', text: 'Necesito ayuda con las redes sociales de mi nuevo emprendimiento.', time: 'Lun 09:10', read: true },
    { id: 'm4', conversationId: 'conv3', from: 'user2', to: 'user9', text: 'Claro, podemos empezar el lunes.', time: 'Lun 09:15', read: true },
  ],
  conv4: [
    { id: 'm1', conversationId: 'conv4', from: 'user4', to: 'user9', text: 'Hola, te envío las fotos de la sesión de producto.', time: 'Dom 15:00', read: true },
    { id: 'm2', conversationId: 'conv4', from: 'user9', to: 'user4', text: '¡Perfecto! Las espero.', time: 'Dom 15:05', read: true },
    { id: 'm3', conversationId: 'conv4', from: 'user4', to: 'user9', text: 'Aquí las fotos editadas del evento 📸', time: 'Dom 15:10', read: false },
  ],
  conv5: [
    { id: 'm1', conversationId: 'conv5', from: 'user6', to: 'user9', text: 'Hola, te comparto el prototipo de la app.', time: 'Ayer 11:00', read: true },
    { id: 'm2', conversationId: 'conv5', from: 'user9', to: 'user6', text: 'Excelente, lo reviso y te doy feedback.', time: 'Ayer 11:05', read: true },
    { id: 'm3', conversationId: 'conv5', from: 'user6', to: 'user9', text: 'El prototipo está listo para revisión', time: 'Ayer 11:10', read: true },
  ],
  conv6: [
    { id: 'm1', conversationId: 'conv6', from: 'user7', to: 'user9', text: 'Hola, te cuento que ya inicié con la estrategia SEO.', time: 'Mar 08:00', read: true },
    { id: 'm2', conversationId: 'conv6', from: 'user9', to: 'user7', text: 'Genial, mantenme al tanto del progreso.', time: 'Mar 08:05', read: true },
    { id: 'm3', conversationId: 'conv6', from: 'user7', to: 'user9', text: 'La estrategia SEO está en marcha', time: 'Mar 08:10', read: true },
  ],
}

// NOTIFICACIONES POR USUARIO
export const notifications: Notification[] = [
  // Notificaciones para Ana (cliente - user9)
  {
    id: 'n1',
    userId: 'user9',
    type: 'achievement',
    title: '¡Sigue así!',
    body: 'Cada actualización de tu perfil te acerca a nuevas oportunidades.',
    time: 'Hace 5 min',
    read: false,
  },
  {
    id: 'n2',
    userId: 'user9',
    type: 'review',
    title: 'Tu talento inspira',
    body: 'Alguien guardó tu perfil en sus favoritos.',
    time: 'Hace 1 hora',
    read: false,
  },
  {
    id: 'n3',
    userId: 'user9',
    type: 'project',
    title: 'Nuevo proyecto para ti',
    body: 'TechNica SRL publicó un proyecto que coincide con tus habilidades.',
    time: 'Hace 3 horas',
    read: false,
  },
  {
    id: 'n4',
    userId: 'user9',
    type: 'achievement',
    title: 'Primer paso completado',
    body: '¡Genial! Completaste tu portafolio y destacas aún más.',
    time: 'Ayer',
    read: true,
  },
  {
    id: 'n5',
    userId: 'user9',
    type: 'message',
    title: 'Nuevo mensaje',
    body: 'Carice B. te envió un mensaje sobre el proyecto de diseño.',
    time: 'Ayer',
    read: true,
  },
  {
    id: 'n6',
    userId: 'user9',
    type: 'review',
    title: 'Nueva reseña recibida',
    body: 'Juan M. te dejó una reseña de 5 estrellas. ¡Sigue así!',
    time: 'Hace 2 días',
    read: true,
  },
  {
    id: 'n7',
    userId: 'user9',
    type: 'system',
    title: 'Bienvenida a NICtalent',
    body: 'Tu cuenta está verificada. Ya puedes comenzar a conectar con talentos y proyectos.',
    time: 'Hace 7 días',
    read: true,
  },
  // Notificaciones para Carice (user1)
  {
    id: 'n8',
    userId: 'user1',
    type: 'message',
    title: 'Nuevo mensaje',
    body: 'Ana Herrera te envió un mensaje sobre el proyecto de diseño.',
    time: 'Hace 10 min',
    read: false,
  },
  {
    id: 'n9',
    userId: 'user1',
    type: 'project',
    title: 'Proyecto de diseño',
    body: 'TechNica SRL necesita un diseñador para su identidad visual.',
    time: 'Hace 2 horas',
    read: false,
  },
  {
    id: 'n10',
    userId: 'user1',
    type: 'achievement',
    title: '¡Perfil destacado!',
    body: 'Tu perfil ha sido visto por más de 50 personas esta semana.',
    time: 'Hace 1 día',
    read: true,
  },
  // Notificaciones para Karah (user5)
  {
    id: 'n11',
    userId: 'user5',
    type: 'project',
    title: 'Nueva oportunidad',
    body: 'TechNica SRL publicó un proyecto de desarrollo web.',
    time: 'Hace 2 horas',
    read: false,
  },
  {
    id: 'n12',
    userId: 'user5',
    type: 'message',
    title: 'Mensaje de cliente',
    body: 'Ana Herrera te contactó para el proyecto de e-commerce.',
    time: 'Hace 1 día',
    read: true,
  },
  {
    id: 'n13',
    userId: 'user5',
    type: 'achievement',
    title: '¡Proyecto completado!',
    body: 'Has completado exitosamente el proyecto de NicaShop.',
    time: 'Hace 3 días',
    read: true,
  },
  // Notificaciones para Maris (user2)
  {
    id: 'n14',
    userId: 'user2',
    type: 'review',
    title: 'Nueva reseña',
    body: 'Ana L. te dejó una reseña de 5 estrellas. ¡Sigue así!',
    time: 'Hace 3 días',
    read: true,
  },
  {
    id: 'n15',
    userId: 'user2',
    type: 'message',
    title: 'Nuevo mensaje',
    body: 'Café Nica Premium te contactó para gestionar sus redes sociales.',
    time: 'Hace 4 días',
    read: true,
  },
  // Notificaciones para Laura (user4)
  {
    id: 'n16',
    userId: 'user4',
    type: 'project',
    title: 'Proyecto de fotografía',
    body: 'Artesanías del Pacífico necesita un fotógrafo para su catálogo.',
    time: 'Hace 5 horas',
    read: false,
  },
  {
    id: 'n17',
    userId: 'user4',
    type: 'review',
    title: 'Nueva reseña',
    body: 'Empresa Moda NI te dejó una reseña de 5 estrellas.',
    time: 'Hace 2 días',
    read: true,
  },
  // Notificaciones para Valeria (user6)
  {
    id: 'n18',
    userId: 'user6',
    type: 'message',
    title: 'Nuevo mensaje',
    body: 'Fintech NI te contactó para un proyecto de UX/UI.',
    time: 'Hace 1 día',
    read: true,
  },
  // Notificaciones para Andrés (user7)
  {
    id: 'n19',
    userId: 'user7',
    type: 'project',
    title: 'Proyecto de SEO',
    body: 'Clínica Norte necesita un especialista en SEO.',
    time: 'Hace 3 días',
    read: true,
  },
  // Notificaciones para Diego (user8)
  {
    id: 'n20',
    userId: 'user8',
    type: 'message',
    title: 'Nuevo mensaje',
    body: 'Turismo Nicaragua te contactó para redacción de artículos.',
    time: 'Hace 5 días',
    read: true,
  },
]

// TRANSACCIONES POR USUARIO
export const transactions: Transaction[] = [
  // Transacciones de Ana (user9)
  { id: 't1', userId: 'user9', type: 'credit', amount: 50, description: 'Recarga de monedas', date: '28 Ago 2026' },
  { id: 't2', userId: 'user9', type: 'debit', amount: 10, description: 'Contacto con Carice B.', date: '27 Ago 2026' },
  { id: 't3', userId: 'user9', type: 'debit', amount: 5, description: 'Destacar perfil (7 días)', date: '25 Ago 2026' },
  { id: 't4', userId: 'user9', type: 'credit', amount: 100, description: 'Recarga de monedas', date: '20 Ago 2026' },
  { id: 't5', userId: 'user9', type: 'debit', amount: 15, description: 'Publicar proyecto premium', date: '18 Ago 2026' },
  { id: 't6', userId: 'user9', type: 'debit', amount: 10, description: 'Contacto con Karah R.', date: '15 Ago 2026' },
  // Transacciones de Carice (user1)
  { id: 't7', userId: 'user1', type: 'credit', amount: 50, description: 'Pago por proyecto', date: '28 Ago 2026' },
  { id: 't8', userId: 'user1', type: 'debit', amount: 5, description: 'Destacar perfil', date: '25 Ago 2026' },
  { id: 't9', userId: 'user1', type: 'credit', amount: 30, description: 'Pago por diseño', date: '20 Ago 2026' },
  // Transacciones de Karah (user5)
  { id: 't10', userId: 'user5', type: 'credit', amount: 120, description: 'Pago por proyecto', date: '20 Ago 2026' },
  { id: 't11', userId: 'user5', type: 'debit', amount: 10, description: 'Publicar proyecto', date: '18 Ago 2026' },
  { id: 't12', userId: 'user5', type: 'credit', amount: 200, description: 'Pago por e-commerce', date: '15 Ago 2026' },
  // Transacciones de Maris (user2)
  { id: 't13', userId: 'user2', type: 'credit', amount: 45, description: 'Pago por gestión de redes', date: '22 Ago 2026' },
  { id: 't14', userId: 'user2', type: 'credit', amount: 30, description: 'Pago por estrategia', date: '10 Ago 2026' },
  // Transacciones de Laura (user4)
  { id: 't15', userId: 'user4', type: 'credit', amount: 80, description: 'Pago por sesión fotográfica', date: '25 Ago 2026' },
  { id: 't16', userId: 'user4', type: 'credit', amount: 50, description: 'Pago por evento', date: '12 Ago 2026' },
  // Transacciones de Valeria (user6)
  { id: 't17', userId: 'user6', type: 'credit', amount: 70, description: 'Pago por diseño UX/UI', date: '24 Ago 2026' },
  // Transacciones de Andrés (user7)
  { id: 't18', userId: 'user7', type: 'credit', amount: 40, description: 'Pago por estrategia SEO', date: '20 Ago 2026' },
  // Transacciones de Diego (user8)
  { id: 't19', userId: 'user8', type: 'credit', amount: 25, description: 'Pago por artículos', date: '18 Ago 2026' },
]

export const categories = [
  { id: 'design', label: 'Diseño', icon: '🎨', count: 142 },
  { id: 'marketing', label: 'Marketing', icon: '📣', count: 98 },
  { id: 'photo', label: 'Fotografía', icon: '📷', count: 76 },
  { id: 'dev', label: 'Programación', icon: '💻', count: 185 },
  { id: 'finance', label: 'Finanzas', icon: '💰', count: 54 },
  { id: 'writing', label: 'Redacción', icon: '✍️', count: 63 },
  { id: 'video', label: 'Video', icon: '🎬', count: 48 },
  { id: 'music', label: 'Música', icon: '🎵', count: 29 },
]

export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Diseño de identidad visual para startup tech',
    category: 'Diseño y Creatividad',
    budget: 500,
    deadline: '15 Sep 2026',
    proposals: 8,
    description: 'Necesitamos un diseñador gráfico para crear nuestra identidad visual completa: logo, paleta de colores, tipografía y guía de marca. El proyecto incluye versiones para digital e impreso.',
    clientName: 'TechNica SRL',
    clientPhoto: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    skills: ['Illustrator', 'Branding', 'Logo Design'],
    status: 'open',
    clientId: 'user10'
  },
  {
    id: 'proj2',
    title: 'Desarrollo de e-commerce en React',
    category: 'Programación y Tech',
    budget: 1200,
    deadline: '30 Sep 2026',
    proposals: 5,
    description: 'Buscamos un desarrollador React para construir una tienda online completa con carrito de compras, pasarela de pagos y panel de administración.',
    clientName: 'NicaShop',
    clientPhoto: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    status: 'open',
    clientId: 'user10'
  },
  {
    id: 'proj3',
    title: 'Gestión de redes sociales (3 meses)',
    category: 'Marketing Digital',
    budget: 300,
    deadline: '1 Dec 2026',
    proposals: 12,
    description: 'Necesitamos un community manager para gestionar nuestras cuentas de Instagram, Facebook y TikTok. Creación de contenido diario y estrategia de crecimiento.',
    clientName: 'Café Nica Premium',
    clientPhoto: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop',
    skills: ['Community Management', 'Canva', 'Reels'],
    status: 'open',
    saved: true,
    clientId: 'user10'
  },
  {
    id: 'proj4',
    title: 'Fotografía de producto para catálogo',
    category: 'Fotografía y Video',
    budget: 400,
    deadline: '20 Sep 2026',
    proposals: 6,
    description: 'Sesión de fotografía de 50 productos artesanales para catálogo digital y físico. Se requiere estudio o locación en Managua.',
    clientName: 'Artesanías del Pacífico',
    clientPhoto: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&h=100&fit=crop',
    skills: ['Fotografía de Producto', 'Lightroom', 'Edición'],
    status: 'open',
    clientId: 'user10'
  },
  {
    id: 'proj5',
    title: 'App móvil de delivery (Flutter)',
    category: 'Programación y Tech',
    budget: 2000,
    deadline: '15 Nov 2026',
    proposals: 3,
    description: 'Desarrollo de app de delivery para restaurantes locales. Incluye app de cliente, app de repartidor y panel web de administración.',
    clientName: 'DeliverNic',
    clientPhoto: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop',
    skills: ['Flutter', 'Firebase', 'Google Maps API'],
    status: 'in-progress',
    clientId: 'user10'
  },
  {
    id: 'proj6',
    title: 'Redacción de 20 artículos de blog SEO',
    category: 'Redacción y Traducción',
    budget: 200,
    deadline: '10 Sep 2026',
    proposals: 15,
    description: 'Necesitamos 20 artículos de blog sobre turismo en Nicaragua, optimizados para SEO. Mínimo 1000 palabras por artículo.',
    clientName: 'Turismo Nicaragua',
    clientPhoto: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop',
    skills: ['SEO Writing', 'Turismo', 'Español'],
    status: 'open',
    saved: true,
    clientId: 'user10'
  },
]
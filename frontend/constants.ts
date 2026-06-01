import { NavItem, Testimonial, Plan } from "./types";

export const APP_NAME = "Hélia";
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const NAV_ITEMS = [
  { label: 'Accueil', path: '/' },
  { label: 'Mes Offres', path: '/offres' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
  { label: 'Connexion', path: '/login' }, // <-- La nouvelle ligne ici
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Marie-Thérèse, 78 ans",
    role: "Utilisatrice Senior",
    content:
      "Grâce à Hélia, je reçois des nouvelles de mes petits-enfants chaque jour sur ma tablette simplifiée. C'est un rayon de soleil.",
    avatar: "https://picsum.photos/id/338/150/150",
  },
  {
    id: 2,
    name: "Famille Dubois",
    role: "Abonnés depuis 2 ans",
    content:
      "L'interface est si intuitive que même mon père, réticent à la technologie, l'a adoptée en une semaine. Le lien n'a jamais été aussi fort.",
    avatar: "https://picsum.photos/id/1011/150/150",
  },
  {
    id: 3,
    name: "EHPAD Les Tilleuls",
    role: "Partenaire Institutionnel",
    content:
      "Une solution clé en main pour nos résidents. La gestion administrative automatisée nous fait gagner un temps précieux.",
    avatar: "https://picsum.photos/id/1059/150/150",
  },
];

export const MOCK_PLANS: Plan[] = [
  {
    id: 1,
    name: 'Gratuit',
    priceCents: 0,
    interval: 'month',
    features: [
      'Accès aux fonctionnalités essentielles d’Hélia',
      'Découverte de l’assistant conversationnel',
      'Sans engagement'
    ]
  },
  {
    id: 2,
    name: 'Offre Familiale',
    priceCents: 899, // 8,99 € / mois
    interval: 'month',
    features: [
      'Assistant intelligent Hélia en accès complet',
      'Aide contextuelle et guidage pas à pas',
      'Personnalisation selon les besoins de l’utilisateur',
      'Fonctionnement partiel hors connexion',
      'Support standard inclus'
    ]
  },
  {
    id: 3,
    name: 'Offre Professionnelle',
    priceCents: 449, // 4,49 € / résident / mois
    interval: 'month',
    features: [
      'Tarification par résident (dégressive selon volume)',
      'Tableau de bord de gestion centralisé',
      'Gestion multi-comptes (résidents / personnel)',
      'Accompagnement à la prise en main',
      'Support prioritaire'
    ]
  },
  {
    id: 4,
    name: 'Offre Institutionnelle',
    priceCents: 200000, // à partir de 2 000 € / an
    interval: 'year',
    features: [
      'Licence annuelle pour collectivités',
      'Intégration sur sites et services publics',
      'Widgets personnalisables',
      'Accès API dédié',
      'Accompagnement et paramétrage sur mesure'
    ]
  }
];

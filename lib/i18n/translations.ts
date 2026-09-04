export type Locale = 'en' | 'fr' | 'ar';

export interface Translation {
  // App
  appName: string;
  appTagline: string;
  loadingDashboard: string;

  // Auth / Login
  welcomeBack: string;
  createAccount: string;
  signInToAccess: string;
  signUpToStart: string;
  email: string;
  password: string;
  signIn: string;
  signUp: string;
  signOut: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  orExploreDemo: string;
  loginHeroTitle: string;
  loginHeroDesc: string;
  managedMonthly: string;
  recyclingRate: string;
  allRightsReserved: string;

  // TopBar
  searchPlaceholder: string;
  platformAdmin: string;

  // Sidebar sections
  navMain: string;
  navOperations: string;
  navWasteFlow: string;
  navRecycling: string;
  navFleet: string;
  navB2B: string;
  navCitizen: string;
  navInsights: string;
  navAdministration: string;

  // Sidebar items
  dashboard: string;
  liveMap: string;
  citizenReports: string;
  workOrders: string;
  routes: string;
  containers: string;
  collections: string;
  weighbridge: string;
  transferStations: string;
  recyclingCenters: string;
  materialsInventory: string;
  marketplace: string;
  vehicles: string;
  drivers: string;
  maintenance: string;
  businesses: string;
  contracts: string;
  collectionRequests: string;
  invoices: string;
  payments: string;
  ecoPoints: string;
  analytics: string;
  aiCopilot: string;
  usersRoles: string;
  auditLogs: string;
  settings: string;

  // Sidebar footer
  algerCentre: string;
  wilayaZone: string;

  // Dashboard page
  commandCenter: string;
  commandCenterDesc: string;
  live: string;
  criticalReports: string;
  activeWorkOrders: string;
  trucksOnRoute: string;
  slaBreaches: string;
  collectionTrends: string;
  collectionTrendsDesc: string;
  collected: string;
  recycled: string;
  landfilled: string;
  wasteComposition: string;
  wasteCompositionDesc: string;
  zonePerformance: string;
  zonePerformanceDesc: string;
  reports: string;
  liveActivity: string;
  recentCitizenReports: string;
  recentCitizenReportsDesc: string;
  viewAll: string;
  reportId: string;
  type: string;
  location: string;
  priority: string;
  status: string;
  time: string;

  // KPI labels
  kpiWasteCollected: string;
  kpiRecyclingRate: string;
  kpiActiveReports: string;
  kpiSlaCompliance: string;
  kpiFleetActive: string;
  kpiAvgResponse: string;

  // Activity feed messages
  activityReport: string;
  activityWorkOrder: string;
  activityCollection: string;
  activityAlert: string;
  activityVehicle: string;
  activityInvoice: string;

  // Common
  save: string;
  saveChanges: string;
  cancel: string;
  edit: string;
  delete: string;
  export: string;
  exportCsv: string;
  pdfReport: string;
  add: string;
  search: string;
  filter: string;
  actions: string;
  loading: string;
  noData: string;
  confirmed: string;
  settingsSaved: string;

  // Report types
  rtOverflowingContainer: string;
  rtIllegalDumping: string;
  rtMissedCollection: string;
  rtDamagedContainer: string;
  rtWasteScattered: string;
  rtLargeWaste: string;
  rtHazardousWaste: string;
  rtBadSmell: string;
  rtOther: string;

  // Report statuses
  rsSubmitted: string;
  rsReceived: string;
  rsAiReview: string;
  rsVerified: string;
  rsAssigned: string;
  rsEnRoute: string;
  rsInProgress: string;
  rsResolved: string;
  rsRejected: string;
  rsDuplicate: string;
  rsClosed: string;

  // Priorities
  prCritical: string;
  prHigh: string;
  prNormal: string;
  prLow: string;

  // Waste types
  wtGeneral: string;
  wtOrganic: string;
  wtPlastic: string;
  wtPaper: string;
  wtCardboard: string;
  wtGlass: string;
  wtMetal: string;
  wtElectronic: string;
  wtConstruction: string;
  wtMedical: string;
  wtHazardous: string;
  wtLargeWaste: string;
  wtUsedOil: string;
  wtOther: string;

  // Vehicle statuses
  vsAvailable: string;
  vsOnRoute: string;
  vsLoading: string;
  vsMaintenance: string;
  vsOffline: string;

  // Container statuses
  csActive: string;
  csFull: string;
  csDamaged: string;
  csMaintenance: string;
  csRemoved: string;

  // SLA statuses
  slaOnTrack: string;
  slaAtRisk: string;
  slaBreached: string;

  // Zones
  zoneCentre: string;
  zoneNord: string;
  zoneEst: string;
  zoneSud: string;
  zoneOuest: string;

  // Page titles/descriptions for all pages
  pageTitleDispatch: string;
  pageDescDispatch: string;
  pageTitleReports: string;
  pageDescReports: string;
  pageTitleWorkOrders: string;
  pageDescWorkOrders: string;
  pageTitleRoutes: string;
  pageDescRoutes: string;
  pageTitleContainers: string;
  pageDescContainers: string;
  pageTitleCollections: string;
  pageDescCollections: string;
  pageTitleWeighbridge: string;
  pageDescWeighbridge: string;
  pageTitleTransferStations: string;
  pageDescTransferStations: string;
  pageTitleRecycling: string;
  pageDescRecycling: string;
  pageTitleMaterials: string;
  pageDescMaterials: string;
  pageTitleMarketplace: string;
  pageDescMarketplace: string;
  pageTitleFleet: string;
  pageDescFleet: string;
  pageTitleDrivers: string;
  pageDescDrivers: string;
  pageTitleMaintenance: string;
  pageDescMaintenance: string;
  pageTitleBusinesses: string;
  pageDescBusinesses: string;
  pageTitleContracts: string;
  pageDescContracts: string;
  pageTitleRequests: string;
  pageDescRequests: string;
  pageTitleInvoices: string;
  pageDescInvoices: string;
  pageTitlePayments: string;
  pageDescPayments: string;
  pageTitleEcoPoints: string;
  pageDescEcoPoints: string;
  pageTitleAnalytics: string;
  pageDescAnalytics: string;
  pageTitleAi: string;
  pageDescAi: string;
  pageTitleUsers: string;
  pageDescUsers: string;
  pageTitleAudit: string;
  pageDescAudit: string;
  pageTitleSettings: string;
  pageDescSettings: string;

  // Toast messages
  toastExportStarted: string;
  toastExportDesc: string;
  toastReportGenerating: string;
  toastReportDesc: string;
  toastSettingsSaved: string;
  toastOrgSaved: string;
  toastLocalizationSaved: string;
  toastBillingSaved: string;
  toastAddCategory: string;
  toastAddCategoryDesc: string;
  toastEditSla: string;
  toastEditingSla: string;
}

const en: Translation = {
  appName: 'NEXVO',
  appTagline: 'Smart Waste Platform',
  loadingDashboard: 'Loading dashboard...',

  welcomeBack: 'Welcome back',
  createAccount: 'Create your account',
  signInToAccess: 'Sign in to access your dashboard',
  signUpToStart: "Sign up to start managing your city's waste",
  email: 'Email',
  password: 'Password',
  signIn: 'Sign In',
  signUp: 'Sign up',
  signOut: 'Sign out',
  dontHaveAccount: "Don't have an account?",
  alreadyHaveAccount: 'Already have an account?',
  orExploreDemo: 'Or explore the demo dashboard without signing in',
  loginHeroTitle: "The operating system for a city's waste ecosystem",
  loginHeroDesc: 'Sign in to manage collections, fleet, containers, citizen reports, billing, and recycling — all in one platform.',
  managedMonthly: '1,847t managed monthly',
  recyclingRate: '68.2% recycling rate',
  allRightsReserved: '© 2026 NEXVO. All rights reserved.',

  searchPlaceholder: 'Search reports, work orders, vehicles...',
  platformAdmin: 'Platform Admin',

  navMain: 'Main',
  navOperations: 'Operations',
  navWasteFlow: 'Waste Flow',
  navRecycling: 'Recycling',
  navFleet: 'Fleet',
  navB2B: 'B2B',
  navCitizen: 'Citizen',
  navInsights: 'Insights',
  navAdministration: 'Administration',

  dashboard: 'Dashboard',
  liveMap: 'Live Map',
  citizenReports: 'Citizen Reports',
  workOrders: 'Work Orders',
  routes: 'Routes',
  containers: 'Containers',
  collections: 'Collections',
  weighbridge: 'Weighbridge',
  transferStations: 'Transfer Stations',
  recyclingCenters: 'Recycling Centers',
  materialsInventory: 'Materials & Inventory',
  marketplace: 'Marketplace',
  vehicles: 'Vehicles',
  drivers: 'Drivers',
  maintenance: 'Maintenance',
  businesses: 'Businesses',
  contracts: 'Contracts',
  collectionRequests: 'Collection Requests',
  invoices: 'Invoices',
  payments: 'Payments',
  ecoPoints: 'Eco Points',
  analytics: 'Analytics',
  aiCopilot: 'AI Copilot',
  usersRoles: 'Users & Roles',
  auditLogs: 'Audit Logs',
  settings: 'Settings',

  algerCentre: 'Alger Centre',
  wilayaZone: "Wilaya d'Alger · Zone 1-5",

  commandCenter: 'Command Center',
  commandCenterDesc: 'Real-time overview of the city\u2019s waste ecosystem operations',
  live: 'Live',
  criticalReports: 'Critical Reports',
  activeWorkOrders: 'Active Work Orders',
  trucksOnRoute: 'Trucks On Route',
  slaBreaches: 'SLA Breaches',
  collectionTrends: 'Collection Trends',
  collectionTrendsDesc: 'Monthly waste collected vs recycled vs landfilled (tons)',
  collected: 'Collected',
  recycled: 'Recycled',
  landfilled: 'Landfilled',
  wasteComposition: 'Waste Composition',
  wasteCompositionDesc: 'By type this month',
  zonePerformance: 'Zone Performance',
  zonePerformanceDesc: 'Reports, recycling rate, and SLA compliance by zone',
  reports: 'Reports',
  liveActivity: 'Live Activity',
  recentCitizenReports: 'Recent Citizen Reports',
  recentCitizenReportsDesc: 'Latest reports submitted by citizens',
  viewAll: 'View all',
  reportId: 'Report ID',
  type: 'Type',
  location: 'Location',
  priority: 'Priority',
  status: 'Status',
  time: 'Time',

  kpiWasteCollected: 'Waste Collected',
  kpiRecyclingRate: 'Recycling Rate',
  kpiActiveReports: 'Active Reports',
  kpiSlaCompliance: 'SLA Compliance',
  kpiFleetActive: 'Fleet Active',
  kpiAvgResponse: 'Avg Response',

  activityReport: 'report',
  activityWorkOrder: 'workorder',
  activityCollection: 'collection',
  activityAlert: 'alert',
  activityVehicle: 'vehicle',
  activityInvoice: 'invoice',

  save: 'Save',
  saveChanges: 'Save Changes',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  export: 'Export',
  exportCsv: 'Export CSV',
  pdfReport: 'PDF Report',
  add: 'Add',
  search: 'Search',
  filter: 'Filter',
  actions: 'Actions',
  loading: 'Loading',
  noData: 'No data available',
  confirmed: 'Confirmed',
  settingsSaved: 'Settings saved',

  rtOverflowingContainer: 'Overflowing Container',
  rtIllegalDumping: 'Illegal Dumping',
  rtMissedCollection: 'Missed Collection',
  rtDamagedContainer: 'Damaged Container',
  rtWasteScattered: 'Waste Scattered',
  rtLargeWaste: 'Large Waste',
  rtHazardousWaste: 'Hazardous Waste',
  rtBadSmell: 'Bad Smell',
  rtOther: 'Other',

  rsSubmitted: 'Submitted',
  rsReceived: 'Received',
  rsAiReview: 'AI Review',
  rsVerified: 'Verified',
  rsAssigned: 'Assigned',
  rsEnRoute: 'En Route',
  rsInProgress: 'In Progress',
  rsResolved: 'Resolved',
  rsRejected: 'Rejected',
  rsDuplicate: 'Duplicate',
  rsClosed: 'Closed',

  prCritical: 'Critical',
  prHigh: 'High',
  prNormal: 'Normal',
  prLow: 'Low',

  wtGeneral: 'General',
  wtOrganic: 'Organic',
  wtPlastic: 'Plastic',
  wtPaper: 'Paper',
  wtCardboard: 'Cardboard',
  wtGlass: 'Glass',
  wtMetal: 'Metal',
  wtElectronic: 'Electronic',
  wtConstruction: 'Construction',
  wtMedical: 'Medical',
  wtHazardous: 'Hazardous',
  wtLargeWaste: 'Large Waste',
  wtUsedOil: 'Used Oil',
  wtOther: 'Other',

  vsAvailable: 'Available',
  vsOnRoute: 'On Route',
  vsLoading: 'Loading',
  vsMaintenance: 'Maintenance',
  vsOffline: 'Offline',

  csActive: 'Active',
  csFull: 'Full',
  csDamaged: 'Damaged',
  csMaintenance: 'Maintenance',
  csRemoved: 'Removed',

  slaOnTrack: 'On Track',
  slaAtRisk: 'At Risk',
  slaBreached: 'Breached',

  zoneCentre: 'Zone 1 — Centre',
  zoneNord: 'Zone 2 — Nord',
  zoneEst: 'Zone 3 — Est',
  zoneSud: 'Zone 4 — Sud',
  zoneOuest: 'Zone 5 — Ouest',

  pageTitleDispatch: 'Live Dispatch Map',
  pageDescDispatch: 'Real-time vehicle tracking and incident response',
  pageTitleReports: 'Citizen Reports',
  pageDescReports: 'Track and manage citizen-submitted waste reports',
  pageTitleWorkOrders: 'Work Orders',
  pageDescWorkOrders: 'Manage field operations and task assignments',
  pageTitleRoutes: 'Collection Routes',
  pageDescRoutes: 'Plan and optimize collection routes across zones',
  pageTitleContainers: 'Smart Containers',
  pageDescContainers: 'Monitor IoT-enabled containers and fill levels',
  pageTitleCollections: 'Collections',
  pageDescCollections: 'Track all waste collection operations',
  pageTitleWeighbridge: 'Weighbridge',
  pageDescWeighbridge: 'Record and manage weighbridge transactions',
  pageTitleTransferStations: 'Transfer Stations',
  pageDescTransferStations: 'Manage waste transfer and sorting stations',
  pageTitleRecycling: 'Recycling Centers',
  pageDescRecycling: 'Monitor recycling facilities and processing',
  pageTitleMaterials: 'Materials & Inventory',
  pageDescMaterials: 'Track recycled material inventory and stock',
  pageTitleMarketplace: 'Recycled Materials Marketplace',
  pageDescMarketplace: 'Buy and sell recycled materials',
  pageTitleFleet: 'Fleet Management',
  pageDescFleet: 'Manage vehicles, tracking, and fleet operations',
  pageTitleDrivers: 'Drivers',
  pageDescDrivers: 'Manage driver assignments and performance',
  pageTitleMaintenance: 'Maintenance',
  pageDescMaintenance: 'Track vehicle and equipment maintenance',
  pageTitleBusinesses: 'Businesses',
  pageDescBusinesses: 'Manage commercial waste service contracts',
  pageTitleContracts: 'Contracts',
  pageDescContracts: 'Manage service agreements and contract terms',
  pageTitleRequests: 'Collection Requests',
  pageDescRequests: 'Handle B2B and citizen collection requests',
  pageTitleInvoices: 'Invoices',
  pageDescInvoices: 'Manage billing and invoice processing',
  pageTitlePayments: 'Payments',
  pageDescPayments: 'Track payments and financial transactions',
  pageTitleEcoPoints: 'Eco Points',
  pageDescEcoPoints: 'Citizen rewards and gamification program',
  pageTitleAnalytics: 'Analytics',
  pageDescAnalytics: 'Deep insights across operations, waste, finance, and ESG metrics',
  pageTitleAi: 'AI Copilot',
  pageDescAi: 'Intelligent assistant for waste management operations',
  pageTitleUsers: 'Users & Roles',
  pageDescUsers: 'Manage user accounts, roles, and permissions',
  pageTitleAudit: 'Audit Logs',
  pageDescAudit: 'System activity and security audit trail',
  pageTitleSettings: 'Settings',
  pageDescSettings: 'Configure your platform, organization, and system preferences',

  toastExportStarted: 'Export started',
  toastExportDesc: 'Analytics data is being exported to CSV',
  toastReportGenerating: 'Report generating',
  toastReportDesc: 'PDF report is being generated',
  toastSettingsSaved: 'Settings saved',
  toastOrgSaved: 'Organization details have been updated',
  toastLocalizationSaved: 'Localization preferences have been updated',
  toastBillingSaved: 'Billing and tax settings have been updated',
  toastAddCategory: 'Add Category',
  toastAddCategoryDesc: 'Opening custom waste category form...',
  toastEditSla: 'Edit SLA',
  toastEditingSla: 'Editing SLA targets',
};

const fr: Translation = {
  appName: 'NEXVO',
  appTagline: 'Plateforme de Gestion Intelligente',
  loadingDashboard: 'Chargement du tableau de bord...',

  welcomeBack: 'Bon retour',
  createAccount: 'Créer votre compte',
  signInToAccess: 'Connectez-vous pour accéder à votre tableau de bord',
  signUpToStart: 'Inscrivez-vous pour gérer les déchets de votre ville',
  email: 'E-mail',
  password: 'Mot de passe',
  signIn: 'Se connecter',
  signUp: "S'inscrire",
  signOut: 'Se déconnecter',
  dontHaveAccount: "Vous n'avez pas de compte?",
  alreadyHaveAccount: 'Vous avez déjà un compte?',
  orExploreDemo: 'Ou explorez le tableau de bord de démonstration sans connexion',
  loginHeroTitle: "Le système d'exploitation de l'écosystème des déchets d'une ville",
  loginHeroDesc: 'Connectez-vous pour gérer les collectes, la flotte, les conteneurs, les signalements citoyens, la facturation et le recyclage — tout en une seule plateforme.',
  managedMonthly: '1 847t gérés par mois',
  recyclingRate: '68,2% taux de recyclage',
  allRightsReserved: '© 2026 NEXVO. Tous droits réservés.',

  searchPlaceholder: 'Rechercher signalements, ordres de travail, véhicules...',
  platformAdmin: 'Administrateur de plateforme',

  navMain: 'Principal',
  navOperations: 'Opérations',
  navWasteFlow: 'Flux des déchets',
  navRecycling: 'Recyclage',
  navFleet: 'Flotte',
  navB2B: 'B2B',
  navCitizen: 'Citoyen',
  navInsights: 'Analyses',
  navAdministration: 'Administration',

  dashboard: 'Tableau de bord',
  liveMap: 'Carte en direct',
  citizenReports: 'Signalements citoyens',
  workOrders: 'Ordres de travail',
  routes: 'Itinéraires',
  containers: 'Conteneurs',
  collections: 'Collectes',
  weighbridge: 'Pont bascule',
  transferStations: 'Stations de transfert',
  recyclingCenters: 'Centres de recyclage',
  materialsInventory: 'Matériaux et stock',
  marketplace: 'Marché',
  vehicles: 'Véhicules',
  drivers: 'Chauffeurs',
  maintenance: 'Maintenance',
  businesses: 'Entreprises',
  contracts: 'Contrats',
  collectionRequests: 'Demandes de collecte',
  invoices: 'Factures',
  payments: 'Paiements',
  ecoPoints: 'Points éco',
  analytics: 'Analyses',
  aiCopilot: 'Assistant IA',
  usersRoles: 'Utilisateurs et rôles',
  auditLogs: 'Journaux d\'audit',
  settings: 'Paramètres',

  algerCentre: 'Alger Centre',
  wilayaZone: "Wilaya d'Alger · Zone 1-5",

  commandCenter: 'Centre de commandement',
  commandCenterDesc: "Vue d'ensemble en temps réel des opérations de l'écosystème des déchets",
  live: 'En direct',
  criticalReports: 'Signalements critiques',
  activeWorkOrders: 'Ordres actifs',
  trucksOnRoute: 'Camions en route',
  slaBreaches: 'Infractions SLA',
  collectionTrends: 'Tendances de collecte',
  collectionTrendsDesc: 'Déchets collectés vs recyclés vs mis en décharge (tonnes)',
  collected: 'Collecté',
  recycled: 'Recyclé',
  landfilled: 'Mise en décharge',
  wasteComposition: 'Composition des déchets',
  wasteCompositionDesc: 'Par type ce mois-ci',
  zonePerformance: 'Performance par zone',
  zonePerformanceDesc: 'Signalements, taux de recyclage et conformité SLA par zone',
  reports: 'Signalements',
  liveActivity: 'Activité en direct',
  recentCitizenReports: 'Signalements récents',
  recentCitizenReportsDesc: 'Derniers signalements soumis par les citoyens',
  viewAll: 'Voir tout',
  reportId: 'ID Signalement',
  type: 'Type',
  location: 'Localisation',
  priority: 'Priorité',
  status: 'Statut',
  time: 'Heure',

  kpiWasteCollected: 'Déchets collectés',
  kpiRecyclingRate: 'Taux de recyclage',
  kpiActiveReports: 'Signalements actifs',
  kpiSlaCompliance: 'Conformité SLA',
  kpiFleetActive: 'Flotte active',
  kpiAvgResponse: 'Temps de réponse moyen',

  activityReport: 'signalement',
  activityWorkOrder: 'ordre',
  activityCollection: 'collecte',
  activityAlert: 'alerte',
  activityVehicle: 'véhicule',
  activityInvoice: 'facture',

  save: 'Enregistrer',
  saveChanges: 'Enregistrer',
  cancel: 'Annuler',
  edit: 'Modifier',
  delete: 'Supprimer',
  export: 'Exporter',
  exportCsv: 'Exporter CSV',
  pdfReport: 'Rapport PDF',
  add: 'Ajouter',
  search: 'Rechercher',
  filter: 'Filtrer',
  actions: 'Actions',
  loading: 'Chargement',
  noData: 'Aucune donnée disponible',
  confirmed: 'Confirmé',
  settingsSaved: 'Paramètres enregistrés',

  rtOverflowingContainer: 'Conteneur débordant',
  rtIllegalDumping: 'Dépôt sauvage',
  rtMissedCollection: 'Collecte manquée',
  rtDamagedContainer: 'Conteneur endommagé',
  rtWasteScattered: 'Déchets éparpillés',
  rtLargeWaste: 'Encombrants',
  rtHazardousWaste: 'Déchets dangereux',
  rtBadSmell: 'Mauvaise odeur',
  rtOther: 'Autre',

  rsSubmitted: 'Soumis',
  rsReceived: 'Reçu',
  rsAiReview: 'Examen IA',
  rsVerified: 'Vérifié',
  rsAssigned: 'Assigné',
  rsEnRoute: 'En route',
  rsInProgress: 'En cours',
  rsResolved: 'Résolu',
  rsRejected: 'Rejeté',
  rsDuplicate: 'Doublon',
  rsClosed: 'Fermé',

  prCritical: 'Critique',
  prHigh: 'Élevé',
  prNormal: 'Normal',
  prLow: 'Faible',

  wtGeneral: 'Général',
  wtOrganic: 'Organique',
  wtPlastic: 'Plastique',
  wtPaper: 'Papier',
  wtCardboard: 'Carton',
  wtGlass: 'Verre',
  wtMetal: 'Métal',
  wtElectronic: 'Électronique',
  wtConstruction: 'Construction',
  wtMedical: 'Médical',
  wtHazardous: 'Dangereux',
  wtLargeWaste: 'Encombrants',
  wtUsedOil: 'Huile usagée',
  wtOther: 'Autre',

  vsAvailable: 'Disponible',
  vsOnRoute: 'En route',
  vsLoading: 'Chargement',
  vsMaintenance: 'Maintenance',
  vsOffline: 'Hors ligne',

  csActive: 'Actif',
  csFull: 'Plein',
  csDamaged: 'Endommagé',
  csMaintenance: 'Maintenance',
  csRemoved: 'Retiré',

  slaOnTrack: 'Dans les délais',
  slaAtRisk: 'À risque',
  slaBreached: 'Infraction',

  zoneCentre: 'Zone 1 — Centre',
  zoneNord: 'Zone 2 — Nord',
  zoneEst: 'Zone 3 — Est',
  zoneSud: 'Zone 4 — Sud',
  zoneOuest: 'Zone 5 — Ouest',

  pageTitleDispatch: 'Carte de dispatch en direct',
  pageDescDispatch: 'Suivi des véhicules en temps réel et réponse aux incidents',
  pageTitleReports: 'Signalements citoyens',
  pageDescReports: 'Suivre et gérer les signalements de déchets des citoyens',
  pageTitleWorkOrders: 'Ordres de travail',
  pageDescWorkOrders: 'Gérer les opérations sur le terrain et les affectations',
  pageTitleRoutes: 'Itinéraires de collecte',
  pageDescRoutes: 'Planifier et optimiser les itinéraires de collecte',
  pageTitleContainers: 'Conteneurs intelligents',
  pageDescContainers: 'Surveiller les conteneurs IoT et les niveaux de remplissage',
  pageTitleCollections: 'Collectes',
  pageDescCollections: 'Suivre toutes les opérations de collecte des déchets',
  pageTitleWeighbridge: 'Pont bascule',
  pageDescWeighbridge: 'Enregistrer et gérer les transactions de pesage',
  pageTitleTransferStations: 'Stations de transfert',
  pageDescTransferStations: 'Gérer les stations de transfert et de tri',
  pageTitleRecycling: 'Centres de recyclage',
  pageDescRecycling: 'Surveiller les installations de recyclage',
  pageTitleMaterials: 'Matériaux et stock',
  pageDescMaterials: 'Suivre le stock de matériaux recyclés',
  pageTitleMarketplace: 'Marché des matériaux recyclés',
  pageDescMarketplace: 'Acheter et vendre des matériaux recyclés',
  pageTitleFleet: 'Gestion de flotte',
  pageDescFleet: 'Gérer les véhicules et les opérations de flotte',
  pageTitleDrivers: 'Chauffeurs',
  pageDescDrivers: 'Gérer les affectations et la performance des chauffeurs',
  pageTitleMaintenance: 'Maintenance',
  pageDescMaintenance: 'Suivre la maintenance des véhicules et équipements',
  pageTitleBusinesses: 'Entreprises',
  pageDescBusinesses: 'Gérer les contrats de service de déchets commerciaux',
  pageTitleContracts: 'Contrats',
  pageDescContracts: 'Gérer les accords de service et les conditions',
  pageTitleRequests: 'Demandes de collecte',
  pageDescRequests: 'Gérer les demandes de collecte B2B et citoyens',
  pageTitleInvoices: 'Factures',
  pageDescInvoices: 'Gérer la facturation et le traitement des factures',
  pageTitlePayments: 'Paiements',
  pageDescPayments: 'Suivre les paiements et les transactions financières',
  pageTitleEcoPoints: 'Points éco',
  pageDescEcoPoints: 'Programme de récompenses citoyennes et ludification',
  pageTitleAnalytics: 'Analyses',
  pageDescAnalytics: 'Analyses approfondies des opérations, déchets, finances et ESG',
  pageTitleAi: 'Assistant IA',
  pageDescAi: 'Assistant intelligent pour la gestion des déchets',
  pageTitleUsers: 'Utilisateurs et rôles',
  pageDescUsers: 'Gérer les comptes, rôles et permissions',
  pageTitleAudit: 'Journaux d\'audit',
  pageDescAudit: "Piste d'audit de l'activité système et de sécurité",
  pageTitleSettings: 'Paramètres',
  pageDescSettings: 'Configurer votre plateforme et votre organisation',

  toastExportStarted: 'Exportation démarrée',
  toastExportDesc: 'Les données analytiques sont exportées en CSV',
  toastReportGenerating: 'Génération du rapport',
  toastReportDesc: 'Le rapport PDF est en cours de génération',
  toastSettingsSaved: 'Paramètres enregistrés',
  toastOrgSaved: 'Les détails de l\'organisation ont été mis à jour',
  toastLocalizationSaved: 'Les préférences de localisation ont été mises à jour',
  toastBillingSaved: 'Les paramètres de facturation ont été mis à jour',
  toastAddCategory: 'Ajouter une catégorie',
  toastAddCategoryDesc: 'Ouverture du formulaire de catégorie personnalisée...',
  toastEditSla: 'Modifier SLA',
  toastEditingSla: 'Modification des cibles SLA',
};

const ar: Translation = {
  appName: 'وول سيتي أو إس',
  appTagline: 'منصة إدارة النفايات الذكية',
  loadingDashboard: 'جاري تحميل لوحة التحكم...',

  welcomeBack: 'مرحبًا بعودتك',
  createAccount: 'أنشئ حسابك',
  signInToAccess: 'سجّل الدخول للوصول إلى لوحة التحكم',
  signUpToStart: 'سجّل للبدء في إدارة نفايات مدينتك',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  signIn: 'تسجيل الدخول',
  signUp: 'إنشاء حساب',
  signOut: 'تسجيل الخروج',
  dontHaveAccount: 'ليس لديك حساب؟',
  alreadyHaveAccount: 'لديك حساب بالفعل؟',
  orExploreDemo: 'أو استكشف لوحة التحكم التجريبية دون تسجيل الدخول',
  loginHeroTitle: 'نظام التشغيل لمنظومة النفايات في المدينة',
  loginHeroDesc: 'سجّل الدخول لإدارة الجمع والأسطول والحاويات وبلاغات المواطنين والفوترة وإعادة التدوير — كل ذلك في منصة واحدة.',
  managedMonthly: '1,847 طن مُدارة شهريًا',
  recyclingRate: '68.2% معدل إعادة التدوير',
  allRightsReserved: '© 2026 وول سيتي أو إس. جميع الحقوق محفوظة.',

  searchPlaceholder: 'ابحث عن بلاغات أو أوامر عمل أو مركبات...',
  platformAdmin: 'مدير المنصة',

  navMain: 'الرئيسية',
  navOperations: 'العمليات',
  navWasteFlow: 'تدفق النفايات',
  navRecycling: 'إعادة التدوير',
  navFleet: 'الأسطول',
  navB2B: 'الأعمال',
  navCitizen: 'المواطن',
  navInsights: 'التحليلات',
  navAdministration: 'الإدارة',

  dashboard: 'لوحة التحكم',
  liveMap: 'الخريطة المباشرة',
  citizenReports: 'بلاغات المواطنين',
  workOrders: 'أوامر العمل',
  routes: 'المسارات',
  containers: 'الحاويات',
  collections: 'الجمع',
  weighbridge: 'ميزان الجسر',
  transferStations: 'محطات النقل',
  recyclingCenters: 'مراكز إعادة التدوير',
  materialsInventory: 'المواد والمخزون',
  marketplace: 'السوق',
  vehicles: 'المركبات',
  drivers: 'السائقون',
  maintenance: 'الصيانة',
  businesses: 'الشركات',
  contracts: 'العقود',
  collectionRequests: 'طلبات الجمع',
  invoices: 'الفواتير',
  payments: 'المدفوعات',
  ecoPoints: 'النقاط البيئية',
  analytics: 'التحليلات',
  aiCopilot: 'مساعد الذكاء الاصطناعي',
  usersRoles: 'المستخدمون والأدوار',
  auditLogs: 'سجلات التدقيق',
  settings: 'الإعدادات',

  algerCentre: 'الجزائر الوسطى',
  wilayaZone: 'ولاية الجزائر · المنطقة 1-5',

  commandCenter: 'مركز القيادة',
  commandCenterDesc: 'نظرة عامة في الوقت الفعلي على عمليات منظومة النفايات في المدينة',
  live: 'مباشر',
  criticalReports: 'بلاغات حرجة',
  activeWorkOrders: 'أوامر عمل نشطة',
  trucksOnRoute: 'شاحنات في الطريق',
  slaBreaches: 'انتهاكات اتفاقية الخدمة',
  collectionTrends: 'اتجاهات الجمع',
  collectionTrendsDesc: 'النفايات المجموعة مقابل المعاد تدويرها مقابل المدفونة (أطنان)',
  collected: 'مجموعة',
  recycled: 'معاد تدويرها',
  landfilled: 'مدفونة',
  wasteComposition: 'تركيبة النفايات',
  wasteCompositionDesc: 'حسب النوع هذا الشهر',
  zonePerformance: 'أداء المناطق',
  zonePerformanceDesc: 'البلاغات ومعدل إعادة التدوير والامتثال للاتفاقيات حسب المنطقة',
  reports: 'البلاغات',
  liveActivity: 'النشاط المباشر',
  recentCitizenReports: 'بلاغات المواطنين الأخيرة',
  recentCitizenReportsDesc: 'أحدث البلاغات المقدمة من المواطنين',
  viewAll: 'عرض الكل',
  reportId: 'رقم البلاغ',
  type: 'النوع',
  location: 'الموقع',
  priority: 'الأولوية',
  status: 'الحالة',
  time: 'الوقت',

  kpiWasteCollected: 'النفايات المجموعة',
  kpiRecyclingRate: 'معدل إعادة التدوير',
  kpiActiveReports: 'البلاغات النشطة',
  kpiSlaCompliance: 'امتثال اتفاقية الخدمة',
  kpiFleetActive: 'الأسطول النشط',
  kpiAvgResponse: 'متوسط وقت الاستجابة',

  activityReport: 'بلاغ',
  activityWorkOrder: 'أمر عمل',
  activityCollection: 'جمع',
  activityAlert: 'تنبيه',
  activityVehicle: 'مركبة',
  activityInvoice: 'فاتورة',

  save: 'حفظ',
  saveChanges: 'حفظ التغييرات',
  cancel: 'إلغاء',
  edit: 'تعديل',
  delete: 'حذف',
  export: 'تصدير',
  exportCsv: 'تصدير CSV',
  pdfReport: 'تقرير PDF',
  add: 'إضافة',
  search: 'بحث',
  filter: 'تصفية',
  actions: 'إجراءات',
  loading: 'جاري التحميل',
  noData: 'لا توجد بيانات',
  confirmed: 'مؤكد',
  settingsSaved: 'تم حفظ الإعدادات',

  rtOverflowingContainer: 'حاولة ممتلئة',
  rtIllegalDumping: 'رمي غير قانوني',
  rtMissedCollection: 'جمعية فائتة',
  rtDamagedContainer: 'حاوية تالفة',
  rtWasteScattered: 'نفايات متناثرة',
  rtLargeWaste: 'نفايات كبيرة',
  rtHazardousWaste: 'نفايات خطرة',
  rtBadSmell: 'رائحة كريهة',
  rtOther: 'أخرى',

  rsSubmitted: 'مُقدَّم',
  rsReceived: 'مُستلَم',
  rsAiReview: 'مراجعة الذكاء الاصطناعي',
  rsVerified: 'مُتحقَّق',
  rsAssigned: 'مُسند',
  rsEnRoute: 'في الطريق',
  rsInProgress: 'قيد التنفيذ',
  rsResolved: 'تم الحل',
  rsRejected: 'مرفوض',
  rsDuplicate: 'مكرر',
  rsClosed: 'مغلق',

  prCritical: 'حرجة',
  prHigh: 'عالية',
  prNormal: 'عادية',
  prLow: 'منخفضة',

  wtGeneral: 'عامة',
  wtOrganic: 'عضوية',
  wtPlastic: 'بلاستيك',
  wtPaper: 'ورق',
  wtCardboard: 'كرتون',
  wtGlass: 'زجاج',
  wtMetal: 'معدن',
  wtElectronic: 'إلكترونية',
  wtConstruction: 'إنشاءات',
  wtMedical: 'طبية',
  wtHazardous: 'خطرة',
  wtLargeWaste: 'نفايات كبيرة',
  wtUsedOil: 'زيت مستعمل',
  wtOther: 'أخرى',

  vsAvailable: 'متاح',
  vsOnRoute: 'في الطريق',
  vsLoading: 'جاري التحميل',
  vsMaintenance: 'صيانة',
  vsOffline: 'غير متصل',

  csActive: 'نشط',
  csFull: 'ممتلئ',
  csDamaged: 'تالف',
  csMaintenance: 'صيانة',
  csRemoved: 'مُزال',

  slaOnTrack: 'في الوقت المحدد',
  slaAtRisk: 'معرض للخطر',
  slaBreached: 'منتهك',

  zoneCentre: 'المنطقة 1 — الوسط',
  zoneNord: 'المنطقة 2 — الشمال',
  zoneEst: 'المنطقة 3 — الشرق',
  zoneSud: 'المنطقة 4 — الجنوب',
  zoneOuest: 'المنطقة 5 — الغرب',

  pageTitleDispatch: 'خريطة الإرسال المباشر',
  pageDescDispatch: 'تتبع المركبات في الوقت الفعلي والاستجابة للحوادث',
  pageTitleReports: 'بلاغات المواطنين',
  pageDescReports: 'تتبع وإدارة بلاغات النفايات المقدمة من المواطنين',
  pageTitleWorkOrders: 'أوامر العمل',
  pageDescWorkOrders: 'إدارة عمليات الميدان وتكليفات المهام',
  pageTitleRoutes: 'مسارات الجمع',
  pageDescRoutes: 'تخطيط وتحسين مسارات الجمع عبر المناطق',
  pageTitleContainers: 'الحاويات الذكية',
  pageDescContainers: 'مراقبة حاويات إنترنت الأشياء ومستويات الملء',
  pageTitleCollections: 'الجمع',
  pageDescCollections: 'تتبع جميع عمليات جمع النفايات',
  pageTitleWeighbridge: 'ميزان الجسر',
  pageDescWeighbridge: 'تسجيل وإدارة عمليات الوزن',
  pageTitleTransferStations: 'محطات النقل',
  pageDescTransferStations: 'إدارة محطات نقل وفرز النفايات',
  pageTitleRecycling: 'مراكز إعادة التدوير',
  pageDescRecycling: 'مراقبة منشآت إعادة التدوير والمعالجة',
  pageTitleMaterials: 'المواد والمخزون',
  pageDescMaterials: 'تتبع مخزون المواد المعاد تدويرها',
  pageTitleMarketplace: 'سوق المواد المعاد تدويرها',
  pageDescMarketplace: 'شراء وبيع المواد المعاد تدويرها',
  pageTitleFleet: 'إدارة الأسطول',
  pageDescFleet: 'إدارة المركبات والتتبع وعمليات الأسطول',
  pageTitleDrivers: 'السائقون',
  pageDescDrivers: 'إدارة تكليفات السائقين وأدائهم',
  pageTitleMaintenance: 'الصيانة',
  pageDescMaintenance: 'تتبع صيانة المركبات والمعدات',
  pageTitleBusinesses: 'الشركات',
  pageDescBusinesses: 'إدارة عقود خدمات النفايات التجارية',
  pageTitleContracts: 'العقود',
  pageDescContracts: 'إدارة اتفاقيات الخدمة وشروط العقود',
  pageTitleRequests: 'طلبات الجمع',
  pageDescRequests: 'إدارة طلبات الجمع من الأعمال والمواطنين',
  pageTitleInvoices: 'الفواتير',
  pageDescInvoices: 'إدارة الفوترة ومعالجة الفواتير',
  pageTitlePayments: 'المدفوعات',
  pageDescPayments: 'تتبع المدفوعات والمعاملات المالية',
  pageTitleEcoPoints: 'النقاط البيئية',
  pageDescEcoPoints: 'برنامج مكافآت المواطنين والألعبة',
  pageTitleAnalytics: 'التحليلات',
  pageDescAnalytics: 'رؤى عميقة عبر العمليات والنفايات والمالية ومؤشرات ESG',
  pageTitleAi: 'مساعد الذكاء الاصطناعي',
  pageDescAi: 'مساعد ذكي لعمليات إدارة النفايات',
  pageTitleUsers: 'المستخدمون والأدوار',
  pageDescUsers: 'إدارة حسابات المستخدمين والأدوار والصلاحيات',
  pageTitleAudit: 'سجلات التدقيق',
  pageDescAudit: 'مسار تدقيق نشاط النظام والأمان',
  pageTitleSettings: 'الإعدادات',
  pageDescSettings: 'تكوين منصتك ومؤسستك وتفضيلات النظام',

  toastExportStarted: 'بدأ التصدير',
  toastExportDesc: 'جاري تصدير بيانات التحليلات إلى CSV',
  toastReportGenerating: 'جاري إنشاء التقرير',
  toastReportDesc: 'جاري إنشاء تقرير PDF',
  toastSettingsSaved: 'تم حفظ الإعدادات',
  toastOrgSaved: 'تم تحديث تفاصيل المؤسسة',
  toastLocalizationSaved: 'تم تحديث تفضيلات التوطين',
  toastBillingSaved: 'تم تحديث إعدادات الفوترة والضرائب',
  toastAddCategory: 'إضافة فئة',
  toastAddCategoryDesc: 'جاري فتح نموذج فئة النفايات المخصصة...',
  toastEditSla: 'تعديل اتفاقية الخدمة',
  toastEditingSla: 'جاري تعديل أهداف اتفاقية الخدمة',
};

export const translations: Record<Locale, Translation> = { en, fr, ar };

export const isRtl = (locale: Locale) => locale === 'ar';

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'AR',
};

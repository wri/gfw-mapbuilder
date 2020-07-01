type Sector = { sector: string; subsectors: { label: string; id: string }[] };
export const sectors: Sector[] = [
  {
    sector: 'Government',
    subsectors: [
      {
        label: 'Forest Management/Park Management',
        id: 'Forest_Management_Park_Management'
      },
      {
        label: 'Law Enforcement',
        id: 'Law_Enforcement'
      },
      {
        label: 'Legislature/Parliament',
        id: 'Legislature_Parliament'
      },
      {
        label: 'Ministry/National Agency',
        id: 'Ministry_National_Agency'
      },
      {
        label: 'Subnational Agency',
        id: 'Subnational_Agency'
      },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Donor Institution / Agency',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      { label: 'Researcher', id: 'Researcher' },
      { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
      { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Local NGO (national or subnational)',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      {
        label: 'Monitoring/Evaluation Specialist',
        id: 'Monitoring_Evaluation'
      },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Researcher', id: 'Researcher' },
      { label: 'Field Staff', id: 'Field_Staff' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      { label: 'Park/Forest Ranger', id: 'Park_Forest_Ranger' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'International NGO',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      {
        label: 'Monitoring/Evaluation Specialist',
        id: 'Monitoring_Evaluation'
      },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      { label: 'Researcher', id: 'Researcher' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'UN or International Organization',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      { label: 'Researcher', id: 'Researcher' },
      { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
      {
        label: 'Monitoring/Evaluation Specialit',
        id: 'Monitoring_Evaluation'
      },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Academic / Research Organization',
    subsectors: [
      {
        label: 'Faculty (Primary/Secondary)',
        id: 'Faculty_(Primary_Secondary)'
      },
      { label: 'Faculty (University)', id: 'Faculty_(University)' },
      {
        label: 'Student (Primary/Secondary)',
        id: 'Student_(Primary_Secondary)'
      },
      {
        label: 'Student (University/Graduate)',
        id: 'Student_(University_Graduate)'
      },
      {
        label: 'Researcher (Post-Doc, Fellow, etc.)',
        id: 'Researcher_(Post-Doc,_Fellow,_etc.)'
      },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Journalist / Media Organization',
    subsectors: [
      { label: 'Reporter', id: 'Reporter' },
      { label: 'Editor', id: 'Editor' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Indigenous or Community-Based Organization',
    subsectors: [
      { label: 'Community Leader', id: 'Community_Leader' },
      { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Private sector',
    subsectors: [
      { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
      { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
      { label: 'Procurement Staff', id: 'Procurement_Staff' },
      { label: 'Retailer/Trader', id: 'Retailer_Trader' },
      { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Individual / No Affiliation',
    subsectors: [
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Other:',
    subsectors: [
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  }
];

type Usage = { label: string; id: string };
type Topic = { label: string; id: string };
export const usage: Topic[] = [
  {
    label: 'Advocacy/campaigning',
    id: 'Advocacy/campaigning'
  },
  {
    label: 'Data or visuals for blogs or media stories',
    id: 'Data or visuals for blogs or media stories'
  },
  {
    label: 'Data or visuals for presentations and reports',
    id: 'Data or visuals for presentations and reports'
  },
  {
    label: 'Educational support materials',
    id: 'Educational support materials'
  },
  {
    label: 'General research',
    id: 'General research'
  },
  {
    label: 'Identify illegal activity',
    id: 'Identify illegal activity'
  },
  {
    label: 'Inform grant funding decisions/results-based payments',
    id: 'Inform grant funding decisions/results-based payments'
  },
  {
    label: 'Inform purchasing/procurement/investment decisions',
    id: 'Inform purchasing/procurement/investment decisions'
  },
  {
    label: 'Land use planning/land use allocation',
    id: 'Land use planning/land use allocation'
  },
  {
    label: 'Learn about forests/my country',
    id: 'Learn about forests/my country'
  },
  {
    label: 'Monitor or manage an area',
    id: 'Monitor or manage an area'
  },
  {
    label: 'Monitor results/impacts',
    id: 'Monitor results/impacts'
  },
  {
    label: 'Not sure; new to GFW',
    id: 'Not sure; new to GFW'
  },
  {
    label: 'Plan field work (patrols/investigations)',
    id: 'Plan field work (patrols/investigations)'
  },
  {
    label: 'Other',
    id: 'Other'
  }
];

export const topics: Topic[] = [
  {
    label: 'Agricultural supply chains',
    id: 'Agricultural_supply_chains'
  },
  {
    label: 'Biodiversity',
    id: 'Biodiversity'
  },
  {
    label: 'Climate/Carbon',
    id: 'Climate_Carbon'
  },
  {
    label: 'Deforestation/Forest Degradation',
    id: 'Deforestation_Forest_Degradation'
  },
  {
    label: 'Fires',
    id: 'Fires'
  },
  {
    label: 'Innovations in forest monitoring',
    id: 'Innovations_in_forest_monitoring'
  },
  {
    id: 'My_region_or_country',
    label: 'My region or country'
  },
  {
    id: 'Reforestation_Landscape_restoration',
    label: 'Reforestation/Landscape restoration'
  },
  {
    id: 'Small_Grants_Fund_and_Tech_Fellowship',
    label: 'Small Grants Fund and Tech Fellowship'
  },
  {
    label: 'Watersheds',
    id: 'Watersheds_'
  }
];

export const emailLoginTranslations = {
  en: {
    email: 'email',
    password: 'password',
    repeatPassword: 'repeat password',
    required: 'This field is required',
    forgotPassword: 'Forgot Password!',
    signup: ['Not a member?', 'Sign Up!'],
    signin: ['Already joined?', 'Sign In!'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. If it doesn't appear check your spam folder.",
    login: 'Login',
    passwordReset:
      'To reset your password, enter your email and follow the instructions.',
    passwordResetSuccess:
      "Thank you. Please, check your inbox and follow instructions to reset your password. If it doesn't appear check your spam folder.",
    reset: 'Reset',
    register: 'Register'
  },
  ka: {
    email: 'email',
    password: 'password',
    repeatPassword: 'repeat password',
    required: 'This field is required',
    forgotPassword: 'Forgot Password!',
    signup: ['Not a member?', 'Sign Up!'],
    signin: ['Already joined?', 'Sign In!'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. If it doesn't appear check your spam folder.",
    login: 'Login',
    passwordReset:
      'To reset your password, enter your email and follow the instructions.',
    passwordResetSuccess:
      "Thank you. Please, check your inbox and follow instructions to reset your password. If it doesn't appear check your spam folder.",
    reset: 'Reset',
    register: 'Register'
  },
  es: {
    email: 'Correo electrónic',
    password: 'contraseña',
    repeatPassword: 'repita la contraseña',
    required: 'Obligatorio',
    forgotPassword: 'Olvidé mi contraseña',
    signup: ['¿No es miembro? ', '¡Regístrese!'],
    signin: ['¿No es miembro? ', '¡Regístrese!'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. Si no aparece, revise su carpeta de correo no deseado.',
    login: 'Nombre de usuario',
    passwordReset:
      'Para restablecer su contraseña, introduzca su correo electrónico y siga las instrucciones.',
    passwordResetSuccess:
      'Gracias. Por favor, revise su bandeja de entrada y siga las instrucciones para restablecer su contraseña. Si no aparece, revise su carpeta de correo no deseado.',
    reset: 'Restablecer',
    register: 'Register'
  },
  fr: {
    email: 'e-mail',
    password: 'mot de passe',
    repeatPassword: 'répétez le mot de pas',
    required: 'Requis',
    forgotPassword: 'Mot de passe oublié',
    signup: ["Vous n'êtes pas membre ", 'Inscrivez-vous !'],
    signin: ["Vous n'êtes pas membre ", 'Inscrivez-vous !'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. S'il n'apparaît pas, vérifiez dans votre dossier spam.",
    login: 'Connexion',
    passwordReset:
      'Pour réinitialiser votre mot de passe, entrez votre e-mail et suivez les instructions.',
    passwordResetSuccess:
      "Merci. Consultez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passeS'il n'apparaît pas, vérifiez dans votre dossier spam",
    reset: 'Réinitialiser',
    register: "S'inscrire"
  },
  pt: {
    email: 'email',
    password: 'SENHA',
    repeatPassword: 'repita a senha',
    required: 'Requerido',
    forgotPassword: 'Esqueci a senha',
    signup: ['Não é um membro? ', 'Registre-se!'],
    signin: ['Não é um membro? ', 'Registre-se!'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. Se não aparecer, verifique sua pasta de spam.',
    login: 'Login',
    passwordReset:
      'Para redefinir sua senha, insira seu e-mail e siga as instruções.',
    passwordResetSuccess:
      'Obrigado. Por favor, verifique sua caixa de entrada e siga as instruções para redefinir sua senha. Se não aparecer, verifique sua pasta de spam.',
    reset: 'Redefinir',
    register: "S'inscrire"
  },
  id: {
    email: 'email',
    password: 'SANDI',
    repeatPassword: 'ulangi sandi',
    required: 'Diperlukan',
    forgotPassword: 'Lupa sandi',
    signup: ['Bukan anggota? Silakan', 'mendaftar!'],
    signin: ['Bukan anggota? Silakan ', 'mendaftar!'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. Jika tidak muncul silakan cek folder spam.',
    login: 'log masuk',
    passwordReset:
      'Untuk mengatur ulang sandi, masukkan email Anda dan ikuti instruksinya.',
    passwordResetSuccess:
      'Terima kasih. Silakan cek kotak masuk Anda dan ikuti instruksi untuk mengatur ulang sandi. Jika tidak muncul silakan cek folder spam. ',
    reset: 'Atur ulang',
    register: "S'inscrire"
  },
  zh: {
    email: '电子邮件',
    password: '密码',
    repeatPassword: '重复输入密码',
    required: '必填',
    forgotPassword: '忘记密码',
    signup: ['不是会员吗？', '注册！'],
    signin: ['不是会员吗？', '注册！'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. 如果没看到它，请检查您的垃圾文件夹。',
    login: '登录',
    passwordReset: '若要重置密码，请输入您的电子邮件并按照说明操作.',
    passwordResetSuccess:
      ' 谢谢！请检查您的收件箱，并按照说明重置您的密码。如果没看到它，请检查您的垃圾文件夹。',
    reset: '重置',
    register: "S'inscrire"
  }
};

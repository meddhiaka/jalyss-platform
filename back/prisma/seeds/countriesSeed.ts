
type country = [number, string, string, string, string];
const countries: country[] = [
  [1, 'أندورا', 'Andorre', 'Andorra', 'ad'],
  [
    2,
    'الإمارات العربية المتحدة',
    'Emirats Arabes Unis',
    'United Arab Emirates',
    'ae',
  ],
  [3, 'أفغانستان', "L'Afghanistan", 'Afghanistan', 'af'],
  [4, 'أنتيغوا وبربودا', 'Antigua-et-Barbuda', 'Antigua and Barbuda', 'ag'],
  [5, 'أنغيلا', 'Anguilla', 'Anguilla', 'ai'],
  [6, 'ألبانيا', 'Albanie', 'Albania', 'al'],
  [7, 'أرمينيا', 'Arménie', 'Armenia', 'am'],
  [
    8,
    'جزر الأنتيل الهولندية',
    'Antilles néerlandaises',
    'Netherlands Antilles',
    'an',
  ],
  [9, 'أنغولا', 'Angola', 'Angola', 'ao'],
  [10, 'الأرجنتين', 'Argentine', 'Argentina', 'ar'],
  [11, 'النمسا', "L'Autriche", 'Austria', 'at'],
  [12, 'أستراليا', 'Australie', 'Australia', 'au'],
  [13, 'أروبا', 'Aruba', 'Aruba', 'aw'],
  [14, 'أذربيجان', 'Azerbaïdjan', 'Azerbaijan', 'az'],
  [15, 'البوسنة والهرسك', 'Bosnie Herzégovine', 'Bosnia and Herzegovina', 'ba'],
  [16, 'بربادوس', 'La Barbade', 'Barbados', 'bb'],
  [17, 'بنغلاديش', 'Bangladesh', 'Bangladesh', 'bd'],
  [18, 'بلجيكا', 'Belgique', 'Belgium', 'be'],
  [19, 'بوركينا فاسو', 'Burkina Faso', 'Burkina Faso', 'bf'],
  [20, 'بلغاريا', 'Bulgarie', 'Bulgaria', 'bg'],
  [21, 'البحرين', 'Bahreïn', 'Bahrain', 'bh'],
  [22, 'بوروندي', 'Burundi', 'Burundi', 'bi'],
  [23, 'بنين', 'Bénin', 'Benin', 'bj'],
  [24, 'برمودا', 'Bermudes', 'Bermuda', 'bm'],
  [25, 'بروناي دار السلام', 'Brunei Darussalam', 'Brunei Darussalam', 'bn'],
  [26, 'بوليفيا', 'Bolivie', 'Bolivia', 'bo'],
  [27, 'البرازيل', 'Brésil', 'Brazil', 'br'],
  [28, 'الباهاما', 'Bahamas', 'Bahamas', 'bs'],
  [29, 'بوتان', 'Bhoutan', 'Bhutan', 'bt'],
  [30, 'بوتسوانا', 'Botswana', 'Botswana', 'bw'],
  [31, 'روسيا البيضاء', 'Biélorussie', 'Belarus', 'by'],
  [32, 'بليز', 'Belize', 'Belize', 'bz'],
  [33, 'كندا', 'Canada', 'Canada', 'ca'],
  [
    34,
    'جزر كوكوس [كيلينغ]',
    'Îles Cocos [Keeling]',
    'Cocos [Keeling] Islands',
    'cc',
  ],
  [
    35,
    'جمهورية الكونغو الديموقراطية',
    'République Démocratique du Congo',
    'Democratic Republic of the Congo',
    'cd',
  ],
  [
    36,
    'جمهورية افريقيا الوسطى',
    'République centrafricaine',
    'Central African Republic',
    'cf',
  ],
  [37, 'الكونغو', 'Congo', 'Congo', 'cg'],
  [38, 'سويسرا', 'Suisse', 'Switzerland', 'ch'],
  [
    39,
    'ساحل العاج [ساحل العاج]',
    "Cote D'Ivoire [Côte d'Ivoire]",
    "Cote D'Ivoire [Ivory Coast]",
    'ci',
  ],
  [40, 'جزر كوك', 'les Îles Cook', 'Cook Islands', 'ck'],
  [41, 'تشيلي', 'Chili', 'Chile', 'cl'],
  [42, 'الكاميرون', 'Cameroun', 'Cameroon', 'cm'],
  [43, 'الصين', 'Chine', 'China', 'cn'],
  [44, 'كولومبيا', 'Colombie', 'Colombia', 'co'],
  [45, 'كوستا ريكا', 'Costa Rica', 'Costa Rica', 'cr'],
  [46, 'كوبا', 'Cuba', 'Cuba', 'cu'],
  [47, 'الرأس الأخضر', 'Cap-Vert', 'Cape Verde', 'cv'],
  [48, 'جزيرة الكريسماس', "L'île de noël", 'Christmas Island', 'cx'],
  [49, 'قبرص', 'Chypre', 'Cyprus', 'cy'],
  [50, 'جمهورية التشيك', 'République Tchèque', 'Czech Republic', 'cz'],
  [51, 'ألمانيا', 'Allemagne', 'Germany', 'de'],
  [52, 'جيبوتي', 'Djibouti', 'Djibouti', 'dj'],
  [53, 'الدنمارك', 'Danemark', 'Denmark', 'dk'],
  [54, 'دومينيكا', 'Dominique', 'Dominica', 'dm'],
  [
    55,
    'جمهورية الدومنيكان',
    'République Dominicaine',
    'Dominican Republic',
    'do',
  ],
  [56, 'الجزائر', 'Algérie', 'Algeria', 'dz'],
  [57, 'الإكوادور', "L'Équateur", 'Ecuador', 'ec'],
  [58, 'استونيا', 'Estonie', 'Estonia', 'ee'],
  [59, 'مصر', 'Egypte', 'Egypt', 'eg'],
  [60, 'الصحراء الغربية', 'Sahara occidental', 'Western Sahara', 'eh'],
  [61, 'إريتريا', 'Erythrée', 'Eritrea', 'er'],
  [62, 'إسبانيا', 'Espagne', 'Spain', 'es'],
  [63, 'أثيوبيا', 'Ethiopie', 'Ethiopia', 'et'],
  [64, 'فنلندا', 'Finlande', 'Finland', 'fi'],
  [65, 'فيجي', 'Fidji', 'Fiji', 'fj'],
  [
    66,
    'جزر فوكلاند [مالفيناس]',
    'Iles Malouines [Malouines]',
    'Falkland Islands [Malvinas]',
    'fk',
  ],
  [
    67,
    'ولايات ميكرونيزيا الموحدة',
    'États fédérés de Micronésie',
    'Federated States of Micronesia',
    'fm',
  ],
  [68, 'جزر صناعية', 'Îles Féroé', 'Faroe Islands', 'fo'],
  [69, 'فرنسا', 'France', 'France', 'fr'],
  [70, 'الغابون', 'Gabon', 'Gabon', 'ga'],
  [
    71,
    'بريطانيا العظمى [المملكة المتحدة]',
    'Grande-Bretagne [UK]',
    'Great Britain [UK]',
    'gb',
  ],
  [72, 'غرينادا', 'Grenade', 'Grenada', 'gd'],
  [73, 'جورجيا', 'Géorgie', 'Georgia', 'ge'],
  [74, 'غيانا الفرنسية', 'Guinée Française', 'French Guiana', 'gf'],
  [75, 'لا شيء', 'NUL', 'NULL', 'gg'],
  [76, 'غانا', 'Ghana', 'Ghana', 'gh'],
  [77, 'جبل طارق', 'Gibraltar', 'Gibraltar', 'gi'],
  [78, 'الأرض الخضراء', 'Groenland', 'Greenland', 'gl'],
  [79, 'غامبيا', 'Gambie', 'Gambia', 'gm'],
  [80, 'غينيا', 'Guinée', 'Guinea', 'gn'],
  [81, 'جوادلوب', 'La guadeloupe', 'Guadeloupe', 'gp'],
  [82, 'غينيا الإستوائية', 'Guinée Équatoriale', 'Equatorial Guinea', 'gq'],
  [83, 'اليونان', 'Grèce', 'Greece', 'gr'],
  [
    84,
    'جورجيا وجزر ساندويتش',
    'Géorgie du Sud et les îles Sandwich du Sud',
    'S. Georgia and S. Sandwich Islands',
    'gs',
  ],
  [85, 'غواتيمالا', 'Guatemala', 'Guatemala', 'gt'],
  [86, 'غينيا بيساو', 'Guinée-Bissau', 'Guinea-Bissau', 'gw'],
  [87, 'غيانا', 'Guyane', 'Guyana', 'gy'],
  [88, 'هونغ كونغ', 'Hong Kong', 'Hong Kong', 'hk'],
  [89, 'هندوراس', 'Honduras', 'Honduras', 'hn'],
  [90, 'كرواتيا [هرفاتسكا]', 'Croatie [Hrvatska]', 'Croatia [Hrvatska]', 'hr'],
  [91, 'هايتي', 'Haïti', 'Haiti', 'ht'],
  [92, 'اليونان', 'Hongrie', 'Hungary', 'hu'],
  [93, 'أندونيسيا', 'Indonésie', 'Indonesia', 'id'],
  [94, 'أيرلندا', 'Irlande', 'Ireland', 'ie'],
  [96, 'الهند', 'Inde', 'India', 'in'],
  [97, 'العراق', 'Irak', 'Iraq', 'iq'],
  [98, 'إيران', 'Iran', 'Iran', 'ir'],
  [99, 'أيسلندا', 'Islande', 'Iceland', 'is'],
  [100, 'إيطاليا', 'Italie', 'Italy', 'it'],
  [101, 'جامايكا', 'Jamaïque', 'Jamaica', 'jm'],
  [102, 'الأردن', 'Jordan', 'Jordan', 'jo'],
  [103, 'اليابان', 'Japon', 'Japan', 'jp'],
  [104, 'كينيا', 'Kenya', 'Kenya', 'ke'],
  [105, 'قرغيزستان', 'Kirghizistan', 'Kyrgyzstan', 'kg'],
  [106, 'كمبوديا', 'Cambodge', 'Cambodia', 'kh'],
  [107, 'كيريباس', 'Kiribati', 'Kiribati', 'ki'],
  [108, 'جزر القمر', 'Comores', 'Comoros', 'km'],
  [
    109,
    'سانت كيتس ونيفيس',
    'Saint-Christophe-et-Niévès',
    'Saint Kitts and Nevis',
    'kn',
  ],
  [110, 'كوريا الشمالية', 'Corée du Nord', 'Korea [North]', 'kp'],
  [111, 'كوريا، جنوب]', 'COREE DU SUD]', 'Korea [South]', 'kr'],
  [112, 'الكويت', 'Koweit', 'Kuwait', 'kw'],
  [113, 'جزر كايمان', 'Îles Caïmans', 'Cayman Islands', 'ky'],
  [114, 'كازاخستان', 'Le kazakhstan', 'Kazakhstan', 'kz'],
  [115, 'لاوس', 'Laos', 'Laos', 'la'],
  [116, 'لبنان', 'Liban', 'Lebanon', 'lb'],
  [117, 'القديسة لوسيا', 'Sainte-Lucie', 'Saint Lucia', 'lc'],
  [118, 'ليختنشتاين', 'Le Liechtenstein', 'Liechtenstein', 'li'],
  [119, 'سيريلانكا', 'Sri Lanka', 'Sri Lanka', 'lk'],
  [120, 'ليبيريا', 'Libéria', 'Liberia', 'lr'],
  [121, 'ليسوتو', 'Lesotho', 'Lesotho', 'ls'],
  [122, 'ليتوانيا', 'Lituanie', 'Lithuania', 'lt'],
  [123, 'لوكسمبورغ', 'Luxembourg', 'Luxembourg', 'lu'],
  [124, 'لاتفيا', 'Lettonie', 'Latvia', 'lv'],
  [125, 'ليبيا', 'Libye', 'Libya', 'ly'],
  [126, 'المغرب', 'Maroc', 'Morocco', 'ma'],
  [127, 'موناكو', 'Monaco', 'Monaco', 'mc'],
  [128, 'مولدوفا', 'La Moldavie', 'Moldova', 'md'],
  [129, 'مدغشقر', 'Madagascar', 'Madagascar', 'mg'],
  [130, 'جزر مارشال', 'Iles Marshall', 'Marshall Islands', 'mh'],
  [131, 'مقدونيا', 'Macédoine', 'Macedonia', 'mk'],
  [132, 'مالي', 'Mali', 'Mali', 'ml'],
  [133, 'ميانمار', 'Myanmar', 'Myanmar', 'mm'],
  [134, 'منغوليا', 'Mongolie', 'Mongolia', 'mn'],
  [135, 'ماكاو', 'Macao', 'Macao', 'mo'],
  [
    136,
    'جزر مريانا الشمالية',
    'Îles Mariannes du Nord',
    'Northern Mariana Islands',
    'mp',
  ],
  [137, 'مارتينيك', 'Martinique', 'Martinique', 'mq'],
  [138, 'موريتانيا', 'Mauritanie', 'Mauritania', 'mr'],
  [139, 'مونتسيرات', 'Montserrat', 'Montserrat', 'ms'],
  [140, 'مالطا', 'Malte', 'Malta', 'mt'],
  [141, 'موريشيوس', 'Maurice', 'Mauritius', 'mu'],
  [142, 'جزر المالديف', 'Maldives', 'Maldives', 'mv'],
  [143, 'مالاوي', 'Malawi', 'Malawi', 'mw'],
  [144, 'المكسيك', 'Mexique', 'Mexico', 'mx'],
  [145, 'ماليزيا', 'Malaisie', 'Malaysia', 'my'],
  [146, 'موزمبيق', 'Mozambique', 'Mozambique', 'mz'],
  [147, 'ناميبيا', 'Namibie', 'Namibia', 'na'],
  [148, 'كاليدونيا الجديدة', 'Nouvelle Calédonie', 'New Caledonia', 'nc'],
  [149, 'النيجر', 'Niger', 'Niger', 'ne'],
  [150, 'جزيرة نورفولك', "l'ile de Norfolk", 'Norfolk Island', 'nf'],
  [151, 'نيجيريا', 'Nigeria', 'Nigeria', 'ng'],
  [152, 'نيكاراغوا', 'Nicaragua', 'Nicaragua', 'ni'],
  [153, 'هولندا', 'Pays-Bas', 'Netherlands', 'nl'],
  [154, 'النرويج', 'Norvège', 'Norway', 'no'],
  [155, 'نيبال', 'Népal', 'Nepal', 'np'],
  [156, 'ناورو', 'Nauru', 'Nauru', 'nr'],
  [157, 'نيوي', 'Niue', 'Niue', 'nu'],
  [
    158,
    'نيوزيلندا [اوتياروا]',
    'Nouvelle-Zélande [Aotearoa]',
    'New Zealand [Aotearoa]',
    'nz',
  ],
  [159, 'سلطنة عمان', 'Oman', 'Oman', 'om'],
  [160, 'بناما', 'Panama', 'Panama', 'pa'],
  [161, 'بيرو', 'Pérou', 'Peru', 'pe'],
  [162, 'بولينيزيا الفرنسية', 'Polynésie française', 'French Polynesia', 'pf'],
  [
    163,
    'بابوا غينيا الجديدة',
    'Papouasie Nouvelle Guinée',
    'Papua New Guinea',
    'pg',
  ],
  [164, 'الفلبين', 'Philippines', 'Philippines', 'ph'],
  [165, 'باكستان', 'Pakistan', 'Pakistan', 'pk'],
  [166, 'بولندا', 'Pologne', 'Poland', 'pl'],
  [
    167,
    'سانت بيير وميكلون',
    'Saint Pierre et Miquelon',
    'Saint Pierre and Miquelon',
    'pm',
  ],
  [168, 'بيتكيرن', 'Pitcairn', 'Pitcairn', 'pn'],
  [
    169,
    'الأراضي الفلسطينية',
    'Territoire Palestinien',
    'Palestinian Territory',
    'ps',
  ],
  [170, 'البرتغال', 'le Portugal', 'Portugal', 'pt'],
  [171, 'بالاو', 'Palau', 'Palau', 'pw'],
  [172, 'باراغواي', 'Paraguay', 'Paraguay', 'py'],
  [173, 'دولة قطر', 'Qatar', 'Qatar', 'qa'],
  [174, 'جمع شمل', 'Réunion', 'Reunion', 're'],
  [175, 'رومانيا', 'Roumanie', 'Romania', 'ro'],
  [176, 'الاتحاد الروسي', 'Fédération Russe', 'Russian Federation', 'ru'],
  [177, 'رواندا', 'Rwanda', 'Rwanda', 'rw'],
  [178, 'المملكة العربية السعودية', 'Arabie Saoudite', 'Saudi Arabia', 'sa'],
  [179, 'جزر سليمان', 'Les îles Salomon', 'Solomon Islands', 'sb'],
  [180, 'سيشيل', 'les Seychelles', 'Seychelles', 'sc'],
  [181, 'سودان', 'Soudan', 'Sudan', 'sd'],
  [182, 'السويد', 'Suède', 'Sweden', 'se'],
  [183, 'سنغافورة', 'Singapour', 'Singapore', 'sg'],
  [184, 'سانت هيلانة', 'Sainte Hélène', 'Saint Helena', 'sh'],
  [185, 'سلوفينيا', 'La slovénie', 'Slovenia', 'si'],
  [
    186,
    'سفالبارد وجان مايان',
    'Svalbard et Jan Mayen',
    'Svalbard and Jan Mayen',
    'sj',
  ],
  [187, 'سلوفاكيا', 'La slovaquie', 'Slovakia', 'sk'],
  [188, 'سيرا ليون', 'Sierra Leone', 'Sierra Leone', 'sl'],
  [189, 'سان مارينو', 'Saint Marin', 'San Marino', 'sm'],
  [190, 'السنغال', 'Sénégal', 'Senegal', 'sn'],
  [191, 'الصومال', 'Somalie', 'Somalia', 'so'],
  [192, 'سورينام', 'Suriname', 'Suriname', 'sr'],
  [
    193,
    'ساو تومي وبرنسيبي',
    'Sao Tomé et Principe',
    'Sao Tome and Principe',
    'st',
  ],
  [194, 'السلفادور', 'Le Salvador', 'El Salvador', 'sv'],
  [195, 'سوريا', 'Syrie', 'Syria', 'sy'],
  [196, 'سوازيلاند', 'Swaziland', 'Swaziland', 'sz'],
  [
    197,
    'جزر تركس وكايكوس',
    'îles Turques-et-Caïques',
    'Turks and Caicos Islands',
    'tc',
  ],
  [198, 'تشاد', 'Le tchad', 'Chad', 'td'],
  [
    199,
    'المناطق الجنوبية لفرنسا',
    'Terres australes françaises',
    'French Southern Territories',
    'tf',
  ],
  [200, 'ليذهب', 'Aller', 'Togo', 'tg'],
  [201, 'تايلاند', 'Thaïlande', 'Thailand', 'th'],
  [202, 'طاجيكستان', 'Tadjikistan', 'Tajikistan', 'tj'],
  [203, 'توكيلاو', 'Tokelau', 'Tokelau', 'tk'],
  [204, 'تركمانستان', 'Turkménistan', 'Turkmenistan', 'tm'],
  [205, 'تونس', 'Tunisie', 'Tunisia', 'tn'],
  [206, 'تونغا', 'Tonga', 'Tonga', 'to'],
  [207, 'ديك رومي', 'dinde', 'Turkey', 'tr'],
  [208, 'ترينداد وتوباغو', 'Trinité-et-Tobago', 'Trinidad and Tobago', 'tt'],
  [209, 'توفالو', 'Tuvalu', 'Tuvalu', 'tv'],
  [210, 'تايوان', 'Taïwan', 'Taiwan', 'tw'],
  [211, 'تنزانيا', 'Tanzanie', 'Tanzania', 'tz'],
  [212, 'أوكرانيا', 'Ukraine', 'Ukraine', 'ua'],
  [213, 'أوغندا', 'Ouganda', 'Uganda', 'ug'],
  [214, 'أوروغواي', 'Uruguay', 'Uruguay', 'uy'],
  [215, 'أوزبكستان', 'Ouzbékistan', 'Uzbekistan', 'uz'],
  [
    216,
    'سانت فنسنت وجزر غرينادين',
    'Saint-Vincent-et-les-Grenadines',
    'Saint Vincent and the Grenadines',
    'vc',
  ],
  [217, 'فنزويلا', 'Venezuela', 'Venezuela', 've'],
  [
    218,
    'جزر العذراء البريطانية]',
    'Îles vierges britanniques',
    'Virgin Islands [British]',
    'vg',
  ],
  [
    219,
    'جزر فيرجن [الولايات المتحدة]',
    'Îles Vierges [États-Unis]',
    'Virgin Islands [U.S.]',
    'vi',
  ],
  [220, 'فيتنام', 'Viet Nam', 'Viet Nam', 'vn'],
  [221, 'فانواتو', 'Vanuatu', 'Vanuatu', 'vu'],
  [222, 'واليس وفوتونا', 'Wallis et Futuna', 'Wallis and Futuna', 'wf'],
  [223, 'ساموا', 'Samoa', 'Samoa', 'ws'],
  [224, 'اليمن', 'Yémen', 'Yemen', 'ye'],
  [225, 'مايوت', 'Mayotte', 'Mayotte', 'yt'],
  [226, 'جنوب أفريقيا', 'Afrique du Sud', 'South Africa', 'za'],
  [227, 'زامبيا', 'Zambie', 'Zambia', 'zm'],
  [228, 'زائير [سابقة]', 'Zaïre [ancien]', 'Zaire [former]', 'zr'],
  [229, 'زيمبابوي', 'Zimbabwe', 'Zimbabwe', 'zw'],
  [
    230,
    'الولايات المتحدة',
    "les États-Unis d'Amérique",
    'United States of America',
    'us',
  ],
];
import { PrismaClient } from '@prisma/client';

export const countriesSeed = async (prisma: PrismaClient) => {
  let array=countries.map((elem, i) => ({
    id: elem[0].toString(),
    nameAr: elem[1],
    nameFr: elem[2],
    nameEn: elem[3],
    code: elem[4],
  }))
  return await prisma.country.createMany({
    data: array,
  });
};

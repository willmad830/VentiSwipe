/**
 * VentiSwipe - Core Application Logic
 * Dataset sourced from univer.txt (fully updated and deduplicated)
 * Strictly NO emojis and NO em-dashes.
 */

import { initMobile, haptic } from './mobile.js';
import { initGeoBackground } from './geo.js';

// University database directly integrated from univer.txt
const UNIVERSITY_DATABASE = {
  "kz": [
    {
      "id": 1,
      "category": "it",
      "name": "Astana IT University",
      "location": "Астана",
      "specialty": "Cybersecurity & Software Engineering",
      "minScore": 105,
      "baseChance": 85,
      "budgetSavingYear": "2 400 000 ₸ / год",
      "budgetSavingNum": 2400000,
      "currency": "₸",
      "vibeComment": "Сильнейшее IT-комьюнити столицы и хакатоны каждый месяц.",
      "subjects": [
        "math-physics"
      ]
    },
    {
      "id": 2,
      "category": "it",
      "name": "Satbayev University",
      "location": "Алматы",
      "specialty": "Искусственный интеллект и Big Data",
      "minScore": 110,
      "baseChance": 70,
      "budgetSavingYear": "2 600 000 ₸ / год",
      "budgetSavingNum": 2600000,
      "currency": "₸",
      "vibeComment": "Классическая инженерная школа с мощными связями в индустрии.",
      "subjects": [
        "math-physics"
      ]
    },
    {
      "id": 3,
      "category": "it",
      "name": "KBTU (КБТУ)",
      "location": "Алматы",
      "specialty": "Information Systems",
      "minScore": 115,
      "baseChance": 55,
      "budgetSavingYear": "2 800 000 ₸ / год",
      "budgetSavingNum": 2800000,
      "currency": "₸",
      "vibeComment": "Элитный диплом, который ценят в международных фаундациях.",
      "subjects": [
        "math-physics"
      ]
    },
    {
      "id": 4,
      "category": "it",
      "name": "International Information Technology University (IITU)",
      "location": "Алматы",
      "specialty": "Software Engineering & Media Technologies",
      "minScore": 100,
      "baseChance": 80,
      "budgetSavingYear": "2 200 000 ₸ / год",
      "budgetSavingNum": 2200000,
      "currency": "₸",
      "vibeComment": "Специализированный IT-вуз с высоким процентом трудоустройства выпускников.",
      "subjects": [
        "math-physics"
      ]
    },
    {
      "id": 5,
      "category": "engineering",
      "name": "ENU им. Гумилева",
      "location": "Астана",
      "specialty": "Транспортная инженерия и логистика",
      "minScore": 90,
      "baseChance": 90,
      "budgetSavingYear": "1 300 000 ₸ / год",
      "budgetSavingNum": 1300000,
      "currency": "₸",
      "vibeComment": "Огромный кампус, много бюджетных мест и студенческая жизнь.",
      "subjects": [
        "math-physics",
        "geo-math"
      ]
    },
    {
      "id": 6,
      "category": "engineering",
      "name": "Satbayev University",
      "location": "Алматы",
      "specialty": "Нефтегазовое дело и геоэкология",
      "minScore": 102,
      "baseChance": 75,
      "budgetSavingYear": "2 200 000 ₸ / год",
      "budgetSavingNum": 2200000,
      "currency": "₸",
      "vibeComment": "Исторический центр притяжения будущих инженеров страны.",
      "subjects": [
        "math-physics",
        "geo-math"
      ]
    },
    {
      "id": 7,
      "category": "engineering",
      "name": "Auezov University",
      "location": "Шымкент",
      "specialty": "Мехатроника и машиностроение",
      "minScore": 75,
      "baseChance": 95,
      "budgetSavingYear": "1 000 000 ₸ / год",
      "budgetSavingNum": 1000000,
      "currency": "₸",
      "vibeComment": "Крупный региональный университет с сильными техническими грантами.",
      "subjects": [
        "math-physics",
        "geo-math"
      ]
    },
    {
      "id": 8,
      "category": "engineering",
      "name": "Karaganda State Industrial University",
      "location": "Темиртау",
      "specialty": "Металлургия и материаловедение",
      "minScore": 70,
      "baseChance": 98,
      "budgetSavingYear": "950 000 ₸ / год",
      "budgetSavingNum": 950000,
      "currency": "₸",
      "vibeComment": "Прямые контракты с крупнейшими промышленными заводами.",
      "subjects": [
        "math-physics",
        "geo-math"
      ]
    },
    {
      "id": 9,
      "category": "medicine",
      "name": "КазНМУ им. Асфендиярова",
      "location": "Алматы",
      "specialty": "Общая медицина (General Medicine)",
      "minScore": 118,
      "baseChance": 50,
      "budgetSavingYear": "3 000 000 ₸ / год",
      "budgetSavingNum": 3000000,
      "currency": "₸",
      "vibeComment": "Главная кузница медицинских кадров с жестким отбором.",
      "subjects": [
        "chem-bio"
      ]
    },
    {
      "id": 10,
      "category": "medicine",
      "name": "МУА (Медицинский университет Астана)",
      "location": "Астана",
      "specialty": "Педиатрия и стоматология",
      "minScore": 112,
      "baseChance": 65,
      "budgetSavingYear": "2 500 000 ₸ / год",
      "budgetSavingNum": 2500000,
      "currency": "₸",
      "vibeComment": "Современные клинические базы и сильный преподавательский состав.",
      "subjects": [
        "chem-bio"
      ]
    },
    {
      "id": 11,
      "category": "medicine",
      "name": "West Kazakhstan Medical University",
      "location": "Актобе",
      "specialty": "Лечебное дело",
      "minScore": 95,
      "baseChance": 85,
      "budgetSavingYear": "1 400 000 ₸ / год",
      "budgetSavingNum": 1400000,
      "currency": "₸",
      "vibeComment": "Ведущий медицинский центр западного региона страны.",
      "subjects": [
        "chem-bio"
      ]
    },
    {
      "id": 12,
      "category": "medicine",
      "name": "Semey Medical University",
      "location": "Семей",
      "specialty": "Общая медицина и фармация",
      "minScore": 90,
      "baseChance": 88,
      "budgetSavingYear": "1 300 000 ₸ / год",
      "budgetSavingNum": 1300000,
      "currency": "₸",
      "vibeComment": "Доступные гранты и отличная практическая база в восточном регионе.",
      "subjects": [
        "chem-bio"
      ]
    },
    {
      "id": 13,
      "category": "business",
      "name": "NARXOZ University",
      "location": "Алматы",
      "specialty": "Финансы, аудит и цифровой маркетинг",
      "minScore": 95,
      "baseChance": 80,
      "budgetSavingYear": "2 100 000 ₸ / год",
      "budgetSavingNum": 2100000,
      "currency": "₸",
      "vibeComment": "Полностью обновленный кампус в британском стиле.",
      "subjects": [
        "geo-math",
        "hist-eng"
      ]
    },
    {
      "id": 14,
      "category": "business",
      "name": "KIMEP University",
      "location": "Алматы",
      "specialty": "Accounting and Finance",
      "minScore": 105,
      "baseChance": 60,
      "budgetSavingYear": "4 200 000 ₸ / год",
      "budgetSavingNum": 4200000,
      "currency": "₸",
      "vibeComment": "Североамериканский стандарт образования и сильный нетворкинг.",
      "subjects": [
        "geo-math",
        "hist-eng"
      ]
    },
    {
      "id": 15,
      "category": "business",
      "name": "SDU University (СДУ)",
      "location": "Каскелен",
      "specialty": "Экономика и менеджмент",
      "minScore": 100,
      "baseChance": 75,
      "budgetSavingYear": "1 800 000 ₸ / год",
      "budgetSavingNum": 1800000,
      "currency": "₸",
      "vibeComment": "Высокие стандарты обучения и сильное студенческое самоуправление.",
      "subjects": [
        "geo-math",
        "hist-eng"
      ]
    },
    {
      "id": 16,
      "category": "business",
      "name": "Turan University",
      "location": "Алматы",
      "specialty": "Маркетинг и международный бизнес",
      "minScore": 85,
      "baseChance": 90,
      "budgetSavingYear": "1 500 000 ₸ / год",
      "budgetSavingNum": 1500000,
      "currency": "₸",
      "vibeComment": "Практико-ориентированный подход и поддержка студенческих стартапов.",
      "subjects": [
        "geo-math",
        "hist-eng"
      ]
    }
  ],
  "abroad": [
    {
      "id": 101,
      "category": "it",
      "name": "Massachusetts Institute of Technology (MIT)",
      "location": "США",
      "region": "usa",
      "specialty": "Computer Science & Artificial Intelligence",
      "minSat": 1500,
      "minIelts": 7.5,
      "baseChance": 40,
      "budgetSavingYear": "$58,000 / год",
      "budgetSavingNum": 58000,
      "currency": "$",
      "vibeComment": "Мировой лидер в IT и инженерии. Конкуренция жесточайшая, но оно того стоит."
    },
    {
      "id": 102,
      "category": "it",
      "name": "Stanford University",
      "location": "США",
      "region": "usa",
      "specialty": "Computer Science & Systems",
      "minSat": 1520,
      "minIelts": 7.5,
      "baseChance": 35,
      "budgetSavingYear": "$60,000 / год",
      "budgetSavingNum": 60000,
      "currency": "$",
      "vibeComment": "Эпицентр Кремниевой долины, откуда выросли крупнейшие тех-гиганты."
    },
    {
      "id": 103,
      "category": "it",
      "name": "Carnegie Mellon University",
      "location": "США",
      "region": "usa",
      "specialty": "Software Engineering & Robotics",
      "minSat": 1480,
      "minIelts": 7.0,
      "baseChance": 45,
      "budgetSavingYear": "$55,000 / год",
      "budgetSavingNum": 55000,
      "currency": "$",
      "vibeComment": "Легендарная школа робототехники и искусственного интеллекта."
    },
    {
      "id": 104,
      "category": "it",
      "name": "University of California, Berkeley",
      "location": "США",
      "region": "usa",
      "specialty": "EECS (Electrical Engineering & Computer Sciences)",
      "minSat": 1420,
      "minIelts": 7.0,
      "baseChance": 50,
      "budgetSavingYear": "$44,000 / год",
      "budgetSavingNum": 44000,
      "currency": "$",
      "vibeComment": "Мощнейший государственный исследовательский центр с прочной связью с IT-индустрией."
    },
    {
      "id": 105,
      "category": "it",
      "name": "Technical University of Munich (TUM)",
      "location": "Германия",
      "region": "europe",
      "specialty": "Informatics & Software Systems",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 70,
      "budgetSavingYear": "Бесплатно (0 €) / год",
      "budgetSavingNum": 0,
      "currency": "€",
      "vibeComment": "Обучение бесплатно, сильнейшая техническая база в сердце Европы."
    },
    {
      "id": 106,
      "category": "it",
      "name": "EPFL (Ecole Polytechnique Federale de Lausanne)",
      "location": "Швейцария",
      "region": "europe",
      "specialty": "Computer Science",
      "minSat": 1400,
      "minIelts": 7.0,
      "baseChance": 55,
      "budgetSavingYear": "1 200 CHF / год",
      "budgetSavingNum": 1200,
      "currency": "CHF",
      "vibeComment": "Швейцарский технологический институт с мировым признанием и низкой стоимостью."
    },
    {
      "id": 107,
      "category": "it",
      "name": "Delft University of Technology",
      "location": "Нидерланды",
      "region": "europe",
      "specialty": "Computer Science and Engineering",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 65,
      "budgetSavingYear": "16,000 € / год",
      "budgetSavingNum": 16000,
      "currency": "€",
      "vibeComment": "Флагман технического образования Нидерландов с англоязычной средой."
    },
    {
      "id": 108,
      "category": "it",
      "name": "KTH Royal Institute of Technology",
      "location": "Швеция",
      "region": "europe",
      "specialty": "Information and Communication Technology",
      "minSat": 1250,
      "minIelts": 6.5,
      "baseChance": 68,
      "budgetSavingYear": "150,000 SEK / год",
      "budgetSavingNum": 150000,
      "currency": "SEK",
      "vibeComment": "Шведский инновационный центр с сильным упором на практические проекты."
    },
    {
      "id": 109,
      "category": "it",
      "name": "Nanyang Technological University (NTU)",
      "location": "Сингапур",
      "region": "asia",
      "specialty": "Data Science & Computer Engineering",
      "minSat": 1350,
      "minIelts": 6.5,
      "baseChance": 65,
      "budgetSavingYear": "$35,000 / год",
      "budgetSavingNum": 35000,
      "currency": "$",
      "vibeComment": "Азиатский технологический тигр с огромными грантами для иностранцев."
    },
    {
      "id": 110,
      "category": "it",
      "name": "National University of Singapore (NUS)",
      "location": "Сингапур",
      "region": "asia",
      "specialty": "Computing & Information Systems",
      "minSat": 1420,
      "minIelts": 7.0,
      "baseChance": 50,
      "budgetSavingYear": "$38,000 / год",
      "budgetSavingNum": 38000,
      "currency": "$",
      "vibeComment": "Лучший университет Азии с колоссальным авторитетом в глобальном IT."
    },
    {
      "id": 111,
      "category": "it",
      "name": "KAIST (Korea Advanced Institute of Science & Technology)",
      "location": "Южная Корея",
      "region": "asia",
      "specialty": "Computer Science",
      "minSat": 1350,
      "minIelts": 6.5,
      "baseChance": 70,
      "budgetSavingYear": "Полный грант (0 ₩) / год",
      "budgetSavingNum": 0,
      "currency": "₩",
      "vibeComment": "Корейский технологический гигант, полностью покрывающий расходы студентов."
    },
    {
      "id": 112,
      "category": "it",
      "name": "Tsinghua University",
      "location": "Китай",
      "region": "asia",
      "specialty": "Computer Science and Technology",
      "minSat": 1400,
      "minIelts": 7.0,
      "baseChance": 55,
      "budgetSavingYear": "$40,000 / год",
      "budgetSavingNum": 40000,
      "currency": "$",
      "vibeComment": "Главный технический вуз Китая, обгоняющий западные аналоги по ряду IT-направлений."
    },
    {
      "id": 113,
      "category": "engineering",
      "name": "California Institute of Technology (Caltech)",
      "location": "США",
      "region": "usa",
      "specialty": "Mechanical and Civil Engineering",
      "minSat": 1520,
      "minIelts": 7.5,
      "baseChance": 38,
      "budgetSavingYear": "$60,000 / год",
      "budgetSavingNum": 60000,
      "currency": "$",
      "vibeComment": "Управляет Лабораторией реактивного движения NASA. Предел мечты инженера."
    },
    {
      "id": 114,
      "category": "engineering",
      "name": "Georgia Institute of Technology",
      "location": "США",
      "region": "usa",
      "specialty": "Aerospace & Industrial Engineering",
      "minSat": 1380,
      "minIelts": 7.0,
      "baseChance": 55,
      "budgetSavingYear": "$32,000 / год",
      "budgetSavingNum": 32000,
      "currency": "$",
      "vibeComment": "Мощнейшая инженерная школа США с высоким процентом трудоустройства."
    },
    {
      "id": 115,
      "category": "engineering",
      "name": "University of Michigan, Ann Arbor",
      "location": "США",
      "region": "usa",
      "specialty": "Mechanical Engineering",
      "minSat": 1350,
      "minIelts": 7.0,
      "baseChance": 58,
      "budgetSavingYear": "$52,000 / год",
      "budgetSavingNum": 52000,
      "currency": "$",
      "vibeComment": "Огромный исследовательской бюджет и авторитетные лаборатории."
    },
    {
      "id": 116,
      "category": "engineering",
      "name": "Purdue University",
      "location": "США",
      "region": "usa",
      "specialty": "Aeronautical and Astronautical Engineering",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 65,
      "budgetSavingYear": "$31,000 / год",
      "budgetSavingNum": 31000,
      "currency": "$",
      "vibeComment": "Колыбель американских астронавтов и передовых промышленных технологий."
    },
    {
      "id": 117,
      "category": "engineering",
      "name": "Politecnico di Milano",
      "location": "Италия",
      "region": "europe",
      "specialty": "Mechanical & Aerospace Engineering",
      "minSat": 1240,
      "minIelts": 6.0,
      "baseChance": 75,
      "budgetSavingYear": "3 900 € / год",
      "budgetSavingNum": 3900,
      "currency": "€",
      "vibeComment": "Крупнейший техвуз Италии с прогрессивной шкалой оплаты и грантами."
    },
    {
      "id": 118,
      "category": "engineering",
      "name": "Delft University of Technology",
      "location": "Нидерланды",
      "region": "europe",
      "specialty": "Aerospace & Sustainable Technology",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 60,
      "budgetSavingYear": "22,000 € / год",
      "budgetSavingNum": 22000,
      "currency": "€",
      "vibeComment": "Инженерная элита Нидерландов с проектами глобального масштаба."
    },
    {
      "id": 119,
      "category": "engineering",
      "name": "ETH Zurich",
      "location": "Швейцария",
      "region": "europe",
      "specialty": "Civil & Mechanical Engineering",
      "minSat": 1450,
      "minIelts": 7.0,
      "baseChance": 50,
      "budgetSavingYear": "1 200 CHF / год",
      "budgetSavingNum": 1200,
      "currency": "CHF",
      "vibeComment": "Альма-матер Эйнштейна с минимальной платой за учебу и строгим отбором."
    },
    {
      "id": 120,
      "category": "engineering",
      "name": "Aalto University",
      "location": "Финляндия",
      "region": "europe",
      "specialty": "Automation and Electrical Engineering",
      "minSat": 1200,
      "minIelts": 6.0,
      "baseChance": 70,
      "budgetSavingYear": "15,000 € / год",
      "budgetSavingNum": 15000,
      "currency": "€",
      "vibeComment": "Северный инновационный хаб с отличными грантами на покрытие tuition."
    },
    {
      "id": 121,
      "category": "engineering",
      "name": "Tokyo Institute of Technology (Tokyo Tech)",
      "location": "Япония",
      "region": "asia",
      "specialty": "Mechanical Engineering & Robotics",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 68,
      "budgetSavingYear": "635,000 JPY / год",
      "budgetSavingNum": 635000,
      "currency": "JPY",
      "vibeComment": "Ведущий технический университет Японии с мощной лабораторной базой."
    },
    {
      "id": 122,
      "category": "engineering",
      "name": "National Taiwan University (NTU)",
      "location": "Тайвань",
      "region": "asia",
      "specialty": "Civil & Electrical Engineering",
      "minSat": 1250,
      "minIelts": 6.5,
      "baseChance": 72,
      "budgetSavingYear": "$5,000 / год",
      "budgetSavingNum": 5000,
      "currency": "$",
      "vibeComment": "Тесная интеграция с мировой полупроводниковой индустрией Тайваня."
    },
    {
      "id": 123,
      "category": "engineering",
      "name": "UNIST (Ulsan National Institute of Science and Technology)",
      "location": "Южная Корея",
      "region": "asia",
      "specialty": "Advanced Materials Engineering",
      "minSat": 1280,
      "minIelts": 6.5,
      "baseChance": 70,
      "budgetSavingYear": "Полный грант (0 ₩) / год",
      "budgetSavingNum": 0,
      "currency": "₩",
      "vibeComment": "Молодой и динамично развивающийся корейский вуз с фокусом на науку."
    },
    {
      "id": 124,
      "category": "engineering",
      "name": "Shanghai Jiao Tong University",
      "location": "Китай",
      "region": "asia",
      "specialty": "Mechanical Engineering",
      "minSat": 1320,
      "minIelts": 6.5,
      "baseChance": 60,
      "budgetSavingYear": "$30,000 / год",
      "budgetSavingNum": 30000,
      "currency": "$",
      "vibeComment": "Один из лучших инженерных вузов Китая с мировыми позициями в рейтингах."
    },
    {
      "id": 125,
      "category": "business",
      "name": "University of Pennsylvania (Wharton)",
      "location": "США",
      "region": "usa",
      "specialty": "Finance and Management",
      "minSat": 1500,
      "minIelts": 7.5,
      "baseChance": 42,
      "budgetSavingYear": "$58,000 / год",
      "budgetSavingNum": 58000,
      "currency": "$",
      "vibeComment": "Легендарная бизнес-школа Уортон, формирующая финансовую элиту мира."
    },
    {
      "id": 126,
      "category": "business",
      "name": "New York University (Stern)",
      "location": "США",
      "region": "usa",
      "specialty": "International Business & Economics",
      "minSat": 1450,
      "minIelts": 7.0,
      "baseChance": 48,
      "budgetSavingYear": "$56,000 / год",
      "budgetSavingNum": 56000,
      "currency": "$",
      "vibeComment": "Расположена в самом центре Уолл-стрит. Прямой путь в инвестиции."
    },
    {
      "id": 127,
      "category": "business",
      "name": "University of California, Berkeley (Haas)",
      "location": "США",
      "region": "usa",
      "specialty": "Business Administration",
      "minSat": 1400,
      "minIelts": 7.0,
      "baseChance": 52,
      "budgetSavingYear": "$45,000 / год",
      "budgetSavingNum": 45000,
      "currency": "$",
      "vibeComment": "Инновационный подход к предпринимательству и стартап-культуре."
    },
    {
      "id": 128,
      "category": "business",
      "name": "University of Michigan (Ross)",
      "location": "США",
      "region": "usa",
      "specialty": "Business Administration",
      "minSat": 1380,
      "minIelts": 7.0,
      "baseChance": 55,
      "budgetSavingYear": "$50,000 / год",
      "budgetSavingNum": 50000,
      "currency": "$",
      "vibeComment": "Практическое обучение через реальные проекты с корпорациями."
    },
    {
      "id": 129,
      "category": "business",
      "name": "Bocconi University",
      "location": "Италия",
      "region": "europe",
      "specialty": "International Economics and Finance",
      "minSat": 1400,
      "minIelts": 6.5,
      "baseChance": 55,
      "budgetSavingYear": "16,000 € / год",
      "budgetSavingNum": 16000,
      "currency": "€",
      "vibeComment": "Главный европейский трамплин в инвестиционный банкинг и консалтинг."
    },
    {
      "id": 130,
      "category": "business",
      "name": "IE University",
      "location": "Испания",
      "region": "europe",
      "specialty": "Business Administration & Technology",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 70,
      "budgetSavingYear": "22,800 € / год",
      "budgetSavingNum": 22800,
      "currency": "€",
      "vibeComment": "Инновационный подход к бизнесу, стартапам и сильный нетворкинг."
    },
    {
      "id": 131,
      "category": "business",
      "name": "University of Amsterdam (UvA)",
      "location": "Нидерланды",
      "region": "europe",
      "specialty": "Business Administration",
      "minSat": 1250,
      "minIelts": 6.5,
      "baseChance": 65,
      "budgetSavingYear": "11,000 € / год",
      "budgetSavingNum": 11000,
      "currency": "€",
      "vibeComment": "Престижный европейский университет в самом сердце Амстердама."
    },
    {
      "id": 132,
      "category": "business",
      "name": "University of Warwick",
      "location": "Великобритания",
      "region": "europe",
      "specialty": "Management and Business Studies",
      "minSat": 1320,
      "minIelts": 7.0,
      "baseChance": 58,
      "budgetSavingYear": "27,000 £ / год",
      "budgetSavingNum": 27000,
      "currency": "£",
      "vibeComment": "Топ-бизнес-школа Великобритании с тесными связями с корпорациями."
    },
    {
      "id": 133,
      "category": "business",
      "name": "HKUST Business School",
      "location": "Гонконг",
      "region": "asia",
      "specialty": "International Management & Finance",
      "minSat": 1400,
      "minIelts": 7.0,
      "baseChance": 60,
      "budgetSavingYear": "$45,000 HKD / год",
      "budgetSavingNum": 45000,
      "currency": "HKD",
      "vibeComment": "Финансовое сердце Азии и ультрасовременный кампус на берегу моря."
    },
    {
      "id": 134,
      "category": "business",
      "name": "National University of Singapore (NUS Business)",
      "location": "Сингапур",
      "region": "asia",
      "specialty": "Business Administration",
      "minSat": 1420,
      "minIelts": 7.0,
      "baseChance": 52,
      "budgetSavingYear": "$35,000 / год",
      "budgetSavingNum": 35000,
      "currency": "$",
      "vibeComment": "Элитное бизнес-образование в глобальном экономическом хабе."
    },
    {
      "id": 135,
      "category": "business",
      "name": "Korea University Business School (KUBS)",
      "location": "Южная Корея",
      "region": "asia",
      "specialty": "Business Administration",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 68,
      "budgetSavingYear": "9 000 000 ₩ / год",
      "budgetSavingNum": 9000000,
      "currency": "₩",
      "vibeComment": "Первая аккредитованная AACSB бизнес-школа в Корее с сильными связями с chaebol."
    },
    {
      "id": 136,
      "category": "business",
      "name": "Fudan University School of Management",
      "location": "Китай",
      "region": "asia",
      "specialty": "Business and Economics",
      "minSat": 1350,
      "minIelts": 6.5,
      "baseChance": 62,
      "budgetSavingYear": "60,000 RMB / год",
      "budgetSavingNum": 60000,
      "currency": "RMB",
      "vibeComment": "Ключевой экономический университет Китая в финансовом центре Шанхая."
    },
    {
      "id": 137,
      "category": "medicine",
      "name": "Johns Hopkins University",
      "location": "США",
      "region": "usa",
      "specialty": "Molecular Biology & Pre-Medicine",
      "minSat": 1500,
      "minIelts": 7.5,
      "baseChance": 38,
      "budgetSavingYear": "$61,000 / год",
      "budgetSavingNum": 61000,
      "currency": "$",
      "vibeComment": "Безоговорочный лидер в медицинских исследованиях и биоинженерии."
    },
    {
      "id": 138,
      "category": "medicine",
      "name": "Harvard University",
      "location": "США",
      "region": "usa",
      "specialty": "Human Sciences & Pre-Med Track",
      "minSat": 1520,
      "minIelts": 7.5,
      "baseChance": 30,
      "budgetSavingYear": "$55,000 / год",
      "budgetSavingNum": 55000,
      "currency": "$",
      "vibeComment": "Глобальный авторитет в медицинской науке и здравоохранении."
    },
    {
      "id": 139,
      "category": "medicine",
      "name": "University of California, Los Angeles (UCLA)",
      "location": "США",
      "region": "usa",
      "specialty": "Biochemistry & Biomedical Research",
      "minSat": 1400,
      "minIelts": 7.0,
      "baseChance": 50,
      "budgetSavingYear": "$43,000 / год",
      "budgetSavingNum": 43000,
      "currency": "$",
      "vibeComment": "Передовые медицинские центры Калифорнии и сильные научные гранты."
    },
    {
      "id": 140,
      "category": "medicine",
      "name": "Boston University",
      "location": "США",
      "region": "usa",
      "specialty": "Health Science & Biomedical Engineering",
      "minSat": 1350,
      "minIelts": 7.0,
      "baseChance": 58,
      "budgetSavingYear": "$58,000 / год",
      "budgetSavingNum": 58000,
      "currency": "$",
      "vibeComment": "Расположена в медицинском хабе Бостона с доступом к ведущим госпиталям."
    },
    {
      "id": 141,
      "category": "medicine",
      "name": "University of Debrecen",
      "location": "Венгрия",
      "region": "europe",
      "specialty": "General Medicine & Pharmacy",
      "minSat": 1200,
      "minIelts": 6.0,
      "baseChance": 75,
      "budgetSavingYear": "$17,000 / год",
      "budgetSavingNum": 17000,
      "currency": "$",
      "vibeComment": "Диплом признается ВОЗ и всей Европой при доступной стоимости."
    },
    {
      "id": 142,
      "category": "medicine",
      "name": "Charles University",
      "location": "Чехия",
      "region": "europe",
      "specialty": "General Medicine",
      "minSat": 1250,
      "minIelts": 6.5,
      "baseChance": 65,
      "budgetSavingYear": "14,000 € / год",
      "budgetSavingNum": 14000,
      "currency": "€",
      "vibeComment": "Один из старейших медицинских факультетов Центральной Европы."
    },
    {
      "id": 143,
      "category": "medicine",
      "name": "Humanitas University",
      "location": "Италия",
      "region": "europe",
      "specialty": "Medicine and Surgery",
      "minSat": 1300,
      "minIelts": 6.5,
      "baseChance": 60,
      "budgetSavingYear": "20,000 € / год",
      "budgetSavingNum": 20000,
      "currency": "€",
      "vibeComment": "Ультрасовременный медицинский хаб и клиника прямо при кампусе."
    },
    {
      "id": 144,
      "category": "medicine",
      "name": "Karolinska Institute",
      "location": "Швеция",
      "region": "europe",
      "specialty": "Biomedicine",
      "minSat": 1380,
      "minIelts": 7.0,
      "baseChance": 50,
      "budgetSavingYear": "180,000 SEK / год",
      "budgetSavingNum": 180000,
      "currency": "SEK",
      "vibeComment": "Шведский медицинский университет, выбирающий нобелевских лауреатов по физиологии."
    },
    {
      "id": 145,
      "category": "medicine",
      "name": "National University of Singapore (NUS Yong Loo Lin)",
      "location": "Сингапур",
      "region": "asia",
      "specialty": "Medicine",
      "minSat": 1450,
      "minIelts": 7.5,
      "baseChance": 45,
      "budgetSavingYear": "$40,000 / год",
      "budgetSavingNum": 40000,
      "currency": "$",
      "vibeComment": "Ведущая медицинская школа Юго-Восточной Азии с жестким международным отбором."
    },
    {
      "id": 146,
      "category": "medicine",
      "name": "Seoul National University College of Medicine",
      "location": "Южная Корея",
      "region": "asia",
      "specialty": "Medical Science",
      "minSat": 1400,
      "minIelts": 7.0,
      "baseChance": 50,
      "budgetSavingYear": "8 000 000 ₩ / год",
      "budgetSavingNum": 8000000,
      "currency": "₩",
      "vibeComment": "Флагман корейской медицины с передовыми технологиями лечения и диагностики."
    },
    {
      "id": 147,
      "category": "medicine",
      "name": "University of Hong Kong (Li Ka Shing Faculty of Medicine)",
      "location": "Гонконг",
      "region": "asia",
      "specialty": "Medicine and Surgery",
      "minSat": 1420,
      "minIelts": 7.0,
      "baseChance": 48,
      "budgetSavingYear": "$42,000 / год",
      "budgetSavingNum": 42000,
      "currency": "$",
      "vibeComment": "Международный стандарт клинической подготовки в динамичном мегаполисе."
    },
    {
      "id": 148,
      "category": "medicine",
      "name": "Peking University Health Science Center",
      "location": "Китай",
      "region": "asia",
      "specialty": "Clinical Medicine",
      "minSat": 1350,
      "minIelts": 6.5,
      "baseChance": 58,
      "budgetSavingYear": "45,000 RMB / год",
      "budgetSavingNum": 45000,
      "currency": "RMB",
      "vibeComment": "Исторический центр медицинских инноваций и клинической практики в Китае."
    }
  ]
};

// Global State
const appState = {
  currentQuizStep: 1,
  track: 'kz', // 'kz' or 'abroad'
  entScore: 110,
  kzSubject: 'all',
  satScore: 1350,
  ieltsScore: 7.0,
  abroadRegion: 'all',
  category: 'all', // 'all', 'it', 'engineering', 'medicine', 'business'
  currentDeck: [],
  currentIndex: 0,
  likedUniversities: [],
  totalInitialDeckSize: 0,
  swipeHistory: [],
  reelMode: false
};

// Calculation Formulas
function calculateKzChance(userScore, minScore, baseChance) {
  const diff = userScore - minScore;
  let computedChance = baseChance + (diff * 2.5);
  if (computedChance > 98) computedChance = 98;
  if (computedChance < 12) computedChance = 12;
  return Math.round(computedChance);
}

function calculateAbroadChance(userSat, userIelts, minSat, minIelts, baseChance) {
  const satDelta = (userSat - minSat) / 10;
  const ieltsDelta = (userIelts - minIelts) * 15;
  let computedChance = baseChance + satDelta + ieltsDelta;
  if (computedChance > 95) computedChance = 95;
  if (computedChance < 10) computedChance = 10;
  return Math.round(computedChance);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const categoryLabels = {
  it: 'IT и технологии',
  engineering: 'Инженерия',
  medicine: 'Медицина',
  business: 'Бизнес и финансы'
};

// Update Quiz Navigation & UI
function updateQuizUI() {
  const step = appState.currentQuizStep;
  
  // Update step counter & progress bar
  const counterEl = document.getElementById('quiz-step-counter');
  const barEl = document.getElementById('quiz-progress-bar');
  if (counterEl) counterEl.textContent = 'Вопрос ' + step + ' из 4';
  if (barEl) barEl.style.width = (step * 25) + '%';

  // Hide all screens, show active
  for (let i = 1; i <= 4; i++) {
    const screenEl = document.getElementById('quiz-screen-' + i);
    if (screenEl) {
      if (i === step) {
        screenEl.classList.add('active');
      } else {
        screenEl.classList.remove('active');
      }
    }
  }

  // Adjust Screen 2 contents according to track
  const s2Kz = document.getElementById('quiz-screen-2-kz');
  const s2Abroad = document.getElementById('quiz-screen-2-abroad');
  if (s2Kz && s2Abroad) {
    if (appState.track === 'kz') {
      s2Kz.style.display = 'block';
      s2Abroad.style.display = 'none';
    } else {
      s2Kz.style.display = 'none';
      s2Abroad.style.display = 'block';
    }
  }

  // Adjust Screen 3 contents according to track
  const s3Kz = document.getElementById('quiz-screen-3-kz');
  const s3Abroad = document.getElementById('quiz-screen-3-abroad');
  if (s3Kz && s3Abroad) {
    if (appState.track === 'kz') {
      s3Kz.style.display = 'block';
      s3Abroad.style.display = 'none';
    } else {
      s3Kz.style.display = 'none';
      s3Abroad.style.display = 'block';
    }
  }

  if (window.refreshCursorField) window.refreshCursorField();
  document.dispatchEvent(new CustomEvent('venti:step', { detail: { step: step } }));
}

// Prepare Deck & Deduplicate
function prepareDeck() {
  const isKz = appState.track === 'kz';
  const rawList = isKz ? UNIVERSITY_DATABASE.kz : UNIVERSITY_DATABASE.abroad;
  
  // Filter by category and subjects
  const filtered = rawList.filter(item => {
    if (appState.category !== 'all' && item.category !== appState.category) {
      return false;
    }
    if (isKz && appState.kzSubject !== 'all') {
      if (item.subjects && !item.subjects.includes(appState.kzSubject)) {
        return false;
      }
    }
    if (!isKz && appState.abroadRegion !== 'all') {
      if (item.region !== appState.abroadRegion) {
        return false;
      }
    }
    return true;
  });

  const activeList = filtered.length > 0 ? filtered : rawList;

  // Deduplicate initial list by university name so no duplicate cards appear
  const seenNames = new Set();
  const uniqueList = [];
  activeList.forEach(item => {
    if (!seenNames.has(item.name)) {
      seenNames.add(item.name);
      uniqueList.push(item);
    }
  });

  appState.currentDeck = uniqueList.map(item => {
    let calculatedChance = 0;
    if (isKz) {
      calculatedChance = calculateKzChance(appState.entScore, item.minScore, item.baseChance);
    } else {
      calculatedChance = calculateAbroadChance(
        appState.satScore,
        appState.ieltsScore,
        item.minSat,
        item.minIelts,
        item.baseChance
      );
    }
    return {
      ...item,
      calculatedChance: calculatedChance
    };
  });

  appState.currentDeck.sort((a, b) => b.calculatedChance - a.calculatedChance);
  
  // Cap deck to at most 7 top cards
  if (appState.currentDeck.length > 7) {
    appState.currentDeck = appState.currentDeck.slice(0, 7);
  }

  appState.currentIndex = 0;
  appState.likedUniversities = [];
  appState.totalInitialDeckSize = appState.currentDeck.length;
  appState.swipeHistory = [];
  updateMobileUndoState();
}

// Venti AI Assistant Replica Library
const VENTI_REPLICAS = {
  skip: [
    "Отклонил этот университет? Смело, учитывая твой балл. Метишь выше?",
    "Уверен? Здесь один из самых высоких процентов трудоустройства выпускников.",
    "Отказ принят. Ищем варианты с меньшей конкуренцией."
  ],
  like: [
    "Отличный выбор! С твоими баллами здесь высокие шансы на бюджет.",
    "Этот вуз славится своим сильным комьюнити и поддержкой стартапов.",
    "Засчитано. Бюджет этого направления полностью перекрывает твои амбиции."
  ],
  borderline: [
    "Рискованно. Конкурс на место высокий, придется подтянуть профильный предмет.",
    "На грани фола, но твой балл позволяет побороться за грант при хорошем эссе."
  ]
};

// ===== Premium Motion + Venti Controllers =====

const MOTION_EASE_SPRING = 'cubic-bezier(0.34, 1.4, 0.64, 1)';
const MOTION_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const MOTION_EASE_SOFT = 'cubic-bezier(0.22, 1, 0.36, 1)';

let ventiTooltipTimer = null;
let prefersReducedMotion = false;

function getReducedMotionPref() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function crossfadeText(el, nextText) {
  if (!el) return;
  if (prefersReducedMotion) {
    el.textContent = nextText;
    return;
  }
  el.classList.add('is-fading');
  window.setTimeout(() => {
    el.textContent = nextText;
    el.classList.remove('is-fading');
  }, 220);
}

function showVentiBubble(text, type) {
  const bubble = document.getElementById('venti-bubble');
  const tooltip = document.getElementById('venti-bubble-tooltip');
  if (!bubble || !tooltip) return;

  if (ventiTooltipTimer) {
    clearTimeout(ventiTooltipTimer);
    ventiTooltipTimer = null;
  }

  crossfadeText(tooltip, text);
  tooltip.classList.add('visible');

  bubble.classList.remove('reacting-like', 'reacting-skip', 'reacting-borderline');
  if (type === 'like') bubble.classList.add('reacting-like');
  else if (type === 'skip') bubble.classList.add('reacting-skip');
  else if (type === 'borderline') bubble.classList.add('reacting-borderline');

  ventiTooltipTimer = setTimeout(() => {
    tooltip.classList.remove('visible');
    bubble.classList.remove('reacting-like', 'reacting-skip', 'reacting-borderline');
  }, 3500);
}

function updateVentiCommentary(triggerType) {
  let list = [];
  if (triggerType === 'skip') {
    list = VENTI_REPLICAS.skip;
  } else if (triggerType === 'like') {
    list = VENTI_REPLICAS.like;
  } else if (triggerType === 'borderline') {
    list = VENTI_REPLICAS.borderline;
  }

  if (list && list.length > 0) {
    const text = list[Math.floor(Math.random() * list.length)];
    showVentiBubble(text, triggerType);
  }
}

function initVentiBubble() {
  const bubble = document.getElementById('venti-bubble');
  const tooltip = document.getElementById('venti-bubble-tooltip');
  if (!bubble || !tooltip) return;

  const toggleTooltip = () => {
    const isVisible = tooltip.classList.contains('visible');
    if (isVisible) {
      tooltip.classList.remove('visible');
      if (ventiTooltipTimer) {
        clearTimeout(ventiTooltipTimer);
        ventiTooltipTimer = null;
      }
    } else {
      const step2 = document.getElementById('step-2-swiper');
      let greeting = 'Свайпай вузы, чтобы собрать свой список. Вправо значит добавить в лист.';
      if (step2 && !step2.classList.contains('hidden')) {
        greeting = 'Свайпай вправо, чтобы добавить в список. Свайпай влево, чтобы пропустить.';
      }
      crossfadeText(tooltip, greeting);
      tooltip.classList.add('visible');
      ventiTooltipTimer = setTimeout(() => {
        tooltip.classList.remove('visible');
      }, 4000);
    }
  };

  bubble.addEventListener('click', toggleTooltip);
  bubble.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTooltip();
    }
  });

  // Release the intro animation class so magnetic tilt can take over the transform.
  window.setTimeout(() => bubble.classList.remove('is-appearing'), 900);
}

function initScrollReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    nodes.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -40px 0px'
  });

  nodes.forEach((el) => observer.observe(el));
}

function initMagneticElements() {
  if (prefersReducedMotion) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '1');
    const maxShift = 10 * strength;
    const maxTilt = 5 * strength;

    const reset = () => {
      el.classList.remove('is-magnet-active');
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('pointerenter', () => {
      el.classList.add('is-magnet-active');
    });

    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--mx', (px * maxShift).toFixed(2) + 'px');
      el.style.setProperty('--my', (py * maxShift * 0.7).toFixed(2) + 'px');
      el.style.setProperty('--rx', (-py * maxTilt).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (px * maxTilt).toFixed(2) + 'deg');
    });

    el.addEventListener('pointerleave', reset);
  });
}

// ===== Global 3D cursor field =====
// Every registered surface element (headings, paragraphs, cards, chips, buttons)
// leans and drifts toward the pointer in 3D. The tilt lives on `transform`, while
// hover lift/scale use the independent `translate`/`scale` properties, so the two
// effects compose instead of overriding each other.
const CURSOR_FIELD_SELECTOR = [
  '.interactive-panel',
  '.hero-title', '.hero-subtitle',
  '.section-title', '.section-subtitle',
  '.feature-card', '.feature-num', '.feature-title', '.feature-desc',
  '.stat-card', '.stat-value', '.stat-label',
  '.finance-card-wrapper', '.finance-title', '.finance-main-text',
  '.finance-accent-box', '.finance-accent-text',
  '.partner-box', '.partner-title', '.partner-desc',
  '.match-title', '.match-item-card', '.stat-pill', '.shock-insight-card',
  '.score-display-card', '.preset-btn', '.quiz-tile', '.quiz-option-row',
  '.quiz-question-title', '.quiz-question-desc',
  '.btn', '.swiper-guide-note', '.deck-count', '.footer-copy'
].join(', ');

const CURSOR_FIELD_SHIFT = 10;
const CURSOR_FIELD_TILT = 6;

let cursorFieldNodes = [];
let cursorFieldCache = [];
let cursorFieldRaf = null;
let cursorFieldResizeTimer = null;
const cursorFieldPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function collectCursorFieldNodes() {
  const all = Array.from(document.querySelectorAll(CURSOR_FIELD_SELECTOR));
  const chosen = new Set(all);
  return all
    .filter((el) => {
      if (el.closest('.magnetic') || el.closest('#card-stack') || el.closest('#venti-bubble')) return false;
      // Skip elements nested inside another field element so transforms do not stack.
      let parent = el.parentElement;
      while (parent) {
        if (chosen.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    })
    .map((el) => {
      const parsed = parseFloat(el.dataset.cfDepth || '1');
      el.classList.add('cursor-field');
      return { el, depth: isNaN(parsed) ? 1 : parsed };
    });
}

function measureCursorField() {
  cursorFieldNodes.forEach((item) => { item.el.style.transform = 'none'; });
  cursorFieldCache = cursorFieldNodes
    .map((item) => {
      const rect = item.el.getBoundingClientRect();
      return {
        el: item.el,
        depth: item.depth,
        cx: rect.left + rect.width / 2 + window.scrollX,
        cy: rect.top + rect.height / 2 + window.scrollY,
        w: rect.width,
        h: rect.height
      };
    })
    .filter((item) => item.w > 0 && item.h > 0);
  scheduleCursorFieldApply();
}

function applyCursorField() {
  cursorFieldRaf = null;
  const sx = window.scrollX;
  const sy = window.scrollY;
  const pointerX = cursorFieldPointer.x;
  const pointerY = cursorFieldPointer.y;

  for (let i = 0; i < cursorFieldCache.length; i++) {
    const item = cursorFieldCache[i];
    const cx = item.cx - sx;
    const cy = item.cy - sy;
    let nx = (pointerX - cx) / (item.w / 2 + 240);
    let ny = (pointerY - cy) / (item.h / 2 + 240);
    nx = Math.max(-1, Math.min(1, nx));
    ny = Math.max(-1, Math.min(1, ny));

    const depth = item.depth;
    const tx = (nx * CURSOR_FIELD_SHIFT * depth).toFixed(2);
    const ty = (ny * CURSOR_FIELD_SHIFT * depth).toFixed(2);
    const rx = (-ny * CURSOR_FIELD_TILT * depth).toFixed(2);
    const ry = (nx * CURSOR_FIELD_TILT * depth).toFixed(2);
    item.el.style.transform =
      'perspective(900px) translate3d(' + tx + 'px, ' + ty + 'px, 0) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
  }
}

function resetCursorField() {
  cursorFieldPointer.x = window.innerWidth / 2;
  cursorFieldPointer.y = window.innerHeight / 2;
  for (let i = 0; i < cursorFieldCache.length; i++) {
    cursorFieldCache[i].el.style.transform =
      'perspective(900px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
  }
}

function onCursorFieldMove(e) {
  cursorFieldPointer.x = e.clientX;
  cursorFieldPointer.y = e.clientY;
  if (cursorFieldRaf) return;
  cursorFieldRaf = requestAnimationFrame(applyCursorField);
}

function scheduleCursorFieldApply() {
  if (cursorFieldRaf) return;
  cursorFieldRaf = requestAnimationFrame(applyCursorField);
}

function initCursorField() {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  cursorFieldNodes = collectCursorFieldNodes();
  if (!cursorFieldNodes.length) return;
  measureCursorField();

  window.addEventListener('pointermove', onCursorFieldMove, { passive: true });
  window.addEventListener('scroll', scheduleCursorFieldApply, { passive: true });
  window.addEventListener('resize', () => {
    if (cursorFieldResizeTimer) clearTimeout(cursorFieldResizeTimer);
    cursorFieldResizeTimer = setTimeout(measureCursorField, 150);
  });
  document.addEventListener('mouseleave', resetCursorField);
  window.addEventListener('blur', resetCursorField);

  // Re-scan and re-measure after dynamic UI changes (quiz steps, deck renders).
  window.refreshCursorField = () => {
    cursorFieldNodes = collectCursorFieldNodes();
    measureCursorField();
    measureAuroraContent();
  };
}

// ===== Cursor aurora: soft morphing rainbow blob that lerp-follows the pointer
// and dissolves when it drifts over cards/text, reassembling in empty space. =====
const AURORA_CONTENT_SELECTOR = [
  '.site-header',
  '.interactive-panel',
  '.feature-card', '.stat-card', '.finance-card-wrapper', '.partner-box',
  '.shock-insight-card', '.match-item-card', '.score-display-card',
  '.quiz-tile', '.quiz-option-row', '.stat-pill',
  '.hero-title', '.hero-subtitle', '.section-title', '.section-subtitle',
  '.finance-title', '.finance-main-text', '.match-title'
].join(', ');

const AURORA_MAX_OPACITY = 0.36;
const AURORA_CORE_RADIUS = 90;
const AURORA_DISSOLVE_RADIUS = 120;

let auroraEl = null;
let auroraBlob = null;
let auroraRaf = null;
let auroraOpacity = 0;
let auroraResizeTimer = null;
let auroraContentRects = [];
const auroraPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const auroraTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function measureAuroraContent() {
  auroraContentRects = Array.from(document.querySelectorAll(AURORA_CONTENT_SELECTOR))
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        cx: r.left + r.width / 2 + window.scrollX,
        cy: r.top + r.height / 2 + window.scrollY,
        hw: r.width / 2,
        hh: r.height / 2,
        w: r.width,
        h: r.height
      };
    })
    .filter((r) => r.w > 0 && r.h > 0);
}

function auroraTick() {
  auroraRaf = null;
  auroraPos.x += (auroraTarget.x - auroraPos.x) * 0.075;
  auroraPos.y += (auroraTarget.y - auroraPos.y) * 0.075;
  auroraBlob.style.transform =
    'translate3d(' + auroraPos.x.toFixed(1) + 'px, ' + auroraPos.y.toFixed(1) + 'px, 0)';

  // Dissolve (melt away) when the blob overlaps cards/text, reassemble in empty space.
  let minGap = Infinity;
  const sx = window.scrollX;
  const sy = window.scrollY;
  for (let i = 0; i < auroraContentRects.length; i++) {
    const r = auroraContentRects[i];
    const dx = Math.max(Math.abs(auroraPos.x - (r.cx - sx)) - r.hw, 0);
    const dy = Math.max(Math.abs(auroraPos.y - (r.cy - sy)) - r.hh, 0);
    const gap = Math.sqrt(dx * dx + dy * dy) - AURORA_CORE_RADIUS;
    if (gap < minGap) minGap = gap;
  }
  const proximity = auroraContentRects.length ? Math.max(0, Math.min(minGap / AURORA_DISSOLVE_RADIUS, 1)) : 1;
  const targetOpacity = AURORA_MAX_OPACITY * proximity;
  auroraOpacity += (targetOpacity - auroraOpacity) * 0.16;
  auroraEl.style.opacity = auroraOpacity.toFixed(3);

  const stillMoving =
    Math.abs(auroraTarget.x - auroraPos.x) > 0.5 ||
    Math.abs(auroraTarget.y - auroraPos.y) > 0.5 ||
    Math.abs(targetOpacity - auroraOpacity) > 0.004;
  if (stillMoving) auroraRaf = requestAnimationFrame(auroraTick);
}

function initCursorAurora() {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  auroraEl = document.getElementById('cursor-aurora');
  if (!auroraEl) return;
  auroraBlob = auroraEl.querySelector('.cursor-aurora-blob');
  if (!auroraBlob) return;

  measureAuroraContent();
  window.addEventListener('resize', () => {
    if (auroraResizeTimer) clearTimeout(auroraResizeTimer);
    auroraResizeTimer = setTimeout(measureAuroraContent, 150);
  });

  window.addEventListener('pointermove', (e) => {
    auroraTarget.x = e.clientX;
    auroraTarget.y = e.clientY;
    if (!auroraRaf) auroraRaf = requestAnimationFrame(auroraTick);
  }, { passive: true });
}

function attachCardMagneticTilt(cardEl) {
  if (prefersReducedMotion) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  let hovering = false;

  cardEl.addEventListener('pointermove', (e) => {
    if (cardEl.classList.contains('is-dragging') || !cardEl.classList.contains('is-top')) return;
    hovering = true;
    const rect = cardEl.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * 6;
    const rotX = -py * 5;
    const shiftX = px * 8;
    const shiftY = py * 6;
    cardEl.style.transition = 'transform 0.14s ' + MOTION_EASE_SOFT;
    cardEl.style.transform =
      'translate3d(' + shiftX.toFixed(2) + 'px, ' + shiftY.toFixed(2) + 'px, 0) rotateX(' +
      rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
  });

  cardEl.addEventListener('pointerleave', () => {
    if (cardEl.classList.contains('is-dragging')) return;
    if (!hovering) return;
    hovering = false;
    cardEl.style.transition = 'transform 0.55s ' + MOTION_EASE_SPRING;
    cardEl.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
  });
}

// Render cards into DOM
function renderDeckDOM() {
  const cardStack = document.getElementById('card-stack');
  if (!cardStack) return;
  cardStack.innerHTML = '';
  cardStack.classList.toggle('card-stack--reel', appState.reelMode);
  
  const remainingCards = appState.currentDeck.slice(appState.currentIndex);
  
  if (remainingCards.length === 0) {
    showFinalMatchScreen();
    return;
  }

  // Update Venti speech commentary on borderline cases
  const topCard = remainingCards[0];
  if (topCard && topCard.calculatedChance >= 40 && topCard.calculatedChance <= 62) {
    updateVentiCommentary("borderline");
  }
  
  const currentNum = appState.currentIndex + 1;
  const totalNum = appState.totalInitialDeckSize;
  const deckCounter = document.getElementById('deck-counter');
  const deckProgressBar = document.getElementById('deck-progress-bar');
  
  if (deckCounter) deckCounter.textContent = 'Карточка ' + currentNum + ' из ' + totalNum;
  if (deckProgressBar) {
    const progressPercent = Math.round(((currentNum - 1) / totalNum) * 100);
    deckProgressBar.style.width = progressPercent + '%';
  }
  
  const isReel = appState.reelMode;
  const visibleCards = remainingCards.slice(0, isReel ? Math.min(remainingCards.length, 8) : 3);

  visibleCards.forEach((cardData, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'swipe-card';
    cardEl.dataset.id = cardData.id;

    if (isReel) {
      cardEl.classList.add('swipe-card--reel');
    } else if (idx === 0) {
      cardEl.classList.add('is-top', 'is-entering');
      cardEl.addEventListener('animationend', () => {
        cardEl.classList.remove('is-entering');
      }, { once: true });
      attachDragHandlers(cardEl);
      attachCardMagneticTilt(cardEl);
    } else if (idx === 1) {
      cardEl.classList.add('is-second');
    } else if (idx === 2) {
      cardEl.classList.add('is-third');
    }
    
    const isKz = appState.track === 'kz';
    const trackBadgeText = isKz ? 'Казахстан (ЕНТ)' : 'За рубеж';
    const categoryName = categoryLabels[cardData.category] || 'Направление';
    const minReqText = isKz 
      ? ('Порог: ' + cardData.minScore + ' баллов')
      : ('SAT: ' + cardData.minSat + ' / IELTS: ' + cardData.minIelts);

    cardEl.innerHTML = `
      <div class="stamp-badge stamp-like">ХОЧУ</div>
      <div class="stamp-badge stamp-skip">МИМО</div>
      
      <div>
        <div class="card-header-row">
          <div class="card-tags">
            <span class="card-chip accent">${trackBadgeText}</span>
            <span class="card-chip">${categoryName}</span>
          </div>
          <div class="card-chance-badge">
            <div class="chance-percent">${cardData.calculatedChance}%</div>
            <div class="chance-label">Шанс на грант</div>
          </div>
        </div>

        <div class="card-main-info">
          <h3 class="card-title">${cardData.name}</h3>
          <div class="card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span>${cardData.location}</span>
          </div>
          <div class="card-specialty">${cardData.specialty}</div>
        </div>
      </div>

      <div>
        <div class="card-metrics-grid">
          <div class="metric-item">
            <span class="metric-title">Экономия бюджета:</span>
            <span class="metric-val highlight">${cardData.budgetSavingYear}</span>
          </div>
          <div class="metric-item">
            <span class="metric-title">Проходной критерий:</span>
            <span class="metric-val">${minReqText}</span>
          </div>
        </div>

        <div class="card-vibe-box" style="margin-top: 14px;">
          <span class="vibe-label">Комментарий от Venti</span>
          <p class="vibe-text">${cardData.vibeComment}</p>
        </div>
      </div>
    `;

    cardStack.appendChild(cardEl);
  });

  if (window.reelRefresh) window.reelRefresh();
}

// 3D Card Drag and Swipe Engine (premium spring physics)
function attachDragHandlers(cardEl) {
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let activePointerId = null;
  let axisLock = null;

  const stampLike = cardEl.querySelector('.stamp-like');
  const stampSkip = cardEl.querySelector('.stamp-skip');

  function setStampOpacity(dx) {
    if (!stampLike || !stampSkip) return;
    if (dx > 28) {
      stampLike.style.opacity = Math.min((dx - 28) / 100, 1);
      stampSkip.style.opacity = 0;
    } else if (dx < -28) {
      stampSkip.style.opacity = Math.min((-dx - 28) / 100, 1);
      stampLike.style.opacity = 0;
    } else {
      stampLike.style.opacity = 0;
      stampSkip.style.opacity = 0;
    }
  }

  function onPointerDown(e) {
    if (e.button && e.button !== 0) return;
    if (isDragging) return;
    isDragging = true;
    activePointerId = e.pointerId;
    axisLock = null;
    cardEl.classList.add('is-dragging');
    startX = e.clientX;
    startY = e.clientY;
    currentX = 0;
    currentY = 0;
    cardEl.style.transition = 'none';
    try { cardEl.setPointerCapture(activePointerId); } catch (err) { /* noop */ }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    if (activePointerId !== null && e.pointerId !== activePointerId) return;

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    // Lock to the dominant axis so a vertical touch scrolls the page
    // instead of dragging the card.
    if (!axisLock) {
      if (Math.abs(currentX) < 8 && Math.abs(currentY) < 8) return;
      axisLock = Math.abs(currentX) > Math.abs(currentY) ? 'x' : 'y';
    }
    if (axisLock === 'y') return;

    const rotateDeg = currentX * 0.065;
    cardEl.style.transform =
      'translate3d(' + currentX + 'px, ' + currentY + 'px, 0) rotate(' + rotateDeg + 'deg)';

    setStampOpacity(currentX);
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    if (activePointerId !== null && e.pointerId !== activePointerId) return;

    isDragging = false;
    cardEl.classList.remove('is-dragging');
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    activePointerId = null;

    const threshold = 104;
    const horizontal = axisLock === 'x';
    axisLock = null;
    if (horizontal && currentX > threshold) {
      triggerCardAction('like', cardEl);
    } else if (horizontal && currentX < -threshold) {
      triggerCardAction('skip', cardEl);
    } else {
      // Soft spring snap back to center
      cardEl.style.transition =
        'transform 0.6s ' + MOTION_EASE_SPRING + ', box-shadow 0.45s ' + MOTION_EASE_SOFT;
      cardEl.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      if (stampLike) stampLike.style.opacity = 0;
      if (stampSkip) stampSkip.style.opacity = 0;
      currentX = 0;
      currentY = 0;
    }
  }

  cardEl.addEventListener('pointerdown', onPointerDown);
}

// Action Trigger: Like or Skip
function triggerCardAction(action, targetCard) {
  if (appState.reelMode && targetCard) {
    triggerReelAction(action, targetCard);
    return;
  }

  const cardStack = document.getElementById('card-stack');
  const currentCard = targetCard || (cardStack ? cardStack.querySelector('.swipe-card.is-top') : null);
  if (!currentCard) return;
  
  const currentItem = appState.currentDeck[appState.currentIndex];
  if (action === 'like' && currentItem) {
    // Avoid duplicates by name
    const alreadyLiked = appState.likedUniversities.some(u => u.name === currentItem.name);
    if (!alreadyLiked) {
      appState.likedUniversities.push(currentItem);
    }
  }

  if (currentItem) {
    appState.swipeHistory.push({ action: action, item: currentItem });
  }
  haptic(action);
  updateMobileUndoState();
  
  const flyOutX = action === 'like' ? 920 : -920;
  const flyOutRotate = action === 'like' ? 22 : -22;
  
  // Update live commentary from Venti Assistant
  updateVentiCommentary(action);

  currentCard.classList.add('is-dragging');
  currentCard.style.transition =
    'transform 0.52s ' + MOTION_EASE_OUT + ', opacity 0.42s ' + MOTION_EASE_SOFT;
  currentCard.style.transform =
    'translate3d(' + flyOutX + 'px, ' + (action === 'like' ? -24 : 18) + 'px, 0) rotate(' + flyOutRotate + 'deg)';
  currentCard.style.opacity = '0';
  
  setTimeout(() => {
    appState.currentIndex++;
    renderDeckDOM();
  }, 380);
}

// Reel action: commit the centered card (and any cards scrolled past) then
// animate the card out of the drum.
function triggerReelAction(action, cardEl) {
  const remaining = appState.currentDeck.slice(appState.currentIndex);
  let offset = remaining.findIndex((c) => String(c.id) === String(cardEl.dataset.id));
  if (offset < 0) offset = 0;

  // Cards above the centered one were scrolled past, so they count as skipped.
  for (let i = 0; i < offset; i++) {
    appState.swipeHistory.push({ action: 'skip', item: remaining[i] });
  }

  const currentItem = remaining[offset];
  if (action === 'like' && currentItem) {
    const alreadyLiked = appState.likedUniversities.some((u) => u.name === currentItem.name);
    if (!alreadyLiked) appState.likedUniversities.push(currentItem);
  }
  if (currentItem) {
    appState.swipeHistory.push({ action: action, item: currentItem });
  }

  haptic(action);
  updateMobileUndoState();
  updateVentiCommentary(action);

  cardEl.classList.add('is-leaving');
  cardEl.style.transition = 'transform 0.44s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.44s ease';
  cardEl.style.transform = 'translate3d(0, -28%, 0) rotateX(24deg) scale(0.8)';
  cardEl.style.opacity = '0';

  setTimeout(() => {
    appState.currentIndex += offset + 1;
    renderDeckDOM();
  }, 400);
}

// Enable or disable the mobile undo button based on swipe history.
function updateMobileUndoState() {
  const btn = document.getElementById('btn-mobile-undo');
  if (btn) btn.disabled = appState.swipeHistory.length === 0;
}

// Restore the previously swiped card (mobile one-handed correction).
function undoLastSwipe() {
  if (!appState.swipeHistory.length) return;
  const last = appState.swipeHistory.pop();
  if (last.action === 'like' && last.item) {
    const idx = appState.likedUniversities.findIndex((u) => u.id === last.item.id);
    if (idx >= 0) appState.likedUniversities.splice(idx, 1);
  }
  appState.currentIndex = Math.max(0, appState.currentIndex - 1);
  haptic('undo');
  updateMobileUndoState();
  renderDeckDOM();
}

// Toggle the fixed mobile bars that mirror the current step.
function setSwiperActive(active) {
  document.body.classList.toggle('swiper-active', active);
  const bar = document.getElementById('swiper-mobile-bar');
  if (bar) bar.classList.toggle('is-active', active);
}

function setMatchActive(active) {
  document.body.classList.toggle('match-active', active);
  const bar = document.getElementById('match-mobile-bar');
  if (bar) bar.classList.toggle('is-active', active);
}

// Show Final Match Screen with Strictly Deduplicated University List
function showFinalMatchScreen() {
  const step1Form = document.getElementById('step-1-form');
  const step2Swiper = document.getElementById('step-2-swiper');
  const matchScreen = document.getElementById('match-screen');
  
  if (step1Form) step1Form.classList.add('hidden');
  if (step2Swiper) step2Swiper.classList.add('hidden');
  if (matchScreen) matchScreen.classList.remove('hidden');

  setSwiperActive(false);
  setMatchActive(true);
  
  // Deduplicate liked list by university name
  const seenNames = new Set();
  const uniqueLiked = [];
  appState.likedUniversities.forEach(item => {
    if (!seenNames.has(item.name)) {
      seenNames.add(item.name);
      uniqueLiked.push(item);
    }
  });

  const count = uniqueLiked.length;
  const statCount = document.getElementById('stat-matched-count');
  const statSaved = document.getElementById('stat-budget-saved');
  
  if (statCount) statCount.textContent = count;
  
  let totalKz = 0;
  let totalUsd = 0;
  let totalEur = 0;
  
  uniqueLiked.forEach(u => {
    if (u.currency === '₸') totalKz += (u.budgetSavingNum || 0);
    else if (u.currency === '$') totalUsd += (u.budgetSavingNum || 0);
    else if (u.currency === '€') totalEur += (u.budgetSavingNum || 0);
  });
  
  let formattedSaving = '0 ₸';
  if (totalKz > 0) {
    formattedSaving = formatNumber(totalKz) + ' ₸ / год';
  } else if (totalUsd > 0) {
    formattedSaving = '$' + formatNumber(totalUsd) + ' / год';
  } else if (totalEur > 0) {
    formattedSaving = formatNumber(totalEur) + ' € / год';
  } else {
    formattedSaving = 'До 2 800 000 ₸ / год';
  }
  
  if (statSaved) statSaved.textContent = formattedSaving;
  
  const listContainer = document.getElementById('matched-list-container');
  if (listContainer) {
    listContainer.innerHTML = '';
    if (count === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.style.padding = '20px';
      emptyMsg.style.textAlign = 'center';
      emptyMsg.style.color = 'var(--gray-11)';
      emptyMsg.textContent = 'Вы пропустили все карточки. Попробуйте изменить параметры и пройти тест заново.';
      listContainer.appendChild(emptyMsg);
    } else {
      uniqueLiked.forEach(item => {
        const row = document.createElement('div');
        row.className = 'match-item-card';
        row.innerHTML = `
          <div class="match-item-left">
            <div class="match-item-name">${item.name}</div>
            <div class="match-item-meta">${item.location} • ${item.specialty}</div>
          </div>
          <div class="match-item-right">
            <div class="match-item-saving">${item.budgetSavingYear}</div>
            <div class="match-item-chance">${item.calculatedChance}%</div>
          </div>
        `;
        listContainer.appendChild(row);
      });
    }
  }

  if (window.refreshCursorField) window.refreshCursorField();
  document.dispatchEvent(new CustomEvent('venti:phase', { detail: { phase: 'match' } }));
}

// Named navigation helpers shared by buttons and mobile gestures.
function isReelMode() {
  return !!(window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches &&
    window.matchMedia('(max-width: 900px)').matches);
}

function updateReelMode() {
  appState.reelMode = isReelMode();
}

function goToQuizStep(step) {
  appState.currentQuizStep = Math.min(4, Math.max(1, step));
  updateQuizUI();
}

function quizNext() {
  if (appState.currentQuizStep < 4) {
    goToQuizStep(appState.currentQuizStep + 1);
  } else {
    launchSwiper();
  }
}

function quizPrev() {
  if (appState.currentQuizStep > 1) {
    goToQuizStep(appState.currentQuizStep - 1);
  }
}

function scrollToHero() {
  const heroBlock = document.getElementById('hero-block');
  if (heroBlock) heroBlock.scrollIntoView({ behavior: 'smooth' });
}

function launchSwiper() {
  prepareDeck();
  const step1Form = document.getElementById('step-1-form');
  const step2Swiper = document.getElementById('step-2-swiper');
  const matchScreen = document.getElementById('match-screen');

  if (step1Form) step1Form.classList.add('hidden');
  if (matchScreen) matchScreen.classList.add('hidden');
  if (step2Swiper) step2Swiper.classList.remove('hidden');

  setMatchActive(false);
  setSwiperActive(true);

  showVentiBubble('Свайпай вправо, чтобы добавить вуз в список. Свайпай влево, чтобы пропустить.', 'info');

  updateReelMode();
  renderDeckDOM();
  if (window.refreshCursorField) window.refreshCursorField();
  if (step2Swiper) {
    step2Swiper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  document.dispatchEvent(new CustomEvent('venti:phase', { detail: { phase: 'swiper' } }));
}

function restartApp() {
  const step1Form = document.getElementById('step-1-form');
  const step2Swiper = document.getElementById('step-2-swiper');
  const matchScreen = document.getElementById('match-screen');

  if (matchScreen) matchScreen.classList.add('hidden');
  if (step2Swiper) step2Swiper.classList.add('hidden');
  if (step1Form) step1Form.classList.remove('hidden');

  setSwiperActive(false);
  setMatchActive(false);

  appState.currentQuizStep = 1;
  updateQuizUI();

  scrollToHero();
  document.dispatchEvent(new CustomEvent('venti:phase', { detail: { phase: 'quiz' } }));
}

// Initialize Event Listeners
function initEventListeners() {
  // Header "Регистрация" is a plain link to the register page now.

  // Question 1: Track Tiles
  const tileKz = document.getElementById('tile-track-kz');
  const tileAbroad = document.getElementById('tile-track-abroad');

  if (tileKz) {
    tileKz.addEventListener('click', () => {
      appState.track = 'kz';
      tileKz.classList.add('active');
      if (tileAbroad) tileAbroad.classList.remove('active');
    });
  }

  if (tileAbroad) {
    tileAbroad.addEventListener('click', () => {
      appState.track = 'abroad';
      tileAbroad.classList.add('active');
      if (tileKz) tileKz.classList.remove('active');
    });
  }

  // Quiz Navigation Buttons
  const btnNext1 = document.getElementById('btn-quiz-next-1');
  const btnNext2 = document.getElementById('btn-quiz-next-2');
  const btnNext3 = document.getElementById('btn-quiz-next-3');
  
  const btnPrev2 = document.getElementById('btn-quiz-prev-2');
  const btnPrev3 = document.getElementById('btn-quiz-prev-3');
  const btnPrev4 = document.getElementById('btn-quiz-prev-4');

  if (btnNext1) btnNext1.addEventListener('click', quizNext);
  if (btnNext2) btnNext2.addEventListener('click', quizNext);
  if (btnNext3) btnNext3.addEventListener('click', quizNext);

  if (btnPrev2) btnPrev2.addEventListener('click', quizPrev);
  if (btnPrev3) btnPrev3.addEventListener('click', quizPrev);
  if (btnPrev4) btnPrev4.addEventListener('click', quizPrev);

  // Step 2: Slider & Presets
  const entSlider = document.getElementById('ent-slider');
  const entDisplay = document.getElementById('ent-score-display');
  const presetBtns = document.querySelectorAll('.preset-btn');

  if (entSlider && entDisplay) {
    entSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      appState.entScore = val;
      entDisplay.textContent = val;
      presetBtns.forEach(p => {
        if (parseInt(p.dataset.score, 10) === val) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.score, 10);
      appState.entScore = val;
      if (entSlider) entSlider.value = val;
      if (entDisplay) entDisplay.textContent = val;
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Abroad Inputs
  const satInput = document.getElementById('sat-input');
  const ieltsInput = document.getElementById('ielts-input');
  if (satInput) {
    satInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) appState.satScore = val;
    });
  }
  if (ieltsInput) {
    ieltsInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val)) appState.ieltsScore = val;
    });
  }

  // One-handed steppers for the score inputs
  document.querySelectorAll('.stepper-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.stepTarget);
      if (!target) return;
      const dir = parseFloat(btn.dataset.stepDir);
      const step = parseFloat(target.step) || 1;
      const min = parseFloat(target.min);
      const max = parseFloat(target.max);
      let val = parseFloat(target.value);
      if (isNaN(val)) val = min || 0;
      val += dir * step;
      val = Math.max(min, Math.min(max, val));
      if (step < 1) val = Math.round(val * 2) / 2;
      target.value = step < 1 ? val.toFixed(1) : String(val);
      target.dispatchEvent(new Event('input', { bubbles: true }));
      haptic('step');
    });
  });

  // Step 3: Subjects & Abroad Regions
  const subjectRows = document.querySelectorAll('#quiz-screen-3-kz .quiz-option-row');
  subjectRows.forEach(row => {
    row.addEventListener('click', () => {
      subjectRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      appState.kzSubject = row.dataset.subject;
    });
  });

  const regionRows = document.querySelectorAll('#quiz-screen-3-abroad .quiz-option-row');
  regionRows.forEach(row => {
    row.addEventListener('click', () => {
      regionRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      appState.abroadRegion = row.dataset.region;
    });
  });

  // Step 4: Category Rows
  const categoryRows = document.querySelectorAll('#quiz-screen-4 .quiz-option-row');
  categoryRows.forEach(row => {
    row.addEventListener('click', () => {
      categoryRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      appState.category = row.dataset.category;
    });
  });

  // Launch Swiper Button
  const btnLaunchSwiper = document.getElementById('btn-launch-swiper');
  if (btnLaunchSwiper) {
    btnLaunchSwiper.addEventListener('click', launchSwiper);
  }

  // Back to Step 1 Form
  const btnBackToStep1 = document.getElementById('btn-back-to-step1');
  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => {
      const step1Form = document.getElementById('step-1-form');
      const step2Swiper = document.getElementById('step-2-swiper');
      const matchScreen = document.getElementById('match-screen');

      if (step2Swiper) step2Swiper.classList.add('hidden');
      if (matchScreen) matchScreen.classList.add('hidden');
      if (step1Form) step1Form.classList.remove('hidden');

      setSwiperActive(false);
      setMatchActive(false);

      appState.currentQuizStep = 1;
      updateQuizUI();
    });
  }

  // Desktop Skip / Like buttons
  const btnDesktopSkip = document.getElementById('btn-desktop-skip');
  const btnDesktopLike = document.getElementById('btn-desktop-like');
  if (btnDesktopSkip) {
    btnDesktopSkip.addEventListener('click', () => {
      triggerCardAction('skip');
    });
  }
  if (btnDesktopLike) {
    btnDesktopLike.addEventListener('click', () => {
      triggerCardAction('like');
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const step2Swiper = document.getElementById('step-2-swiper');
    if (step2Swiper && !step2Swiper.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') triggerCardAction('skip');
      else if (e.key === 'ArrowRight') triggerCardAction('like');
    }
  });

  // Restart Button
  const btnRestartSwiper = document.getElementById('btn-restart-swiper');
  if (btnRestartSwiper) {
    btnRestartSwiper.addEventListener('click', restartApp);
  }
}

// Start application
document.addEventListener('DOMContentLoaded', () => {
  // Motion is a core product requirement, so the reduced-motion system preference
  // must not disable the premium animations.
  prefersReducedMotion = false;
  initEventListeners();
  updateReelMode();
  window.addEventListener('resize', updateReelMode);
  updateQuizUI();
  initVentiBubble();
  initScrollReveal();
  initMagneticElements();
  initCursorField();
  initCursorAurora();
  initGeoBackground();
  initMobile({
    appState: appState,
    quizNext: quizNext,
    quizPrev: quizPrev,
    launchSwiper: launchSwiper,
    restart: restartApp,
    triggerCardAction: triggerCardAction,
    undoLastSwipe: undoLastSwipe,
    isReelMode: isReelMode
  });
  updateMobileUndoState();
});

export const PunctuationLangMap: Record<string, Record<string, string>> = {
    // WESTERN / LATIN
    en: { "comma": ",", "coma": ",", "period": ".", "full stop": ".", "question mark": "?", "exclamation point": "!", "colon": ":" },
    es: { "coma": ",", "punto": ".", "signo de interrogación": "?", "interrogación": "?", "signo de exclamación": "!", "exclamación": "!", "dos puntos": ":" },
    fr: { "virgule": ",", "point": ".", "point d'interrogation": "?", "point d'exclamation": "!", "deux points": ":" },
    de: { "komma": ",", "punkt": ".", "fragezeichen": "?", "ausrufezeichen": "!", "doppelpunkt": ":" },
    it: { "virgola": ",", "punto": ".", "punto interrogativo": "?", "punto esclamativo": "!", "due punti": ":" },
    pt: { "vírgula": ",", "ponto": ".", "ponto de interrogação": "?", "ponto de exclamação": "!", "dois pontos": ":" },
    nl: { "komma": ",", "punt": ".", "vraagteken": "?", "uitroepteken": "!", "dubbelpunt": ":" },
    sv: { "komma": ",", "punkt": ".", "frågetecken": "?", "utropstecken": "!", "kolon": ":" },
    no: { "komma": ",", "punkt": ".", "spørsmålstegn": "?", "utropstegn": "!", "kolon": ":" },
    da: { "komma": ",", "punkt": ".", "spørgsmålstegn": "?", "udråbstegn": "!", "kolon": ":" },
    fi: { "pilkku": ",", "piste": ".", "kysymysmerkki": "?", "huutomerkki": "!", "kaksoispiste": ":" },
    pl: { "przecinek": ",", "kropka": ".", "znak zapytania": "?", "wykrzyknik": "!", "dwukropek": ":" },
    cs: { "čárka": ",", "tečka": ".", "otazník": "?", "vykřičník": "!", "dvojtečka": ":" },
    sk: { "čiarka": ",", "bodka": ".", "otáznik": "?", "výkričník": "!", "dvojbodka": ":" },
    ro: { "virgulă": ",", "punct": ".", "semnul întrebării": "?", "semnul exclamării": "!", "două puncte": ":" },
    hu: { "vessző": ",", "pont": ".", "kérdőjel": "?", "felkiáltójel": "!", "kettőspont": ":" },
    el: { "κόμμα": ",", "τελεία": ".", "ερωτηματικό": ";", "θαυμαστικό": "!", "άνω κάτω τελεία": ":" },

    // SLAVIC
    ru: { "запятая": ",", "точка": ".", "вопросительный знак": "?", "восклицательный знак": "!", "двоеточие": ":" },
    uk: { "кома": ",", "крапка": ".", "знак питання": "?", "знак оклику": "!", "двокрапка": ":" },
    bg: { "запетая": ",", "точка": ".", "въпросителен знак": "?", "удивителен знак": "!", "двоеточие": ":" },

    // ASIAN (Using full-width punctuation where applicable)
    zh: { "逗号": "，", "句号": "。", "问号": "？", "感叹号": "！", "冒号": "：" },
    ja: { "てん": "、", "まる": "。", "はてな": "？", "びっくり": "！", "コロン": "：" },
    ko: { "쉼표": ",", "마침표": ".", "물음표": "?", "느낌표": "!", "콜론": ":" },
    vi: { "dấu phẩy": ",", "dấu chấm": ".", "dấu hỏi": "?", "dấu chấm than": "!", "dấu hai chấm": ":" },
    th: { "จุลภาค": ",", "มหัพภาค": ".", "ปรัศนี": "?", "อัศเจรีย์": "!", "ทวิภาค": ":" },

    // SEMITIC (RTL Support)
    ar: { "فاصلة": "،", "نقطة": ".", "علامة استفهام": "؟", "علامة تعجب": "!", "نقطتان": ":" },
    he: { "פסיק": ",", "נקודה": ".", "סימן שאלה": "?", "סימן קריאה": "!", "נקודתיים": ":" },
    fa: { "کاما": "،", "نقطه": ".", "علامة سوال": "؟", "علامة تعجب": "!", "دو نقطه": ":" },

    // SOUTH ASIAN
    hi: { "अल्पविराम": ",", "पूर्ण विराम": ".", "प्रश्नवाचक": "?", "विस्मयादिबोधक": "!", "कोलन": ":" },
    bn: { "কমা": ",", "দাঁড়ি": "।", "প্রশ্নবোধক চিহ্ন": "?", "বিস্ময়সূচক চিহ্ন": "!", "কোলন": ":" },
    ta: { "காற்புள்ளி": ",", "முற்றுப்புள்ளி": ".", "கேள்விக்குறி": "?", "வியப்புக்குறி": "!", "முக்கற்புள்ளி": ":" },
    te: { "కామా": ",", "పుల్‌స్టాప్": ".", "ప్రశ్నార్థకం": "?", "ఆశ్చర్యార్థకం": "!", "కోలన్": ":" },

    // OTHER MAJOR
    tr: { "virgül": ",", "nokta": ".", "soru işareti": "?", "ünlem işareti": "!", "iki nokta": ":" },
    id: { "koma": ",", "titik": ".", "tanda tanya": "?", "tanda seru": "!", "titik dua": ":" },
    ms: { "koma": ",", "titik": ".", "tanda soal": "?", "tanda seru": "!", "titik bertindih": ":" },
    sw: { "mkato": ",", "nukta": ".", "alama ya swali": "?", "alama ya hisia": "!", "nukta mbili": ":" }
};

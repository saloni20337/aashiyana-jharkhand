import { useState } from "react";
import { Volume2, Languages, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Phrase {
  local: string;
  english: string;
  hindi: string;
  pronunciation: string;
}

interface Language {
  name: string;
  localName: string;
  description: string;
  phrases: Phrase[];
}

const languages: Language[] = [
  {
    name: "Nagpuri",
    localName: "नागपुरी",
    description: "Widely spoken in Ranchi, Gumla, and surrounding areas",
    phrases: [
      { local: "जोहार", english: "Hello/Greetings", hindi: "नमस्ते", pronunciation: "Jo-haar" },
      { local: "तोहर नाम की हे?", english: "What is your name?", hindi: "तुम्हारा नाम क्या है?", pronunciation: "Tohar naam ki he?" },
      { local: "हमर नाम...", english: "My name is...", hindi: "मेरा नाम है...", pronunciation: "Hamar naam..." },
      { local: "कतना पइसा?", english: "How much money?", hindi: "कितने पैसे?", pronunciation: "Katna paisa?" },
      { local: "धन्यवाद", english: "Thank you", hindi: "धन्यवाद", pronunciation: "Dhanyavaad" },
      { local: "ई कहाँ हे?", english: "Where is this?", hindi: "यह कहाँ है?", pronunciation: "Ee kahaan he?" },
    ],
  },
  {
    name: "Santhali",
    localName: "ᱥᱟᱱᱛᱟᱲᱤ",
    description: "Spoken by Santhal tribe, one of the largest tribal communities",
    phrases: [
      { local: "जोहार", english: "Hello", hindi: "नमस्ते", pronunciation: "Jo-haar" },
      { local: "चेद नुतुम?", english: "What is your name?", hindi: "तुम्हारा नाम क्या है?", pronunciation: "Ched nutum?" },
      { local: "इंझ नुतुम...", english: "My name is...", hindi: "मेरा नाम है...", pronunciation: "Injh nutum..." },
      { local: "सर्हाव", english: "Thank you", hindi: "धन्यवाद", pronunciation: "Sarhaav" },
      { local: "ओकोय?", english: "Where?", hindi: "कहाँ?", pronunciation: "Okoy?" },
      { local: "चेद टाका?", english: "How much?", hindi: "कितना?", pronunciation: "Ched taka?" },
    ],
  },
  {
    name: "Mundari",
    localName: "मुंडारी",
    description: "Spoken by Munda tribe in Khunti, Ranchi, and nearby districts",
    phrases: [
      { local: "जोहार", english: "Hello", hindi: "नमस्ते", pronunciation: "Jo-haar" },
      { local: "अम नुतुम चेका?", english: "What is your name?", hindi: "तुम्हारा नाम क्या है?", pronunciation: "Am nutum cheka?" },
      { local: "इंझ नुतुम...", english: "My name is...", hindi: "मेरा नाम है...", pronunciation: "Injh nutum..." },
      { local: "बड़ा मारांग", english: "Thank you very much", hindi: "बहुत धन्यवाद", pronunciation: "Bada maaraang" },
      { local: "ओकाते?", english: "Where?", hindi: "कहाँ?", pronunciation: "Okaate?" },
    ],
  },
  {
    name: "Ho",
    localName: "𑢹𑣉",
    description: "Spoken by Ho tribe in West Singhbhum and Seraikela-Kharsawan",
    phrases: [
      { local: "जोहार", english: "Hello", hindi: "नमस्ते", pronunciation: "Jo-haar" },
      { local: "अम नुतुम चेका?", english: "What is your name?", hindi: "तुम्हारा नाम क्या है?", pronunciation: "Am nutum cheka?" },
      { local: "इंझ नुतुम...", english: "My name is...", hindi: "मेरा नाम है...", pronunciation: "Injh nutum..." },
      { local: "जोहार गोय", english: "Thank you", hindi: "धन्यवाद", pronunciation: "Johar goy" },
    ],
  },
  {
    name: "Kurukh/Oraon",
    localName: "कुड़ुख़",
    description: "Spoken by Oraon tribe in Gumla, Lohardaga, and Latehar",
    phrases: [
      { local: "जोहार", english: "Hello", hindi: "नमस्ते", pronunciation: "Jo-haar" },
      { local: "नीं पेद्दा एन्ना?", english: "What is your name?", hindi: "तुम्हारा नाम क्या है?", pronunciation: "Neen pedda enna?" },
      { local: "एन पेद्दा...", english: "My name is...", hindi: "मेरा नाम है...", pronunciation: "En pedda..." },
      { local: "धन्यवाद", english: "Thank you", hindi: "धन्यवाद", pronunciation: "Dhanyavaad" },
    ],
  },
];

const commonPhrases = [
  { english: "Water", hindi: "पानी", local: "पानी / दाक", pronunciation: "Paani / Daak" },
  { english: "Food", hindi: "खाना", local: "जोमेर / भात", pronunciation: "Jomer / Bhaat" },
  { english: "Help", hindi: "मदद", local: "सहायता", pronunciation: "Sahaayata" },
  { english: "Yes", hindi: "हाँ", local: "हाँ / हों", pronunciation: "Haan / Hon" },
  { english: "No", hindi: "नहीं", local: "नाहीं / नखा", pronunciation: "Naaheen / Nakha" },
  { english: "Good", hindi: "अच्छा", local: "नीक / बढ़िया", pronunciation: "Neek / Badhiya" },
];

const LanguageHelp = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">भाषा सहायता</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Jharkhand Language Guide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with locals using common phrases from Jharkhand's rich tribal languages. 
            "जोहार" (Johar) is the universal greeting across all communities!
          </p>
        </div>

        {/* Universal Greeting Card */}
        <Card className="mb-10 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-primary/20">
          <CardContent className="p-6 md:p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Universal Greeting</p>
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">जोहार</h3>
            <p className="text-xl text-foreground mb-1">Johar</p>
            <p className="text-muted-foreground">
              A traditional greeting meaning "Hello" or "Respectful Salutations" — used across all tribal communities
            </p>
          </CardContent>
        </Card>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {languages.map((lang) => (
            <Button
              key={lang.name}
              variant={selectedLanguage.name === lang.name ? "default" : "outline"}
              onClick={() => setSelectedLanguage(lang)}
              className="gap-2"
            >
              <span>{lang.localName}</span>
              <span className="text-xs opacity-70">({lang.name})</span>
            </Button>
          ))}
        </div>

        {/* Selected Language Phrases */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                {selectedLanguage.localName}
                <span className="text-lg font-normal text-muted-foreground">
                  ({selectedLanguage.name})
                </span>
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {selectedLanguage.description}
              </p>
            </div>
            
            <div className="grid gap-3">
              {selectedLanguage.phrases.map((phrase, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-primary">{phrase.local}</p>
                    <p className="text-sm text-muted-foreground italic">
                      Pronunciation: {phrase.pronunciation}
                    </p>
                  </div>
                  <div className="flex-1 mt-2 md:mt-0 md:text-right">
                    <p className="text-foreground">{phrase.english}</p>
                    <p className="text-sm text-muted-foreground">{phrase.hindi}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Essential Words */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            Essential Words for Tourists
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {commonPhrases.map((phrase, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="text-lg font-bold text-primary">{phrase.local}</p>
                  <p className="text-sm text-foreground">{phrase.english}</p>
                  <p className="text-xs text-muted-foreground">{phrase.hindi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="bg-secondary/30 border-secondary/50">
          <CardContent className="p-6">
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Tips for Tourists
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Always start with "जोहार" (Johar) — it's universally respected and appreciated
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Hindi is widely understood in urban areas, but knowing local phrases delights villagers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Speak slowly and use hand gestures when needed — locals are very helpful
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Learning a few phrases shows respect for local culture and traditions
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LanguageHelp;

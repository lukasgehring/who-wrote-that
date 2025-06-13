export interface GameQuestion {
    id: number;
    question: string;
    texts: Array<{
        id: string;
        content: string;
        correctCategory: string;
    }>;
    categories: string[];
}

export const gameQuestions: GameQuestion[] = [
    {
        id: 1,
        question: "Ordnen Sie diese Texte den richtigen Kategorien zu:",
        texts: [
            {
                id: "1",
                content: "Object-oriented programming (OOP) is a programming paradigm based on the concept of objects, which can contain data and code. Data in the form of fields (often known as attributes or properties), and code in the form of procedures (often known as methods). A common feature of objects is that procedures (or methods) are attached to them and can access and modify the object's data fields. In this paradigm, objects are instances of classes, which typically also determine their types. Many of the most widely used programming languages (such as C++, Java, Python, etc.) are multi-paradigm and they support object-oriented programming to a greater or lesser degree, typically in combination with imperative, procedural programming. Significant object-oriented languages include: Java, C++, C#, Python, PHP, JavaScript, Ruby, Perl, Object Pascal, Objective-C, Dart, Swift, Scala, Kotlin, Common Lisp, MATLAB, and Smalltalk.",
                correctCategory: "Programmierparadigma"
            },
            {
                id: "2",
                content: "Machine Learning ist ein Teilbereich der künstlichen Intelligenz (KI), der es Computersystemen ermöglicht, automatisch zu lernen und sich zu verbessern, ohne explizit programmiert zu werden. Dabei werden Algorithmen und statistische Modelle verwendet, um Muster in Daten zu erkennen und Vorhersagen oder Entscheidungen zu treffen. Es gibt verschiedene Arten des maschinellen Lernens: überwachtes Lernen (mit gelabelten Daten), unüberwachtes Lernen (ohne Labels) und verstärkendes Lernen (durch Belohnungssysteme). Anwendungen finden sich in vielen Bereichen wie Bilderkennung, Sprachverarbeitung, Empfehlungssystemen, autonomem Fahren und medizinischer Diagnose. Beliebte Frameworks und Tools sind TensorFlow, PyTorch, Scikit-learn und Keras.",
                correctCategory: "Künstliche Intelligenz"
            }
        ],
        categories: ["Programmierparadigma", "Künstliche Intelligenz"]
    },
    {
        id: 2,
        question: "Klassifizieren Sie diese Texte:",
        texts: [
            {
                id: "3",
                content: "Die Renaissance war eine kulturelle Bewegung, die ihren Ursprung im Italien des 14. Jahrhunderts hatte und sich über ganz Europa ausbreitete. Sie markierte den Übergang vom Mittelalter zur Neuzeit und war geprägt von einer Wiederentdeckung der antiken griechischen und römischen Kultur. Künstler wie Leonardo da Vinci, Michelangelo und Raphael schufen Meisterwerke, die bis heute bewundert werden. Die Renaissance brachte bedeutende Fortschritte in Kunst, Wissenschaft, Architektur und Literatur hervor. Humanistische Ideale standen im Mittelpunkt, die den Menschen und seine Fähigkeiten in den Vordergrund stellten. Diese Epoche legte den Grundstein für viele moderne wissenschaftliche und künstlerische Entwicklungen.",
                correctCategory: "Geschichte"
            },
            {
                id: "4",
                content: "Photosynthese ist der biologische Prozess, bei dem Pflanzen, Algen und einige Bakterien Lichtenergie (meist Sonnenlicht) nutzen, um Kohlendioxid und Wasser in Glukose und Sauerstoff umzuwandeln. Dieser Prozess findet hauptsächlich in den Chloroplasten der Pflanzenzellen statt und verwendet das grüne Pigment Chlorophyll zur Lichtabsorption. Die Photosynthese besteht aus zwei Hauptphasen: der lichtabhängigen Reaktion (Photoreaktion) und der lichtunabhängigen Reaktion (Calvin-Zyklus). Sie ist von fundamentaler Bedeutung für das Leben auf der Erde, da sie den Sauerstoff produziert, den wir atmen, und die Grundlage der meisten Nahrungsketten bildet. Ohne Photosynthese wäre komplexes Leben, wie wir es kennen, nicht möglich.",
                correctCategory: "Biologie"
            }
        ],
        categories: ["Geschichte", "Biologie"]
    }
];
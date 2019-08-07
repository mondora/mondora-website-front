import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import FaqElement from "../../components/faq-element";
import SquareButton from "../../components/square-button";

import HireBittoGraphic from "../../../static/images/HireBitto_graphic.png";
import HireBittoLogo from "../../../static/images/HireBitto_logo.png";
import Cycle2WorkGraphic from "../../../static/images/CycleToWork_graphic.png";
import Cycle2WorkLogo from "../../../static/images/CycleToWork_logo.png";
import ReportIcon2016 from "../../../static/images/report-icon-2016.png";
import ReportIcon2017 from "../../../static/images/report-icon-2017.png";
import ReportIcon2018 from "../../../static/images/report-icon-2018.png";
import Layout from "../../components/layout";

const ContainerProjects = styled.div`
    padding: 0 64px;
    margin-left: auto;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 16px;
    @media (max-width: 992px) {
        grid-template-columns: auto;
    }
`;
const ContainerHero = styled.div`
    padding: 0 64px;
    margin-left: auto;
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 32px 1fr;
    grid-column-gap: 16px;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;
const ContainerFaqs = styled.div`
    padding: 0 64px;
    margin-left: auto;
`;

const Graphic = styled.img`
    width: 100%;
`;
const ProjectLogo = styled.img`
    max-width: 100%;
    height: auto;
    width: auto;
    max-height: 100px;
`;
const Project = styled.div`
    margin: 10px;
    text-align: center;
    position: relative;
    top: ${props => props.offset};
    @media (max-width: 992px) {
        top: 0;
    }
`;
const Description = styled.div`
    background-color: var(--variant-lightgray);
    color: var(--text-dark-gray);
    line-height: 1.5;
    padding: 10%;
    margin: 10px;
    text-align: center;
`;

const SuperA = styled.a`
    text-decoration: none;
`;
const ProjectDescription = styled.div`
    padding: 24px 0;
`;

const Divider = styled.div`
    height: 100%;
    width: 100%;
`;

const Line = styled.div`
    border: 1px solid var(--black);
    @media (min-width: 992px) {
        margin: 0 auto;
        width: 0;
        height: 90%;
    }
    @media (max-width: 992px) {
        margin: 24px 10%;
        height: 0;
        width: 80%;
    }
`;

const Circle = styled.div`
    border: 2px solid var(--black);
    width: 28px;
    border-radius: 100%;
    height: 28px;
    @media (max-width: 992px) {
        display: none;
    }
`;

const LeftParagraph = styled.div`
    text-align: left;
    margin-top: 80px;
    margin-bottom: 40px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;

const LeftTitle = styled.h1`
    margin-top: 16px;
    font-size: ${props => props.theme.size.text.mondora};
`;

const LeftContent = styled.div`
    width: 70%;
    margin: 24px auto 24px 0;
    line-height: 1.6;
    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;
const RightTitle = styled.h1`
    margin-top: 80px;
    font-size: ${props => props.theme.size.text.mondora};
`;

const ReportContainer = styled.div`
    margin-top: 48px;
    padding: 0 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 48px;
    background-color: var(--gray);
    @media (max-width: 992px) {
        grid-template-columns: auto;
    }
`;
const Report = styled.div`
    display: flex;
    width: 100%;
    min-height: 128px;
    margin: 40px auto;
    box-shadow: 0 0 10px gray;
    background-color: var(--white);
`;
const ReportIcon = styled.img`
    width: 30%;
    padding: 16px;
`;
const ReportTitle = styled.h1`
    font-size: 20px;
    margin: 16px 0;
`;
const ReportLink = styled(Link)`
    font-size: 11pt;
    text-decoration: none;
    color: var(--variant-black);
    border: 1px solid var(--border-gray);
    padding: 8px;
`;

const Projects = [
    {
        title: "HireBitto",
        text:
            "HireBitto is a project which benefits local farmers and cheesemakers who choose to work with traditional methods, without the use of chemicals or industrial machinery. For every new employee, the company buys a wheel of Storico Ribelle cheese. Once matured, the cheese is auctioned and the earnings are reinvested in the community. The cheese is paid for by mondora, but it belongs to the community. The employee is responsible for this benefit creation process.",
        link: "http://www.hirebitto.com/",
        logo: HireBittoLogo,
        graphic: HireBittoGraphic,
        offset: 0
    },
    {
        title: "Cycle2Work",
        text:
            "Cycle2Work.io is an app that rewards employees for commuting to work, whilst safeguarding the environment. It’s connected to the app Strava, where people can join their company team and earn € 0.20/km for cycling rather than driving to the office, as well as saving an average of 4.32 kg of CO2 each day! If you would like your company to take part in the programme, get in touch! ",
        link: "http://www.hirebitto.com/",
        logo: Cycle2WorkLogo,
        graphic: Cycle2WorkGraphic,
        offset: 0
    }
];
const Faqs = [
    {
        question:
            "Mondora è sia una B Corp certificata sia una Società Benefit. Qual è la differenza?",
        answer:
            "La certificazione B Corp viene rilasciata dall’ente non profit B Lab alle società che con la loro attività economica creano un impatto positivo sulle persone e sull’ambiente. Successivamente alla certificazione mondora è diventata una società benefit, ovvero una forma societaria che oltre al raggiungimento del profitto impone che la società debba creare impatto positivo sull’ambiente: al bilancio d’esercizio si ha l’obbligo di allegare una relazione d’impatto. "
    },
    {
        question:
            "L’impresa ha introdotto innovazioni di tipo ambientale (es. per gestione degli scarti, per la riduzione delle emissioni inquinanti, per la riduzione dei consumi)?",
        answer:
            "mondora ha introdotto varie innovazioni di tipo ambientale, tra cui: Cycle2Work per limitare l’emissione di Co2 nel tragitto casa lavoro. Ai dipendenti che aderiscono a questo progetto vengono rimborsati 0,20 euro ogni chilometro percorso in bici o a piedi. Waste reduction:abbiamo un sistema in grado di misurare i rifiuti prodotti in ufficio, così che possiamo mettere dei target di riduzione e lavorare insieme per raggiungerli e limitare gli sprechi. Plastic free: abbiamo anche iniziato a sostenere una campagna contro l’utilizzo della plastica usa e getta tramite l’acquisto di una bottiglietta riutilizzabile per ogni dipendente, perchè crediamo sia importante ridurre gli scarti. Paper free: continuiamo ad essere un’azienda paper free e cerchiamo di aiutare anche i nostri clienti a limitare l’utilizzo della carta."
    },
    {
        question:
            "Per definizione le società benefit hanno una duplice mission: profitto e beneficio comune. Come riuscite a promuovere/perseguire entrambe contemporaneamente? Esiste un rischio di conflitto?",
        answer:
            "Per poter fare del beneficio comune un’azienda ha bisogno di un profitto. Laddove è possibile, il profitto deriva direttamente da lavori che creano beneficio - infatti con molti clienti stipuliamo un accordo di interdipendenza per cui le parti si impegnano alla creazione di impatto positivo. Dove questo non è possibile, il profitto ottenuto da altro lavoro è utilizzato in parte per la creazione di beneficio su progetti propri. Fintanto che un azienda si impegna a creare beneficio sociale, non c’è rischio di conflitto tra le due cose. E’ bene ricordare che una società benefit è comunque un’azienda for profit e non una onlus."
    },
    {
        question:
            "Quali cambiamenti nella governance aziendale avete dovuto affrontare per passare a Società Benefit? Come hanno reagito azionisti, collaboratori e altri stakeholders?",
        answer:
            "Internamente a mondora non ci sono stati grandi cambiamenti, essendo già una B Corp diventare società benefit è stato solo il passo legale. Anche diventare una b corp è stato un processo facile per noi, ci ha solo dato un “distintivo” per come siamo, senza dover portare cambiamenti a livello aziendale. Il cambiamento è stato accolto con grande entusiasmo da tutti i nostri stakeholders e le reazioni sono state interamente positive."
    },
    {
        question:
            "Pensate che un certificatore (come B Lab per le B Corp) aggiungerebbe valore ad una società benefit?",
        answer:
            "Assolutamente, riteniamo che sia indispensabile perché la certificazione prova che la società sta davvero facendo quello che dice di fare. L’ente B Lab fa dei controlli presso le aziende ogni anno e garantisce la qualità della parte benefit della società. Cambiare lo statuto è facile, applicare in modo pratico i principi è una cosa ben diversa."
    },
    {
        question:
            "Si può considerare la certificazione B Corp come uno strumento di innovazione nella Governance per poter assicurare maggiore trasparenza agli shareholders? Se sì, in che modo?",
        answer:
            "La certificazione di per sè rende trasparente il lavoro dell’azienda e i risultati sono accessibili a tutti. Inoltre, la certificazione serve anche come incentivo alla trasparenza, che al giorno d’oggi è una qualità spesso ricercata presso i clienti. Nel nostro caso c’era già totale trasparenza presso gli shareholders, ma credo che possa essere utile per innovare aziende più “standard”."
    },
    {
        question:
            "Come Società benefit avete il dovere di redigere annualmente, insieme al bilancio, il Benefit Report. Quali sono i contenuti del vostro Benefit Report? Quali sono i benefici di un Benefit report e qual è l’utilizzo verso shareholders/stakeholders?",
        answer:
            "Il nostro benefit report è una relazione su tutti i nostri progetti e lavori che hanno portato beneficio sociale nell’ultimo anno. Si relaziona al nostro statuto e ai benefici che ci siamo imposti di portare. I benefici sono la chiarezza e la trasparenza nell’operato dell’azienda che può raccontare a tutti il modo in cui opera. Gli stakeholders possono visualizzare queste informazioni liberamente."
    },
    {
        question:
            "Ci sono responsabilità specifiche in più rispetto alle aziende tradizionali, per le società benefit (nei confronti degli investitori)? Come cambiano i diritti/doveri da e verso gli azionisti di una società benefit?",
        answer:
            "Ci sono sicuramente delle responsabilità in più, perché una società benefit deve prendersi cura di tutti gli stakeholders e non solo degli shareholders. Si passa da un modello in cui fare soldi è l’unico obiettivo, a un modello in cui fare soldi è un mezzo per arrivare ad un fine più grande, che è quello di fare beneficio sociale. Gli azionisti hanno il dovere di contribuire alla creazione di benefit. "
    },
    {
        question:
            "Come incide il fatto di essere SB sul vostro vantaggio competitivo/competitività con le aziende tradizionali? Vi limita o vi dà qualcosa in più?",
        answer:
            "Abbiamo notato un cambiamento nell’acquisizione di clienti, che scelgono noi perché siamo una società benefit, a parità di competenze tecnologiche con altre aziende più conosciute e più grandi."
    },
    {
        question:
            "Qual è stato l'impatto della certificazione B Corp per Mondora?",
        answer:
            "mondora è sempre stata un’azienda “particolare”, in cui l’impegno sociale e ambientale verso la realtà locale sono sempre stati parte dei valori aziendali, nonostante il lavoro principale sia lo sviluppo di software. La certificazione B Corp è stata per mondora una conferma dei valori aziendali. "
    },
    {
        question:
            "Potreste menzionare qualche beneficio derivante dall'utilizzo del BIA (B Impact Assessment)?",
        answer:
            "Il BIA è uno strumento molto utile, non solo per ottenere la certificazione, ma anche per imparare e capire meglio quali cambiamenti si possono adottare all’interno dell’azienda per diventare più sostenibili e dare maggior beneficio alla comunità. Le domande sono molto precise e dettagliate, e permettono di pensare alla sostenibilità in modo diverso e più completo. Ogni azienda, con qualsiasi punteggio, può trarre enormi benefici dal BIA."
    },
    {
        question:
            "In che modo, secondo voi, l'innovazione può stimolare la sostenibilità?",
        answer:
            "L’innovazione, e non solo quella tecnologica, è fondamentale per stimolare la sostenibilità. Per migliorare il mondo bisogna avere il coraggio di fare dei cambiamenti. Il singolo individuo può agire nel piccolo - le aziende invece hanno il potere e la capacità di agire in maniera più ampia, ed è quindi un loro dovere dare il buon esempio ed essere agenti di cambiamento. "
    },
    {
        question:
            "In che modo Mondora sta contribuendo a ''Essere il cambiamento- B the Change''?",
        answer:
            "Innanzitutto mondora vuole dare il buon esempio e ispirare le aziende clienti a diventare B Corporations. mondora promuove attivamente il benessere dei suoi dipendenti: l’azienda è interamente auto-organizzata, non ci sono managers e gli orari di lavoro sono flessibili. mondora si impegna inoltre a sostenere piccole attività locali, come aziende agricole biodinamiche e la produzione di Storico Ribelle negli alpeggi. Inoltre mondora stipula dei contratti di interdipendenza con i clienti, mediante i quali, entrambe le parti si impegnano a creare impatto positivo sulla comunità e sull’ambiente. "
    },
    {
        question: "Quali vantaggi e svantaggi attribuite alla certificazione?",
        answer:
            "Il vantaggio principale è quello di far parte di un gruppo di aziende che guarda oltre al profitto e fa qualcosa di concreto per il beneficio comune. La certificazione ci da anche un modo per far capire meglio ai nostri clienti il nostro modo di operare. Ad oggi non abbiamo riscontrato nessuno svantaggio legato alla certificazione B Corp."
    },
    {
        question:
            "Perché  le B-Corp vengono considerate le aziende del futuro? Pensate davvero che le B-Corp possano contribuire alla creazione di un mondo migliore?",
        answer:
            "Se tutte le aziende prendessero in considerazione l’aspetto di beneficio comune il mondo sarebbe un posto migliore. Le aziende hanno il capitale necessario per poter fare dei cambiamenti significativi: ridurre l’inquinamento e la povertà, preservare gli ecosistemi, aiutare le comunità in infiniti modi."
    },
    {
        question:
            "Cosa direste a qualcuno che sta valutando l’ipotesi di intraprendere il processo di certificazione B-Corp?",
        answer:
            "Che è un bellissimo percorso nel quale un’azienda impara molto, vede modi diversi in cui potrebbe operare, prova nuove soluzioni e pensa in maniera più profonda al proprio impatto ambientale e sociale."
    }
];
const Reports = [
    {
        icon: ReportIcon2016,
        title: "Impact Report 2016",
        button: "Leggi il report >",
        to: "/report2016.pdf"
    },
    {
        icon: ReportIcon2017,
        title: "Impact Report 2017",
        button: "Leggi il report >",
        to: "/report2017.pdf"
    },
    {
        icon: ReportIcon2018,
        title: "Impact Report 2018",
        button: "Leggi il report >",
        to: "/report2018.pdf"
    }
];

const BCorp = () => (
    <Layout>
        <ContainerHero>
            <LeftParagraph>
                <LeftTitle>{"mondora is a BCorp!"}</LeftTitle>
                <LeftContent>
                    {
                        "Mondora is strongly focused on serving the local community and is running a few side projects aimed at improving the quality of life of farmers, employees and the air around us. "
                    }
                </LeftContent>
            </LeftParagraph>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <div>
                <RightTitle>
                    {"Our score:"} <br /> {"122 points"}
                </RightTitle>
                <SuperA href={"https://bcorporation.net/directory/mondora"}>
                    <SquareButton>{"BCorp page"}</SquareButton>
                </SuperA>
            </div>
        </ContainerHero>
        <ContainerProjects>
            {Projects.map(project => (
                <Project offset={project.offset}>
                    <Graphic src={project.graphic} />
                    <Description>
                        <ProjectLogo src={project.logo} />
                        <ProjectDescription>{project.text}</ProjectDescription>
                        <SuperA href={project.link}>
                            <SquareButton>{project.title}</SquareButton>
                        </SuperA>
                    </Description>
                </Project>
            ))}
        </ContainerProjects>
        <ContainerFaqs>
            <h1>{"FAQ"}</h1>
            {Faqs.map(faq => (
                <FaqElement question={faq.question} answer={faq.answer} />
            ))}
        </ContainerFaqs>
        <ReportContainer>
            {Reports.map(report => (
                <Report>
                    <ReportIcon src={report.icon} />
                    <div>
                    <ReportTitle>{report.title}</ReportTitle>
                    <ReportLink to={report.to}>{report.button}</ReportLink>
                    </div>
                </Report>
            ))}
        </ReportContainer>
    </Layout>
);

export default BCorp;

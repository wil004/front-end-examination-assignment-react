** THE COUNTRY NEWS GUIDE **

** Handleiding werking applicatie **

De country news guide is een applicatie die het mogelijk maakt om nieuws te filteren op categorie en land.

Dit kan op de news page of op de country page.

Om deze pagina's te kunnen bereiken zal een gebruiker zich moeten registreren.
Dit kan op de registratie pagina.

Als dit geslaagd is krijg je een bericht van goedmelding en zal je worden ge-redirect naar de login pagina.
Hier kan je inloggen met je nieuwe account (of al bestaande account als je je eerder had geregistreerd) waarop je 
toegang krijgt tot de profile page, choose country page, news page en de country page.

Er zal wel genavigeerd moeten worden naar de country page door een land te kiezen op de choose country page.

Op de nieuws page kan de gebruiker nieuws filteren op algemene categorieen (denk aan sport, politiek etc.).
Het is op de nieuws page ook mogelijk om de categorieen op land te filteren door het land op te zoeken in de zoekbalk
en vervolgens op search te klikken.

![](src/assets/newspage.png)
De news page.
_______________

Op de country page kan een gebruiker bepaalde statistieken inzien van een land.
Denk bijvoorbeeld aan populatie en munteenheden.

Ook is het mogelijk om de munteenheden van een land om te rekenen met de valuta calculator.

De categorieen die gekozen kunnen worden op de country page hebben met het gekozen land te maken.

Je zou bijvoorbeeld kunnen zoeken naar nieuws over de valuta of nieuws over de hoofdstad en meer.

Ook hebben sommige landen een talen optie om nieuws te bekijken in de taal van het door de gebruiker gekozen land.
Dit zie je dan rechtsboven in de pagina bij het kopje language.
Is deze niet aanwezig dan is er dus ook geen talenoptie.

(Je kan filteren op landen met een talenoptie op de choose country pagina hier kun je heen navigeren door op de navbar op countries te klikken. 
Ook kun je hier landen filteren op continent.)


![](src/assets/countrypage.png)
De country page van duitsland (germany) dit land heeft een talenoptie.
__________________________________________

** Benodigdheden om de applicatie te runnen **
- De api keys van https://www.thenewsapi.com/ en https://www.abstractapi.com/(holiday en currency).
_____________________________________________


** Handleiding om de applicatie te runnen **

Het is eigenlijk erg eenvoudig om deze applicatie te runnen.

Je cloned dit project in een gekozen map via git bash (git clone url-van-project) en opent het met een code editor zoals bijv. webstorm.

Vervolgens typ je 'npm install' in de terminal en druk je op enter.
Alle packages/dependencies die bij de applicatie horen worden dan gedownload.

Dan maak je een .env bestand aan in de hoofdmap! en vul je hier de bijbehorende api keys in.

REACT_APP_API_KEY_NEWS=*newsapi*

REACT_APP_API_KEY_HOLIDAYS=*holidayapi*

REACT_APP_API_KEY_CURRENCIES=*currencyapi*

Nadat je dit gedaan hebt vul je 'npm start' in, in de terminal en dan druk je op enter en kan de applicatie opgestart worden.

Voor de eindexamenopdracht zal ik de api keys in een txt file genaamd keys stoppen.
Hier zal ik data inzetten die meteen gekopieerd en geplakt kan worden in het .env bestand.
Doe dit wel voordat je npm start intikt anders moet de applicatie opnieuw opgestart worden.



**BESTAND OP GITHUB UPGEDATE OP 23.59 06-02-2022

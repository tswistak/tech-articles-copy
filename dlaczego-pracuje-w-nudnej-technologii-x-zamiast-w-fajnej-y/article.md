# Dlaczego pracuję w nudnej technologii X zamiast w fajnej Y?

(oryginalnie opublikowane na https://ohmydev.pl/post/dlaczego-pracuje-w-nudnej-technologii-x-zamiast-w-fajnej-y-5d1o)

Hej,

Dziś we wpisie, chciałbym trochę przedstawić, dlaczego nie zawsze w komercyjnych projektach mamy do czynienia z najnowszymi, tymi uważanymi za najfajniesze bibliotekami/frameworkami/językami. Jest to coś, co poruszają często osoby początkujące, a chciałbym przedstawić tu małą obronę tech leadów, dlaczego podejmują takie, a nie inne decyzje, szczególnie na starcie projektu.

Całość napiszę z punktu widzenia JSowca (wiecie, „0 days since new JS framework” i te sprawy), ale można to przełożyć na cały świat developerki.

## Znajomość technologii w zespole

Gdy zaczynamy prace nad projektem, zwykle wiemy, kto na początku razem z nami będzie. Wówczas, najczęściej wybiera się takie technologie, w których zespół się najlepiej czuje, żeby mógł dowieźć pierwsze funkcje jak najszybciej. Stąd, jak szykuje nam się zespół składający się z Angularowców, to Angular będzie naturalnym wyborem, nawet jeśli tech lead czuje się bardziej Reactowcem.

Chociaż przyznam, że sam lubię czasem wprowadzić jakąś nowość, jeżeli mam tylko do tego sposobność. Na przykład, w jednym projekcie klient dał nam dowolność w kwestii backendu (przy czym miał być JSowy), więc zamiast Expressa, w którym doświadczenie mieliśmy wszyscy, spróbowaliśmy NestJS. Wiedzieliśmy, że backend nie będzie bardzo rozbudowany, więc mogliśmy zaryzykować. Opłaciło się — teraz nie wyobrażamy sobie powrotu do Expressa i mamy argument za stosowaniem NestJS w kolejnych projektach (w końcu, już go poznaliśmy ;) ).

## Popularność technologii

Tworząc projekty komercyjne, musimy brać pod uwagę popularność technologii. Jeżeli dana biblioteka/framework są popularne, to są większe szanse, że jej support będzie kontynuowany latami. Aplikacje projektuje się z myślą, że będą używane i tworzone latami, więc nie chcemy wejść w coś, co straci support za rok, dwa lata. Jest to też coś, co jest w spektrum zainteresowania interesariuszy projektu — tech leada nie powinno zdziwić pytanie od klienta typu: "czy ta biblioteka za 10 lat dalej będzie rozwijana".

## Użycie/development przez duże firmy

Biblioteki rozwijane przez duże, znane firmy, mają zwykle pierwszeństwo w wyborze. Tutaj znowu się to rozbija o interesariuszy. Jak miałem okazję nie raz przedstawiać klientowi „dlaczego chcemy użyć w projekcie X”, to argumenty techniczne nie mają takiej siły jak: „używa tego Facebook”, „napisał to Google”. Dlatego, mimo że w State of JS w rankingach Interest od lat króluje Svelte to ma tak niski Usage — bo w projektach komercyjnych, wieloletnich, łatwiej klientowi zaufać w Reacta czy Angulara, za którymi stoją korporacje. I to mimo tego, że według tego samego State of JS, Angular z roku na rok jest coraz mniej lubiany.

## Komercyjny support

Istnienie komercyjnego supportu to kolejna rzecz, która ma wpływ na wybór bibliotek. Tutaj akurat pamiętam sytuacje z .NETowego projektu: developerzy nie znosili DevExpressa, ale był używany dlatego, że miał dobry komercyjny support. W świecie JS obecnie te same rzeczy widzę w kwestii, że do edytorów WYSIWYG używa się CKEditor, a do data-gridów ag-grid mimo istnienia darmowych alternatyw. Powód jest dokładnie ten sam — komercyjny support. A zwykle dla korporacji, koszt zakupu licencji i posiadanie spokoju w postaci supportu jest bardziej akceptowalne, niż ryzyko wzięcia darmowej biblioteki, w której błąd może nie być nigdy rozwiązany.

## Klient chce X

Kolejne, co chciałem poruszyć, to fakt, że często klient, dla którego pracujemy, chce konkretnie daną technologię. Powody mogą być przeróżne:

- Istnieją już inne systemy pisane lub korzystające z X — raczej, jeśli klient ma backendy pisane w Javie, nagle nie wejdziemy im z inną technologią na backend. Ewentualnie w przypadku baz danych: jeśli już na serwerze posiadają np. SQL Server, to nie ma sensu dokładać klientowi nagle Postgresa pod jeden projekt.
- Słyszeli, że X jest super i chcą konkretnie go użyć — tutaj znam z autopsji bardzo fajny przykład: klient tak się uparł na bazę dokumentową, że nie byliśmy w stanie wytłumaczyć, że w jego przypadku bardziej nada się relacyjna. Ostatecznie przez konieczność robienia małowydajnych joinów na bazach dokumentowych, backend nie działał najszybciej... ale klient miał, co chciał.
- Ograniczenia związane z aktualną architekturą — przykładowo, jeśli klient ma własne serwery, nie wejdziemy mu nagle z cloudem.

## Ograniczenia nakładane przez klienta

Nie raz się zdarza tak, szczególnie pracując dla dużych, korporacyjnych klientów, że nie mamy dowolności w wyborze bibliotek, ponieważ każda musi przejść przez proces weryfikacji. Może to być statyczna analiza zautomatyzowanym narzędziem, mogą być ograniczenia pod kątem licencji, a czasami weryfikacja może być przeprowadzana przez kogoś ręcznie. Do tego, w środowiskach korporacyjnych zdarza się, że utrzymywane są własne repozytoria, ze sprawdzonymi i pewnymi wersjami zewnętrznych zależności. Oznacza to, że często mamy po prostu odgórnie dostępną listę bibliotek, które możemy użyć i wyjście poza to oznacza przechodzenie przez żmudne procesy, które mogą trwać dłużej, niż mamy czasu na wykonanie zadania.

## Słowo na koniec

Jeśli jesteś juniorem, pamiętaj, że użycie czegoś, co jest fajne i polecane w Internecie, w komercyjnym projekcie nie zawsze jest takie proste. Za użyciem konkretnych rozwiązań stoją nie raz trudne decyzje tech leada, spowodowane wieloma czynnikami. A jeśli jesteś tech leadem, to daj znać w komentarzu, co u Ciebie często decyduje, że używasz „nudnego X”, zamiast „fajnego Y”.

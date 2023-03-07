# Wizualizacja danych — co warto znać?

(oryginalnie opublikowane na https://ohmydev.pl/post/wizualizacja-danych-co-warto-znac-2ceo)

Hej! Na co dzień w firmie zajmuję się dziedziną wizualizacji danych i pomyślałem, że podzielę się z Wami paroma rzeczami, które warto umieć/znać, gdy będziecie potrzebowali zamieścić w aplikacji wykres czy diagram.

## Po co w ogóle wizualizacja danych?

Generalnie rzecz biorąc, moglibyśmy wszystkie dane wyświetlać w tabelkach czy listach. To jest jak najbardziej poprawne podejście. Problem jest tylko taki, że patrząc na surowe liczby, nie dostrzegamy aż tak łatwo różnic między nimi. Wykres ułatwia sprawę, choćby dzięki zastosowaniu różnych skal.

Innym miejscem, gdzie wizualizacja bardzo pomaga, jest pokazywanie relacji, zależności i hierarchii. Tutaj w grę wchodzą diagramy. Myślę, że jako programiści możemy bardzo dobrze znać wartość diagramów z baz danych. Diagram relacji przedstawiający bazę danych, w szczególności rozbudowaną, jest czytelniejszy niż przeglądanie kodu SQL generującego ją.

## Jak wizualizować dane?

Dane najłatwiej jest zwykle wizualizować za pomocą bibliotek do tego stworzonych. Bardzo często nie ma co wymyślać koła na nowo, a wybór mamy bardzo szeroki. Osobiście polecam następujące.

Do diagramów:

- [GoJS](https://gojs.net/latest/index.html) — płatna, aczkolwiek bardzo zaawansowana biblioteka do tworzenia diagramów. W przypadku projektów komercyjnych myślę, że warto w nią zainwestować. Oprócz rysowania diagramów oferuje też funkcjonalności interakcji na nich, dzięki czemu jako programiści możemy skupić się na właściwych funkcjonalnościach, a nie wszystkim dookoła. Sam też napisałem kilka lat temu tutorial do tej biblioteki. Znajdziesz go tutaj: [cz. 1](https://synergycodes.com/blog/how-do-i-create-a-simple-gojs-application/), [cz. 2](https://synergycodes.com/blog/simple-gojs-application-setting-and-editing-edges/) i [cz. 3](https://synergycodes.com/blog/simple-gojs-application-finishing-touches/).
- [JointJS](https://www.jointjs.com/opensource) — darmowa, funkcjonalna alternatywa. Oferuje nieco gorszą wydajność, ale dla niekomercyjnych projektów i prostych komercyjnych sprawdzi się idealnie.
- [vis.js](https://visjs.org/) — darmowa, jednak oferujące jedynie wizualizację. Sam z niej korzystam, chociażby na swoim blogu, gdzie przy jej użyciu wizualizowałem niektóre algorytmy, np. [heap sort](https://swistak.codes/sortowanie-cz-4-sortowanie-przez-wybieranie/).

Do wykresów:

- [Chart.js](https://www.chartjs.org/) — darmowa, rysuje bardzo ładne wykresy, aczkolwiek jej dokumentacja potrafi czasem dać w kość. Również używam ją na swoim blogu i można zobaczyć prosty rezultat pod wcześniejszym linkiem.
- [react-google-charts](https://github.com/RakanNimer/react-google-charts) — darmowa, ale niestety tylko dla Reacta. Oferuje bardzo ładne wykresy i w przeciwieństwie do Chart.js ma dobrą dokumentację. Idealna na start.
- [ZoomCharts](https://zoomcharts.com/en/) — moim zdaniem najlepsza z płatnych. Przepiękne wykresy i spore możliwości.

Możesz się w tym momencie zastanawiać, dlaczego nie poleciłem bardzo znanego D3. Otóż dlatego, że D3 samo z siebie nie jest biblioteką do wizualizacji danych, tylko do tworzenia data-driven apps. Pomaga tworzyć wizualizację przez obsługę danych i dostarczenie wielu przydatnych algorytmów, ale samo rysowanie leży w Twoich rękach. Przy wypisanych powyżej bibliotekach, nie musisz przejmować się rysowaniem.

Inna rzecz jest taka, że nie ma co szukać bibliotek idealnie dopasowanych pod Twój framework/bibliotekę. Lepiej skorzystać z ogólnych rozwiązań i integrować je na własną rękę. Użycie zewnętrznych bibliotek jest dość proste zarówno w Angularze, React jak i Vue. Szukanie czegoś stricte pod Angulara czy Reacta mocno nas ograniczy i niekoniecznie znajdziemy dobre rozwiązania.

## Co warto znać, zanim zacznę tworzyć wizualizację?

Szczerze? Matematyka i algorytmy. Jak na frontendzie raczej wiele wiedzy teoretycznej nie potrzeba, tak uderza ona ze zdwojoną siłą przy wizualizacjach danych. Może nie trzeba jej przy najprostszych przypadkach, ale zdecydowanie co warto znać, w szczególności tworząc diagramy:

- teoria grafów i drzew
- algorytmy grafowe i do obsługi drzew — podstawa to przechodzenie po grafach: DFS czy BFS
- warto też znać sposoby reprezentacji grafów jak i drzew w pamięci
- z matematyki może przydać się geometria z trygonometrią, szczególnie jeśli będziesz chciał(a) modyfikować istniejące wizualizacje.

Na koniec pozostaje mi życzyć Wam powodzenia. Wizualizacja danych to jeden z najciekawszych tematów na frontendzie i zdecydowanie warto w to wejść. W razie pytań jestem do dyspozycji w komentarzach :) .
